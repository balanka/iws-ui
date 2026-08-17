import * as XLSX from 'xlsx';
import { getPeriod, initAcc } from '../form/Menu.tsx';
import {IAccount, ICustomer, IFinancials, ILineFinancials, ISupplier} from '../Models.ts';
import {FileInputProps} from "../Props.ts";
import {formEnum} from "./FormEnum.tsx";
import iwsStore from "./Store.tsx";



function parseDate(value: any): Date {
  // Already a valid Date
  if (value instanceof Date && !isNaN(value.getTime())) return value;

  // Empty or null → treat as today (or throw)
  if (value == null || value === '') {
    console.warn('Empty date value – using today');
    return new Date();
  }

  // Excel serial number (number)
  if (typeof value === 'number') {
    const d = new Date(1900, 0, value - 1);
    return isNaN(d.getTime()) ? new Date() : d;
  }

  // String parsing
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return new Date();

    // Try ISO format (YYYY-MM-DD or with time)
    const isoMatch = trimmed.match(/^\d{4}-\d{2}-\d{2}/);
    if (isoMatch) {
      const d = new Date(trimmed);
      if (!isNaN(d.getTime())) return d;
    }

    // Try dd.mm.yyyy (with dots)
    const dotParts = trimmed.split('.');
    if (dotParts.length === 3) {
      const day = parseInt(dotParts[0], 10);
      const month = parseInt(dotParts[1], 10) - 1;
      const year = parseInt(dotParts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) return d;
      }
    }

    // Try dd/mm/yyyy (with slashes)
    const slashParts = trimmed.split('/');
    if (slashParts.length === 3) {
      const day = parseInt(slashParts[0], 10);
      const month = parseInt(slashParts[1], 10) - 1;
      const year = parseInt(slashParts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) return d;
      }
    }

    // Try numeric string (Excel serial as string)
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== '') {
      const d = new Date(1900, 0, num - 1);
      if (!isNaN(d.getTime())) return d;
    }

    // Fallback to native parsing
    const fallback = new Date(trimmed);
    if (!isNaN(fallback.getTime())) return fallback;

    // If all fails, log and use today
    console.warn(`Unparsable date: "${trimmed}" – using today`);
    return new Date();
  }

  // Unknown type
  console.warn(`Unsupported date type: ${typeof value} – using today`);
  return new Date();
}

/**
 * Transforms raw rows:
 * - Propagates non‑empty oaccount to all rows with same (oid, modelid, transdate)
 * - Normalizes amount / amount_1 so both are filled
 */
