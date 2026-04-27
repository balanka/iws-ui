import DatePicker from "react-datepicker";

export const DatePickerField = ({ fieldName,  current, setCurrent, selected, label, disabled, onChange }:
                                { fieldName:string,  current:any, setCurrent?:(arg:any)=>void, selected:Date
                                  , label:string, disabled:boolean, onChange?:(event:any)=>void} ) => {
  return (
    <DatePicker
      disabled={disabled}
      selected={selected}
      title={label}
      showTimeInput
      wrapperClassName="custom-datepicker-width"
      // calendarClassName="custom-calendar"
      z-Index ={9999}
      className="text-center date-picker-reports"
      dateFormat="dd.MM.YYYY"
      id={fieldName?.concat('id')}
      onChange={ onChange ? onChange :(newValue:any) => {
        setCurrent?({...current, [fieldName]: newValue}):void(0)
      }}
      customInput={
        <input
          style={{ width: "80%" }}
          onFocus={(e) => e.target.style.border = "2px solid blue"}
        />
      }
    />
  )
}

