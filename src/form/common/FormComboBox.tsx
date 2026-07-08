import React, { FC } from 'react'
import ComboBox from '../ComboBox.tsx'
import {toOption, transactionToOption} from '../../utils/FormUtils.tsx'
import { formEnum } from '../../utils/FormEnum.tsx'
import { getFiltered } from '../../utils/FormUtils.tsx'
import {FinancialsCBoxProps2, FinancialsCBoxProps3} from "../../Props.ts"
import {IFinancials, ILineFinancials, IMasterfile, ITransaction} from "../../Models.ts"
//import {CMultiSelect} from "@coreui/react-pro";

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
  height?: number;
}
const strcmp = (ax:string|bigint, bx:string|bigint)=> {
  let a = ax.toString()
  let b = bx.toString();
  for (var i=0,n=Math.max(a?.length, b?.length); i<n && a.charAt(i) === b.charAt(i); ++i);
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
                                                                        fontSize = 11,
                                                                        height=20
                                                                      }:MasterfileXComboBoxProps) => {
  const currentAcc = (data ?? [defaultValue]).find((acc) => acc.id === current[fieldName]) ?? defaultValue;

  return (
    <ComboBox<{ value: string | bigint; label: string }>
      style={{
        // minHeight: 20,
        height:height-6,
        //minWidth: 100,
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
                                                                          height =25,
                                                                          styles = {},
                                                                          disable = false,
                                                                          fontSize = 12
                                                                        }) => {
  const currentAcc = (data ?? [defaultValue]).find((acc) => acc.id === current[fieldName]) ?? defaultValue;
  const filtered = (current.modelid === formEnum.ACCOUNT) ? getFiltered(data, accFilter) : data;

  return (
    <ComboBox<{ value: string | bigint; label: string }>
      style={{
        minHeight: 20,
        height: height,
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
  height?:number,
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
                                                height,
                                                //zIndex = 1000,
                                                styles = {},
                                                //fontSize = 12,
                                                //disable = false
                                                setTransaction,
                                              }:FormMasterfileComboBox2Props) => {
  const filtered = getFiltered(data, accFilter);
  let currentLinex: any = { ...currentLine };
  let currentLinex1: { [index: string]: any } = { ...currentLinex };
  return (
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles, minHeight:22, height:height, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
      disable={current.posted}
      value={{value: currentLinex1[id], label: `${currentLinex1[id]} ${currentLinex1[name]}`}}
      onChange={(value:any,  _event:any) => {
        const currentAccountx = filtered?.find((acc: { id: any }) => acc.id ===value)
        const currentLinex = {...currentLine, [id]: currentAccountx?currentAccountx.id:'', [name]: currentAccountx ?currentAccountx.name:''}
        //setCurrentLine({...currentLinex})
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
  height?:number
}

export const FromTransactionComboBox: FC<FromTransactionComboBoxProps> = ({
                                                                            current,
                                                                            transactions,
                                                                            currentModule,
                                                                            onChange,
                                                                            zIndex = 99999,
                                                                            styles = {},
                                                                            fontSize = 12,
                                                                            height =25,
                                                                            disable = false
                                                                          }) => {
  return (
    <ComboBox<{ value: bigint | string; label: string }>
      style={{
        minHeight: 22,
        height: height,
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
// Option type from CoreUI (you can import it if available, or define it)
//type Option = { value: string | number; label: string }

// export const MasterfileComboBox: FC<FinancialsCBoxProps2<IFinancials | ITransaction, IMasterfile>> = ({
//                                                                                                         current,
//                                                                                                         setCurrent,
//                                                                                                         data,
//                                                                                                         fieldName,
//                                                                                                         //defaultValue,
//                                                                                                         accFilter = [],
//                                                                                                         //zIndex,
//                                                                                                         styles,
//                                                                                                         height,
//                                                                                                       }) => {
//   // 1. Safely access the selected IDs array using type assertion (since fieldName is dynamic)
//   const selectedIds = (current as Record<string, any>)[fieldName] ?? []
//
//   // 2. Filter data if needed
//   const filtered = current.modelid === formEnum.ACCOUNT ? getFiltered(data, accFilter) : data
//
//   // 3. Build options list (Option[])
//   const options: Option[] = filtered.slice().sort(sortById)?.map((item) => ({
//     value: String(item.id),   // convert to string for uniformity
//     label: `${item.id} ${item.name}`,
//   }))
//
//   // 4. Handle change – receives selected Option[] (objects)
//   const handleChange = (selectedOptions: Option[]) => {
//     // Extract just the values (primitive array)
//     const values = selectedOptions?.map((opt) => opt.value)
//     setCurrent({ ...current, [fieldName]: values })
//   }
//
//   return (
//     <CMultiSelect
//       style={{ ...styles, height, minWidth: 100, width: '100%', color: '#6b7280', fontSize: 12 }}
//       disabled={current.posted}
//       value={selectedIds.map(String)}   // value expects array of primitives (strings/numbers)
//       options={options}
//       onChange={handleChange}
//       placeholder="Select..."
//       selectionType="tags"   // or "pill"
//       multiple={false}
//      // zIndex={zIndex}
//     />
//   )
// }
export const MasterfileComboBox:FC<FinancialsCBoxProps2<IFinancials|ITransaction, IMasterfile>> =({current, setCurrent, data
                                                               , fieldName, defaultValue,  accFilter = [], zIndex, styles, height })=>{
  // @ts-ignore
  const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === current[fieldName])??defaultValue
  // @ts-ignore
  //const filtered= (current.modelid===formEnum.ACCOUNT) && accFilter.length>0?getFiltered(data, accFilter):data
  const filtered=  accFilter.length>0?getFiltered(data, accFilter):data

  return (
    // <ComboBox style={inputStyle} value={{ value: BigInt(copyFromModule?.id ?? 0), label: `${BigInt(copyFromModule?.id ?? 0)} ${copyFromModule?.name ?? ''}` }}
    //           onChange={submitCopy} values={copyFromTransaction.slice().sort(sortById).map(transactionToOption)} zIndex={99999} height ={height-5}/>
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles, height:height,  width:'100%', color: '#6b7280', fontSize:12}}
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
  height?:number;
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
                                                                                                             height,
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
      height ={height}
    />
  );
};

export default MasterfileXComboBox;

export const MasterfileComboBox2:FC<FinancialsCBoxProps3<IFinancials, IMasterfile, ILineFinancials>> =({current
                                                                                                  , setCurrent, currentLine, setCurrentLine, data, id, name, defaultValue,  accFilter = []
                                                                                                  , zIndex, styles})=>{

  console.log('currentLine', currentLine)
  console.log('current', current)
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
        setCurrent({...current})
      }}
      value={{value:currentLinex1[id], label: `${currentLinex1[id]} ${currentLinex1[name]}`}}
      values={filtered.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  )
}
