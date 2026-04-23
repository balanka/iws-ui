import React, { FC } from 'react'
import ComboBox from '../ComboBox.tsx'
import {toOption, transactionToOption} from '../../utils/FormUtils.tsx'
import { formEnum } from '../../utils/FormEnum.tsx'
import { getFiltered } from '../../utils/FormUtils.tsx'
import {FinancialsCBoxProps2, FinancialsCBoxProps3} from "../../Props.ts"
import {IFinancials, ILineFinancials, IMasterfile, ITransaction} from "../../Models.ts"

// Base props for all combo boxes
interface BaseComboBoxProps {
  fieldName: string;
  current: any;
  setCurrent: (arg: any) => void;
  data: any[];
  defaultValue?: any;
  zIndex?: number;
  disable?: boolean;
  styles?: React.CSSProperties;
  fontSize?: number;
}
const strcmp = (ax:string|bigint, bx:string|bigint)=> {
  let a = ax.toString()
  let b = bx.toString();
  for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
  if (i === n) return 0;
  return a.charAt(i) > b.charAt(i) ? 1 : -1; //a.charAt(i) > b.charAt(i) ? -1 : 1;
}
const sortById = (a:& {id:string|bigint}, b:& {id:string|bigint}) => strcmp (a.id, b.id)
// Type 1: Standard MasterfileXComboBox (no filter)
interface MasterfileXComboBoxProps extends BaseComboBoxProps {}

