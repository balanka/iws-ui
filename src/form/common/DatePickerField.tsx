import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../../../public/css/datepicker.css';

export const DatePickerField = ({
                           fieldName, current, setCurrent, selected,
                           label, disabled, onChange, zIndex, height = 28 }: {
    fieldName: string, current: any, setCurrent?: (arg: any) => void
  , selected?: Date | null, label: string, disabled: boolean
  , onChange?: (event: any) => void, zIndex?:number, height?:number
}) => (
    <div style={{ minWidth:'60%',  width:'80%',  textAlign:'right', zIndex: zIndex??9998 }}>
       <DatePicker
          disabled={disabled}
          selected={selected ? new Date(selected) : null}
          placeholderText={label}
          className="text-center date-picker-reports"
          dateFormat="dd.MM.yyyy"
          id={fieldName?.concat('id')}
          onChange={onChange ? onChange : (newValue: Date | null) => {
            if (newValue && setCurrent) {
              setCurrent({ ...current, [fieldName]: newValue })
            }
          }}
          //@ts-ignore
          style={{ height: `${height??28 - 3}px`, width: '100%', zIndex: zIndex }}
       />
      </div>
  )
