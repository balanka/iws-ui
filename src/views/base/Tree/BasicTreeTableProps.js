
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


  export const data=[
                {id: 1, name: 'a', surname: 'Baran', birthYear: 1987, birthCity: 63, sex: 'Male', type: 'adult'},
                {id: 2, name: 'b', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'adult', rentId: 1,},
                {id: 3, name: 'c', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 1,},
                {id: 4, name: 'd', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 3,},
                {id: 5, name: 'e', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child',},
                {id: 6, name: 'f', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 5,},
                {id: 6, name: 'ff', surname: 'Baranf', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 4,},
                ]
export const  columns=[
                { title: 'Adı', field: 'name' },
                { title: 'Soyadı', field: 'surname' },
                { title: 'Cinsiyet', field: 'sex' },
                { title: 'Tipi', field: 'type', removable: false },
                { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                {title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },},
            ]

  export function rowStyle (rowData) {
     return  (rowData.tableData.id % 2===0)?
                         {
                            color:'black',
                            padding:0.5,
                            height:3,
                            fontsize:10,
                            backgroundColor:"#EEEE"
                        }:
                       {
                        color:'black',
                        padding:0.5,
                        height:3,
                        fontsize:10,
                        backgroundColor:"#fff9e6"
                       }

                }