export const FormMasterfileXComboBox = ({
                                                                        current,
                                                                        setCurrent,
                                                                        data,
                                                                        fieldName,
                                                                        defaultValue,
                                                                        zIndex = 1000,
                                                                        styles = {},
                                                                        disable = false,
                                                                        fontSize = 12
                                                                      }:MasterfileXComboBoxProps) => {
  const currentAcc = (data ?? [defaultValue]).find((acc) => acc.id === current[fieldName]) ?? defaultValue;

  return (
    <ComboBox<{ value: string | bigint; label: string }>
      style={{
        // minHeight: 20,
        // height: 20,
        minWidth: 100,
        width: '100%',
        color: '#6b7280',
        ...styles
      }}
      fontSize={fontSize}
      disable={disable}
      value={{
        value: currentAcc ? currentAcc.id : '',
        label: currentAcc ? `${currentAcc.id} ${currentAcc.name}` : ''
      }}
      onChange={(value: any, _event: any) => setCurrent({ ...current, [fieldName]: value })}
      values={data.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  );
};

// Type 2: With account filter (MasterfileComboBox)
interface FormMasterfileComboBoxProps extends BaseComboBoxProps {
  accFilter?: string[];
}

export const FormMasterfileComboBox: FC<FormMasterfileComboBoxProps> = ({
                                                                          current,
                                                                          setCurrent,
                                                                          data,
                                                                          fieldName,
                                                                          defaultValue,
                                                                          accFilter = [],
                                                                          zIndex = 1000,
                                                                          styles = {},
                                                                          disable = false,
                                                                          fontSize = 12
                                                                        }) => {
  const currentAcc = (data ?? [defaultValue]).find((acc) => acc.id === current[fieldName]) ?? defaultValue;
  const filtered = (current.modelid === formEnum.ACCOUNT) ? getFiltered(data, accFilter) : data;

  return (
    <ComboBox<{ value: string | bigint; label: string }>
      style={{
        minHeight: 28,
        height: 28,
        minWidth: 100,
        width: '100%',
        color: '#6b7280',
        ...styles
      }}
      fontSize={fontSize}
      disable={disable || current.posted}
      value={{
        value: currentAcc ? currentAcc.id : '',
        label: currentAcc ? `${currentAcc.id} ${currentAcc.name}` : ''
      }}
      onChange={(value: any, _event: any) => setCurrent({ ...current, [fieldName]: value })}
      values={filtered.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  );
};

// Type 3: For line items with separate id and name fields (MasterfileComboBox2)
interface FormMasterfileComboBox2Props {
  current: any;
  setCurrent: (arg: any) => void;
  currentLine: any;
  setCurrentLine: (arg: any) => void;
  data: any[];
  id: string;        // Field name for the id (e.g., "account")
  name: string;      // Field name for the name (e.g., "accountName")
  accFilter?: string[];
  //zIndex?: number;
  styles?: React.CSSProperties;
  fontSize?: number;
  setTransaction: ( transaction:IFinancials
     , setTransaction:(arg:IFinancials)=>void
     , line:ILineFinancials
     , setCurrent:(arg:ILineFinancials)=>void
    ) => void
}

export const FormMasterfileComboBox2 = ({
                                                current,
                                                setCurrent,
                                                currentLine,
                                                setCurrentLine,
                                                data,
                                                id,
                                                name,
                                                accFilter = [],
                                                //zIndex = 1000,
                                                styles = {},
                                                //fontSize = 12,
                                                //disable = false
                                                setTransaction,
                                              }:FormMasterfileComboBox2Props) => {
  const filtered = getFiltered(data, accFilter);
console.log('filtered', filtered)

  let currentLinex: any = { ...currentLine };
  let currentLinex1: { [index: string]: any } = { ...currentLinex };
  return (
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
      disable={current.posted}
      value={{value: currentLinex1[id], label: `${currentLinex1[id]} ${currentLinex1[name]}`}}
      onChange={(value:any,  _event:any) => {
        const currentAccountx = filtered?.find((acc: { id: any }) => acc.id ===value)
        console.log('currentAccountx', currentAccountx)
        const currentLinex = {...currentLine, transid:BigInt(-1), [id]: currentAccountx?currentAccountx.id:'', [name]: currentAccountx ?currentAccountx.name:''}
        console.log('x>>>>>>>>currentLinex', currentLinex)
        setCurrentLine(currentLinex)
        setTransaction(current, setCurrent, currentLinex, setCurrentLine)
      }}

      values={filtered.slice().sort(sortById).map(toOption)}
    />
  )
}

// Type 4: From Transaction ComboBox
interface FromTransactionComboBoxProps {
  current: any;
  transactions: any[];
  currentModule: any;
  onChange: (value: bigint, event: any) => void;
  zIndex?: number;
  styles?: React.CSSProperties;
  fontSize?: number;
  disable?: boolean;
}

export const FromTransactionComboBox: FC<FromTransactionComboBoxProps> = ({
                                                                            current,
                                                                            transactions,
                                                                            currentModule,
                                                                            onChange,
                                                                            zIndex = 99999,
                                                                            styles = {},
                                                                            fontSize = 12,
                                                                            disable = false
                                                                          }) => {
  return (
    <ComboBox<{ value: bigint | string; label: string }>
      style={{
        minHeight: 25,
        height: 25,
        minWidth: 100,
        width: '100%',
        color: '#6b7280',
        ...styles
      }}
      fontSize={fontSize}
      disable={disable || current?.posted}
      value={{
        value: BigInt(currentModule ? currentModule?.id : 0),
        label: currentModule ? currentModule?.name : ''
      }}
      onChange={onChange}
      values={transactions.slice().sort(sortById).map(transactionToOption)}
      zIndex={zIndex}
    />
  )
}
export const MasterfileComboBox:FC<FinancialsCBoxProps2<IFinancials|ITransaction, IMasterfile>> =({current, setCurrent, data
                                                                                             , fieldName, defaultValue,  accFilter = [], zIndex, styles})=>{
  // @ts-ignore
  const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === current[fieldName])??defaultValue
  // @ts-ignore
  const filtered= (current.modelid===formEnum.ACCOUNT)?getFiltered(data, accFilter):data

  return (
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles,  minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
      disable={current.posted}
      value={ {value:currentAcc?currentAcc.id:'', label: currentAcc?`${currentAcc.id} ${currentAcc.name}` :''}}
      onChange={(value:any, _event:any) => setCurrent({...current, [fieldName]: value })}
      // @ts-ignore
      values={filtered.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  )
}
interface MasterfileComboboxProps<T extends Record<string, any>, U extends { id: string; name: string }> {
  current: T;
  setCurrent: (arg: T) => void;
  data: U[];
  fieldName: keyof T;
  defaultValue: U;
  zIndex?: number;
  styles?: React.CSSProperties;
  disable?: boolean;
}

const defaultStyles: React.CSSProperties = {
  minHeight: 25,
  height: 25,
  minWidth: 100,
  width: '100%',
  color: '#6b7280',
  fontSize: 12
};

export const MasterfileXComboBox = <T extends Record<string, any>, U extends { id: string; name: string }>({
                                                                                                             current,
                                                                                                             setCurrent,
                                                                                                             data = [],
                                                                                                             fieldName,
                                                                                                             defaultValue,
                                                                                                             zIndex = 10,
                                                                                                             styles = {},
                                                                                                             disable = false
                                                                                                           }: MasterfileComboboxProps<T, U>): React.JSX.Element => {
  const items = [defaultValue, ...data];
  const currentAcc = items.find((acc) => acc?.id === current[fieldName]) ?? defaultValue;

  return (
    <ComboBox
      style={{ ...defaultStyles, ...styles }}
      disable={disable}
      value={{
        value: currentAcc?.id || '',
        label: currentAcc ? `${currentAcc.id} ${currentAcc.name}` : ''
      }}
      onChange={(value: string) => setCurrent({ ...current, [fieldName]: value })}
      values={data?.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  );
};

export default MasterfileXComboBox;

export const MasterfileComboBox2:FC<FinancialsCBoxProps3<IFinancials, IMasterfile, ILineFinancials>> =({current
                                                                                                  , setCurrent, currentLine, setCurrentLine, data, id, name, defaultValue,  accFilter = []
                                                                                                  , zIndex, styles})=>{
  // console.log('id', id)
  // console.log('name', name)
  console.log('currentLine', currentLine)
  console.log('current', current)
  //console.log('accFilter', accFilter)
  // @ts-ignore
  //const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === currentLine[id])??defaultValue

  const filtered= getFiltered(data, accFilter)
  console.log('filtered', filtered)
  let currentLinex:ILineFinancials = {...currentLine}
  let currentLinex1: {[index: string]:any} ={...currentLinex}
  console.log('currentLinex1', currentLinex1)

  return (
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
      disable={current.posted}
      onChange={(value:any, _event:any) => {
        const currentAccount = (data ?? [defaultValue]).find((acc: { id: any }) => acc.id ===value)
        currentLinex = {...currentLine, [id]: value, [name]: currentAccount ?currentAccount.name:''
          ,  company:`${current.company}`}
        console.log('currentLinex', currentLinex)
        setCurrentLine({...currentLinex})
        const lines:ILineFinancials[] = current?.lines
        console.log('lines', lines);
        const idx = lines.findIndex((obj) => obj.id === currentLinex.id);
        console.log('idx', idx);
        (idx === -1) ? current.lines.push(currentLinex) : (current.lines[idx] = currentLinex)
        console.log('current>>>>>>>', current)
       // const x= {...current, account:currentLinex.account, lines: current.lines.filter((line)=>
       //     (line.account.length==0|| line.oaccount.length==0))}
       // console.log('x>>>>>>>', x)
        setCurrent(current)
      }}
      value={{value:currentLinex1[id], label: `${currentLinex1[id]} ${currentLinex1[name]}`}}
      values={filtered.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  )
}
