import { useEffect, useRef, useState, useSyncExternalStore, useMemo, useCallback, JSX } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ColDef, RowSelectedEvent } from 'ag-grid-community';
import { IMasterfile, IWSModel } from '../Models.ts';
import iwsStore from '../utils/Store';
import useForm from './useForm.ts';
import { CommonFormHead } from './CommonFormHead';
import { MasterfileGrid } from '../IWSGrid.tsx';
import { Add, Edit, Get } from './CrudController.ts';
import { logout } from '../utils/FormUtils.tsx';
import Login from './Login.tsx';
import { formEnum } from '../utils/FormEnum.tsx';
import type { State } from '../Props.ts';

export default function useMasterfileForm<T extends IWSModel>(
  current_: T,
  columnDefs: ColDef[],
  url: string
): {
  header: React.ReactNode;
  body: JSX.Element | null;
  table: React.ReactNode;
  disable: boolean;
  state: State;
  rowData: T[];
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  current: T;
  setCurrent: React.Dispatch<React.SetStateAction<T>>;
  zIndex: number;
  handleKeyPress: (event: any) => void;
} {
  const [{
    profile, menu, selected, t, title,
    language, state, toggle, toggleTable,
    handleLanguageChange, modelid
  }] = useForm();

  const { token, company } = profile;
  let module_ = menu?.get(!selected || selected === '/login' ? '/login' : selected);
  module_ = (module_ === '11111' || module_ === 11111) ? formEnum.LOGIN : module_;
  const body = module_ === formEnum.LOGIN ? <Login /> : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edited, setEdited] = useState(false);
  const [added, setAdded] = useState(false);
  const [disable, setDisable] = useState(true);
  const [current, setCurrent] = useState<T>(current_);

  // Subscribe to the STABLE raw snapshot
  const snapshot = useSyncExternalStore(
    iwsStore.subscribeSimple,
    iwsStore.getRawMap,
    iwsStore.getRawMap
  );

  // Derive per-model array with stable identity
  const rowData = useMemo<T[]>(() => {
    const inner = snapshot.get(modelid);
    return inner ? (Array.from(inner.values()) as T[]) : [];
  }, [snapshot, modelid]);

  const setRowData: React.Dispatch<React.SetStateAction<T[]>> = useCallback((value) => {
    if (typeof value === 'function') {
      const inner = iwsStore.getRawMap().get(modelid);
      const base = inner ? (Array.from(inner.values()) as T[]) : [];
      const next = (value as (p: T[]) => T[])(base);
      next.forEach(item => iwsStore.set(item));
    } else {
      value.forEach(item => iwsStore.set(item));
    }
  }, [modelid]);

  const modifyUrl = url;
  const ctx = `${url}/${modelid}/${company}`;
  const zIndex = 9999;

  const reload = () => {
    iwsStore.deleteByModelId(modelid);
    Get(ctx, token ?? 'noToken', modelid, setRowData);
  };

  const submitQuery = (event: any) => {
    event.preventDefault();
    Get(ctx, token, modelid, setRowData);
    setCurrent(current_);
  };

  const edit = () => {
    if (edited) { setEdited(false); setDisable(true); setAdded(false); }
    else { setEdited(true); setDisable(false); setAdded(true); }
  };

  const cancelEdit = () => {
    if (edited) { setEdited(false); setDisable(true); setAdded(true); }
  };

  const submitEdit = async (event: any) => {
    event.preventDefault();
    if (edited) {
      const updatedRecord = await Edit(modifyUrl, token, { ...current });
      if (updatedRecord) {
        setRowData(prev => {
          const index = prev.findIndex(obj => String(obj?.id) === String(updatedRecord.id));
          if (index === -1) return prev;
          const next = [...prev];
          next[index] = updatedRecord as T;
          return next;
        });
        setCurrent(updatedRecord as T);
      }
    } else if (!edited && !disable) {
      await Add(modifyUrl, token, { ...current }, rowData, setRowData, setCurrent);
    }
    setDisable(true);
    setEdited(false);
    setAdded(true);
  };

  const initAdd = () => {
    const newRow = { ...current_, company: `${company}` };
    setCurrent(newRow);
    setAdded(true);
    setEdited(false);
    setDisable(false);
  };

  const onRowSelected = (event: RowSelectedEvent) => {
    if (!event?.data) return;
    const row = event.data instanceof Array ? event.data[0] : event.data;
    setCurrent(prev => (String(prev?.id) === String(row?.id) ? prev : row));
  };

  const handleKeyPress = (event: any) => {
    switch (event.keyCode) {
      case 112: submitEdit(event); break;
      case 114: reload(); break;
    }
  };

  const handleKeyPressRef = useRef<(e: any) => void>(() => {});
  useEffect(() => { handleKeyPressRef.current = handleKeyPress; });

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyPressRef.current(e);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  useEffect(() => {
    const inner = iwsStore.getRawMap().get(modelid);
    const cached = inner ? Array.from(inner.values()) : [];
    if (cached.length === 0) {
      Get(ctx, token, modelid, setRowData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelid]);

  const header = (
    <CommonFormHead
      title={title}
      collapse={state.collapseForm}
      initAdd={initAdd}
      edited={edited}
      added={added}
      disable={disable}
      edit={edit}
      cancelEdit={cancelEdit}
      submitEdit={submitEdit}
      submitQuery={submitQuery}
      reload={reload}
      toggle={toggle}
      toggleTable={toggleTable}
      logout={logout}
      navigate={navigate}
      language={language}
      handleLanguageChange={handleLanguageChange}
      dispatch={dispatch}
      t={t}
    />
  );

  const table = (
    <MasterfileGrid
      columnDefs={columnDefs}
      onRowSelected={onRowSelected}
      rowData={rowData as unknown as IMasterfile[]}
    />
  );

  return {
    header, body, table, disable, state,
    rowData, setRowData, current, setCurrent,
    zIndex, handleKeyPress
  };
}
