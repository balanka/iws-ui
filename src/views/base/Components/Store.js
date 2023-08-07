import {Subject} from 'rxjs';

const subject = new Subject();
const initialState = new Map();


let store = initialState;
const iwsStore = {
  init: () => {
    store = new Map([...store.entries()]);
    subject.next(store);
  },
  subscribe: setState => subject.subscribe(setState),
  put: (key, message) => {
    console.debug('key', key);
    console.debug('message', message);
    console.debug('store', store);
    console.debug('instanceof', (store instanceof Map));
    const temp = (store instanceof Map) ? store.get(key) : new Set();
    console.debug('temp', temp);
    const temp1 = temp ? temp : [];
    console.debug('temp1', temp1);
    console.debug('Array.isArray(temp1)', Array.isArray(temp1));
    console.debug('spread (temp1)', [...temp1, ...message]);
    const temp2 = Array.isArray(temp1) && temp1.length > 0 ? [...temp1] : [...message];
    console.debug('temp2', temp2);
     store.set(key, temp2);
    store = new Map([...store.entries()]);
    console.debug('store', store);
    subject.next(store);
  },
  update: (key, id, message) => {
    console.debug('key', key);
    console.debug('id', id);
    console.debug('message', message);
    const temp = store.get(key);
    console.debug('temp', temp);
    const temp1 = temp ? temp : new Set();
    console.debug('temp1', temp1);
    const idx = temp1.findIndex(obj => obj.id === id);
    if (idx !== -1) {
      temp1[idx] = message;
      store.set(key, [...temp1]);
      store = new Map([...store.entries()]);
      subject.next(store);
    }
  },
  deleteKey: (key) => {
    store.delete(key)
    subject.next(store);
  },
  get:(key)=>store.get(key),
  clear: () => {
    store = initialState;
    subject.next(store);
  },
  initialState
};
export default iwsStore;
