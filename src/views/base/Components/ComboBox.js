import React, { useRef } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { sortById, sortByName } from '../utils/utils'

const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (props) => props !== 'primary',
})((props) => {
  let bgColor = props.disabled ? '#e3e7e7' : '#ffffff'
  return {
    '& .MuiAutocomplete-inputRoot': {
      backgroundColor: bgColor,
      borderRadius: 6,
      border: 'none',
      paddingLeft: 10,
    },
  }
})

export default function ComboBox(props) {
  // eslint-disable-next-line react/prop-types
  const { id, data, onChange, value, placeholder, idCol, disable, height } = props
  //console.log('props', props)
  const entryRef = useRef()
  return (
    <StyledAutocomplete
      fullWidth={true}
      disableClearable
      id={id}
      disabled={disable}
      /* eslint-disable-next-line react/prop-types */
      options={idCol ? data.sort(sortById) : data.sort(sortByName)}
      value={value}
      //autoSelect={true}
      //blurOnSelect={true}
      onChange={onChange}
      //groupBy={(item) => item.id.slice(0, 3)}
      /* eslint-disable-next-line react/prop-types */
      isOptionEqualToValue={(option, value) =>
        // eslint-disable-next-line react/prop-types
        typeof option != 'undefined' && option ? false : option.id === value.id
      }
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.id + ' ' + option.name
      }
      style={{ height: height, minWidth: 150, border: 'none' }}
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
            //style={{ paddingLeft: 5 }}
            {...params}
            placeholder={placeholder}
            value={value}
            id="combo=text-id"
            disabled={disable}
            fullWidth
            variant="standard"
            size="small"
            inputRef={entryRef}
            onChange={(e) => {
              entryRef.current.value = e.target.value
            }}
          />
        )
      }}
      ListboxProps={{
        props: { ...props },
        style: {
          maxHeight: '350px',
          //border: '1px solid lightBlue',
          border: 'none',
        },
      }}
    />
  )
}
