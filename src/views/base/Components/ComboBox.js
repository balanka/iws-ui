import * as React from 'react'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { styled } from '@mui/system'

const Label = styled('label')({
  display: 'block',
})

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  borderColor: 'white',
}))

const Listbox = styled('ul')(({ theme }) => ({
  width: 250,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 250,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}))

export default function ComboBox(props) {
  // eslint-disable-next-line react/prop-types
  const { data, onChange, value } = props
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      id: 'use-autocomplete-demo',
      value: value,
      options: data,
      onChange: onChange,
      getOptionLabel: (option) => option.title,
    })

  return (
    <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <li {...getOptionProps({ option, index })}>
              {option.id.concat(' '.concat(option.name))}
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  )
}
