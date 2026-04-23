import {CSSProperties} from "react"
import {CFormTextarea} from "@coreui/react"

export const TextareaField = ({ fieldName, value, current, setCurrent, rows, disabled, style
                                , placeholder,  onChange}:
                              { fieldName:string, value:any, current:any, setCurrent: (arg:any)=>void, rows?:number|undefined, disabled:boolean
                                , style?: CSSProperties | undefined, placeholder?:string, onChange?:(event:any)=>void }) => {
  return (
    <CFormTextarea
      id={fieldName?.concat('id')}
      name={fieldName}
      disabled={disabled}
      rows={rows ? rows : 1}
      style={style ? style : { height: 30 }}
      placeholder={placeholder ? placeholder : fieldName}
      value={value}
      onChange={onChange?onChange:(event:any) => {
        setCurrent({...current, [fieldName]: event.target.value})
      }}
    />
  )
}
