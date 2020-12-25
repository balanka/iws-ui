
import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#ff9100',
        },
    },
    typography: {
        fontSize: 10
    }
});

export function rowStyle (rowData) {
    return  (rowData.tableData.id % 2===0)?
        {
            //color:'black',
            padding:0.5,
            height:3,
            fontsize:10,
            backgroundColor: '#fff9e6' //"#EEEE"
        }:
        {
            color:'black',
            //color:'#eee',
            padding:0.5,
            height:3,
            fontsize:10,
            //backgroundColor:"#fff9e6"
        }

}



