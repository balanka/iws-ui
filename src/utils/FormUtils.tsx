import React, {useState} from 'react'
import {IFinancials, ITransaction} from "../Models.ts";

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

interface ShowProps<T> {
    when: T | undefined | null | false,
    fallback?: React.ReactNode,
    children: React.ReactNode | ((item: T) => React.ReactNode)
}
export const transactionToOption = (m: ITransaction|IFinancials) => {
    return {value: m.id, label:`${m.id} ${m.modelid}`}
}

export const toOption = (m: {id:string|bigint, name:string}):{ value:string|bigint, label:string } => {
    return {value:m.id, label:`${m.id} ${m.name}`}
}

export function Show <T>({ when, fallback = null, children }:ShowProps<T>) {
    return when ? children : fallback;
}
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