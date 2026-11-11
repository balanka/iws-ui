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

export const isLoaded = (modelid: number) => {
  const data = iwsStore.getByModelId(modelid)
  return Array.isArray(data) && data.length > 0
}
//export const isLoaded = (modelid:number)=> iwsStore.getByModelId(modelid)&& iwsStore.getByModelId(modelid).length>0
export const  checkIfStringStartsWith= (str:string, substrs:string[])=> {
  //const x = substrs ?? [].some(substr => str.startsWith(substr))
 // console.log('x', x)
  return substrs ?? [].some(substr => str.startsWith(substr))
}

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

export const toOption = (item: { id: string|bigint; name: string }) => ({
  value: String(item.id),   // force string
  label: `${item.id} ${item.name}`
});

export function Show <T>({ when, fallback = null, children }:ShowProps<T>) {
    return when ? children : fallback;
}
export const logout = (navigate:NavigateFunction) => {
  iwsStore.clear()
  navigate('/dashboard')
  window.location.reload()
}

// FormRow component (same pattern as TransactionMainForm)
export  const FormRow = ({ children, height, style }: { children: React.ReactNode, height:number|undefined, style?:React.CSSProperties|undefined}) => {
  const height_ = height ? height-4 : 10
  const style_ = style ?? { height: height_, paddingTop: 5}
  return <CRow className="g-2 align-items-center mb-2"
               style={style_}>{children}</CRow>
}

export const Label = ({ children, width = 80, bold = false, style }: any) =>{
  const style_ = style ?? { minWidth: width, fontWeight: bold ? 'bold' : 'normal', paddingLeft: 10}
  return <div style={style_}>{children}</div>
}

export function amountFormatter<A> (fn:(p:A)=>number, param:A, locale:string, currency:string) {
  const amount = fn(param)
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: (currency =='GNF' || currency =='XOF' )?0:2,
    maximumFractionDigits: (currency =='GNF' || currency =='XOF' )?0:2,
    useGrouping: true,
  }).format(amount).replace(/\s/g, '.')
  return `${formattedNumber} ${currency}`
}
