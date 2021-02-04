import React, {useContext, useState, useEffect} from "react";
import {accountContext} from "../Components/AccountContext";
import useFetch from "../../../utils/useFetch";
import Grid from "react-fast-grid";
import {formEnum} from "../../../utils/FORMS";
import {JournalFormHead, FormFactory} from './FormsProps';
import {styles} from "../Tree/BasicTreeTableProps";
import EditableTable from "../../Tables2/EditableTable";
import {OptionsM, filter, treeHeaders as columns} from '../../Tables2/LineFinancialsProps';
import blue from "@material-ui/core/colors/blue";

export default function BasicTreeTable() {

    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    //const [selected, setSelected] = useState([]);
    const value = useContext(accountContext);
    const t = value.t
    const [{ res}, ]= useFetch(value.url, {});
    console.log('res__', res);
    const init = ()=> {return value.initialState}
    const data_ = res && res.response?res.response:[value.initialState];
    const getData =()=> { return data?.hits?data.hits:init().hits}

    const [{ res2}] = useFetch(value.accUrl, {});
    const accData_=  res2?.hits?res2.hits:value.accData;
    const current_= getData()[0]//init().hits[0].query;
    console.log('current_', current_);
    //console.log('accData_', accData_);
    console.log('getData()', getData());
    const [current,setCurrent] = useState(current_);
    const [data, setData] = useState(data_);
    const [accData, setAccData] = useState(accData_);
    const [filteredRows, setFilteredRows] = useState(data);
    const [toolbar, setToolbar] = useState(true);
    useEffect(() => {setCurrent(current_)}, [current_]);
    useEffect(() => {handleFilter('')}, [data]);
    const toggleToolbar= ()=> setToolbar(!toolbar );
    const toggle= ()=> setState({...state, collapse:!state.collapse });
    const columnsX = columns(t);
  
    const url_=() =>value.url.concat('/')
        .concat(current.account).concat('/')
        .concat(current.fromPeriod).concat('/')
        .concat(current.toPeriod);
    const submitQuery = event => {
        console.log('accDataZZZ', accData);
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData,value.initAcc):
            value.submitQuery(event, url_(), setData, value.initialState)
      };
      const load = event => {
        event.preventDefault();
        accData?.hits?.length<2?
            value.submitQuery(event, value.accUrl, setAccData, value.initAcc):
            current.account&&current.fromPeriod&&current.toPeriod?
             value.submitQuery(event, url_(), setData, value.initialState): void(0)
      };

      const getColumnName = ()=>columnsX.map(col =>col.field);

      function handleFilter(text) {
        const rows_=text?filter(getData(), getColumnName(), text ):getData()
        setFilteredRows(rows_);
    }
  
    //const getFilteredRows=()=>filteredRows?filteredRows:data
    const parentChildData =(row, rows) => rows.find(a => a.id === row.account)

    function buildForm(){
        return <>
          <Grid container spacing={2} style={{...styles.outer }} direction="column" >
            <JournalFormHead styles={styles} title={value.title} collapse={state.collapse}  initialState={value.initialState}
                            setData={setData} setAccData={setAccData} url={value.url} accUrl={value.accUrl}
                             toggle={toggle} load = {load} toggleToolbar={toggleToolbar}  />
                            
            <FormFactory formid ={formEnum.BALANCETREE} current={current} setCurrent={setCurrent} t={t} accData={accData}
                         collapse={state.collapse} styles={styles} submitQuery= {load}  />
            <Grid container spacing={2} style={{...styles.inner, 'background-color':blue }} direction="column" >
              <EditableTable Options={{...OptionsM, selection:false, toolbar:toolbar}} flag={false} data={getData()}
                         columns={columnsX}  t={t}   parentChildData={parentChildData}/>
            </Grid>
          </Grid>
        </>
      }
      return buildForm();
 /*
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
    */
}