import React from 'react'
import { default as Autocomplete1} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
export  const Autocomplete = (data, tableData) => {

    return (
      <Autocomplete1
        value={tableData.value}
        onChange={(event, newValue) => {
            const value = newValue.toString().split(" ")[0]
            tableData.onChange(value);
        }}
        getOptionSelected={(option, value) => option.id === value.id}
        disableClearable={true}
        autoComplete={true}
        options={data.map(d=>d.id.concat (' ').concat (d.name))} // Remove the getOptionsLabel
        renderInput={params => <TextField {...params}
                                           InputProps={{ ...params.InputProps, style: { fontSize: 12 } }}/>}
      />)
}

