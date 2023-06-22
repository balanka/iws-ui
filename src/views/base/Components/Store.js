import { Subject } from 'rxjs';

const subject = new Subject();
const initialState = new Map();


let store = initialState;
const iwsStore = {
    init: ()=> {
        console.debug('store',store);
        store = new Map([...store.entries()]);
        subject.next(store);
    },
    subscribe: setState => subject.subscribe(setState),
    put: (key, message) => {
        console.debug('key',key);
        console.debug('message',message);
        console.debug('store',store);
        console.debug('instanceof',(store instanceof Map));
        const temp = (store instanceof Map)?store.get(key):[];
        console.debug('temp',temp);
        const temp1 =temp?temp:[];
        console.debug('temp1',temp1);
        console.debug('Array.isArray(temp1)',Array.isArray(temp1));
        console.debug('spread (temp1)',[...temp1, ...message]);
        const temp2 = Array.isArray(temp1)&&temp1.length>0?[...temp1]:[...message];
        console.debug('temp2',temp2);
        const cpy = store.set(key, temp2);
        store = new Map([...store.entries()]);
        console.debug('store',store);
        subject.next(store);
    },
    clear: () =>{
        store = initialState;
        subject.next(store);
    },
    initialState
};
export default iwsStore;
