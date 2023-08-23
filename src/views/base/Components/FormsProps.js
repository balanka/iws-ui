import React from 'react'
import Grid from "react-fast-grid";
import {IoMdMenu} from "react-icons/all";
import {CBadge, CButton, CCol, CCollapse, CFormGroup, CInput, CLabel, CSelect, CTextarea} from "@coreui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formEnum} from "../../../utils/FORMS";
import {currencyAmountFormatDE, dateFormat,sortById, sortByName} from '../../../utils/utils'
import CustomerTabs from './CustomerTabs'
import {
    faAngleDoubleDown,
    faAngleDoubleUp, faPlusCircle,
    faPlusSquare,
    faSave,
    faSpinner,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";

import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { blue } from "@material-ui/core/colors";
import SvgIcon from '@material-ui/core/SvgIcon';
import {styles} from "../Tree/BasicTreeTableProps";


export const svgIcons = {
     plus:"M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-4 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
    , delete:"M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"
    , delete4ever:"M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"
    , copyRight:"M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-3.84-18.27c.11-.65.31-1.23.6-1.74s.69-.92 1.18-1.23c.47-.29 1.06-.45 1.79-.46.48.01.92.09 1.3.26.41.18.75.42 1.04.72s.51.66.67 1.06.25.83.27 1.28h3.58c-.03-.94-.22-1.8-.55-2.58s-.81-1.45-1.41-2.02-1.32-1-2.16-1.31-1.77-.47-2.79-.47c-1.3 0-2.43.22-3.39.67s-1.76 1.06-2.4 1.84-1.12 1.68-1.43 2.71-.46 2.12-.46 3.27v.55c0 1.16.16 2.25.47 3.28s.79 1.93 1.43 2.7 1.44 1.38 2.41 1.83 2.1.67 3.4.67c.94 0 1.82-.15 2.64-.46s1.54-.73 2.16-1.27 1.12-1.16 1.48-1.88.57-1.48.6-2.3h-3.58c-.02.42-.12.8-.3 1.16s-.42.66-.72.91-.65.45-1.05.59c-.38.13-.78.2-1.21.2-.72-.02-1.31-.17-1.79-.47-.5-.32-.9-.73-1.19-1.24s-.49-1.09-.6-1.75-.15-1.3-.15-1.97v-.55c0-.68.05-1.35.16-2z"
    , copyContent:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
    , clearAll:"M10 26h28v-4H10v4zm-4 8h28v-4H6v4zm8-20v4h28v-4H14z"
    , libraryAdd:"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"
    , checkCircle:"M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"
    , highlightRemove:"M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
    , highlightOff:"M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    , doneAll:"M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z"
    , done:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
    , swapVertCircle:"M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
    , addCircleOutline:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    , addBox:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
    , save:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
    , doubleAngleUp:"M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"
    , doubleAngleDown:"M1523 1440q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23zm0-384q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z"
    , arrowUpSolid:"M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
    , arrowDownSolid:"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
    , checkBox:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    , refresh:"m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
    , logo:"M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"
}

export function IwsIcon(props) {
    const {style, d} = props
    return (
        <SvgIcon style ={{...style}}>
            <path d={d} />
        </SvgIcon>
    );
}


  const mappingSelect = (item) => <option key={item.id} value={item.id}>
    {item.id.toString().concat( " ").concat (item.name)}</option>
const mappingSelectName = (item) => <option key={item.id} value={item.id}>
    {item.name.concat( " ").concat (item.id)}</option>;
// export const  filter = (rows, cols, txt,) => rows.filter(col =>
//     cols.map(name => `col.${name}`.includes(txt)).reduce((a, b = false) => a || b));
//


 
export const CommonFormHead = (props) => {
    const {styles, title, collapse,  initAdd, cancelEdit, submitEdit, submitQuery, reload, toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start" >
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" itle="Reload" onClick={reload}>
                                <IwsIcon style={{style:styles.imageIcon }}  d={svgIcons.refresh}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => cancelEdit(e)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </CButton>
                        </div>

                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className = "card-header-action btn-minimize" onClick={initAdd}>
                                <FontAwesomeIcon icon={faPlusSquare} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <FontAwesomeIcon icon={faSave} />
                            </CButton>
                        </div>
                        <div>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                                event.preventDefault();submitQuery(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <IwsIcon style={{style:styles.imageIcon }}  d={svgIcons.swapVertCircle}/>
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const BSFormHead = (props) => {
    const {styles, title, collapse,  initAdd, submitEdit, submitQuery, submitPost, toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start" >
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitPost(e)}>
                                <IwsIcon  style ={{style:styles.imageIcon}} d={svgIcons.done}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className = "card-header-action btn-minimize" onClick={initAdd}>
                                <FontAwesomeIcon icon={faPlusSquare} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={(e) => submitEdit(e)}>
                                <FontAwesomeIcon icon={faSave} />
                            </CButton>
                        </div>
                        <div>
                            <CButton block color="link" type="submit"  className="card-header-action btn-minimize" onClick={event => {
                                event.preventDefault();submitQuery(event)}}>
                                <FontAwesomeIcon icon={faSpinner} rotation={90}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const FinancialsFormHead = (props) => {
    const {styles, title, collapse, module, modules, initAdd, onNewLine, cancelEdit, submitEdit,  toggle
        , submitCopy, submitPost, handleModuleChange, toggleToolbar, reload, current} = props
    console.log('modules>>>>>', modules);
    const posted = current?current.posted:false
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start">
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{align: 'right' }}>
                           <CSelect className ="input-sm" type="select" name="module" id="module-id"
                                 value={module}  onChange ={handleModuleChange} style={{ height:30}}>
                               <option value={module} selected >{module}</option>
                                {modules.sort(sortById).map(item => mappingSelect(item))};
                           </CSelect>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" itle="Reload" onClick={reload}>
                                <IwsIcon style={{style:styles.imageIcon }}  d={svgIcons.refresh}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{ align:'right' }}>
                            <CButton  disabled={posted} className="card-header-action btn-minimize" onClick={submitCopy}>
                                <IwsIcon  style ={{style:styles.imageIcon }}  d={svgIcons.copyContent}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton  disabled={posted} className="card-header-action btn-minimize" title="Add new line" onClick={onNewLine}>
                                <IwsIcon  style ={{style:styles.imageIcon}}  d={svgIcons.libraryAdd}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton disabled={posted} color="link" className="card-header-action btn-minimize" title="Cancel editing" onClick={(e) => cancelEdit(e)}>
                                <IwsIcon  style ={{style:styles.imageIcon}}  d={svgIcons.highlightOff} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" title="Add new entry" onClick={initAdd}>
                                <IwsIcon  style ={{style:styles.imageIcon}}  d={svgIcons.addCircleOutline}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton disabled={posted} color="link" className="card-header-action btn-minimize" title="Save entry" onClick={(e) => submitEdit(e)}>
                                <IwsIcon  style ={{style:styles.imageIcon}}  d={svgIcons.save}/>
                            </CButton>
                        </div>

                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton disabled={posted} className="card-header-action btn-minimize" onClick={submitPost}>
                                <IwsIcon  style ={{style:styles.imageIcon}} d={svgIcons.done}/>
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" title="Hide/Display transaction" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{  align: 'right' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <IwsIcon style={{style:styles.imageIcon }}  d={svgIcons.swapVertCircle}/>
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}
export const JournalFormHead = (props) => {
    const {styles, title, collapse,   toggle, toggleToolbar} = props
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start">
                    <Grid item justify="center" alignItems="center">
                        <IoMdMenu />
                    </Grid>
                    <Grid item><h5><CBadge color="primary">{title}</CBadge></h5></Grid>
                    <Grid  container xs spacing={1} justify="flex-end" alignItems="right">
                        <div className="card-header-actions" style={{ textAlign: 'end' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
                                <FontAwesomeIcon icon={collapse?faAngleDoubleUp:faAngleDoubleDown} />
                            </CButton>
                        </div>
                        <div className="card-header-actions" style={{ textAlign: 'end' }}>
                            <CButton color="link" className="card-header-action btn-minimize" onClick={toggleToolbar}>
                                <IwsIcon style={{style:styles.imageIcon }}  d={svgIcons.swapVertCircle}/>
                            </CButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>);
}

export const FormFactory =(props)=> {
    console.log("props",props)
    switch(props.formid) {
        case formEnum.ACCOUNT:
            return <FormWrapper {...props} form = {AccountMainForm} />;
        case formEnum.BANKSTATEMENT:
            return <FormWrapper {...props} form = {BankStatementMainForm}/>;
        case formEnum.COSTCENTER:
        case formEnum.BANK:
        case formEnum.MODULE:
        case formEnum.FMODULE:
        case formEnum.ROLE:
        case formEnum.PERMISSION:
            return <FormWrapper {...props} form = {MasterfilesMainForm}/>;
        case formEnum.COMPANY:
        case formEnum.CUSTOMER:
        case formEnum.SUPPLIER:
            return <FormWrapper {...props} form = {CustomerTabs}/>;
        case formEnum.FINANCIALS:
            return <FormWrapper {...props} form = {FinancialsMainForm}/>;
        case formEnum.JOURNAL:
        case formEnum.PACB:           
        case formEnum.BALANCETREE:
            return <FormWrapper {...props} form = {JournalMainForm}/>;
        case formEnum.VAT:
            return <FormWrapper {...props} form = {VatMainForm}/>;
        case formEnum.USER:
            return <FormWrapper {...props} form = {UserForm}/>;
        default:
            return <>NODATA</>
    }
}
export const FormWrapper=(props) => {
    const {form, table, collapse, styles} = props
    return (
        <Grid container spacing={2} style={{...styles.middle, 'backgroundColor':blue }} direction="column" >
            <CCollapse show={collapse} id="JScollapse" >
                {
                    form && form(props)
                }
                {    table && table(props)
                }
            </CCollapse>
     </Grid>
    )
}


export const AccountMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
    //const accData = data; //updateAccount(data);
    return (
        <>
     <CFormGroup row style={{  height:15 }}>
         <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
        </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="account-id" name="id" className="input-sm"
                placeholder="Id" value= {current.id} onChange={(event)  => setCurrent({ ...current, id: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.enterdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bssize="sm" type="text"  id="enterdate-id" name="enterdate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                 style={{'textAlign':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.name')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                value={current.name} onChange={(event)  => setCurrent({ ...current, name: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bssize="sm"  type="text"  id="changedate-id" name="changedate"
                 className="input-sm" placeholder="date" value={dateFormat(current.changedate,
            "dd.mm.yyyy")} style={{'textAlign':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="account" id="account-id"
                 value={current.account} onChange={(event)  => setCurrent({ ...current, account: event.target.value})} >
            {accData.sort(sortById).map(item => mappingSelect(item))};
        </CSelect>

    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.postingdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  bssize="sm" type="text" id="input-small" name="postingdate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                 style={{'textAlign':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="company-id" name="company" className="input-sm"
                placeholder="company" value={current.company} onChange={(event)  =>
            setCurrent({ ...current, company: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <FormControlLabel id="isDebit" name="isDebit"
                          control={<Switch checked={current.isDebit} onChange={(event)  =>
                              setCurrent({ ...current, isDebit: event.target.checked})} style={{ 'paddingLeft':2 }}/>}
                          label={t('account.debit_credit')}
        />
    </CCol>
    <CCol sm="1">
        <FormControlLabel id="balancesheet" name="balancesheet"
                          control={<Switch checked={current.balancesheet} onChange={(event)  =>
                              setCurrent({ ...current, balancesheet: event.target.checked})} style={{ 'paddingLeft':2 }}/>}
                          label={t('account.balancesheet')}
        />
    </CCol>
         <CCol sm="1">
             <CInput bssize="sm" type="text" id="currency-id" name="currency" className="input-sm"
                     placeholder="currency" value={current.currency} onChange={(event)  =>
                 setCurrent({ ...current, currency: event.target.value})} />

         </CCol>
</CFormGroup>
     <CFormGroup row style={{  height:15 }}>
    <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('common.description')}</CLabel>
    </CCol>
    <CCol xs="12"   md="9">
        <CTextarea type="textarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description} onChange={(event)  =>
            setCurrent({ ...current, description: event.target.value})} />
    </CCol>
</CFormGroup>
</>
)}
export const BankStatementMainForm =(props) => {
    const {current, setCurrent, t } = props
    return (
        <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bssize="sm" type="text" id="account-id" name="id" className="input-sm"
                             placeholder="Id" value= {current.id}  />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('common.postingdate')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bssize="sm" type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }} />
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.depositor')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bssize="sm" type="text" id="depositor-input" name="depositor"
                             className="input-sm" placeholder="depositor" value={current.depositor}  />
                </CCol>
                <CCol sm="1.5">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.valuedate')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            //label ={t('bankstatement.valuedate')}
                            id="date-picker-valuedate"
                            value={new Date(current.valuedate)}
                            onChange={(newValue) => setCurrent({ ...current, valuedate: newValue} )}
                            InputLabelProps={{ shrink: true }}
                            InputAdornmentProps={{position: 'end','align-text':'right'}}
                        />
                    </MuiPickersUtilsProvider>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.beneficiary')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  readonly type="text" id="beneficiary-input" name="beneficiary"
                             className="input-sm" placeholder="beneficiary" value={current.beneficiary}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.postingtext')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bssize="sm"  type="text"  id="postingtext-id" name="postingtext"
                             className="input-sm" placeholder="postingtext" value={current.postingtext} />
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.info')}</CLabel>
                </CCol>
                <CCol xs="4">
                    <CInput  bssize="sm" type="text" id="info-input" name="info" className="input-sm"
                             placeholder="info" value={current.info}  />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.amount')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bssize="sm" type="text" id="amount-input" name="amount" className="input-sm"
                             placeholder="amount" value={currencyAmountFormatDE(Number(current.amount),current.currency)}
                             style={{ 'textAlign':'right' }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.companyIban')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bssize="sm" type="text" id="companyIban-id" name="companyIban"
                            className="input-sm" placeholder="companyIban" value={current.companyIban}
                            onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput  bssize="sm" type="text" id="company-input" name="company" className="input-sm"
                             placeholder="company" value={current.company} style={{ 'textAlign':'right' }}/>
                </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.accountno')} </CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bssize="sm" type="text" id="accountno-input" name="accountno"
                            className="input-sm" placeholder="accountno" value={current.accountno}
                            onChange={(event)  => setCurrent({ ...current, accountno: event.target.value})} />
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.bankCode')} </CLabel>
                </CCol>
                <CCol sm="1.5">
                    <CInput disabled ={current.posted} bssize="sm" type="text" id="bankCode-input" name="bankCode"
                            className="input-sm" placeholder="bankCode" value={current.bankCode}
                            onChange={(event)  => setCurrent({ ...current, bankCode: event.target.value})}
                            style={{ 'paddingLeft':0 }}/>
                </CCol>
                <CCol sm="1">
                    <FormControlLabel id="posted" name="posted" bssize="sm"
                                      control={<Switch checked={current.posted} />}
                                      label={t('bankstatement.posted')}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('bankstatement.purpose')}</CLabel>
                </CCol>
                <CCol xs="12"   md="10">
                    <CTextarea disabled ={current.posted} bssize="sm" type="textarea" id="purpose-input" name="purpose" className="input-sm"
                               placeholder="purpose" value={current.purpose}
                               onChange={(event)  => setCurrent({ ...current, purpose: event.target.value})} rows="2"/>
                </CCol>
            </CFormGroup>
        </>
    )}
export const MasterfilesMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
    return (<>
    <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                value={current.id} onChange= {(event)  => setCurrent({ ...current, id: event.target.value})}
        />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.enterdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput  disabled={true} bssize="sm" type="text" id="enterdate-id" name="enterdate" className="input-sm"
                 placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                 style={{'textAlign':'right', padding:2 }}/>
    </CCol>
</CFormGroup>
 <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t("costcenter.name")}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                value={current.name} onChange={(event)  => setCurrent({ ...current, name: event.target.value})}/>
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput disabled={true} bssize="sm" type="text" id="changedate-id" name="changedate" className="input-sm"
                placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                style={{'textAlign':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
         <CFormGroup row style={{  height:15 }}>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CSelect className="flex-row" type="select" name="account" id="account-id"
            value={current.account} onChange={(event)  => setCurrent({ ...current, account: event.target.value})}>
            { accData.sort(sortById).map(item => mappingSelect(item))};
        </CSelect>
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t("common.postingdate")}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput disabled={true} bssize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                style={{'textAlign':'right', padding:2 }} readonly />
    </CCol>
</CFormGroup>
        <CFormGroup row style={{  height:15 }}>
    <CCol sm="6"/>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput disabled={true} bssize="sm" type="text" id="company-id" name="company" className="input-sm"
                 placeholder="company" value={current.company}
                 style={{'textAlign':'right', padding:2 }} readonly/>
    </CCol>
</CFormGroup>
 <CFormGroup row style={{  height:15 }}>
    <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('common.description')}</CLabel>
    </CCol>
    <CCol xs="12" md="9">
        <CTextarea type="texarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description}
                   onChange={(event)  => setCurrent({ ...current, description: event.target.value})}/>
    </CCol>
    </CFormGroup>
</>
)}
export const UserForm =(props) => {
    const {current, setCurrent, t } = props
    return (<>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="user-id" name="id" className="input-sm" placeholder="Id"
                            value={current.id} onChange= {(event)  => setCurrent({ ...current, id: event.target.value})}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('user.role')}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput bssize="sm" type="text" id="role-id" name="role" className="input-sm" placeholder="role"
                            value={current.role} onChange= {(event)  => setCurrent({ ...current, role: event.target.value})}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t("user.userName")}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="userName-input" name="userName" className="input-sm" placeholder="Name"
                            value={current.userName} onChange={(event)  => setCurrent({ ...current, userName: event.target.value})}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('user.firstName')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput bssize="sm" type="text" id="firstName-id" name="firstName" className="input-sm"
                     value={current.firstName} onChange={(event)  => setCurrent({ ...current, firstName: event.target.value})}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('user.lastName')}</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput bssize="sm" type="text" id="lastName-id" name="lastName" className="input-sm"
                    value={current.lastName} onChange={(event)  => setCurrent({ ...current, lastName: event.target.value})}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t("user.email")}</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput bssize="sm" type="text" id="email-id" name="email" className="input-sm"
                     value={current.email} onChange={(event)  => setCurrent({ ...current, email: event.target.value})}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="6"/>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bssize="sm" type="text" id="company-id" name="company" className="input-sm"
                             placeholder="company" value={current.company}
                             style={{'textAlign':'right', padding:2 }} readonly/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol md="2">
                    <CLabel htmlFor="textarea-input">{t('common.phone')}</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                 <CInput bssize="sm" type="text" id="menu-id" name="menu" className="input-sm"
                     value={current.menu} onChange={(event)  => setCurrent({ ...current, menu: event.target.value})}/>
                </CCol>
            </CFormGroup>
        </>
    )}
export const AddressForm =(props) => {
    const {current, setCurrent, t} = props
    return (
          <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
             <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.street')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="street-id" name="street" className="input-sm" placeholder="Id"
                            value= {current.street} onChange={(event)  =>
                        setCurrent({ ...current, street: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.zip')}</CLabel>
                </CCol>
                <CCol sm="4">
                <CInput  bssize="sm" type="text" id="zip-id" name="zip" className="input-sm"
                             placeholder="zip" value={current.zip} onChange={(event)  =>
                        setCurrent({ ...current, zip: event.target.value})}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.city')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="city-input" name="city" className="input-sm" placeholder="Name"
                            value={current.city} onChange={(event)  =>
                        setCurrent({ ...current, city: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.country')}</CLabel>
                </CCol>
                <CCol sm="4">
                <CInput  bssize="sm" type="text" id="country-id" name="country" className="input-sm"
                             placeholder="country" value={current.country} onChange={(event)  =>
                        setCurrent({ ...current, country: event.target.value})}
                             style={{padding:2 }}/>
                </CCol>
            </CFormGroup>   
   </Grid>);
}
export const CustomerGeneralForm =(props) => {
    const {current, setCurrent, t} = props
    return (
            <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                            value= {current.id} onChange={(event)  =>
                        setCurrent({ ...current, id: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.enterdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm" type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.name')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                            value={current.name} onChange={(event)  =>
                        setCurrent({ ...current, name: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.changedate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm"  type="text"  id="changedate-id" name="changedate" className="input-sm"
                             placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>

                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.currency')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput  bssize="sm" type="text" id="currency-id" name="currency" className="input-sm"
                             placeholder="Currency" value={current.currency} onChange={(event)  =>
                        setCurrent({ ...current, currency: event.target.value})}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.postingdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm"  type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                            placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                            style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.phone')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bssize="sm" type="text" id="phone-id" name="phone" className="input-sm"
                             placeholder="phone" value={current.phone} onChange={(event)  =>
                        setCurrent({ ...current, phone: event.target.value})}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol md="2">
                    <CLabel htmlFor="textarea-input">{t('common.description')}</CLabel>
                </CCol>
                <CCol xs="12"   md="9">
                    <CTextarea type="texarea" name="description" id="description-id" rows="1"
                               placeholder="Content..." value={current.description}
                               onChange={(event)  =>
                                   setCurrent({ ...current, description: event.target.value})} />
                </CCol>
            </CFormGroup>
        </>);
  }
export const CustomerAccountForm =(props) => {
    const {current, setCurrent, t, accData, vatData} = props
    const accountLabel=current.modelid===1?t('supplier.account'):t('customer.account')
     const oaccountLabel=current.modelid===1?t('supplier.oaccount'):t('customer.oaccount')
    return (
        <Grid container spacing={2} justify="space-between" style={{...styles.inner}} direction="column" >
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{accountLabel}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="account" id="account-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} >
                        {accData.map(item => mappingSelect(item))};

                    </CSelect>

                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bssize="sm" type="text" id="company-id" name="company" className="input-sm"
                             placeholder="company" value={current.company} onChange={(event)  =>
                      setCurrent({ ...current, company: event.target.value})}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>

            </CFormGroup>
            <CFormGroup row style={{ height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{oaccountLabel}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="oaccount" id="oaccount-id"
                             value={current.oaccount} onChange={(event)  =>
                        setCurrent({ ...current, oaccount: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>

            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.vatCode')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="vatcode" id="vatcode-id"
                             value={current.vatcode} onChange={(event)  =>
                        setCurrent({ ...current, vatcode: event.target.value})} >
                        {vatData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
            </CFormGroup>
        </Grid>);
    }
export const CompanyGeneralForm =(props) => {
    const {current, setCurrent, t} = props
    return (
        <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="account-id" name="id" className="input-sm" placeholder="Id"
                            value= {current.id} onChange={(event)  =>
                        setCurrent({ ...current, id: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.enterdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm" type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('company.name')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="name-input" name="name" className="input-sm" placeholder="Name"
                            value={current.name} onChange={(event)  =>
                        setCurrent({ ...current, name: event.target.value})} />
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.changedate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm"  type="text"  id="changedate-id" name="changedate" className="input-sm"
                             placeholder="date" value={dateFormat(current.changedate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol md="2">
                    <CLabel htmlFor="textarea-input">{t('common.description')}</CLabel>
                </CCol>
                <CCol xs="12"   md="9">
                    <CTextarea type="texarea" name="description" id="description-id" rows="1"
                               placeholder="Content..." value={current.description}
                               onChange={(event)  =>
                                   setCurrent({ ...current, description: event.target.value})} />
                </CCol>
            </CFormGroup>
        </>
    )}
export const CompanyAccountForm =(props) => {
    const {current, setCurrent, t, accData, vatData} = props

    return (
        <>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.bankAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="bankAcc" id="bankAcc-id"
                             value={current.bankAcc} onChange={(event)  =>
                        setCurrent({ ...current, bankAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};

                    </CSelect>

                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.postingdate')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={true} bssize="sm" type="text" id="input-small" name="postingdate" className="input-sm"
                             placeholder="date" value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.paymentClearingAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="paymentClearingAcc" id="paymentClearingAcc-id"
                             value={current.paymentClearingAcc} onChange={(event)  =>
                        setCurrent({ ...current, paymentClearingAcc: event.target.value})} >
                        {accData.map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.settlementClearingAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="settlementClearingAcc" id="settlementClearingAcc-id"
                             value={current.settlementClearingAcc} onChange={(event)  =>
                        setCurrent({ ...current, settlementClearingAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.cashAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="cashAcc" id="cashAcc-id"
                             value={current.cashAcc} onChange={(event)  =>
                        setCurrent({ ...current, cashAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.purchasingClearingAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="purchasingClearingAcc" id="purchasingClearingAcc-id"
                             value={current.purchasingClearingAcc} onChange={(event)  =>
                        setCurrent({ ...current, purchasingClearingAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.balanceSheetAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="balanceSheetAcc" id="balanceSheetAcc-id"
                             value={current.balanceSheetAcc} onChange={(event)  =>
                        setCurrent({ ...current, balanceSheetAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.incomeStmtAcc')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="incomeStmtAcc" id="incomeStmtAcc-id"
                             value={current.incomeStmtAcc} onChange={(event)  =>
                        setCurrent({ ...current, incomeStmtAcc: event.target.value})} >
                        {accData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.vatCode')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="vatcode" id="vatcode-id"
                             value={current.vatCode} onChange={(event)  =>
                        setCurrent({ ...current, vatCode: event.target.value})} >
                        {vatData.sort(sortById).map(item => mappingSelect(item))};
                    </CSelect>
                </CCol>
                <CCol sm="2">
                    <CLabel size="sm" htmlFor="input-small">{t('common.iban')}</CLabel>
                </CCol>
                <CCol sm="4">
                    <CInput bssize="sm" type="text" id="iban-id" name="ibanid" className="input-sm" placeholder="Id"
                            value= {current.iban} onChange={(event)  =>
                        setCurrent({ ...current, iban: event.target.value})} />
                </CCol>
            </CFormGroup>
        </>
    )}

export const FinancialsMainForm =(props) => {
    let {current, current_, setCurrent, t, accData, ccData } = props
     current = current?current:current_;
    return (
        <>
            <CFormGroup row style={{  height:15}}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.id')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput  bssize="sm" type="text" id="id" name="id" className="input-sm" placeholder={t('financials.id')}
                             value= {current.id}  />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{padding:2}}>{t('financials.postingdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  disabled={true} bssize="sm"  type="text"  id="postingdate-id" name="postingdate" className="input-sm"
                             placeholder={t('financials.postingdate')} value={dateFormat(current.postingdate, "dd mm yy")}
                             style={{'textAlign':'right', 'paddingLeft':400,'paddingRight':0, padding:2 }}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{  'paddingRight':1 }}>{t('financials.period')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  disabled={true} bssize="sm" className="input-sm" type="text" id="period" name="period" value={current.period}
                             style={{'textAlign':'right',padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.oid')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CInput disabled={current.posted} bssize="sm" type="text" id="oid-input" name="oid" className="input-sm"
                            placeholder="o" value={current.oid} onChange={(event)  =>
                        setCurrent({ ...current, oid: event.target.value})} />
                </CCol>
                <CCol sm="4"/>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{ padding:2 }}>{t('financials.enterdate')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  disabled={true} bssize="sm"  type="text"  id="enterdate-id" name="enterdate" className="input-sm"
                             placeholder="enterdate" value={dateFormat(current.enterdate, "dd.mm.yy")}
                             style={{'textAlign':'right', padding:2 }}/>
                </CCol>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small" style={{  padding:2 }}>{t('common.company')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  disabled={true} bssize="sm" type="text" id="company-input" name="company" className="input-sm"
                             placeholder={t('common.company')} value={current.company}  style={{'textAlign':'right',  padding:2 }}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{  height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.account')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CSelect  disabled={current.posted} className ="input-sm" type="select" name="account" id="account-id"
                              value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height:30}} >
                        {accData.sort(sortById).map(item => mappingSelect(item))}
                    </CSelect>
                </CCol>
                <CCol sm="3">
                    <CSelect disabled={current.posted} className ="input-sm" type="select" name="account2" id="account2-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height:30}}>
                        {accData.sort(sortById).map(item => mappingSelectName(item))};
                    </CSelect>
                </CCol>

                <CCol sm="2" style={{'textAlign':'right', 'paddingLeft':10, paddingBottom:15 }}>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <KeyboardDatePicker disabled={current.posted}
                     disableToolbar
                     variant="inline"
                     format="dd.MM.yyyy"
                     margin="normal"
                     label ={t('financials.transdate')}
                     id="date-picker-financials"
                     value={new Date(current.transdate)}
                     onChange={(newValue) => setCurrent({ ...current, transdate: newValue} )}
                     InputLabelProps={{ shrink: true }}
                     InputAdornmentProps={{position: 'end','align-text':'right'}}
                    />
                </MuiPickersUtilsProvider>
                </CCol>
                <CCol sm="1">
                    <FormControlLabel disabled={true} id="posted" name="posted" control={<Switch checked={current.posted} />} label={t('financials.posted')}/>
                </CCol>
            </CFormGroup>
            <CFormGroup row style={{ paddingBottom:30, height:15 }}>
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('financials.costcenter')}</CLabel>
                </CCol>
                <CCol sm="2">
                    <CSelect disabled={current.posted} className ="input-sm" type="select" name="costcenter" id="costcenter-id"
                             value={current.costcenter}  onChange={(event)  =>
                        setCurrent({ ...current, costcenter: event.target.value})} style={{ height:30}}>
                        {ccData.sort(sortById).map(item => mappingSelect(item))};

                    </CSelect>
                </CCol>
                <CCol sm="3">
                    <CSelect disabled={current.posted}  className ="input-sm" type="select" name="costcenter2" id="costcenter2-id"
                             value={current.costcenter} onChange={(event)  =>
                        setCurrent({ ...current, costcenter: event.target.value})} style={{ height:30}}>
                        {ccData.sort(sortByName).map(item => mappingSelectName(item))};

                    </CSelect>
                </CCol>

            </CFormGroup>
        </>
    )}
export const JournalMainForm = (props) => {
    const {current, setCurrent, t, accData, submitQuery } = props
    console.log('current?????????', current);
    return (
        <>
          <CFormGroup row style={{  height:15 }} >
                <CCol sm="1">
                    <CLabel size="sm" htmlFor="input-small">{t('common.account')}</CLabel>
                </CCol>
                <CCol sm="3">
                    <CSelect className ="flex-row" type="select" name="account" id="account-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height: 30, padding:2 }}>
                        <option key="00" value="0000 All"/>
                        {accData.sort(sortById).sort(sortById).map(item => mappingSelect(item))};

                    </CSelect>
                </CCol>
                <CCol sm="4">
                    <CSelect className ="flex-row" type="select" name="account2" id="account2-id"
                             value={current.account} onChange={(event)  =>
                        setCurrent({ ...current, account: event.target.value})} style={{ height: 30, padding:2 }}>
                        <option key="-2" value="All 0000"/>
                        { accData.sort(sortByName).sort(sortByName).map(item => mappingSelectName(item))};

                    </CSelect>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                    <CLabel size="sm" htmlFor="input-small">{t('common.from')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bssize="sm" type="text"  id="fromPeriod-id" name="fromPeriod" className="input-sm"
                             placeholder="fromPeriod" value={current.fromPeriod} onChange={(event)  =>
                        setCurrent({ ...current, fromPeriod: event.target.value})} style={{ height: 30, padding:1 }}/>
                </CCol>
                <CCol sm="0.5" style={{ align: 'right' , padding:2}}>
                    <CLabel size="sm" htmlFor="input-small">{t('common.to')}</CLabel>
                </CCol>
                <CCol sm="1">
                    <CInput  bssize="sm" type="text"  id="toPeriod-id" name="toPeriod" className="input-sm"
                             placeholder="toPeriod" value={current.toPeriod} onChange={(event)  =>
                        setCurrent({ ...current, toPeriod: event.target.value})}
                             style={{ height: 30, padding:1, align: 'right'}}/>
                </CCol>
                <CCol sm="1" style={{ align: 'right' }}>
                    <CButton type="submit" size="sm" color="primary" style={{ align: 'right' }} onClick={submitQuery}>
                        <i className="fa fa-dot-circle-o"></i>
                    </CButton>
                </CCol>
            </CFormGroup>
        </>
    )}
export const VatMainForm =(props) => {
    const {current, setCurrent, t, accData } = props
    console.log('propsT', props);
    console.log('accDataVat', accData);
 return (
     <>
    <CFormGroup row style={{height:15 }}>
        <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('common.id')}</CLabel>
        </CCol>
        <CCol sm="4">
            <CInput bssize="sm" type="text" id="account-id" name="id" className="input-sm"
                    placeholder="Id" value= {current.id}
                    onChange={(event)  => setCurrent({ ...current, id: event.target.value})} />
        </CCol>
        <CCol sm="2">
            <CLabel size="sm" htmlFor="input-small">{t('vat.enterdate')}</CLabel>
        </CCol>
        <CCol sm="2">
            <CInput disabled={true} bssize="sm" type="text"  id="enterdate-id" name="enterdate"
                     className="input-sm" placeholder="date"
                     value={dateFormat(current.enterdate, "dd.mm.yyyy")}
                     style={{'textAlign':'right', padding:2 }}/>
        </CCol>
    </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
     <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.name')}</CLabel>
    </CCol>
    <CCol sm="4">
        <CInput bssize="sm" type="text" id="name-input" name="name" className="input-sm"
                placeholder="Name" value={current.name}
                onChange={(event)  => setCurrent({ ...current, name: event.target.value})} />
    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.changedate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput disabled={true} bssize="sm"  type="text"  id="changedate-id" name="changedate"
                 className="input-sm" placeholder="date"
                 value={dateFormat(current.changedate, "dd.mm.yyyy")}
                 style={{'textAlign':'right', padding:2 }}/>
    </CCol>
  </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.input_account')}</CLabel>
      </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="inputaccount" id="inputaccount-id"
                 value={current.inputVatAccount}
                 onChange={(event)  => setCurrent({ ...current, inputVatAccount: event.target.value})} >
            {accData.sort(sortById).map(item => mappingSelect(item))};

        </CSelect>

    </CCol>
    <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.postingdate')}</CLabel>
    </CCol>
    <CCol sm="2">
        <CInput disabled={true} bssize="sm" type="text" id="input-small" name="postingdate" className="input-sm" placeholder="date"
                 value={dateFormat(current.postingdate, "dd.mm.yyyy")}
                 style={{'textAlign':'right', padding:2 }}/>
    </CCol>
</CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol sm="2">
        <CLabel size="sm" htmlFor="input-small">{t('vat.output_account')}</CLabel>
     </CCol>
    <CCol sm="4">
        <CSelect className ="flex-row" type="select" name="outputaccount" id="outputaccount-id"
                 value={current.outputVatAccount}
                 onChange={(event)  => setCurrent({ ...current, outputVatAccount: event.target.value})} >
            {accData.sort(sortById).map(item => mappingSelect(item))};
        </CSelect>
    </CCol>
    <CCol md="1">
        <CLabel size="sm" htmlFor="input-small">{t('vat.percent')}</CLabel>
    </CCol>
    <CCol sm="1">
        <CInput  bssize="sm" type="text" id="percent-id" name="percent"  className="input-sm"
                 placeholder="percent" value={current.percent}
                 onChange={(event)  => setCurrent({ ...current, percent: event.target.value})} />
    </CCol>
    <CCol sm="1">
        <CLabel size="sm" htmlFor="input-small">{t('common.company')}</CLabel>
    </CCol>
    <CCol sm="1">
        <CInput disabled={true} bssize="sm" type="text" id="company-id" name="company" className="input-sm"
                 placeholder="company" value={current.company} />
    </CCol>

 </CFormGroup>
    <CFormGroup row style={{  height:15 }}>
      <CCol md="2">
        <CLabel htmlFor="textarea-input">{t('vat.description')}</CLabel>
    </CCol>
      <CCol xs="12"   md="9">
        <CTextarea type="textarea" name="description" id="description-id" rows="1"
                   placeholder="Content..." value={current.description}
                   onChange={(event)  => setCurrent({ ...current, description: event.target.value})} />
     </CCol>
  </CFormGroup>
</>
)}



