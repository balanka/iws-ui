import { useEffect, useMemo, useSyncExternalStore } from 'react';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Get } from './CrudController.ts';
import { initStore, MASTERFILE } from './Menu';
import { StoreTabs } from './StoreTabs.tsx';
import { formEnum } from '../utils/FormEnum';
import { storeColumnDefs } from '../ColumnsDefs.ts';
import { IAccount, IMasterfile, IStore } from '../Models.ts';
import UseMasterfileForm from './useMasterfileForm.tsx';
import useForm from './useForm.ts';
import { MasterfileFormShell } from './MasterfileFormShell.tsx';
import iwsStore from '../utils/Store.tsx';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

const StoreForm = () => {
  const [{ profile, t, company }] = useForm();
  const { token, locale, currency, stockAcc, expenseAcc } = profile;

  const current_: IStore = {
    ...initStore,
    account: stockAcc ?? '',
    oaccount: expenseAcc ?? '',
    stocks: [],
    company,
  };

  const accModelId = formEnum.ACCOUNT;
  const ccModelId = formEnum.COSTCENTER;
  const ccCtx = `${MASTERFILE.masterfile}/${ccModelId}/${company}`;
  const accCtx = `${MASTERFILE.acc}/${accModelId}/${company}`;

  const minHeight = 300;
  const maxHeight = 600;
  const height = 33;

  const colDef: ColDef[] = storeColumnDefs(t);

  // ── Reactive store reads ────────────────────────────────────────────────
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  );

  const ccData = useMemo<IMasterfile[]>(() => {
    const inner = snapshot.get(ccModelId);
    return inner ? (Array.from(inner.values()) as IMasterfile[]) : [];
  }, [snapshot, ccModelId]);

  const accData = useMemo<IAccount[]>(() => {
    const inner = snapshot.get(accModelId);
    return inner ? (Array.from(inner.values()) as IAccount[]) : [];
  }, [snapshot, accModelId]);

  const {
    header, body, table, disable, state,
    current, setCurrent, zIndex,
  } = UseMasterfileForm(current_, colDef, MASTERFILE.store);

  // Fire-and-forget related store fetches — only if empty
  useEffect(() => {
    if (!token) return;
    const snap = iwsStore.getRawMap();

    const tryFetch = <T,>(modelId: number, ctx: string) => {
      const inner = snap.get(modelId);
      if (!inner || inner.size === 0) {
        Get(ctx, token, modelId, (() => {}) as React.Dispatch<React.SetStateAction<T[]>>);
      }
    };

    tryFetch<IMasterfile>(ccModelId, ccCtx);
    tryFetch<IAccount>(accModelId, accCtx);
  }, [token, company, ccCtx, accCtx, ccModelId, accModelId]);

  const mainForm = (
    <StoreTabs
      collapse={state.collapseForm}
      current={current}
      setCurrent={setCurrent}
      disable={disable}
      currency={currency ?? 'EUR'}
      t={t}
      zIndex={zIndex - 1}
      ccData={ccData}
      accData={accData}
      locale={locale ?? 'fr-FR'}
      height={height}
      minMaxHieght={state.collapseForm ? minHeight : maxHeight}
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
      mainForm={mainForm}
    />
  );
};

export default StoreForm;
