import { MASTERFILE, MENU } from './Menu';
import iwsStore from '../utils/Store.jsx';
import { formEnum } from '../utils/FormEnum.tsx';
import { groupBy } from '../utils/Utils';
import { HttpMethod, ILoggingContext, IProfile, IUser, IUserRight, IWSModel } from '../Models.ts';
import { NavigateFunction } from 'react-router-dom';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';

// ==================== Configuration ====================
const getEnv = (key: string, defaultValue: string): string =>
  (window as any)._env_?.[key] ?? defaultValue;

const config = {
  apiBase: getEnv('REACT_APP_API_BASE', '/api'),
  apiUrl: getEnv('REACT_WEB_HOST_IP_ADDRESS', 'localhost:8080'),
  apiPort: getEnv('API_PORT', '8080'),
  scheme: getEnv('SCHEME', 'https'),
};

const SERVER_URL = `${config.scheme}://${config.apiUrl}${config.apiBase}`;
console.log('SERVER_URL:', SERVER_URL);

// ==================== Typed API Response ====================
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// ==================== Core API Client ====================
async function apiFetch<T>(url: string, method: HttpMethod, token?: string, body?: unknown
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let data: T;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      data = json.data ?? json; // support both { data: T } and direct T
    } else {
      // handle 204 No Content or plain text responses
      data = (response.status === 204 ? {} : await response.text()) as T;
    }

    if (!response.ok) {
      return {
        data,
        error: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      data: {} as T,
      error: message,
      status: 0,
    };
  }
}

// Helper to throw on error (for backward compatibility with existing error handling)
async function apiRequest<T>(url: string, method: HttpMethod, token?: string, body?: unknown
): Promise<T> {
  const result = await apiFetch<T>(url, method, token, body);
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
}

const buildUrl = (ctx: string) => `${SERVER_URL}${ctx}`;

// ==================== Helper Functions ====================
async function fetchWithAuth<T>(url: string, token: string): Promise<T> {
  console.log(`Fetching ${url}`);
  return apiRequest<T>(url, 'GET', token);
}

async function fetchUserModulesAndMenu(
  companyURL: string,
  token: string,
  moduleURL: string,
  result: Map<number, any>,
  company: string,
  userRights: { key: number; value: string }[],
  t: TFunction,
  profile: IProfile,
  setProfile: (p: IProfile) => void,
  setMenu: (menu: any) => void,
  setModule: (mod: any) => void,
  setRoutes: (routes: any) => void,
  navigate: NavigateFunction
): Promise<void> {
  try {
    const companyData = await fetchWithAuth<any>(companyURL, token);
    const {
      locale = '',
      currency = '',
      incomeStmtAcc = '',
      account: stockAcc = '',
      oaccount: expenseAcc = '',
      salesClearingAcc: revenueAcc = '',
      vatCode: vat = '',
    } = companyData;

    const modules = await fetchWithAuth<any[]>(moduleURL, token);
    iwsStore.put(formEnum.MODULE, modules);

    const moduleIds = modules.filter((m) => result.has(parseInt(m.id)));
    const menuPaths = moduleIds.map((m) => m.path).filter((p: string) => p !== '/');
    const menuMap = MENU(t);                       // now a Record
    const newMenu = new Map(Object.entries(menuMap).filter(([key]) => menuPaths.includes(key)));
    // const menuMap = MENU(t);
    // const newMenu = new Map([...menuMap].filter(([key]) => menuPaths.includes(key)));
    const routesList = modules
      .filter((m) => menuPaths.includes(m.path))
      .map((m) => ({ ...m, component: m.description, element: m.description }));

    const updatedProfile: IProfile = {
      ...profile,
      token,
      company,
      modules: moduleIds.map((m) => parseInt(m.id)),
      rights: userRights,
      locale,
      currency,
      incomeStmtAcc,
      stockAcc,
      expenseAcc,
      revenueAcc,
      vat,
    };

    setProfile(updatedProfile);
    setModule(modules);
    setMenu(newMenu);
    setRoutes(routesList);
  } catch (error) {
    console.error('Failed to fetch user modules/menu', error);
    if (JSON.stringify(error).includes('40') || JSON.stringify(error).includes('50')) {
      navigate('/login');
    }
  }
}

