import React from 'react'
import Select from 'react-select'

type Base = {
    value: string|bigint,
    label: string,
}

type GenericSelectProps<TValue> = {
    style?: React.CSSProperties,
    value: TValue,
    disable?: boolean,
    zIndex?: number,
    values: TValue[],
    onChange: (value: any, event:any) => void,
    fontSize?: number,
};

const ComboBox = <TValue extends Base>({
                                            style,
                                            value,
                                            disable,
                                            zIndex,
                                            values,
                                            onChange,
                                            fontSize
                                        }: GenericSelectProps<TValue>) => {
    //console.log('fontSize', fontSize);
     const zindex = zIndex ?? 99999
    //const [items, setItems] = useState<ValueType<typeof value[0], true>>()
    //console.log(items)
     const customStyles = {
         menu: (base:any) => ({
             ...base, ...style,
             zIndex: zindex,

         }),
         select: (base:any) => ({
             ...base, ...style,
             borderColor: '#6b7280',
             padding: '0 0 0px',
         }),
         container: (base:any ) => ({
             ...base, ...style,
             padding: '0 0 0px',
         }),

         // singleValue: (base) => ({
         //     ...base,
         //     padding: 0,
         //     borderRadius: 2,
         //     opacity: .9,
         //     background: '#CAFFCA',
         //     //color: 'white',
         //     display: 'flex',
         // }),
         //singleValue: (base) => ({ ...base, color: "lightgray" }),

         control: (base:any, state:any):any => {
             return {
                 ...base, ...style,
                 borderColor: state.isFocused ? '#2684FF' : '#ced4da',
                 boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
                 '&:hover': {
                     borderColor: state.isFocused ? '#2684FF' : '#a1a7ae'
                 },
                 //background: '#fff',
                 //borderColor: '#9e9e9e',
                 // '&:hover': {
                 //     outline: 'none',
                 // },
                 //boxShadow: 'none',
                 opacity: state.isDisabled ? .8 : 1.0,
                 paddingBottom: '10px',
                 //borderColor: "#6b7280",
                 borderRadius: 2,
                 //borderRadius: "px",
                 paddingTop: '0px',
                 border: '1px solid gray',
                 color: "#fff",
                 //color: state.isSelected ? "#212529" : "#fff",
                 //backgroundColor: 'lightgray',
                 outline: state.isFocused ? "none" : undefined,
                 // backgroundColor: state.isDisabled ? 'blue' : 'lightGreen',
                 //boxShadow: state.isFocused ? null : null,
             }
         },
         // control: (base, state) => {
             // return {
             //     ...base, ...style,
             //     background: '#fff',
             //     borderColor: '#9e9e9e',
             //     '&:hover': {
             //         outline: 'none',
             //     },
             //     boxShadow: 'none',
             //     paddingBottom: '10px',
             //     //borderColor: "#6b7280",
             //     borderRadius: "px",
             //     paddingTop: '0px',
             //     border: '1px solid gray',
             //     //backgroundColor: 'lightgray',
             //     outline: state.isFocused ? "none" : undefined,
             //     // backgroundColor: state.isDisabled ? 'blue' : 'lightGreen',
             //     //boxShadow: state.isFocused ? null : null,
             // }
         //},
         input: (base:any, state:any):any => ({
             ...base, ...style,
             margin: '0px',
             //boxShadow: 'none',{
             // borderColor: "#6b7280",
             //borderRadius: "0px",
             alignText: 'left',
             outline: state.isFocused ? "none" : undefined,
             //fontSize: style.fontSize ? style.fontSize : 12,
             fontSize: fontSize?? 12,
             opacity: state.isDisabled ? .4 : 1.0,
             //paddingTop: '0px',
             //paddingBottom: '10px'
             // backgroundColor:'white',
             //backgroundColor: state.isDisabled ? 'blue': 'lightGreen',
         }),
         option: (base:any, {data, isDisabled}: {data:any, isDisabled:boolean}):any => {
             return {
                 ...base, ...style,
                 border: '1px solid lightGray',
                 backgroundColor: data.color,
                 //backgroundColor: isDisabled ? 'red' : blue,
                 //color: '#9587ca',
                 cursor: isDisabled ? 'not-allowed' : 'default',
             }
         },
         dropdownIndicator: (base:any):any => ({
             ...base,// all your override styles
             //icon: 'caret-up',
             //icon:'caret-down',
             //backgroundColor: 'lightBlue',
             paddingTop: '0px',
             paddingButtom: '0px',
             margin: '0px',
             //margin: '4px',
             boxShadow: 'none',
             // borderColor: "#6b7280",
             borderRadius: "0px",
         }),
         clearIndicator: (base: any):any => ({
             ...base,
             position: 'relative',
             //position: isDisabled?'absolute':'relative',
             right: -1,
         }),
     }
    // const handleOption = (selections: ValueType<typeof values[0], true>) => {
    //     console.log('selections', selections)
    //     const val = values.find((m) => m.value === selections?.value )//isId?(value.id === e?.id):(value.name === e?.target?.value))
    //     console.log('valX', val)
    //     if (val) {
    //         console.log('val', val)
    //         onChange(val.value)
    //         setItems(selections);
    //     }
    //
    // };
    const onSelectChange = (e:any) => {
         console.log('onSelectChange', e)
        console.log('onSelectChange V', value)
        const val = values.find((m) => m.value === e?.value )//isId?(value.id === e?.id):(value.name === e?.target?.value))
        console.log('valX', val)
        if (val) {
            console.log('val', val)
            onChange(val.value, e)
        }
    }

     return (
        //<Select styles ={{...customStyles,  zIndex: zindex }}
         <Select styles ={{...customStyles }}
                 className="w-1/3 mr-1"
                 //autosize={true}
                 //defaultValue={current?.value ? current : value}
                 defaultValue={value }
                 value ={value}
                 //onChange={handleOption}
                 onChange={onSelectChange}
                 options={values?.map((m, index: number) => {
                     return {...m, color: (index % 2 === 0) ? '#87CEFA' : '#E0FFFF'}
                 })}
                 isDisabled={disable}
                 isClearable={true}
                 isSearchable={true}
                 components={{
                     IndicatorSeparator: () => null,
                     ClearIndicator: () => null,
                     //DropdownIndicator,
                 }}
         />
     )

}
export default ComboBox
