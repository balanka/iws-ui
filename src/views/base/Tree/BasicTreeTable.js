import MaterialTable from 'material-table';
import React, {useContext, useState} from "react";
import {accountContext} from "../Components/AccountContext";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme, rowStyle} from "./BasicTreeTableProps";
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {CBadge, CButton} from "@coreui/react";
import {IoMdMenu} from "react-icons/io";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import RateReviewIcon from '@material-ui/icons/RateReview';
const styles = {
    outer: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 1
    }
};
export default function BasicTreeTable() {

    const value = useContext(accountContext);
    const t = value.t
    const [{ res}, ]= useFetch(value.url, {});
    const init = ()=> {return value.initialState}
    const data_ = res && res.response?res.response:[value.initialState];
    const getData =()=> { return data?.hits?data.hits:init().hits}
    //const accData_=  res2?.hits?res2.hits:value.accData;
    const [data, setData] = useState(data_);
    //const [accData, setAccData] = useState(accData_);
    //useEffect(() => {}, [data]);


    const load = event => {
        event.preventDefault();
            value.submitQuery(event, value.url, setData, value.initialState)

    };

    return <>
        <Grid container spacing={2}  direction="column"  style={{...styles.outer}}>
                <Grid container justify="space-between">
                    <Grid container xs spacing={1} justify="flex-start">
                        <Grid item justify="center" alignItems="center">
                            <IoMdMenu />
                        </Grid>
                        <Grid item><h5><CBadge color="primary">{t('common.title')}</CBadge></h5></Grid>
                    </Grid>
                    <Grid item justify="flex-end" alignItems="center">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize"
                                     onClick={event => { load(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize">
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
        </Grid>
      <ThemeProvider theme={theme}>
        <MaterialTable
            title="Basic Tree Data"
            //data={data}
            data={getData()}
            columns={value.headers}
            parentChildData={(row, rows) => rows.find(a => a.id === row.account)}
            icons={{
                Add: () => <Add />,
                Check: () => <Check />,
                Clear: () => <Clear />,
                Delete: () => <IndeterminateCheckBoxIcon />,
                Edit: () => <RateReviewIcon />,
                FirstPage: () => <FirstPage />,
                NextPage: () => <ChevronRight />,
                LastPage: () => <LastPage />,
                PreviousPage: () => <ChevronLeft />,
                ResetSearch: () => <Clear />,
                Search: () => <Search />
            }}
            options={{
                search:false,
                selection: false,
                rowStyle:rowStyle
            }}
        />
      </ThemeProvider>
    </>
}
