import React, { useRef } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { sortById, sortByName } from '../utils/utils'

const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: 'translate(34px, 20px) scale(1);',
  },
  '&.Mui-focused .MuiInputLabel-outlined': {
    color: 'purple',
  },
  '& .MuiAutocomplete-inputRoot': {
    color: 'purple',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
      height: '30',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'purple',
    },
  },
})

const listBox = (option, props) => (
  <li
    style={{
      fontSize: 10,
      // eslint-disable-next-line react/prop-types
      backgroundColor: props['data-option-index'] % 2 === 0 ? '#DEEFFF' : 'lightblue',
    }}
  >
    {option.id}&nbsp;&nbsp;&nbsp;{option.name}
  </li>
)
export default function ComboBox(props) {
  // eslint-disable-next-line react/prop-types
  const { id, data, onChange, value, placeholder, idCol } = props
  const entryRef = useRef()
  return (
    <StyledAutocomplete
      fullWidth={true}
      id={id}
      /* eslint-disable-next-line react/prop-types */
      options={idCol ? data.sort(sortById) : data.sort(sortByName)}
      value={value}
      //autoSelect={true}
      //blurOnSelect={true}
      onChange={onChange}
      //groupBy={(item) => item.id.slice(0, 3)}
      /* eslint-disable-next-line react/prop-types */
      isOptionEqualToValue={(option, value) => option.id + value.name === value.id + value.name}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.id + ' ' + option.name
      }
      //getOptionLabel={(option) => option?.id ?? option}
      style={{ height: 10 }}
      renderOption={(props, option) => (
        <li
          {...props}
          key={idCol ? option.id : option.name}
          style={{
            fontSize: 10,
            // eslint-disable-next-line react/prop-types
            backgroundColor: props['data-option-index'] % 2 === 0 ? '#DEEFFF' : 'lightblue',
          }}
        >
          {idCol ? `${option.id} ${option.name}` : `${option.name} ${option.id}`}
        </li>
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={placeholder}
            value={value}
            id="combo=text-id"
            fullWidth
            variant="standard"
            size="small"
            inputRef={entryRef}
            onChange={(e) => {
              console.log('e.target.value', e.target.value)
              entryRef.current.value = e.target.value
            }}
          />
        )
      }}
      ListboxProps={{
        props: { ...props },
        style: {
          maxHeight: '350px',
          border: '1px solid lightBlue',
        },
      }}
    />
  )
}
