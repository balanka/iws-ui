import { Subject } from 'rxjs'
const subject = new Subject()
const initialState = new Map()
let store:Map<string|number, any> = initialState
const iwsStore = {
  init: () => {
    store = new Map([...store.entries()])
    subject.next(store)
  },
  subscribe: (setState:any) => subject.subscribe(setState),
  put:(key:string|number, message:any) => {
    const temp = store instanceof Map ? store.get(key) : new Set()
    const temp1 = temp ?? []
    //console.debug('message', message)
    const temp2 = Array.isArray(temp1) && temp1.length > 0 ? [...temp1] : [...message]
    store.set(key, temp2)
    store = new Map([...store.entries()])
    //console.debug('store', store)
    subject.next(store)
  },
  update: (key:string|number, id:string|number, message:any) => {
    const temp = store.get(key)
    const temp1 = temp ? Array.from(temp) : []
    // @ts-ignore
    const idx = temp1.findIndex((obj) => obj.id === id)
    if (idx !== -1) {
      temp1[idx] = message
      store.set(key, new Set(temp1))
      store = new Map([...store.entries()])
      subject.next(store)
    }
  },
  deleteKey: (key:string|number) => {
    store.delete(key)
    subject.next(store)
  },
  get: (key:string|number) => store.get(key),
  clear: () => {
    store = initialState
    subject.next(store)
    console.debug('storeXXXXX', store)
  },
  initialState,
}
export default iwsStore
