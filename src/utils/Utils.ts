import { ValueFormatterParams} from "ag-grid-community";

export const getDateFromString = (param:string)=>{
    const unixTimeZero:Date = new Date(param)
    const month = unixTimeZero.getMonth() + 1
    const day = unixTimeZero.getDate()
    const year =unixTimeZero.getFullYear()
    return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`
}


export const sanitizeForId = (label: string) => {
    return label
        .toLowerCase()
        .replace(/[^\w\s]|(\s+)/g, (_match: string, group1: string) =>
            group1 ? "-" : ""
        )
}
export const roundTo = (num: number, places: number):number => {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
}
export const  formatumber2Digits = (num:number, locale:string, digits:number) =>{
    // console.log('num', num)
    // console.log('locale', locale)
    // console.log('digits', digits)
    return    num?.toLocaleString(locale, { minimumFractionDigits: digits })
 //return    num?num?.toLocaleString(locale, { minimumFractionDigits: digits }):0.0.toLocaleString(locale, { minimumFractionDigits: digits })
}
export const isArrayAndNotEmpty = (array:any) => Array.isArray(array) && array?.length>0

// const isNotArrayOrEmpty = (array:any) => !Array.isArray(array) || !array.length
// export const fetchDataX2 =
//     <A>(ctx:string, data:A[], modelId:number,  token:string, setFn: ([]) => void) =>
//     isNotArrayOrEmpty(data) && ctx  && Get(ctx, token, modelId, setFn)

export const numberCellFormatter =(params: ValueFormatterParams)=>
   Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
const strcmp = (ax:string|bigint, bx:string|bigint)=> {
    let a = ax?.toString()
    let b = bx?.toString();
    for (var i=0,n=Math.max(a?a.length:0, b?b.length:0); i<n && a?.charAt(i) === b?.charAt(i); ++i);
    if (i === n) return 0;
    return a?.charAt(i) > b?.charAt(i) ? 1 : -1; //a.charAt(i) > b.charAt(i) ? -1 : 1;
}
// const sortById = (a:& {id:string|bigint, name:string}, b:& {id:string|bigint, name:string}) => strcmp(a.id, b.id) //(a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
// const sortByName = (a:& {id:string|bigint, name:string}, b:& {id:string|bigint, name:string}) => strcmp(a.name,b.name) //(a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

// const sortById = (a:& {id:string|bigint}, b:& {id:string|bigint}) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
// const sortByName = (a:& {name:string}, b:& {name:string}) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

const sortById = (a:& {id:string|bigint}, b:& {id:string|bigint}) => strcmp (a.id, b.id) // .toLocaleString().localeCompare(b.id.toLocaleString()) //(a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
const sortByName = (a:& {name:string}, b:& {name:string}) => strcmp (a.name, b.name) // a.name.toLocaleString().localeCompare(b.name.toLocaleString()) //(a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

// const sortById = (a:{id:string, name:string}, b:{id:string, name:string}) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
// const sortByName = (a:{id:string, name:string}, b:{id:string, name:string}) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

//const sortById = (a:{id:string|bigint, name:string}, b:{id:string|bigint, name:string}) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
//const sortByName = (a:{id:string|bigint, name:string}, b:{id:string|bigint, name:string}) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
// Executes functions from right-to-left
//type A = <T> (arg:T)=>T

const composeT = <T>(fn1: (a: T) => T, ...fns: Array<(a: T) => T>) =>
  fns.reduce((prevFn:(a:T)=>T, nextFn:(a:T)=>T) => value => prevFn(nextFn(value)), fn1);

const compose = <T>(...fns:((arg:T)=>T)[]) => (initialValue:T) =>
   fns.reduceRight((acc:T, fn:(arg:T)=>T) => fn(acc), initialValue);

const double =  (x:number) => x * 2;
const increment = (x:number) => x + 1;
const stringify = (x:number) => x//`Result: ${x}`;

const processTNumber = composeT(stringify, increment, double);
const processNumber = compose(stringify, increment, double);
console.log(processTNumber(10)) // "Result: 21"
console.log(processNumber(10)) // "Result: 21"

//type Identity<T> = T extends object ? { [K in keyof T]: T[K] } : T
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
const  groupBy = <A, K>(list:A[], keyGetter:(arg: A) =>K):Map<K, A[]> => {
    const map = new Map<K, A[]>();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map;
}
const capitalize1rst = (s:any):string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function currencyFormatUS(num:any):string {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function currencyFormatDE(num:any):string {
  return (
      num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          //.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €'
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  ) // use . as a separator
}
function currencyAmountFormatDE(num:any, symbol:any):string {
  return (
      num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          //.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €'
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          .concat(' ')
          .concat(symbol)
  ) // use . as a separator
}
const dateRenderer = (date: { value: string | number | Date; }) => {
    return date.value ? (new Date(date.value)).toLocaleDateString('de-DE', {timeZone: 'UTC'}) : '';
}
function getMonthName(monthNumber: number, locale: string = 'fr-FR'): string {
  // Create a date object (Year and Day can be anything)
  // monthNumber is 0-indexed (0 = Jan, 1 = Feb, etc.)
  const date = new Date(2000, monthNumber, 1);
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}
function ordinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function formatDateWithOrdinal(date: Date, locale: string = 'fr-FR'): string {
  const month = date.toLocaleString(locale, { month: 'long' });
  const day = date.getDate();
  return `${ordinalSuffix(day)} ${month}`;
}
function getLocalizedOrdinal(day: number, locale: string): string {
  // 1. Get the plural category for this number in this locale
  const pluralRules = new Intl.PluralRules(locale, { type: 'ordinal' });
  const category = pluralRules.select(day); // 'one', 'two', 'few', 'other', etc.

  // 2. Map category → suffix (locale‑specific)
  const suffixMap: Record<string, Record<string, string>> = {
    en: { one: 'st', two: 'nd', few: 'rd', other: 'th' },
    fr: { one: 'er', other: 'e' }, // 1er, 2e, 3e...
    de: { one: '.', other: '.' },  // 1., 2., 3.
    es: { one: '.º', other: '.º' }, // 1.º, 2.º, 3.º
    // add more as needed
  };

  const localeSuffixes = suffixMap[locale.split('-')[0]] || suffixMap.en;
  const suffix = localeSuffixes[category] || localeSuffixes.other || '';

  return `${day}${suffix}`;
}

export {
  //dateFormat,
  dateRenderer,
  capitalize1rst,
  currencyFormatDE,
  currencyAmountFormatDE,
  currencyFormatUS,
  sortById,
  sortByName,
  groupBy,
  getMonthName,
  ordinalSuffix,
  formatDateWithOrdinal,
  getLocalizedOrdinal
}



