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
  //const zindex = zIndex ?? 99999

  const customStyles = {
    // Only apply user styles to the outermost container (safe)
    container: (base: any) => ({
      ...base,
      ...style, // This is the only place where ...style is relatively safe
    }),

    // Control: DO NOT spread ...style here
    control: (base: any, state: any): any => ({
      ...base,
      borderColor: state.isFocused ? '#2684FF' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#2684FF' : '#a1a7ae'
      },
      opacity: state.isDisabled ? 0.8 : 1.0,
      borderRadius: 2,
      border: '1px solid gray',
      outline: state.isFocused ? "none" : undefined,
      minHeight: height || 28,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff', // Set a safe default
    }),

    // ValueContainer: DO NOT spread ...style
    valueContainer: (base: any) => ({
      ...base,
      padding: '0px 0px 0px 8px',
      display: 'flex',
      alignItems: 'center',
      height: height || 28,
      flex: '1 1 auto',
      position: 'relative', // Essential for singleValue absolute positioning
    }),

    // singleValue: RESTORE absolute positioning
    singleValue: (base: any) => ({
      ...base,
      margin: '0px',
      padding: '0px',
      lineHeight: `${height || 28}px`,
      // CRITICAL: Keep absolute positioning over the input
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '8px', // Aligns with the padding of valueContainer
      right: '28px', // Prevents overlapping the dropdown indicator
      color: '#333', // Strong, visible color
      backgroundColor: 'transparent',
      pointerEvents: 'none', // Allows clicks to pass through to the input
    }),

    // input: MUST be transparent
    input: (base: any, state: any): any => ({
      ...base, // Keep react-select's base
      margin: '0px',
      padding: '0px',
      fontSize: fontSize ?? 12,
      opacity: state.isDisabled ? 0.4 : 1.0,
      lineHeight: `${height || 28}px`,
      // CRITICAL: Transparent background so the label is visible behind it
      background: 'transparent',
      color: '#333', // Text you type will be this color
      outline: 'none',
      // Make the input take available space without breaking flex
      flex: '1 1 auto',
      minWidth: '50px',
    }),

    // Placeholder: Keep absolute positioning too
    placeholder: (base: any) => ({
      ...base,
      lineHeight: `${height || 28}px`,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '8px',
      pointerEvents: 'none',
      color: '#999',
    }),

    // Dropdown indicator: DO NOT spread ...style
    dropdownIndicator: (base: any): any => ({
      ...base,
      padding: '0px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: height || 28,
      width: 28,
      boxSizing: 'border-box',
      color: '#6b7280',
    }),

    indicatorSeparator: (base: any): any => ({
      ...base,
      display: 'none',
    }),

    // Menu: keep zIndex, but DO NOT spread ...style
    menu: (base: any) => ({
      ...base,
      height: height,
      zIndex: zIndex ?? 99999,
      backgroundColor: '#fff',
    }),

    // Option: DO NOT spread ...style
    option: (base: any, { data, isDisabled }: { data: any, isDisabled: boolean }): any => ({
      ...base,
      border: '1px solid lightGray',
      backgroundColor: data.color || '#fff',
      cursor: isDisabled ? 'not-allowed' : 'default',
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      lineHeight: '1.2',
      color: '#000', // Ensure text is readable
    }),
  };


  const onSelectChange = (e: any) => {
    const val = values.find((m) => m.value === e?.value)
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
