// Add to FormsProps.tsx or create locally
import {InputField} from "../FormsProps.tsx";
import Box from "@mui/material/Box";

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
);
