import iwsStore from '../utils/Store';
import { IAccount, IVat } from '../Models.ts';
import { Get } from './CrudController.ts';
import { isLoaded } from '../utils/FormUtils.tsx';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { vatColumnDefs } from '../ColumnsDefs.ts';
import { ColDef } from 'ag-grid-community';
import useForm from './useForm.ts';
import { initVat, MASTERFILE } from './Menu.tsx';
import { formEnum } from '../utils/FormEnum.tsx';
import useMasterfileForm from './useMasterfileForm.tsx';
import { VatMainForm } from './VatMainForm.tsx';
import { MasterfileFormShell } from './MasterfileFormShell.tsx';

const VatForm = () => {
  const [{ profile, t, company }] = useForm();
  const { token } = profile;

  const accModelId = formEnum.ACCOUNT;
  const accCtx = `${MASTERFILE.acc}/${accModelId}/${company}`;

  // Reactive read of the account store — updates whenever iwsStore emits
  const accSnapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  );

  const accData = useMemo<IAccount[]>(() => {
    const inner = accSnapshot.get(accModelId);
    return inner ? (Array.from(inner.values()) as IAccount[]) : [];
  }, [accSnapshot, accModelId]);

  // Kick off account load once per company/token if store is empty
  useEffect(() => {
    if (!token) return;
    if (isLoaded(accModelId)) return;

    // Use a no-op setter — the store is the source of truth now
    Get(accCtx, token, accModelId, () => { /* no-op */ });
  }, [token, company, accModelId, accCtx]);

  const colDef: ColDef[] = vatColumnDefs(t);
  const current_: IVat = { ...initVat, company };

  const {
    header, body, table, disable, state,
    current, setCurrent, zIndex
  } = useMasterfileForm(current_, colDef, MASTERFILE.vat);

  const setCurrentRaw = setCurrent as (v: IVat) => void;

  const mainForm = (
    <VatMainForm
      current={current}
      setCurrent={setCurrentRaw}
      accData={accData}
      t={t}
      disable={disable}
      height={28}
      zIndex={zIndex}
    />
  );

  return (
    <MasterfileFormShell
      header={header}
      body={body}
      table={table}
      state={state}
      minHeight={300}
      maxHeight={600}
      mainForm={mainForm}
    />
  );
};

export default VatForm;
