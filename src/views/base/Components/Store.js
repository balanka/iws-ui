import { Subject } from 'rxjs'
const subject = new Subject()
const initialState = new Map()
let store = initialState
const iwsStore = {
  init: () => {
    store = new Map([...store.entries()])
    subject.next(store)
  },
  subscribe: (setState) => subject.subscribe(setState),
  put: (key, message) => {
    const temp = store instanceof Map ? store.get(key) : new Set()
    const temp1 = temp ? temp : []
    const temp2 = Array.isArray(temp1) && temp1.length > 0 ? [...temp1] : [...message]
    store.set(key, temp2)
    store = new Map([...store.entries()])
    console.debug('store', store)
    subject.next(store)
  },
  update: (key, id, message) => {
    const temp = store.get(key)
    const temp1 = temp ? temp : new Set()
    const idx = temp1.findIndex((obj) => obj.id === id)
    if (idx !== -1) {
      temp1[idx] = message
      store.set(key, [...temp1])
      store = new Map([...store.entries()])
      subject.next(store)
    }
  },
  deleteKey: (key) => {
    store.delete(key)
    subject.next(store)
  },
  get: (key) => store.get(key),
  clear: () => {
    store = initialState
    subject.next(store)
  },
  initialState,
}
export default iwsStore