// ==================== Login Flow ====================
async function loginRequest(
  ctx: string,
  credentials: ILoggingContext,
  profile: IProfile,
  setProfile: (p: IProfile) => void,
  companyURL: string,
  moduleURL: string,
  company: string,
  t: TFunction,
  setMenu: (menu: any) => void,
  setModule: (mod: any) => void,
  setRoutes: (routes: any) => void,
  navigate: NavigateFunction
): Promise<IProfile> {
  const url = buildUrl(ctx);
  try {
    const userData = await apiRequest<IUser>(url, 'POST', undefined, credentials);
    const newProfile: IProfile = {
      ...profile,
      token: userData.hash,
      company: userData.company,
      rights: userData.rights,
      locale: userData.locale,
    };
    setProfile(newProfile);

    const rights = userData.rights ?? [];
    const grouped = groupBy(rights, ({ moduleid }: IUserRight) => moduleid);
    const userRights = Array.from(grouped, ([key, values]) => ({
      key,
      value: values.map((e: IUserRight) => e.short).reduce((a, b) => a + b, ''),
    }));

    await fetchUserModulesAndMenu(
      companyURL,
      userData.hash,
      moduleURL,
      grouped,
      company,
      userRights,
      t,
      newProfile,
      setProfile,
      setMenu,
      setModule,
      setRoutes,
      navigate
    );
    return newProfile;
  } catch (error) {
    const err = error as Error;
    console.error('Login failed', err);
    setProfile({ ...profile, error: err.message });
    if (err.message.includes('40') || err.message.includes('50')) {
      navigate('/login');
    }
    throw err;
  }
}

export async function GetListData<T>(ctx: string, token: string, modelId: number, save:boolean =false): Promise<T[]> {
  const url = buildUrl(ctx);
  console.log(' GetListData with url', url);
  const data = await fetchWithAuth<T[]>(url, token);
  if (Array.isArray(data)) {
    if (save) {
       iwsStore.put(modelId, data as IWSModel[])
     }
    return [...data] as T[];
  }
  console.warn(`Expected array for modelId ${modelId}, got`, data);
  return [];
}
// ==================== CRUD Operations ====================
/**
 * Fetch list – updates iwsStore and React state.
 */
async function fetchList<T>(ctx: string, token: string, modelId: number
                            , setRowData: Dispatch<SetStateAction<T[]>>
): Promise<void> {
  const url = buildUrl(ctx);
  try {
    const data = await fetchWithAuth<T[]>(url, token);
    if (Array.isArray(data)) {
      iwsStore.put(modelId, data as IWSModel[]);
      setRowData(data);
    } else {
      console.warn(`Expected array for modelId ${modelId}, got`, data);
    }
  } catch (error) {
    console.error(`Failed to fetch ${ctx}`, error);
    if (JSON.stringify(error).includes('401')) {
      console.warn('Session expired – redirect to login');
    }
  }
}

/**
 * Fetch single record or first item of an array.
 */
