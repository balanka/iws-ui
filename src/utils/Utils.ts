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
export const isArrayAndNotEmpty = (array:any) => Array.isArray(array) && array.length>0

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
    let a = ax.toString()
    let b = bx.toString();
    for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? 1 : -1; //a.charAt(i) > b.charAt(i) ? -1 : 1;
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

// var dateFormat = () => {
//   var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
//       timezone =
//           /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
//       timezoneClip = /[^-+\dA-Z]/g,
//       pad = function (val, len) {
//         val = String(val)
//         len = len || 2
//         while (val.length < len) val = '0' + val
//         return val
//       }
//
//   // Regexes and supporting functions are cached through closure
//   return function (date, mask, utc) {
//     var dF = dateFormat
//     // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
//     if (
//         arguments.length === 1 &&
//         Object.prototype.toString.call(date) === '[object String]' &&
//         !/\d/.test(date)
//     ) {
//       mask = date
//       date = undefined
//     }
//     //console.log('date_', date)
//     // Passing date through Date applies Date.parse, if necessary
//     date = date ? new Date(date) : new Date()
//     if (isNaN(date)) throw SyntaxError('invalid date')
//
//     mask = String(dF.masks[mask] || mask || dF.masks['default'])
//
//     // Allow setting the utc argument via the mask
//     if (mask.slice(0, 4) === 'UTC:') {
//       mask = mask.slice(4)
//       utc = true
//     }
//
//     var _ = utc ? 'getUTC' : 'get',
//         d = date[_ + 'Date'](),
//         D = date[_ + 'Day'](),
//         m = date[_ + 'Month'](),
//         y = date[_ + 'FullYear'](),
//         H = date[_ + 'Hours'](),
//         M = date[_ + 'Minutes'](),
//         s = date[_ + 'Seconds'](),
//         L = date[_ + 'Milliseconds'](),
//         o = utc ? 0 : date.getTimezoneOffset(),
//         flags = {
//           d: d,
//           dd: pad(d),
//           ddd: dF.i18n.dayNames[D],
//           dddd: dF.i18n.dayNames[D + 7],
//           m: m + 1,
//           mm: pad(m + 1),
//           mmm: dF.i18n.monthNames[m],
//           mmmm: dF.i18n.monthNames[m + 12],
//           yy: String(y).slice(2),
//           yyyy: y,
//           h: H % 12 || 12,
//           hh: pad(H % 12 || 12),
//           H: H,
//           HH: pad(H),
//           M: M,
//           MM: pad(M),
//           s: s,
//           ss: pad(s),
//           l: pad(L, 3),
//           L: pad(L > 99 ? Math.round(L / 10) : L),
//           t: H < 12 ? 'a' : 'p',
//           tt: H < 12 ? 'am' : 'pm',
//           T: H < 12 ? 'A' : 'P',
//           TT: H < 12 ? 'AM' : 'PM',
//           Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
//           o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
//           S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : ((d % 100) - (d % 10) !== 10) * (d % 10)],
//         }
//
//     return mask.replace(token, function ($0) {
//       return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
//     })
//   }
// }

// Some common format strings
// dateFormat.masks = {
//   default: 'ddd mmm dd yyyy HH:MM:ss',
//   shortDate: 'm/d/yy',
//   mediumDate: 'mmm d, yyyy',
//   longDate: 'mmmm d, yyyy',
//   fullDate: 'dddd, mmmm d, yyyy',
//   shortTime: 'h:MM TT',
//   mediumTime: 'h:MM:ss TT',
//   longTime: 'h:MM:ss TT Z',
//   isoDate: 'yyyy-mm-dd',
//   isoTime: 'HH:MM:ss',
//   isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
//   isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
// }

// Internationalization strings
// dateFormat.i18n = {
//   dayNames: [
//     'Sun',
//     'Mon',
//     'Tue',
//     'Wed',
//     'Thu',
//     'Fri',
//     'Sat',
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ],
//   monthNames: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ],
// }

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
//export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
//    const map = new Map<K, Array<V>>();
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
const capitalize = (s:any):string => {
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
export {
  //dateFormat,
  dateRenderer,
  capitalize,
  currencyFormatDE,
  currencyAmountFormatDE,
  currencyFormatUS,
  sortById,
  sortByName,
  groupBy,
}



