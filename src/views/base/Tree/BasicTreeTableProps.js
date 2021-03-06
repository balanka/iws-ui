
import {createMuiTheme} from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";

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
export const styles = {
    outer: {
        'background-color':blue,
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding:5,
    },
    inner: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10,
        'padding-top': 30
    },
    middle: {
        'background-color':green,
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10,
        'padding-top': 30,
        'padding-bottom': 30
    },   
    middleSmall: {
        borderRadius: 5,
        boxShadow: "0 10px 20px #BBB",
        padding: 10,
        'padding-bottom':5
    },
    cellStyle: {
        width: 20,
        maxWidth: 20
    },
    headerStyle: {
        width:20,
        maxWidth: 20
    },
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit'
    }
};