async function getSingle<T>(ctx: string, token: string): Promise<T|undefined> {
  const url = buildUrl(ctx);
  try {
    const response = await fetchWithAuth<T>(url, token);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}
/**
 * Fetch single record or first item of an array.
 */
async function fetchSingle<T>(ctx: string, token: string,
  setCurrent: Dispatch<SetStateAction<T>>
): Promise<void> {
  const url = buildUrl(ctx);
  try {
    const response = await fetchWithAuth<T>(url, token);
    if (Array.isArray(response) && response.length > 0) {
      setCurrent(response[0]);
    } else {
      setCurrent(response);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Fetch list and set current to first item.
 */
async function fetchListAndSetCurrent<T>(
  ctx: string,
  token: string,
  modelId: number,
  current: T,
  setRowData: (data: T[]) => void,
  setCurrent: Dispatch<SetStateAction<T>>
): Promise<void> {
  const url = buildUrl(ctx);
  try {
    const data = await fetchWithAuth<T[]>(url, token);
    if (Array.isArray(data) && data.length > 0) {
      iwsStore.put(modelId, data as IWSModel[]);
      setRowData(data);
      setCurrent(data[0]);
    } else {
      setRowData([]);
      setCurrent(current);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Create a new records – returns the created records, updates React state and cache.
 */
async function createRecords<T extends IWSModel>(
  ctx: string,
  token: string,
  records: T[],
  existingData: T[],
  setRowData: Dispatch<SetStateAction<T[]>>
): Promise<T[]> {
  const url = buildUrl(ctx);

  function createHelper<T>(created: T) {
    const modelId = (created as any).modelid;
    if (modelId !== undefined) {
      const existingStore = iwsStore.getByModelId(modelId);
      if (Array.isArray(existingStore)) {
        iwsStore.put(modelId, [...existingStore, created] as IWSModel[]);
      } else {
        iwsStore.put(modelId, [created] as IWSModel[]);
      }
    }
    return created;
  }

  try {
    const created = await apiRequest<T>(url, 'POST', token, records);
    const newList = [...existingData, ...[created]];
    setRowData(newList);
    return newList.map(createHelper);
  } catch (error) {
    console.error('Create failed', error);
    throw error;
  }
}

/**
 * Create a new record – returns the created record, updates React state and cache.
 */
async function createRecord<T extends IWSModel>(
  ctx: string,
  token: string,
  record: T,
  existingData: T[],
  setRowData: Dispatch<SetStateAction<T[]>>,
  setCurrent: Dispatch<SetStateAction<T>>
): Promise<T> {
  const url = buildUrl(ctx);
  try {
    const created = await apiRequest<T>(url, 'POST', token, record);
    setCurrent(created);
    const newList = [...existingData, created];
    setRowData(newList);

    const modelId = (created as any).modelid;
    if (modelId !== undefined) {
      const existingStore = iwsStore.getByModelId(modelId);
      if (Array.isArray(existingStore)) {
        iwsStore.put(modelId, [...existingStore, created] as IWSModel[]);
      } else {
        iwsStore.put(modelId, [created] as IWSModel[]);
      }
    }
    return created;
  } catch (error) {
    console.error('Create failed', error);
    throw error;
  }
}

/**
 * Update an existing record – returns the updated record, updates React state and cache.
 */
async function updateRecord<T extends IWSModel>(
  ctx: string,
  token: string,
  record: T,
  setCurrent: Dispatch<SetStateAction<T>>
): Promise<T> {
  const url = buildUrl(ctx);
  try {
    const updated = await apiRequest<T>(url, 'PUT', token, record);
    const versioned = { ...updated, __version: Date.now() } as T;
    setCurrent(versioned);
    const modelId = (record as any).modelid ?? (updated as any).modelid;
    if (modelId !== undefined) {
      const storeData = iwsStore.getByModelId(modelId);
      if (Array.isArray(storeData)) {
        const updatedList = storeData.map((item: any) =>
          item.id === updated.id ? versioned : item
        );
        iwsStore.put(modelId, updatedList as IWSModel[]);
      } else if (storeData) {
        iwsStore.put(modelId, [versioned] as IWSModel[]);
      }
    }
    return versioned;
  } catch (error) {
    console.error('Update failed', error);
    throw error;
  }
}

/**
 * Copy (duplicate) a record – returns the copied record, updates React state and cache.
 */
async function copyRecord<T extends IWSModel>(
  ctx: string,
  token: string,
  existingData: T[],
  setRowData: Dispatch<SetStateAction<T[]>>,
  setCurrent: Dispatch<SetStateAction<T>>
): Promise<T> {
  const url = buildUrl(ctx);
  try {
    const copied = await fetchWithAuth<T>(url, token);
    setCurrent(copied);
    const newList = [...existingData, copied];
    setRowData(newList);
    const modelId = (copied as any).modelid;
    if (modelId !== undefined) {
      const existingStore = iwsStore.getByModelId(modelId);
      if (Array.isArray(existingStore)) {
        iwsStore.put(modelId, [...existingStore, copied] as IWSModel[]);
      } else {
        iwsStore.put(modelId, [copied] as IWSModel[]);
      }
    }
    return copied;
  } catch (error) {
    console.error('Copy failed', error);
    throw error;
  }
}

/**
 * Helper to toggle edit mode on a row.
 */
function editRow<T>(edited: T, isNew: boolean, setCurrent: Dispatch<SetStateAction<T>>): void {
  setCurrent({ ...edited, editing: !isNew });
}

// ==================== Exported API ====================
export const Get = fetchList;
export const Gets = async <T>(
  ctx: string,
  token: string,
  modelIds: number[],
  setRowData: Dispatch<SetStateAction<T[]>>
): Promise<void> => {
  await Promise.all(
    modelIds.map(modelId => fetchList(ctx, token, modelId, setRowData))
  );
};

export const Login = async (
  navigate: NavigateFunction,
  ctx: string,
  loggingContext: ILoggingContext,
  setProfile: (p: IProfile) => void,
  t: TFunction,
  setMenu: (m: any) => void,
  setModule: (m: any) => void,
  setRoutes: (r: any) => void,
  profile: IProfile
): Promise<void> => {
  const company = loggingContext.company;
  const moduleURL = buildUrl(`${MASTERFILE.module}/${formEnum.MODULE}/${company}`);
  const companyURL = buildUrl(`${MASTERFILE.comp}/${company}/${formEnum.COMPANY}`);
  await loginRequest(
    ctx,
    loggingContext,
    profile,
    setProfile,
    companyURL,
    moduleURL,
    company,
    t,
    setMenu,
    setModule,
    setRoutes,
    navigate
  );
};
export const Get2 = fetchSingle;
export const Get3 = fetchListAndSetCurrent;
export const Add = createRecord;
export const AddList = createRecords
export const Edit = updateRecord;
export const EditRow = editRow;
export const COPY = copyRecord;
export const GET4 = getSingle;
