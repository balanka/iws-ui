import { createTheme } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9100',
    },
  },
  typography: {
    fontSize: 10,
  },
})

export function rowStyle(rowData) {
  return rowData.tableData.index % 2 === 0
    ? {
        //color:'black',
        padding: 0.5,
        height: 3,
        fontsize: 10,
        backgroundColor: '#fff9e6', //'#EEEE'
      }
    : {
        color: 'black',
        //color:'#eee',
        padding: 0.5,
        height: 3,
        fontsize: 10,
        //backgroundColor:'#fff9e6'
      }
}
export const styles = {
  outer: {
    backgroundColor: blue,
    borderRadius: 5,
    boxShadow: '0 10px 30px #BBB',
    padding: 5,
  },
  header: {
    borderRadius: 5,
    //boxShadow: '0 10px 30px #BBB',
    padding: 1,
    height: 40,
    paddingTop: 1,
    paddingBottom: 1,
  },
  inner: {
    borderRadius: 5,
    //boxShadow: '0 20px 30px #cce0e3', //#66a6ff, #97baeb #36a3ff
    //boxShadow: '0 20px 30px #97baeb',
    //boxShadow: '0 20px 30px #BBB',
    boxShadow: '0 20px 50px #BBF',
    padding: 10,
    //height: 350,
    paddingTop: 20,
  },
  innerX: {
    borderRadius: 5,
    //boxShadow: '0 20px 30px #cce0e3', //#66a6ff, #97baeb #36a3ff
    //boxShadow: '0 20px 30px #97baeb',
    boxShadow: '0 20px 30px #BBB',
    //boxShadow: '0 20px 50px #BBF',
    padding: 10,
    //height: 350,
    width: 900,
    display: 'flex',
    paddingTop: 20,
  },
  middle: {
    backgroundColor: green,
    borderRadius: 5,
    boxShadow: '0 10px 30px #BBB',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
  },
  middleSmall: {
    borderRadius: 5,
    boxShadow: '0 10px 20px #BBB',
    padding: 10,
    paddingBottom: 5,
  },
  cellStyle: {
    width: 20,
    maxWidth: 20,
  },
  headerStyle: {
    width: 20,
    maxWidth: 20,
  },
  imageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit',
  },
}
