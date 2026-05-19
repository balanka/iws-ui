import { InputField} from '../common'
import {TFunction} from "i18next";
import { CFormLabel} from "@coreui/react";

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

export const FromPeriod = ({
                             name, label, value, current, setCurrent, t, height, labelStyle, style}: {
  name: string, label: string, value: any, current: any, setCurrent: (arg: any) => void, height?: number
  , t: TFunction<'translation', undefined>, labelStyle?: React.CSSProperties, style?: React.CSSProperties}) => {
  const defaultLabelStyle: React.CSSProperties = {
    minWidth: 80,
    height: 'auto',
    marginBottom: 0,
    whiteSpace: 'nowrap'
  };
  const finalLabelStyle = { ...defaultLabelStyle, ...labelStyle };
  return (
    <div className="d-flex align-items-center gap-2" style={style}>
      <CFormLabel style={finalLabelStyle}>{t(label)}</CFormLabel>
      <InputField
        fieldName={name}
        current={current}
        setCurrent={setCurrent}
        value={value}
        style={{ flex: 1, height:height, minWidth: 60, ...style }}
      />
    </div>
  )
}
