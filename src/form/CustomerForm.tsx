import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useMemo, useSyncExternalStore } from 'react';

import { initCust, initEmp, initSup, MASTERFILE } from './Menu.tsx';
import { formEnum } from '../utils/FormEnum.tsx';
import { IAccount, IBusinespartner, IContact, IMasterfile, IVat } from '../Models.ts';
import useForm from './useForm.ts';
import { CustomerTabs } from './CustomerTabs.tsx';
import { useCustomerForm } from './useCustomerForm.tsx';
import { customerColumnDefs } from '../ColumnsDefs.ts';
import { styles } from './BasicTreeTableProps.tsx';
import { Get } from './CrudController.ts';
import { MasterfileFormShell } from './MasterfileFormShell.tsx';
import iwsStore from '../utils/Store.tsx';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

const CustomerForm = () => {
  const [{ profile, t, modelid, company }] = useForm();
  const { token, locale, stockAcc, expenseAcc, vat, currency } = profile;

  const initial =
    modelid === formEnum.CUSTOMER ? initCust :
      modelid === formEnum.SUPPLIER ? initSup :
        initEmp;

  const current_: IBusinespartner = {
    ...initial,
    account: stockAcc ?? '',
    oaccount: expenseAcc ?? '',
    vatCode: vat ?? '',
    currency: currency ?? '',
  };

  const height = 28;
  const minHeight = 350;
  const maxHeight = 700;
  const zIndex = 9999;

  const accModelId = formEnum.ACCOUNT;
  const bankModelId = formEnum.BANK;
  const ccyModelId = formEnum.CURRENCY;
  const vatModelId = formEnum.VAT;
  const contactModelId = formEnum.CONTACT;
  const accCtx = `${MASTERFILE.acc}/${accModelId}/${company}`;
  const bankCtx = `${MASTERFILE.masterfile}/${bankModelId}/${company}`;
  const ccyCtx = `${MASTERFILE.masterfile}/${ccyModelId}/${company}`;
  const vatCtx = `${MASTERFILE.vat}/${vatModelId}/${company}`;
  const contactCtx = `${MASTERFILE.contact}/${contactModelId}/${company}`;

  // ── Reactive read of related stores ────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  );

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(accModelId)
    return inner ? (Array.from(inner.values()) as IAccount[]) : []
  }, [snapshot, accModelId])

  const vatData = useMemo<IVat[]>(() => {
    const inner = snapshot.get(vatModelId)
    return inner ? (Array.from(inner.values()) as IVat[]) : []
  }, [snapshot, vatModelId])

  const bankData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(bankModelId)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, bankModelId])

  const ccyData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccyModelId)
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : []
  }, [snapshot, ccyModelId])

  const contactData = useMemo<IContact[]>(() => {
    const inner = snapshot.get(contactModelId)
    return inner ? (Array.from(inner.values()) as IContact[]) : []
  }, [snapshot, contactModelId])

  const [{
    header, body, table, disable, state, rowData, current, setCurrent,
    currentBankAccount, setCurrentBankAccount, setGridApi,
  }] = useCustomerForm(current_, customerColumnDefs(t));

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api);

  // Fire-and-forget fetch for any store that's empty
  useEffect(() => {
    if (!token) return;
    const snap = iwsStore.getRawMap();

    const tryFetch = <T,>(modelId: number, ctx: string) => {
      const inner = snap.get(modelId);
      if (!inner || inner.size === 0) {
        Get(ctx, token, modelId, (() => {}) as React.Dispatch<React.SetStateAction<T[]>>);
      }
    };

    tryFetch<IAccount>(accModelId, accCtx);
    tryFetch<IMasterfile>(bankModelId, bankCtx);
    tryFetch<IMasterfile>(ccyModelId, ccyCtx);
    tryFetch<IVat>(vatModelId, vatCtx);
    tryFetch<IContact>(contactModelId, contactCtx);
  }, [
    token, company,
    accCtx, bankCtx, ccyCtx, vatCtx, contactCtx,
    accModelId, bankModelId, ccyModelId, vatModelId, contactModelId,
  ]);

  const mainForm = (
    <CustomerTabs
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      currentBankAccount={currentBankAccount}
      setCurrentBankAccount={setCurrentBankAccount}
      disable={disable}
      t={t}
      locale={locale ?? 'fr-FR'}
      data={rowData}
      accData={accData}
      bankData={bankData}
      vatData={vatData}
      height={height}
      ccyData={ccyData}
      contactData={contactData}
      zIndex={zIndex - 1}
      onGridReady={onGridReady}
      // @ts-ignore
      stylesx={{
        ...styles,
        height: state.collapseForm ? minHeight : maxHeight,
        padding: 5,
        paddingLeft: 10,
        paddingBottom: 5,
      }}
    />
  );

  return (
    <MasterfileFormShell
      header={header}
      body={body}
      table={table}
      state={state}
      minHeight={minHeight}
      maxHeight={maxHeight}
      paddingTop={15}
      mainForm={mainForm}
    />
  );
};

export default CustomerForm;