function transformRawData(rawData: any[]): any[] {
  const groups = new Map<string, any[]>();
  rawData.forEach(row => {
    const key = `${row.oid}|${row.modelid}|${row.transdate}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  });

  const transformed: any[] = [];

  const normalizeAmounts = (row: any) => {
    // Only used for other modelids, not for the 118 series
    const amt = parseFloat(row.amount);
    const amt1 = parseFloat(row.amount_1);
    if (!isNaN(amt1) && isNaN(amt)) {
      row.amount = amt1;
      row.amount_1 = amt1;
    } else if (!isNaN(amt) && isNaN(amt1)) {
      row.amount = amt;
      row.amount_1 = amt;
    }
    return row;
  };

  groups.forEach(group => {
    const modelidNum = Number(group[0].modelid);

    // ---------- Branch 1: modelids 112 and 122 ----------
    if (modelidNum === 112 || modelidNum === 122) {
      // ... keep the same logic as before (unchanged) ...
      // (I'll paste it here for completeness, but it's unchanged)
      let commonOaccount = '';
      let sourceRow: any = null;
      for (const row of group) {
        if (row.oaccount && row.oaccount.trim() !== '') {
          commonOaccount = row.oaccount.trim();
          sourceRow = row;
          break;
        }
      }
      if (!commonOaccount) {
        group.forEach(row => transformed.push(normalizeAmounts({ ...row })));
        return;
      }
      if (modelidNum === 122) {
        group.forEach(row => {
          const newRow = { ...row };
          const originalAccount = newRow.account;
          newRow.account = commonOaccount;
          newRow.oaccount = row === sourceRow ? commonOaccount : originalAccount;
          transformed.push(normalizeAmounts(newRow));
        });
      } else { // 112
        group.forEach(row => {
          const newRow = { ...row };
          newRow.oaccount = commonOaccount;
          if (row === sourceRow) newRow.account = commonOaccount;
          transformed.push(normalizeAmounts(newRow));
        });
      }
    }

    // ---------- Branch 2: modelids 118, 218, 318, 418, 518, 618 ----------
    else if ([118, 218, 318, 418, 518, 618].includes(modelidNum)) {
      let sourceRow: any = null;
      let commonOaccount = '';

      // ----- 1. Primary source: row with amount_1 (and no amount) -----
      for (const row of group) {
        const amount = parseFloat(row.amount);
        const amount1 = parseFloat(row.amount_1);
        const hasAmount = !isNaN(amount) && amount > 0;
        const hasAmount1 = !isNaN(amount1) && amount1 > 0;
        if (hasAmount1 && !hasAmount) {
          sourceRow = row;
          break;
        }
      }

      // ----- 2. Fallback: row with amount (and no amount_1) -----
      if (!sourceRow) {
        for (const row of group) {
          const amount = parseFloat(row.amount);
          const amount1 = parseFloat(row.amount_1);
          const hasAmount = !isNaN(amount) && amount > 0;
          const hasAmount1 = !isNaN(amount1) && amount1 > 0;
          if (hasAmount && !hasAmount1) {
            sourceRow = row;
            break;
          }
        }
      }

      // ----- 3. Ultimate fallback: first row with any amount -----
      if (!sourceRow) {
        for (const row of group) {
          const amount = parseFloat(row.amount);
          if (!isNaN(amount) && amount > 0) {
            sourceRow = row;
            break;
          }
        }
        if (!sourceRow) {
          sourceRow = group[0]; // last resort
        }
      }

      // ----- Apply the 118‑series rule -----
      // Create a copy of the source row to modify (we don't want to mutate the original group data)
      const sourceCopy = { ...sourceRow };
      const hasOaccount = sourceCopy.oaccount && sourceCopy.oaccount.trim() !== '';

      if (hasOaccount) {
        // Source row has oaccount: account becomes oaccount, common = oaccount
        sourceCopy.account = sourceCopy.oaccount.trim();
        commonOaccount = sourceCopy.oaccount.trim();
        // oaccount stays the same
      } else {
        // Source row has empty oaccount: oaccount becomes account, common = account
        sourceCopy.oaccount = sourceCopy.account;
        commonOaccount = sourceCopy.account;
        // account stays the same
      }

      // Now propagate commonOaccount to all rows in the group, and replace the source row with the updated copy
      group.forEach(row => {
        const newRow = { ...row };
        if (row === sourceRow) {
          // Use the modified source copy
          newRow.account = sourceCopy.account;
          newRow.oaccount = sourceCopy.oaccount;
        } else {
          // For other rows, only update oaccount, keep everything else
          newRow.oaccount = commonOaccount;
        }
        // Do not touch amount or amount_1
        transformed.push(newRow);
      });
    }

    // ---------- Branch 3: all other modelids ----------
    else {
      let commonOaccount = '';
      for (const row of group) {
        if (row.oaccount && row.oaccount.trim() !== '') {
          commonOaccount = row.oaccount.trim();
          break;
        }
      }
      group.forEach(row => {
        const newRow = { ...row };
        if (commonOaccount) newRow.oaccount = commonOaccount;
        transformed.push(normalizeAmounts(newRow));
      });
    }
  });

  return transformed;
}
function buildLines(mlines:any[], accData:IAccount[], company:string, currency:string): ILineFinancials[] {
  return mlines.map( m=>buildLine(m, accData, company, currency))
}
function buildLine(m:any, accData:IAccount[], company:string, currency:string): ILineFinancials {
  const currentAccount = accData.find((acc) => acc.id === m.account) ?? initAcc;
  const currentOaccount = accData.find((acc) => acc.id === m.costcenter) ?? initAcc;
  console.log(`currentAccount`, currentAccount)
  console.log(`currentOaccount`, currentOaccount)
  return {
    id: BigInt(-1),
    transid: BigInt(-1),
    account: `${m.account}`,
    oaccount: `${m.costcenter}`,
    amount: m.amount,
    currency,
    duedate: new Date(m.transdate),
    side: true,
    text: `${m.text}`,
    accountName: currentAccount.name,
    oaccountName: currentOaccount.name,
    modelid: m.modelid,
    company,
  }

}
/**
 * Parses an Excel/CSV file and converts it to an array of IFinancials objects.
 * Handles date parsing, amount_1 → amount, grouping by oid+modelid, and deduplication.
 */
export function parseExcelToFinancials(
  file: File,
  fileInputProps: FileInputProps<IAccount | ICustomer | ISupplier>
): Promise<IFinancials[]> {
  return new Promise((resolve, reject) => {
    const { company, currency, masterfiles } = fileInputProps;
    const accData = masterfiles.length>1?masterfiles:iwsStore.getByModelId(formEnum.ACCOUNT) as IAccount[];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event?.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let rawData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false, defval: '' });
        console.log('rawData input ', rawData)
        // ===== Apply transformation =====
        rawData = transformRawData(rawData);
        console.log('rawData output', rawData)

        // 1. Convert dates and prepare base object
        const convertedData = rawData.map((m) => {
          // ... your existing date parsing logic (unchanged) ...
          const  transdate: Date = parseDate( m.transdate)

          return {
            ...m,
            id: -1,
            costcenter: m.oaccount,
            transdate,
            postingdate: new Date(),
            enterdate: new Date(),
            contact: '',
            company,
            period: getPeriod(transdate),
            posted: false,
            text: m.text,
            footText: '',
          };
        });

        // 2. Normalize amount → amount and resolve account names
        const normalized = convertedData.map((obj) => {
          const amountx: number = obj.amount; // now always filled
          const oaccountx: string = obj.oaccount || obj.account;
          const { oid, transdate, account, text, modelid } = obj;

          return {
            id: BigInt(-1),
            oid,
            transdate,
            postingdate: new Date(),
            enterdate: new Date(),
            period: getPeriod(transdate),
            posted: false,
            footText: '',
            account,
            costcenter: oaccountx,
            amount: amountx,
            text,
            side: true,
            modelid: parseInt(modelid, 10),
            contact: '',
            company,
            lines: [],
          };
        });

        console.log('normalized', normalized)
        console.log('masterfiles', accData)
        const filtered = normalized.filter(m=>m.account!==m.costcenter);
        console.log('filtered', filtered)
        const groups = new Map<string, any[]>();

        filtered.forEach((m) => {
          const key = `${m.oid}${m.modelid}${m.transdate.getTime()}`;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(m);
        });

        const result0: IFinancials[] = Array.from(groups.entries()).map(([, items]) => {
          const first = items[0];
          return {
            ...first,
            lines: buildLines(items, accData as IAccount[], company, currency),
          };
        });

        console.log('result0', result0)
        // 5. Deduplicate by oid + modelid + transdate
        // const keyFn = (trans: IFinancials) => `${trans.oid}${trans.modelid}${trans.transdate}`;
        // const result = deduplicate(result0, keyFn);
        // console.log('result', result)
        resolve(result0);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

// function deduplicate<T extends IFinancials|ITransaction>(arr: T[], getKey: (item: T) => string): T[] {
//   const seen = new Map<string, T>();
//   for (const item of arr) {
//     const key = getKey(item);
//     if (!seen.has(key)) {
//       seen.set(key, item);
//     }
//   }
//   return Array.from(seen.values());
// }
