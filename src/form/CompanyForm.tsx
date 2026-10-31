import {
  AllCommunityModule,
  ClientSideRowModelModule,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

import { initComp, MASTERFILE } from './Menu.tsx';
import { customerColumnDefs } from '../ColumnsDefs.ts';
import { IAccount, ICompany, IContact, IMasterfile, IVat } from '../Models.ts';
import { CompanyTabs } from './CompanyTabs.tsx';
import useForm from './useForm.ts';
import { Get, Get3 } from './CrudController.ts';
import { styles } from './BasicTreeTableProps.tsx';
import { useCustomerForm } from './useCustomerForm.tsx';
import { formEnum } from '../utils/FormEnum.tsx';
import iwsStore from '../utils/Store.tsx';
import { MasterfileFormShell } from './MasterfileFormShell.tsx';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

const CompanyForm = () => {
  const [{ profile, t, company }] = useForm();
  const { token, locale } = profile;

  const current_: ICompany = initComp;
  const height = 25;
  const minHeight = 450;
  const maxHeight = 700;

  const accModelId = formEnum.ACCOUNT;
  const bankModelId = formEnum.BANK;
  const ccyModelId = formEnum.CURRENCY;
  const vatModelId = formEnum.VAT;
  const contactModelId = formEnum.CONTACT;
  const compModelId = formEnum.COMPANY;

  const accCtx = `${MASTERFILE.acc}/${accModelId}/${company}`;
  const bankCtx = `${MASTERFILE.masterfile}/${bankModelId}/${company}`;
  const ccyCtx = `${MASTERFILE.masterfile}/${ccyModelId}/${company}`;
  const vatCtx = `${MASTERFILE.vat}/${vatModelId}/${company}`;
  const contactCtx = `${MASTERFILE.contact}/${contactModelId}/${company}`;
  const compCtx = `${MASTERFILE.comp}/${compModelId}`;

  // ── ref declared BEFORE the hook so we can pass it in ─────────────────
  const reloadRef = useRef<() => void>(() => {});

  // ── Reactive read of related stores ───────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  );

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(accModelId);
    return inner ? (Array.from(inner.values()) as IAccount[]) : [];
  }, [snapshot, accModelId]);

  const vatData = useMemo<IVat[]>(() => {
    const inner = snapshot.get(vatModelId);
    return inner ? (Array.from(inner.values()) as IVat[]) : [];
  }, [snapshot, vatModelId]);

  const bankData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(bankModelId);
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : [];
  }, [snapshot, bankModelId]);

  const ccyData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccyModelId);
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : [];
  }, [snapshot, ccyModelId]);

  const contactData = useMemo<IContact[]>(() => {
    const inner = snapshot.get(contactModelId);
    return inner ? (Array.from(inner.values()) as IContact[]) : [];
  }, [snapshot, contactModelId]);

  // Pass the REF (not reloadRef.current) so the hook can always read the
  // latest function via .current
  const [{
    header, body, table, disable, state, rowData, setRowData,
    current, setCurrent, currentBankAccount, setCurrentBankAccount, setGridApi,
  }] = useCustomerForm(current_, customerColumnDefs(t), reloadRef);

  // ── reload defined AFTER the hook, using its outputs ──────────────────
  const reload = useCallback(() => {
    iwsStore.deleteByModelId(compModelId);
    Get3(compCtx, token, compModelId, current_, setRowData, setCurrent);
  }, [compCtx, token, compModelId, current_, setRowData, setCurrent]);

  useEffect(() => {
    reloadRef.current = reload;
  }, [reload]);

  // Narrow `current` to the row matching the profile company
  useEffect(() => {
    const inner = snapshot.get(compModelId);
    const list = inner ? (Array.from(inner.values()) as ICompany[]) : [];
    if (list.length === 0) return;
    const filtered = list.filter(x => String(x.id) === String(company));
    setCurrent(filtered.length > 0 ? filtered[0] : current_);
  }, [snapshot, compModelId, company, current_, setCurrent]);

  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api);

  // Fire-and-forget related store fetch
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

  console.log('current', current);

  const mainForm = (
    <CompanyTabs
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
      onGridReady={onGridReady}
      // @ts-expect-error -- legacy, see TODO
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

export default CompanyForm;
