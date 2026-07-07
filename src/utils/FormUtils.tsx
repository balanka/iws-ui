import React, {useState} from 'react'
import {IFinancials, ITransaction} from "../Models.ts";
import {NavigateFunction} from "react-router-dom";
import iwsStore from "./Store.tsx";
import {CRow} from "@coreui/react-pro";


export const getEnvVariable = (key:any, defaultValue = '') => {
  // Check if window._env_ exists and has the key
  return window._env_?.[key] ?? defaultValue;
}

export const getFiltered = <T extends { id: string | number | bigint }>(
  data: T[],
  filter: string[] = []
): T[] => {
  console.log(` filter ${filter}`)
  console.log('data>>>',   data)
  if (filter?.length===0) return data
  const result = data.filter(item =>  filter.some(filterValue => String(item.id).startsWith(filterValue)))
  console.log('result', result)
  return result
};

export const AgGridCheckbox =
    (props: { value: { toString: () => string };
        setValue: (arg0: boolean) => void })=> {
    const boolValue = props.value && props.value.toString() === 'true'
    const [isChecked, setIsChecked] = useState(boolValue)
    const onChanged = () => {
        props.setValue(!isChecked)
        setIsChecked(!isChecked)
    }
    return (
        <div>
            <input type="checkbox" checked={isChecked} onChange={onChanged}/>
        </div>
    )
}
export const isLoaded = (modelid:number)=> iwsStore.getByModelId(modelid)&& iwsStore.getByModelId(modelid).length>0
export const  checkIfStringStartsWith= (str:string, substrs:string[])=> {
  //const x = substrs ?? [].some(substr => str.startsWith(substr))
 // console.log('x', x)
  return substrs ?? [].some(substr => str.startsWith(substr))
}
// export function checkIfStringStartsWith(str:string, substrs:string[]) {
//   return substrs??[].some(substr => str.startsWith(substr))
//   //return [...substrs].some(substr => str.toLowerCase().startsWith(substr.toLowerCase()))
// }

export function uniq <A>(a:A[]):A[] {
  return Array.from(new Set(a));
}

interface ShowProps<T> {
    when: T | undefined | null | false,
    fallback?: React.ReactNode,
    children: React.ReactNode | ((item: T) => React.ReactNode)
}
export const transactionToOption = (m: ITransaction|IFinancials) => {
    return {value: m.id, label:`${m.id} ${m.modelid}`}
}
//export const toOption = (m: {id:string|bigint, name:string}):{ value:string|bigint, label:string } => {
export const toOption = (m: {id:string|bigint, name:string}) => {
    return {value:m?.id, label:`${m?.id} ${m?.name}`}
}

export function Show <T>({ when, fallback = null, children }:ShowProps<T>) {
    return when ? children : fallback;
}
export const logout = (navigate:NavigateFunction) => {
  iwsStore.clear()
  navigate('/dashboard')
  window.location.reload()
}

// FormRow component (same pattern as TransactionMainForm)
export  const FormRow = ({ children, height }: { children: React.ReactNode, height:number }) =>
  <CRow className="g-2 align-items-center mb-2" style={{ height: height - 4 }}>{children}</CRow>

export const Label = ({ children, width = 80, bold = false }: any) =>
  <div style={{ minWidth: width, fontWeight: bold ? 'bold' : 'normal', paddingLeft: 10 }}>{children}</div>

// export const  print = <A extends object>(templateFileName:string, data:A[]):Element => {
//     return (
//         <>
//             <div className="p-2">
//                 <h1>Generate Doc </h1>
//                 <input type="file" onInput={(e:any) => showFile({e: e, templateFileName: templateFileName, data: data})}/>
//                 <p>Click the button above to generate a document </p>
//             </div>
//         </>
//     )
// }

// export function AsyncShow <T>({ when, fallback, children }:ShowProps<T>)  {
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState<T>();
//
//     useEffect(() => {
//         Promise.resolve(when).then(result => {
//             setData(result)
//             setIsLoading(false)
//         });
//     }, [when])
//
//     if (isLoading) return fallback;
//     return data ? children : null;
// };
// const fetchUserData =  (url:string) =>{
//     fetch(url)
// }

// Usage
// @ts-ignore
// <AsyncShow
//     when={fetchUserData('url')}
//     fallback= {<CSpinner/>} //{<Loading />}
// >
//     {  <CFormInput
//         type={ 'text'}
//         id={'id'}
//         className="input-sm"
//         //placeholder={placeholder ? placeholder : fieldName}
//         disabled={false}
//         //style={style_}
//         value={'ss'}
//         //onChange={(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })}
//     />}
// </AsyncShow>
