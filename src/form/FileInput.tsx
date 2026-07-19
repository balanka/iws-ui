import React from 'react';
import * as XLSX from 'xlsx';
import {getPeriod} from "./Menu.tsx";

function FileInput(company:string) {
    const [data, setData] = React.useState<Accountx[]>();
    type A = { id:string, name: string, parent:string}
    type Accountx =  A & {  modelid?:number, company:string}
    type ParentWithChildren<T> = T & { lines: T[] };

  function groupByKeys<T extends Record<string, any>>(
    arr: T[],
    keys: (keyof T)[]
  ): ParentWithChildren<T>[] {
    const map = new Map<string, T[]>();

    // 1. Group by composite key
    arr.forEach(item => {
      const key = keys.map(k => String(item[k])).join('||');
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });

    // 2. Convert to parent with embedded children (only groups with ≥ 2)
    const result: ParentWithChildren<T>[] = [];
    for (const [, items] of map) {
      if (items.length >= 2) {
        const [parent, ...children] = items;
        result.push({
          ...parent,
          lines: children
        });
      }
    }
    return result;
  }

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event?.target?.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rawData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false, defval: "" });

      const convertedData = rawData.map((m) => {
        let transdate: Date;

        // 1. If it's already a Date, use it
        if (m.transdate instanceof Date) {
          transdate = m.transdate;
        }
        // 2. If it's a number (Excel serial)
        else if (typeof m.transdate === 'number') {
          transdate = new Date(1900, 0, m.transdate - 1);
        }
        // 3. If it's a string
        else if (typeof m.transdate === 'string') {
          const trimmed = m.transdate.trim();
          // 3a. Numeric string (e.g., "46023")
          const num = Number(trimmed);
          if (!isNaN(num) && trimmed !== '') {
            transdate = new Date(1900, 0, num - 1);
          }
          // 3b. Date string like "23.06.2026"
          else {
            const parts = trimmed.split('.');
            if (parts.length === 3) {
              const day = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10) - 1;
              const year = parseInt(parts[2], 10);
              transdate = new Date(year, month, day);
            } else {
              // 3c. Fallback to default Date parsing
              transdate = new Date(trimmed);
            }
          }
        }
        // 4. Fallback
        else {
          transdate = new Date();
          console.warn('Invalid transdate:', m.transdate);
        }

        // If invalid date, fallback
        if (isNaN(transdate.getTime())) {
          console.warn('Invalid transdate:', m.transdate);
          transdate = new Date();
        }

        console.log('Parsed transdate:', transdate);

        return {
          ...m,
          transdate: transdate,          // ✅ overwrite with correct field name
          contact: -1,
          company: company,
          period: getPeriod(transdate)   // assuming getPeriod expects a Date
        };
      });

      // Normalize amount_1 → amount
      const normalized = convertedData.map(obj => {
        if ('amount_1' in obj) {
          const { amount_1, ...rest } = obj;
          return { ...rest, amount: amount_1 };
        }
        return obj;
      });

      const grouped = groupByKeys(normalized, ['id', 'modelid']);
      console.log('grouped', grouped);
      setData(normalized);
    };

    reader.readAsBinaryString(file);
  };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {data && (
                <div>
                    <h2>Imported Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default FileInput
