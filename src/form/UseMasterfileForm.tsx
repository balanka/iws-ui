import {useEffect, useCallback, useState, JSX} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ColDef, RowSelectedEvent } from 'ag-grid-community';
import {IMasterfile, IWSModel} from '../Models.ts';
import iwsStore from '../utils/Store';
import useForm from './UseForm.ts';
import { CommonFormHead } from './CommonFormHead';
import { MasterfileGrid } from '../IWSGrid.tsx';
import { Add, Edit, Get } from './CrudController.ts';
import { logout } from '../utils/FormUtils.tsx';
import Login from './Login.tsx';
import { formEnum } from '../utils/FormEnum.tsx';
import type { State } from '../Props.ts';

export default function useMasterfileForm<T extends IWSModel>(
  currentTemplate: T,
  columnDefs: ColDef[],
  url: string
): {
  header: React.ReactNode;
  body: (() => JSX.Element) | null;
  table: React.ReactNode;
  disable: boolean;
  visible: boolean;
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
    language, visible, state, toggle, toggleTable,
    handleLanguageChange, modelid
  }] = useForm();

  const { token, company } = profile;
  let module_ = menu?.get(!selected || selected === '/login' ? '/login' : selected);
  module_ = (module_ === '11111' || module_ === 11111) ? formEnum.LOGIN : module_;
  const body = module_ === formEnum.LOGIN ? Login : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edited, setEdited] = useState(false);
  const [added, setAdded] = useState(false);
  const [disable, setDisable] = useState(true);
  const [current, setCurrent] = useState<T>(currentTemplate);

  // Load initial data from store (cast because store returns IWSModel[])
  const [rowData, setRowData] = useState<T[]>(() =>
    iwsStore.getByModelId(modelid) as T[]
  );

  // Wrapper that updates both state and the store
  const setRowDataAndStore = useCallback((value: React.SetStateAction<T[]>) => {
    if (typeof value === 'function') {
      setRowData(prev => {
        const newData = value(prev);
        newData.forEach(item => iwsStore.set(item));
        return newData;
      });
    } else {
      setRowData(value);
      value.forEach(item => iwsStore.set(item));
    }
  }, []);

  const modifyUrl = url;
  const ctx = `${url}/${modelid}/${company}`;
  const zIndex = 9999;

  // Reload: clear store and fetch fresh data
  const reload = useCallback(() => {
    iwsStore.deleteByModelId(modelid);
    Get(ctx, token ?? 'noToken', modelid, setRowDataAndStore);
  }, [ctx, token, modelid, setRowDataAndStore]);

  // Submit query (manual reload)
  const submitQuery = (event: any) => {
    event.preventDefault();
    Get(ctx, token, modelid, setRowDataAndStore);
    setCurrent(currentTemplate);
  };

  // Toggle edit mode
  const edit = () => {
    if (edited) {
      setEdited(false);
      setDisable(true);
      setAdded(false);
    } else {
      setEdited(true);
      setDisable(false);
      setAdded(true);
    }
  };

  const cancelEdit = () => {
    if (edited) {
      setEdited(false);
      setDisable(true);
      setAdded(true);
    }
  };

  // Submit edit or new record
  const submitEdit = async (event: any) => {
    event.preventDefault();
    if (edited) {
      // Update existing record
      const updatedRecord = await Edit(modifyUrl, token, { ...current }, setCurrent);
      if (updatedRecord) {
        const index = rowData.findIndex(obj => obj?.id === updatedRecord.id);
        if (index !== -1) {
          const newRowData = [...rowData];
          newRowData[index] = updatedRecord as T;
          setRowDataAndStore(newRowData);
          setCurrent(updatedRecord as T);
        }
      }
    } else if (!edited && !disable) {
      // Add new record
      await Add(modifyUrl, token, { ...current }, rowData, setRowDataAndStore, setCurrent);
    }
    setDisable(true);
    setEdited(false);
    setAdded(true);
  };

  const initAdd = () => {
    const newRow = { ...currentTemplate, company: `${company}` };
    setCurrent(newRow);
    setAdded(true);
    setEdited(false);
    setDisable(false);
  };

  const onRowSelected = (event: RowSelectedEvent) => {
    if (event?.data) {
      setCurrent(event.data instanceof Array ? event.data[0] : event.data);
    }
  };

  const handleKeyPress = useCallback((event: any) => {
    switch (event.keyCode) {
      case 112: // F1
        submitEdit(event);
        break;
      case 114: // F3
        reload();
        break;
      default:
        break;
    }
  }, []);

  // Subscribe to store changes (when other components modify the same modelid)
  useEffect(() => {
    const subscription = iwsStore.subscribe(() => {
      const freshData = iwsStore.getByModelId(modelid) as T[];
      setRowData(freshData);
      document.onkeydown = handleKeyPress
      document.addEventListener('onKeyDown', handleKeyPress)
    });
    return () => {subscription.unsubscribe(); document.removeEventListener('onKeyDown', handleKeyPress)}
  }, [modelid]);

  // Initial load if store is empty (run once)
  useEffect(() => {
    if (rowData.length === 0) {
      Get(ctx, token, modelid, setRowDataAndStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ CORRECT JSX syntax – not function calls
  const header = (
    <CommonFormHead
      title={title}
      collapse={state.collapse}
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
      rowData={rowData as unknown as IMasterfile[]} /* cast if MasterfileGrid expects IMasterfile[] */
    />
  );

  return {
    header,
    body,
    table,
    disable,
    visible,
    state,
    rowData,
    setRowData,
    current,
    setCurrent,
    zIndex,
    handleKeyPress
  };
}
