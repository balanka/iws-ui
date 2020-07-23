import MaterialTable from 'material-table';
import React, {useContext} from "react";
import {accountContext} from "../Components/AccountContext";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme, rowStyle} from "./BasicTreeTableProps";

export default function BasicTreeTable() {
    const value = useContext(accountContext);
    console.log('value.headers', value.headers)
    console.log('value.initialState', value.initialState)

    return (
      <ThemeProvider theme={theme}>
        <MaterialTable
            title="Basic Tree Data"
            data={value.initialState.hits}
            columns={value.headers}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            options={{
                search:false,
                selection: true,
                rowStyle:rowStyle
            }}
        />
      </ThemeProvider>
    )
}
