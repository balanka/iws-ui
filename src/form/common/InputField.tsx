import {CSSProperties} from "react"
import {CFormInput} from "@coreui/react"

export const InputField = ({ fieldName, type, current, setCurrent, value, disabled, style, onChange, placeholder }:
                           { fieldName:string, type?:'text', current:any, setCurrent:(arg:any)=>void, value:any
                             , disabled?:boolean, style?: CSSProperties | undefined, onChange?:(event:any)=>void, placeholder?:string}) => {
  const style_ = style ? style : { height: 20 }
  //onChange=(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })
  return (
    <CFormInput
      type={type ? type : 'text'}
      id={fieldName?.concat('id')}
      className="input-sm"
      disabled={disabled}
      style={style_}
      value={value}
      placeholder={placeholder?? fieldName}
      onChange={onChange?onChange:(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })}
    />
  )
}
