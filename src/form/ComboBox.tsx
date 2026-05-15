import React from 'react'
import Select from 'react-select'

type Base = { value: string|bigint, label: string, }
type GenericSelectProps<T> = {
  style?: React.CSSProperties,
  value: T,
  disable?: boolean,
  zIndex?: number,
  values: T[],
  onChange: (value: any, event:any) => void,
  fontSize?: number,
  height?:number
};

const ComboBox = <T extends Base>({
                                    style,
                                    value,
                                    disable,
                                    zIndex,
                                    values,
                                    onChange,
                                    fontSize,
                                    height
                                  }: GenericSelectProps<T>) => {
  const zindex = zIndex ?? 99999

  const customStyles = {
    menu: (base: any) => ({
      ...base, ...style, height:height,
      zIndex: zindex,
    }),
    select: (base: any) => ({
      ...base, ...style,
      borderColor: '#6b7280',
    }),
    container: (base: any) => ({
      ...base, ...style,
    }),

    control: (base: any, state: any): any => {
      return {
        ...base, ...style,
        borderColor: state.isFocused ? '#2684FF' : '#ced4da',
        boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
        '&:hover': {
          borderColor: state.isFocused ? '#2684FF' : '#a1a7ae'
        },
        opacity: state.isDisabled ? .8 : 1.0,
        borderRadius: 2,
        border: '1px solid gray',
        outline: state.isFocused ? "none" : undefined,
        minHeight: '28px',
        //height: '28px',
        display: 'flex',
        alignItems: 'center',
      }
    },

    input: (base: any, state: any): any => ({
      ...base, ...style,  height:height,
      margin: '0px',
      outline: state.isFocused ? "none" : undefined,
      fontSize: fontSize ?? 12,
      opacity: state.isDisabled ? .4 : 1.0,
      padding: '0px',
      lineHeight: '18px',
    }),

    valueContainer: (base: any) => ({
      ...base,
      padding: '0px 0px 0px 8px',
      display: 'flex',
      alignItems: 'center',
      height: '28px',
      flex: '1 1 auto',
    }),

    singleValue: (base: any) => ({
      ...base,
      margin: '0px',
      padding: '0px',
      lineHeight: '28px',
      position: 'relative',
      top: 'auto',
      transform: 'none',
    }),

    placeholder: (base: any) => ({
      ...base,
      lineHeight: '28px',
      position: 'relative',
      top: 'auto',
      transform: 'none',
    }),

    dropdownIndicator: (base: any): any => ({
      ...base,
      padding: '0px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '28px',
      width: '28px',
      boxSizing: 'border-box',
    }),

    indicatorSeparator: (base: any): any => ({
      ...base,
      display: 'none',
    }),

    // Fixed option styling with centered text
    option: (base: any, { data, isDisabled }: { data: any, isDisabled: boolean }): any => {
      return {
        ...base, ...style,
        border: '1px solid lightGray',
        backgroundColor: data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        lineHeight: '1.2',
      }
    },
  }

  const onSelectChange = (e: any) => {
    const val = values.find((m) => m.value === e?.value)
    console.log('value ZZZZZZZZZZZ$e', val)
    if (val) {
      onChange(val.value, val.label)
    }
  }
  return (
    <Select
      styles={customStyles}
      defaultValue={value}
      value={value}
      onChange={onSelectChange}
      options={values?.map((m, index: number) => {
        return { ...m, color: (index % 2 === 0) ? '#87CEFA' : '#E0FFFF' }
      })}
      isDisabled={disable}
      isClearable={false}
      isSearchable={true}
      components={{
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
      }}
    />
  )
}

export default ComboBox
