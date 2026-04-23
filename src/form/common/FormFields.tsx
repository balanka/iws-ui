// Add to FormsProps.tsx or create locally
import {FieldLabel, InputField} from '../common'
import Box from "@mui/material/Box";
import {TFunction} from "i18next";
import {CCol} from "@coreui/react";

export const BooleanField = ({ fieldName, current, setCurrent, label, disabled, checked, style }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', ...style }}>
    <input
      type="checkbox"
      id={fieldName}
      checked={checked}
      disabled={disabled}
      onChange={(e) => setCurrent({ ...current, [fieldName]: e.target.checked })}
    />
    <label htmlFor={fieldName} style={{ marginLeft: 8 }}>{label}</label>
  </div>
)

export const InputNumberField = ({ fieldName, current, setCurrent, value, disabled, style }: any) => (
  <InputField fieldName={fieldName} current={current} setCurrent={setCurrent} value={value} disabled={disabled} style={{ ...style, textAlign: 'right' }} />
)

export const CurrencyField = ({ fieldName, current, setCurrent, value, disabled, style, currency }: any) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
    <InputNumberField fieldName={fieldName} current={current} setCurrent={setCurrent} value={value} disabled={disabled} style={style} />
    <span style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{currency}</span>
  </Box>
)
export const FromPeriod = ({ name, label, value, current, setCurrent, t, labelStyle, style }:
                    { name:string, label:string, value:any, current:any, setCurrent:(arg:any)=>void, t:TFunction<'translation', undefined>
                      , labelStyle:any, style:any }) => {
  console.log('name', name)
  console.log('value', value )
  return (
    <>
      <CCol sm="0.5" style={labelStyle}>
        <FieldLabel title={t(label)} />
      </CCol>
      <CCol sm="1" style={{ paddingLeft: 10 }}>
        <InputField
          fieldName={name}
          current={current}
          setCurrent={setCurrent}
          value={value}
          style={style ? style : { height: 30, padding: 1, textAlign: 'right' }}
        />
      </CCol>
    </>
  )
}

