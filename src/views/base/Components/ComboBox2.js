import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { lightBlue } from '@mui/material/colors'
//import { StyledEngineProvider } from '@mui/material/styles'

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

// const ListboxComponent = React.forwardRef(function ListboxComponent(rest, ref) {
//   return (
//     <ul style={{ minHeight: '500px' }} ref={ref} {...rest}>
//       <ul style={{ minHeight: '450px' }} ref={ref} {...rest} />
//     </ul>
//   )
// })
export default function ComboBox2(props) {
  // eslint-disable-next-line react/prop-types
  const { id, data, onChange, value, placeholder } = props
  return (
    <StyledAutocomplete
      fullWidth={true}
      id={id}
      options={data}
      value={value}
      autoSelect={true}
      blurOnSelect={true}
      onChange={onChange}
      //ListboxComponent={ListboxComponent}
      //groupBy={(item) => item.id.slice(0, 3)}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.id + ' ' + option.name
      }
      //getOptionLabel={(option) => option?.id ?? option}
      //style="background-color: Aqua;"
      style={{ height: 10 }}
      sx={{
        '& .MuiAutocomplete-option': {
          backgroundColor: 'Aqua', //'#000',
        },
      }}
      renderOption={(props, option) => (
        // eslint-disable-next-line react/prop-types
        <li
          {...props}
          /* eslint-disable-next-line react/prop-types  */
          //style={{ backgroundColor: props['data-option-index'] % 2 === 0 ? '#4caf50' : 'Aqua' }}
          /* eslint-disable-next-line react/prop-types */
          style={{
            // eslint-disable-next-line react/prop-types
            backgroundColor: props['data-option-index'] % 2 === 0 ? '#DEEFFF' : 'lightblue',
          }}
        >
          {option.id}&nbsp;&nbsp;&nbsp;{option.name}
        </li>
      )}
      renderInput={(params) => {
        //console.log('params', params)
        return (
          <TextField
            {...params}
            placeholder={placeholder}
            value={value}
            //label="Combo box"
            id="combo=text-id"
            fullWidth
            variant="standard"
            size="small"
          />
        )
      }}
      ListboxProps={{
        style: {
          maxHeight: '450px',
          border: '1px solid lightBlue',
        },
      }}
    />
  )
}
