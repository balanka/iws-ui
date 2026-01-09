import React, {CSSProperties, Dispatch, FC, MouseEventHandler} from 'react'
import {Show, toOption, transactionToOption} from '../utils/FormUtils.tsx'
import Grid from 'react-fast-grid'
import {IoMdMenu} from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import LogoutIcon from '@mui/icons-material/Logout'
import PrintOutlined from '@mui/icons-material/PrintOutlined'
import {
  CBadge,
  CButton, CCard, CCardBody, CCardGroup,
  CCol, CContainer, CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CHeaderToggler,
  CInputGroup, CInputGroupText, CRow,
} from '@coreui/react'
import {formEnum} from '../utils/FormEnum'
import {sortById} from '../utils/Utils'
import {saveXlsx} from './../utils/XlsUtils.ts'
import {languages} from './languages.ts'
import {
  AccountMainProps, ArticleGeneralFormProps, ArticleQRFormProps,
  AssetProps,
  BankAccountFormProps,
  BankStatementParamProps,
  BankStatementProps,
  CustomerGeneralFormProps, FinancialsCBoxProps2,
  FinancialsDetailsFormProps, FModuleProps2, JournalToolBarProps, LoginProps, MasterfileComboboxProps,
  MasterfileProps,
  MasterfileProps2,
  StoreGeneralFormProps,
  TransactionDetailsFormProps, TransactionToolBarProps,
  UserFormProps,
} from '../Props.ts'
import DatePicker, {setDefaultLocale} from 'react-datepicker'
import '../../public/css/custom-datepicker.css'
import {green} from '@mui/material/colors'
import {
  initAcc,
  initArticleGroup,
  initCc,
  initCurrency,
  initCust,
  initfModule,
  initQuantity,
  initStore,
  initVat
} from './Menu'
import {
  IAccount,
  IAddress,
  IArticle,
  IBankAccount,
  IBankStatement,
  IBusinespartner,
  ICompany,
  ICustomer,
  IEmployee,
  IFinancials,
  IFmodule,
  ILineFinancials,
  ILineTransaction,
  IMasterfile, IMasterfile2,
  IPACBQueryParam,
  IPayrollTaxRange,
  IPermission,
  IRole,
  IStore,
  ISupplier,
  ITransaction,
  IVat
} from '../Models.ts'
import {TFunction} from 'i18next'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import CheckIcon from '@mui/icons-material/Check'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import {Checkbox, FormControlLabel} from "@mui/material";
import {Link, NavigateFunction, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ComboBox from './ComboBox.tsx'
import QRCode from 'react-qr-code'
//import QRReader from 'react-qr-reader'

const styles = {
  outer0: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 4,
  },
  outer: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 10,
    //width: '100%',
    //height: 200,
    //padding: 50,
  },
  fuller: {
    borderRadius: 5,
    boxShadow: "0 1px 50px #BBE",
    padding: 5,
    height:30
  },
  fuller40H: {
    borderRadius: 5,
    boxShadow: "0 1px 50px #BBE",
    padding: 5,
    height:40
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  paddingLeft20: {
    paddingLeft: 20,
  },
  height40: {
    height: 40,
  },
}

const STYLES = {
  outer0: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 20,
  },
    outer: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10,
        // paddingRight: 50,
        // paddingTop: 10,
        // paddingBottom: 10,
    },
    outer50: {
      borderRadius: 5,
      boxShadow: "0 30px 40px #BBB",
      padding: 50,
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
    fullerX: {
        borderRadius: 1,
        boxShadow: "0 1px 50px #BBE",
        padding:0,
        height:30
    },
    fuller: {
        borderRadius: 5,
        boxShadow: "0 1px 50px #BBE",
        padding: 5,
        height:30
    },
    fuller40H: {
        borderRadius: 5,
        boxShadow: "0 1px 50px #BBE",
        padding: 5,
        height:60
    },
    header: {
        borderRadius: 5,
        //boxShadow: '0 10px 30px #BBB',
        padding: 1,
        height: 40,
        paddingTop: 1,
        paddingBottom: 1,
    }
};


const headStyle = {
    header: {
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 1,
        height: 40,
        //paddingTop: 1,
        paddingBottom: 15,
    },
}
const mapping = (item:{id:string, name:string}) => (
  <option key={item.id} value={item.id}>
    {item.name}
  </option>
)
export const CommonFormHead = ({title, collapse, initAdd, edited, edit, disable, added, cancelEdit, submitEdit //, submitQuery
                                   , reload, toggle,  onNewBankAccount, onDeleteBankAccount //, onNewSalaryItem, disable
                                   , handleLanguageChange, navigate, language, dispatch, logout}:
                               {title:string, collapse:boolean, initAdd:()=>void, edited:boolean, disable:boolean
                                   , added:boolean, edit:()=>void, cancelEdit:(e:any)=>void
                                   , submitEdit:(e:any)=>void, submitQuery:(e:any)=>void, reload:()=>void, toggle:()=>void
                                   , onNewBankAccount?:()=>void, onDeleteBankAccount?:(e:any)=>void
                                   , onNewSalaryItem?:()=>void, handleLanguageChange: (arg:any)=>void
                                   , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
                                   , logout:(navigate:NavigateFunction) =>void }) => {

    const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
    const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
    const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon
    const sidebarShow = useSelector((state:any) => state.sidebarShow)
    return (
        <Grid container xs style={{ ...headStyle.header }} justify="flex-start" alignItems="center">
            <Grid item justify="center" alignItems="center">
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
                    <IoMdMenu/>
                </CHeaderToggler>
            </Grid>
            <Grid xs item>
                <h5>
                    <CBadge color="primary">{title}</CBadge>
                </h5>
            </Grid>
            <Grid container xs spacing={0} justify="flex-end"  alignItems="center">
                <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
                    <CFormSelect  style={{ height: 24, paddingLeft:10, fontSize:10}}
                        className="flex-row"
                        type="select"
                        name="language"
                        id="language-id"
                        value={language}
                        onChange={(event) => handleLanguageChange(event)}
                    >
                        {languages.map((item) => mapping(item))}
                    </CFormSelect>
                </CHeaderToggler>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
                            style={{ height: 20, padding:1, display:onDeleteBankAccount? 'block':'none'}}
                            onClick={(event)=>
                                onDeleteBankAccount?onDeleteBankAccount(event):void(0)} disabled={!onDeleteBankAccount} >
                    <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
                            style={{ height: 20, padding:1, display:onNewBankAccount?'block':'none'}} onClick={()=>
                    onNewBankAccount?onNewBankAccount():void(0)} disabled={!onNewBankAccount}>
                    <AddCircleOutlineIcon/>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            disabled={!added}      onClick={()=>initAdd()}>
                    <AddBoxIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            disabled={disable && !edited && !added} onClick={(e)=>submitEdit(e)}>
                    <SaveIcon/>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            disabled={!edited && !added} onClick={(e)=>cancelEdit(e)}>
                    <CancelIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>edit()}>
                    <EditSquareIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            disabled={!edited}>
                    <ArrowCircleDownIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}>
                    <DriveFolderUploadIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>reload()}>
                    <HourglassTopTwoToneIcon/>
                </IconButton>
                <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={() => toggle()}>
                    {UpDownIcon}
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>logout(navigate)}>
                    <LogoutIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export const BSFormHead = ({title, collapse, cancelEdit, submitEdit, importData, submitPost, reload, toggle, logout, navigate
                           , language, handleLanguageChange, dispatch, current}:{title:string, collapse:boolean
                            ,  cancelEdit:(e:any)=>void, submitEdit: (e:any)=>void, importData:()=>void
                            , submitPost:(e:any)=>void, reload: ()=>void, toggle:()=>void
                            , logout:(navigate:NavigateFunction) =>void, navigate:NavigateFunction, language:string
                            ,  handleLanguageChange: (arg:any)=>void,  dispatch:Dispatch<any>, current:IBankStatement }) => {
    const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
    const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
    const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon
    const sidebarShow = useSelector((state:any) => state.sidebarShow)
    //const posted = current ? current.posted : false
  console.log('current', current)
    return (
        // eslint-disable-next-line react/prop-types
        <Grid container xs style={{ ...STYLES.header }} justify="flex-start">
          <Grid item justify="center" alignItems="center">
            <CHeaderToggler
              className="ps-1"
              onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
              <IoMdMenu/>
            </CHeaderToggler>
          </Grid>
          <Grid xs item>
            <h5>
              <CBadge color="primary">{title}</CBadge>
            </h5>
          </Grid>
          <Grid container xs spacing={0} justify="flex-end"  alignItems="center">
            <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
              <CFormSelect  style={{ height: 30, paddingLeft:10}}
                            className="flex-row"
                            type="select"
                            name="language"
                            id="language-id"
                            value={language}
                            onChange={(event) => handleLanguageChange(event)}
              >
                {languages.map((item) => mapping(item))}
              </CFormSelect>
            </CHeaderToggler>

            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                        disabled={current.posted} onClick={(e)=>submitEdit(e)}>
              <SaveIcon/>
            </IconButton>
            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                        disabled={current.posted} onClick={(e)=>cancelEdit(e)}>
              <CancelIcon />
            </IconButton>
            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                        disabled={current.posted} onClick={(event)=>submitPost(event)}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                onClick={importData}>
              <DriveFolderUploadIcon />
            </IconButton>
            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                        onClick={reload}>
              <HourglassTopTwoToneIcon/>
            </IconButton>
            <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
                        onClick={toggle}>
              {UpDownIcon}
            </IconButton>
            <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                        onClick={()=>logout(navigate)}>
              <LogoutIcon/>
            </IconButton>
          </Grid>
        </Grid>
    )
}
export const FinancialsFormHead = ({ title, templateName, saveProps, collapse, initAdd
                                       , onNewLine, onDeleteLine,  submitCancel, submitEdit, getData, submitPrintPreview
                                      , toggle, submitPost,  reload, handleLanguageChange
                                       , navigate, language, dispatch, logout, current
                                    }:TransactionToolBarProps<ITransaction|IFinancials, ILineTransaction|ILineFinancials>)=> {

    const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
    const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
    const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon

    const sidebarShow = useSelector((state) =>
        // @ts-ignore
        state.sidebarShow)
    const mapping = (item:{id:string, name:string}) => (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    )

    return (
        <Grid container xs style={{ ...headStyle.header }} justify="flex-start">
            <Grid item justify="center" alignItems="center">
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <IoMdMenu/>
                </CHeaderToggler>
            </Grid>
            <Grid xs item justify="flex-start" alignItems="center">
                <h5>
                    <CBadge color="primary">{title}</CBadge>
                </h5>
            </Grid>

            <Grid container xs spacing={0} justify="flex-end" style={{ ...headStyle.header, paddingBottom:25 }} alignItems="flex-end">
                <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
                    <CFormSelect style={{ height: 30, paddingLeft:10}}
                        className="flex-row"
                        type="select"
                        name="language"
                        id="language-id"
                        value={language}
                        onChange={(event) => handleLanguageChange(event)}
                    >
                        {languages.map((item) => mapping(item))}
                    </CFormSelect>
                </CHeaderToggler>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={(event)=>onDeleteLine(event)} disabled={current.posted}>
                    <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
                            style={{ height: 20, padding:1}} onClick={onNewLine} disabled={current.posted}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={initAdd} >
                    <AddBoxIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={(event)=>submitEdit(event)} disabled={current.posted}>
                    <SaveIcon/>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={(event) =>submitCancel(event)} disabled={current.posted}>
                    <CancelIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={(event)=>submitPost(event)} disabled={current.posted}>
                    <CheckIcon />
                </IconButton>
              <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                          onClick={()=>submitPrintPreview(current, templateName, getData)}>
                <PrintOutlined/>
              </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>saveXlsx(saveProps)}>
                    <ArrowCircleDownIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={reload}>
                    <HourglassTopTwoToneIcon/>
                </IconButton>
                <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={toggle}>
                    {UpDownIcon}
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>logout(navigate)}>
                    <LogoutIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}
export const BalanceSheetHead = ({ style, title, submitQuery
                                  ,  t, dispatch, logout, templateFileName}:
                                { style: CSSProperties, title:string, submitQuery:(event:any)=>void
                                  , t:TFunction<'translation', undefined>
                                  , dispatch:Dispatch<any>
                                  , logout:(navigate:NavigateFunction) =>void, templateFileName:string }) => {
  const headStyle = {
    header: {
      borderRadius: 5,
      //boxShadow: '0 10px 30px #BBB',
      padding: 1,
      height: 40,
      paddingTop: 1,
      paddingBottom: 10,
    },
  }
  console.log('wordFileName>>>', templateFileName)
  // @ts-ignore
  const sidebarShow = useSelector((state) => state.sidebarShow)
  let navigate = useNavigate()
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      style={{ ...style }}
      direction="column"
    >
      <Grid container justify="space-between">
        <Grid container xs spacing={1} justify="flex-start">
          <Grid item justify="center" alignItems="center">
            <CHeaderToggler
              className="ps-1"
              onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            >
              <IoMdMenu/>
            </CHeaderToggler>
          </Grid>
          <Grid item>
            <h5>
              <CBadge color="primary">{title}</CBadge>
            </h5>
          </Grid>
          <Grid container xs spacing={0} justify="flex-end" style={{...headStyle.header}}
                alignItems="flex-end">

            {/*<IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}>*/}
            {/*  <input type="file" onInput={(event:any) =>  showFile({e: event, templateFileName: templateFileName, data: current})}/>*/}
            {/*  /!*<DriveFolderUploadIcon/>*!/*/}
            {/*</IconButton>*/}

            <Grid item justify="center" alignItems="center">
              <CHeaderToggler className="ps-1">
                <FormButton title={t('common.run')}
                            onClick={(e) => submitQuery(e)}
                            style={{textAlign: 'left', height: 25, padding: 1 }}
                            className="ps-1"/>
              </CHeaderToggler>
            </Grid>

            {/*<Grid item justify="center" alignItems="center">*/}
            {/*  <CHeaderToggler className="ps-1">*/}
            {/*    <FormButton*/}
            {/*      title={t('common.runAll')}*/}
            {/*      onClick={(e)=>submitQuery2(e)}*/}
            {/*      style={{ textAlign: 'right', height: 25, padding: 1 }}*/}
            {/*      className="ps-1"*/}
            {/*      disable={!submitQuery2===undefined && balancesheet}/>*/}
            {/*  </CHeaderToggler>*/}
            {/*</Grid>*/}

            <Grid item justify="center" alignItems="center">
              <CHeaderToggler className="ps-1">
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={()=>logout(navigate)}>
                  <LogoutIcon/>
                </IconButton>
              </CHeaderToggler>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export const JournalFormHead = ({ style, title, submitQuery, submitQuery2
                                    , balancesheet, t, dispatch, logout, templateName, current, getData
                                    , submitPrintPreview}:JournalToolBarProps<any>)=> {
    const headStyle = {
        header: {
            borderRadius: 5,
            //boxShadow: '0 10px 30px #BBB',
            padding: 1,
            height: 40,
            paddingTop: 1,
            paddingBottom: 10,
        },
    }
    console.log('wordFileName>>>', templateName())
    // @ts-ignore
    const sidebarShow = useSelector((state) => state.sidebarShow)
    let navigate = useNavigate()
    return (
        <Grid
            container
            spacing={2}
            justify="space-between"
            style={{ ...style }}
            direction="column"
        >
            <Grid container justify="space-between">
                <Grid container xs spacing={1} justify="flex-start">
                    <Grid item justify="center" alignItems="center">
                        <CHeaderToggler
                            className="ps-1"
                            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                        >
                            <IoMdMenu/>
                        </CHeaderToggler>
                    </Grid>
                    <Grid item>
                        <h5>
                            <CBadge color="primary">{title}</CBadge>
                        </h5>
                    </Grid>
                    <Grid container xs spacing={0} justify="flex-end" style={{...headStyle.header}}
                          alignItems="flex-end">
                      <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                                  onClick={()=>submitPrintPreview(current, templateName, getData)}>
                        <PrintOutlined/>
                      </IconButton>
                        <Grid item justify="center" alignItems="center">
                            <CHeaderToggler className="ps-1">
                                <FormButton title={t('common.run')}
                                    onClick={(e) => submitQuery(e, current)}
                                    style={{textAlign: 'left', height: 25, padding: 1 }}
                                    className="ps-1"/>
                            </CHeaderToggler>
                        </Grid>

                        <Grid item justify="center" alignItems="center">
                            <CHeaderToggler className="ps-1">
                            <FormButton
                                title={t('common.runAll')}
                                onClick={(e)=>submitQuery2(e, current)}
                                style={{ textAlign: 'right', height: 25, padding: 1 }}
                                className="ps-1"
                                disable={!submitQuery2===undefined && balancesheet}/>
                            </CHeaderToggler>
                        </Grid>

                        <Grid item justify="center" alignItems="center">
                            <CHeaderToggler className="ps-1">
                                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                                            onClick={()=>logout(navigate)}>
                                    <LogoutIcon/>
                                </IconButton>
                            </CHeaderToggler>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const TextareaField = ({ fieldName, value, current, setCurrent, rows, disabled, style
                           , placeholder,  onChange}:
                       { fieldName:string, value:any, current:any, setCurrent:(arg:any)=>void, rows?:number|undefined, disabled:boolean
                           , style?: CSSProperties | undefined, placeholder?:string, onChange?:(event:any)=>void }) => {
    return (
        <CFormTextarea
            id={fieldName?.concat('id')}
            name={fieldName}
            disabled={disabled}
            rows={rows ? rows : 1}
            style={style ? style : { height: 30 }}
            placeholder={placeholder ? placeholder : fieldName}
            value={value}
            onChange={onChange?onChange:(event:any) => {
                setCurrent({...current, [fieldName]: event.target.value})
            }}
        />
    )
}
const InputField = ({ fieldName, type, current, setCurrent, value, disabled, style, onChange }:
                    { fieldName:string, type?:'text', current:any, setCurrent:(arg:any)=>void, value:any
                        , disabled?:boolean, style?: CSSProperties | undefined, onChange?:(event:any)=>void}) => {
    const style_ = style ? style : { height: 20 }
    //onChange=(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })
    return (
        <CFormInput
            type={type ? type : 'text'}
            id={fieldName?.concat('id')}
            className="input-sm"
            disabled={disabled}
            style={style_}
            value={value}
            placeholder={fieldName}
            onChange={onChange?onChange:(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })}
        />
    )
}

const BooleanField = ({ fieldName, label, current, setCurrent
                          , checked, disabled, style, styleC, onChange }:
                      { fieldName:string, label:string, current:any, setCurrent:(arg:any)=>void, checked:boolean
                          , disabled?:boolean, style?: CSSProperties | undefined, styleC?: CSSProperties | undefined
                          , onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <FormControlLabel
            id={fieldName?.concat('id')}
            disabled={disabled}
            required
            control={
                <Checkbox
                    style={styleC}
                    checked={checked}
                    onChange={onChange ? onChange : (event: React.ChangeEvent<HTMLInputElement>) => {
                        setCurrent({...current, [fieldName]: event.target.checked})
                    }}
                />}
            label={label}
            color="success"
            value={checked}
            style={style}
        />
    )
}
const FieldLabel = ({ title }:{ title:string}) => {
    return (
        <CFormLabel htmlFor="input-small">
            {title}
        </CFormLabel>
    )
}
const FormButton = ({ title, type, color, style, size, height, onClick, className, disable }:
                    { title:string, type?: "submit" | "reset" | "button" | undefined, color?:string
                        , style?: CSSProperties | undefined, size?:'sm'|'lg', height?:number, onClick: MouseEventHandler<any> | undefined
                        , className?: string | undefined,  disable?:boolean}) => {
    return (
        <CButton
            type={type ?? 'submit'}
            size={size ?? 'sm'}
            color={color ?? 'primary'}
            disabled={disable ? disable : false}
            className={className}
            style={style ?? { height: height }}
            onClick={onClick}>
            <i className="fa fa-dot-circle-o">{title}</i>
        </CButton>
    )
}
const DatePickerField = ({ fieldName,  current, setCurrent, selected, label, disabled, onChange }:
                         { fieldName:string,  current:any, setCurrent?:(arg:any)=>void, selected:Date
                          , label:string, disabled:boolean, onChange?:(event:any)=>void} ) => {

    return (
        <DatePicker
            disabled={disabled}
            selected={selected}
            title={label}
            showTimeInput
            calendarClassName="custom-calendar"
            z-Index ={9999}
            className="text-center date-picker-reports"
            dateFormat="dd.MM.YYYY"
            id={fieldName?.concat('id')}
            onChange={ onChange ? onChange :(newValue) => {
              setCurrent?({...current, [fieldName]: newValue}):void(0)
            }}
        />
    )
}

export const AccountMainForm = ({current, setCurrent, accData, t, disable}:AccountMainProps) => {

    const currentAccount = accData?.find((acc: { id: any }) => acc.id === current?.account)??initAcc[0]

    return (
        <Grid container spacing={0} style={styles.outer}>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.id')}</div>
                        </Grid>
                        <Grid item sm ={2} xs={2} justify="flex-end">
                            <InputField
                                fieldName="id"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.id}
                                disabled={disable}
                                style={{ height: 20}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.enterdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="enterdate"
                                label={t('common.enterdate')}
                                selected={current.enterdate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Name */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('account.name')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={10} justify="flex-end">
                            <InputField
                                fieldName="name"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.name}
                                disabled={disable}
                                style={{ height: 20, width: 1000 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.changedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="changedate"
                                label={t('common.changedate')}
                                selected={current.changedate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**InputVat postingdate */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.account')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ { value:currentAccount?currentAccount.id:''
                                    , label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(value:any, _event:any) => setCurrent({...current,
                                        account:value /*, accountName: _event?.name*/})}
                                values={accData.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.postingdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="postingdate"
                                label={t('common.postingdate')}
                                selected={current.postingdate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**OutputVat company */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <div>{t('common.description')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch"  spacing={1}>
                            <TextareaField
                                fieldName="description"
                                placeholder={t('common.description')} // eslint-disable-next-line react/prop-types
                                value={current.description}
                                disabled={disable}
                                rows={2}
                                current={current}
                                setCurrent={setCurrent}
                                style={{ width: 1000 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.company')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField fieldName="company" current={current}
                                        setCurrent={setCurrent}
                                        value={current.company}
                                        disabled={disable}
                                        style={{ height: 20,width: 80, textAlign: 'right' }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**isDebit isBalancesheet */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <BooleanField
                                fieldName="isDebit" current={current}
                                setCurrent={setCurrent}
                                label={t('account.debit_credit')}
                                disabled={disable}
                                checked={current.isDebit}
                                style={{ height: 30, paddingLeft: 2 }}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <BooleanField
                                fieldName="balancesheet" current={current}
                                setCurrent={setCurrent}
                                label={t('account.balancesheet')}
                                disabled={disable}
                                checked={current.balancesheet}
                                style={{ height: 30, paddingLeft: 20, width:150 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.currency')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-end">
                            <InputField fieldName="currency" current={current}
                                        setCurrent={setCurrent}
                                        value={current.currency}
                                        disabled={disable}
                                        style={{ height: 20, textAlign: 'right' }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
// export const CloseAccountingPeriodForm = (props) => {
//   /* eslint-disable-next-line react/prop-types */
//   const { current, setCurrent, token, company, incomeStmtAcc, navigate, t, height } = props
//   console.log('props', props)
//   const submitQuery = (event:any) => {
//     event.preventDefault()
//     const url = MASTERFILE.closeAccountPeriod
//         .concat('/')
//         .concat(incomeStmtAcc)
//         .concat('/') // eslint-disable-next-line react/prop-types
//         .concat(current.period)
//         .concat('/')
//         .concat(company)
//     Get(url, token, navigate, null)
//   }
//   return (
//       <>
//         <CInputGroup  style={{ height: height }}>
//           <Col sm="1">
//             <FieldLabel title={t('closeAccountingPeriod.account')} size="sm" />
//           </Col>
//           <Col sm="1.5" style={{ height: 30 }}>
//             <InputField
//                 fieldName="account"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={incomeStmtAcc}
//                 disabled={false}
//                 style={{ paddingLeft: 0 }}
//             />
//           </Col>
//           <Col sm="2" style={{ height: 30, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.period')} size="sm" />
//           </Col>
//           <Col sm="1" style={{ height: height }}>
//             <InputField
//                 fieldName="period"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.period}
//                 disabled={false}
//                 style={{ height: height, textAlign: 'right' }}
//             />
//           </Col>
//           <Col sm="1" style={{ height: height, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.company')} size="sm" />
//           </Col>
//           <Col sm="1" style={{ height: height }}>
//             <InputField
//                 fieldName="company"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.company}
//                 disabled={false}
//                 style={{ height: height, textAlign: 'right' }}
//             />
//           </Col>
//           <Col sm="2" style={{ paddingLeft: 10 }}>
//             <FormButton title={t('closeAccountingPeriod.close')} onClick={(e:any) => submitQuery(e)} />
//           </Col>
//         </CInputGroup>
//       </>
//   )
// }
// export const CreateDepreciationTransactionForm = (props) => {
//   /* eslint-disable-next-line react/prop-types */
//   const { current, setCurrent, token, company, navigate, t, height } = props
//   //console.log('props', props)
//   const submitQuery = (event:any) => {
//     event.preventDefault()
//     const url = MASTERFILE.createDepreciationTransaction
//         .concat('/')
//         .concat(current.period)
//         .concat('/')
//         .concat(company)
//     Get(url, token, navigate, null)
//   }
//   return (
//       <>
//         <CInputGroup  style={{ height: height }}>
//           <Col sm="2" style={{ height: 30, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.period')} size="sm" />
//           </Col>
//           <Col sm="1" style={{ height: height }}>
//             <InputField
//                 fieldName="period"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.period}
//                 disabled={false}
//                 style={{ height: height, textAlign: 'right' }}
//             />
//           </Col>
//           <Col sm="1" style={{ height: height, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.company')} size="sm" />
//           </Col>
//           <Col sm="1" style={{ height: height }}>
//             <InputField
//                 fieldName="company"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.company}
//                 disabled={false}
//                 style={{ height: height, textAlign: 'right' }}
//             />
//           </Col>
//           <Col sm="2" style={{ paddingLeft: 10 }}>
//             <FormButton
//                 title={t('createDepreciationTransaction.generate')}
//                 onClick={(e) => submitQuery(e)}
//             />
//           </Col>
//         </CInputGroup>
//       </>
//   )
// }
// export const CreatePayrollTransactionForm = (props) => {
//   /* eslint-disable-next-line react/prop-types */
//   const { current, setCurrent, company, token, navigate, t, height } = props
//   const submitQuery = (event:any) => {
//     event.preventDefault() // eslint-disable-next-line react/prop-types
//     const url = MASTERFILE.createPayrollTransaction
//         .concat('/') // eslint-disable-next-line react/prop-types
//         .concat(company)
//     Get(url, token, navigate, null)
//   }
//   return (
//       <>
//         <CInputGroup  style={{ height: height }}>
//           <Col sm="1" style={{ height: height, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.id')} size="sm" />
//           </Col>
//           <Col sm="1.5" style={{ height: height }}>
//             <InputField
//                 fieldName="id"
//                 current={current}
//                 setCurrent={setCurrent} /
//                 value={current.id}
//                 disabled={false}
//                 style={{ paddingLeft: 0 }}
//             />
//           </Col>
//           <Col sm="2" style={{ height: height, paddingLeft: 10, paddingTop: 5 }}>
//             <FieldLabel title={t('common.company')} size="sm" />
//           </Col>
//           <Col sm="1">
//             <InputField
//                 fieldName="company"
//                 current={current}
//                 setCurrent={setCurrent}

//                 value={current.company}
//                 disabled={false}
//                 style={{ height: height, textAlign: 'right' }}
//             />
//           </Col>
//           <Col sm="2" style={{ paddingLeft: 10 }}>
//             <FormButton
//                 title={t('createPayrollTransaction.generate')}
//                 onClick={(e) => submitQuery(e)}
//                 size="xs"
//             />
//           </Col>
//         </CInputGroup>
//       </>
//   )
// }
export const BankStatementParameterForm = ({ current, setCurrent, t, height }:BankStatementParamProps) => {

    return (
        <>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="1">
                    <FieldLabel title={t('bankstatement.header')}  />
                </CCol>
                <CCol sm="1.5" style={{ height: 30 }}>
                    <InputField
                        fieldName="header"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.header}
                        disabled={false}
                        style={{ paddingLeft: 0 }}
                    />
                </CCol>
                <CCol sm="1" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('bankstatement.char')} />
                </CCol>
                <CCol sm="1" style={{ height: 30 }}>
                    <InputField
                        fieldName="char"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.char}
                        disabled={false}
                        style={{ paddingLeft: 0 }}
                    />
                </CCol>
                <CCol sm="1" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('bankstatement.extension')}/>
                </CCol>
                <CCol sm="1" style={{ height: 30 }}>
                    <InputField
                        fieldName="extension"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.extension}
                        //placeholder=".CSV"
                        disabled={false}
                        style={{ paddingLeft: 0 }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height, paddingTop: 5 }}>
                <CCol sm="1">
                    <FieldLabel title={t('bankstatement.path')} />
                </CCol>
                <CCol sm="12" md="10">
                    <InputField
                        fieldName="path"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.path}
                        disabled={false}
                        style={{ paddingLeft: 0 }}
                    />
                </CCol>
            </CInputGroup>
        </>
    )
}
export const BankStatementMainForm = ({ collapse, current, setCurrent, t, locale, currency /*, height*/}:BankStatementProps) => {

    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:30
        },
        fuller40H: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:60
        },
        paddingLeft10: {
            paddingLeft: 10,
        },
        paddingLeft20: {
            paddingLeft: 20,
        },
        height40: {
            height: 40,
        },
    }
    return (
        <Grid container spacing={0} style={{...styles.outer, display: !collapse?'none':''}}>
            {/**Id, enterdate*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.id')}</div>
                        </Grid>
                        <Grid item sm ={3} xs={10} justify="flex-start">
                            <InputField
                                fieldName="id"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.id}
                                disabled={current.posted}
                                style={{ textAlign: 'right', height: 20, width: 200 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.postingdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="enterdate"
                                label={t('common.postingdate')}
                                selected={current.postingdate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Depositor, valuedate*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('bankstatement.depositor')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start">
                            <InputField
                                fieldName="depositor"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.depositor}
                                disabled={current.posted}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('bankstatement.valuedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="valuedate"
                                label={t('bankstatement.valuedate')}
                                selected={current.valuedate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={current.posted}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Beneficiary, postingtext*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('bankstatement.beneficiary')}</div>
                        </Grid>
                        <Grid item sm ={5} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="beneficiary"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.beneficiary}
                                disabled={current.posted}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('bankstatement.postingtext')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName="postingtext"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.postingtext}
                                disabled={current.posted}
                                style={{ textAlign: 'left', width: 190, height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Info, valuedate*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('bankstatement.info')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start">
                            <InputField
                                fieldName="info"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.info}
                                disabled={current.posted}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('bankstatement.amount')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName="amount"
                                current={current}
                                setCurrent={setCurrent}
                                value={Number(current.amount).toLocaleString(locale, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                    style: 'currency',
                                    currency: currency,
                                })}
                                disabled={current.posted}
                                style={{ textAlign: 'right', width: 140, height: 20 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**IBAN, company*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('bankstatement.companyIban')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start">
                            <InputField
                                fieldName="companyIban"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.companyIban}
                                disabled={current.posted}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.company')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName="company"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.company}
                                disabled={true}
                                style={{ textAlign: 'right', padding: 2, width: 120 }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Accountno, accountno*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('bankstatement.accountno')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start">
                            <InputField
                                fieldName="accountno"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.accountno}
                                disabled={current.posted}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('bankstatement.bankCode')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName="bankCode"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.bankCode}
                                disabled={true}
                                style={{ textAlign: 'left', padding: 2, width: 120 }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item sm={12} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={1} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('bankstatement.purpose')}</div>
                        </Grid>
                        <Grid item sm={11} xs={12} justify="flex-start" alignItems="stretch">
                            <TextareaField
                                fieldName="purpose"
                                placeholder={t('common.purpose')}
                                disabled={current.posted}
                                value={current.purpose}
                                current={current}
                                setCurrent={setCurrent}
                                style={{ height: 50 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export const AssetMainForm =
  ({ current, setCurrent, t, accData, height, disable, locale } :AssetProps) => {

    const amountLabel = t('asset.amount')
    const scrapValueLabel = t('asset.scrapValue')
    console.log('locale', locale)
    return (
        <>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.id')} />
                </CCol>
                <CCol sm="4">
                    <InputField
                        fieldName="id"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.id}
                        disabled={disable}
                        style={{ height: 30 }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('common.enterdate')} />
                </CCol>
                <CCol sm="2">
                    <DatePickerField
                        fieldName="enterdate"
                        label={t('common.enterdate')}
                        selected={current.enterdate}
                        current={current}
                        setCurrent={setCurrent}
                        disabled={true}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.name')} />
                </CCol>
                <CCol sm="4">
                    <InputField
                        fieldName="name"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.name}
                        disabled={disable}
                        style={{ height: 30 }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('common.changedate')} />
                </CCol>
                <CCol sm="2">
                    <DatePickerField
                        fieldName="changedate"
                        label={t('common.changedate')}
                        selected={current.enterdate}
                        current={current}
                        setCurrent={setCurrent}
                        disabled={true}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.account')} />
                </CCol>
                <CCol sm="4">
                  <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
                     data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                    styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                </CCol>
                <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
                    <FieldLabel title={t('common.postingdate')} />
                </CCol>
                <CCol sm="2">
                    <DatePickerField
                        fieldName="postingdate"
                        label={t('common.postingdate')}
                        selected={current.postingdate}
                        current={current}
                        setCurrent={setCurrent}
                        disabled={true}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.oaccount')} />
                </CCol>
                <CCol sm="4">
                  <MasterfileXComboBox fieldName={'oaccount'} current={current} setCurrent={setCurrent}
                      data={accData.slice()} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                      styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                </CCol>
                <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
                    <FieldLabel title={ t('common.currency')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="currency"
                        current={current}
                        setCurrent={setCurrent}
                        value={ current.currency}
                        disabled={true}
                        style={{ height: 30, textAlign: 'left', padding:5 }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={ `${amountLabel}/${scrapValueLabel}`} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="amount"
                        current={current}
                        setCurrent={setCurrent}
                        value={ Number(current.amount).toFixed(2)}
                        onChange={(event:any) => setCurrent({ ...current, amount: Number(event.target.value) })}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: height, paddingLeft: 5 }}>
                    <InputField
                        fieldName="scrap_value"
                        current={current}
                        setCurrent={setCurrent}
                        value={Number(current.scrapValue)}
                        onChange={(event:any) => setCurrent({ ...current, scrapValue: Number(event.target.value) })}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('asset.lifeSpan')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="life_span"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.lifeSpan}
                        onChange={(event:any) => setCurrent({ ...current, lifeSpan: Number(event.target.value) })}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('asset.depreciation')} />
                </CCol>
                <CCol sm="4">
                    <InputField
                        fieldName="dep_Method"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.depMethod}
                        onChange={(event:any) => setCurrent({ ...current, depMethod: Number(event.target.value) })}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
                    <FieldLabel title={t('asset.frequency').concat('/').concat(t('asset.rate'))} />
                </CCol>
                <CCol sm="1">
                    <InputField
                        fieldName="frequency"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.frequency}
                        onChange={(event:any) => setCurrent({ ...current, frequency:Number(event.target.value)})}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
                <CCol sm="1" style={{ height: height, paddingLeft: 6 }}>
                    <InputField
                        fieldName="rate"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.rate}
                        onChange={(event:any) => setCurrent({ ...current, rate:Number(event.target.value) })}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol md="2">
                    <FieldLabel title={t('common.description')} />
                </CCol>
                <CCol xs="12" md="9">
                    <TextareaField
                        fieldName="description"
                        placeholder={t('common.description')}
                        disabled={disable}
                        value={current.description}
                        current={current}
                        setCurrent={setCurrent}
                    />
                </CCol>
            </CInputGroup>
        </>
    )
}

export const MasterfilesForm2 =
  ({ current, setCurrent, accData, t,  disable}:MasterfileProps2<IMasterfile2>) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller}>
            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.id')}</div>
            </Grid>
            <Grid item sm ={4} xs={2} justify="flex-end">
              <InputField
                fieldName="id"
                current={current}
                setCurrent={setCurrent}
                value={current.id}
                disabled={disable}
                style={{ height: 20}}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={STYLES.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.enterdate')}</div>
            </Grid>
            <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="enterdate"
                label={t('common.enterdate')}
                selected={current.enterdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**Name */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          <Grid container maximize style={STYLES.fuller} justify="flex-start" alignItems="stretch"  >
            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div >{t('common.name')}</div>
            </Grid>
            <Grid item sm ={10} xs={10} justify="flex-start" alignItems="stretch">
              <InputField
                fieldName="name"
                current={current}
                setCurrent={setCurrent}
                value={current.name}
                disabled={disable}
                style={{ height: 20, width: 300 }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={STYLES.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.changedate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="changedate"
                label={t('common.changedate')}
                selected={current.changedate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**InputVat */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize style={STYLES.fuller} justify="flex-start" alignItems="stretch">
            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{current.hasOwnProperty('parent') && current.parent?t('common.parent'):null}</div>
            </Grid>
            <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
              { current.hasOwnProperty('parent')?// && current.parent?
                <MasterfileXComboBox fieldName={'parent'} current={current} setCurrent={setCurrent}
                    data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                :null}

            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={STYLES.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.postingdate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="postingdate"
                label={t('common.postingdate')}
                selected={current.postingdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**OutputVat */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize style={STYLES.fuller40H} justify="flex-start" alignItems="stretch">
            <Grid item sm={2} xs={12}
                  justify="flex-start" alignItems="flex-start">
              <div>{t('common.description')}</div>
            </Grid>
            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
              <TextareaField
                fieldName="description"
                placeholder={t('common.description')}
                disabled={disable}
                value={current.description}
                current={current}
                setCurrent={setCurrent}
                style={{ width: 1000 }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={STYLES.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.company')}</div>
            </Grid>
            <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
              <InputField fieldName="company" current={current}
                          setCurrent={setCurrent}
                          value={current.company}
                          disabled={disable}
                          style={{ height: 20,width: 80, textAlign: 'right' }}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export const MasterfilesMainForm2 = ({collapse,  current, setCurrent, accData, t,  disable, height}:MasterfileProps2<IMasterfile2>) =>
     (
        <Grid container spacing={0} style={{...STYLES.outer0, display: !collapse?'none':''}}>
            <MasterfilesForm2 collapse ={collapse} current ={current} setCurrent={setCurrent} accData={accData} t={t} disable={disable} height={height}/>
        </Grid>
    )


export const PayrollTaxForm = ({ current, setCurrent, disable, t, locale, currency, height }:
                               { current:IPayrollTaxRange, setCurrent:(arg:IPayrollTaxRange)=>void,  t:TFunction<'translation', undefined>
                                   , disable:boolean, locale:string, currency:string, height:number }) => {
    return (
        <>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.id')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="id"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.id}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right' }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('payroll.tax.range.from')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="fromAmount"
                        current={current}
                        setCurrent={setCurrent}
                        disabled={disable}
                        value={Number(current.fromAmount ?? 0.0).toLocaleString(locale, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: currency,
                        })}
                        style={{ height: 30, textAlign: 'right' }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: height, paddingLeft: 10, paddingTop: 2 }}>
                    <FieldLabel title={t('payroll.tax.range.to')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="toAmount"
                        current={current}
                        setCurrent={setCurrent}
                        disabled={disable}
                        value={Number(current.toAmount ?? 0.0).toLocaleString(locale, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: currency,
                        })}
                        style={{ height: 30, textAlign: 'right' }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('payroll.tax.range.tax')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="tax"
                        current={current}
                        setCurrent={setCurrent}
                        disabled={disable}
                        value={Number(current.tax ?? 0.0).toLocaleString(locale, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: currency,
                        })}
                        style={{ height: 30, textAlign: 'right' }}
                    />
                </CCol>
                <CCol sm="2" style={{ height: height, paddingLeft: 10, paddingTop: 2 }}>
                    <FieldLabel title={t('payroll.tax.range.class')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="taxClass"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.taxClass}
                        disabled={disable}
                        style={{ height: 30, textAlign: 'right' }}
                    />
                </CCol>
            </CInputGroup>
            <CInputGroup  style={{ height: height }}>
                <CCol sm="2">
                    <FieldLabel title={t('common.company')} />
                </CCol>
                <CCol sm="2">
                    <InputField
                        fieldName="company"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.company}
                        disabled={true}
                        style={{ height: 30, padding: 2, textAlign: 'right' }}
                    />
                </CCol>
            </CInputGroup>
        </>
    )
}

export const    MasterfileMainBaseForm:FC<MasterfileProps<IMasterfile>> = ({ current, setCurrent, disable, t,  height })=> {

  return (
    <>
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.id')}</div>
            </Grid>
            <Grid item sm ={2} xs={2} justify="flex-end">
              <InputField
                fieldName="id"
                current={current}
                setCurrent={setCurrent}
                value={current.id}
                disabled={disable}
                style={{ height: height}}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.enterdate')}</div>
            </Grid>
            <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="enterdate"
                label={t('common.enterdate')}
                selected={current.enterdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**Name */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div >{t('common.name')}</div>
            </Grid>
            <Grid item sm ={10} xs={10} justify="flex-end">
              <InputField
                fieldName="name"
                current={current}
                setCurrent={setCurrent}
                value={current.name}
                disabled={disable}
                style={{ height: height }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.changedate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="changedate"
                label={t('common.changedate')}
                selected={current.changedate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/** Description */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.description')}</div>
            </Grid>
            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
              <TextareaField
                fieldName="description"
                placeholder={t('common.description')}
                disabled={disable}
                value={current.description}
                current={current}
                setCurrent={setCurrent}
                style={{ width: 500 }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.postingdate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="postingdate"
                label={t('common.postingdate')}
                selected={current.postingdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**Description */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
            <Grid item sm ={12} xs={2} justify="flex-start" alignItems="flex-start">
              <div></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item  sm={4}  xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.company')}</div>
            </Grid>
            <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
              <InputField
                fieldName="company"
                current={current}
                setCurrent={setCurrent}
                value={current.company}
                disabled={true}
                style={{ height: height, width: 90, textAlign: 'right' }}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export const    FModuleMainForm:FC<FModuleProps2<IFmodule>> = ({collapse, current, setCurrent, accData, accountData, rowData, disable, t,  height })=> {

    return (
      <Grid container spacing={0}  style={{...STYLES.outer0, display: !collapse?'none':''}} >
        <MasterfilesForm2 collapse ={collapse} current ={current} setCurrent={setCurrent} accData={accData} t={t} disable={disable} height={height}/>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller}>
            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.account')}</div>
            </Grid>
            <Grid item sm ={10} xs={2} justify="flex-end">
              <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
                 data={accountData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
            </Grid>
          </Grid>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller}>
            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.copyFrom')}</div>
            </Grid>
            <Grid item sm ={10} xs={2} justify="flex-end">
              <MasterfileXComboBox fieldName={'copyFrom'} current={current} setCurrent={setCurrent}
                   data={rowData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}


export const MasterfileMainForm:FC<MasterfileProps<IMasterfile>> = ({collapse, current, setCurrent, disable, t,  height }) => {
    return (
        <Grid container spacing={0}  style={{...STYLES.outer0, display: !collapse?'none':''}} >
            <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                    disable ={disable} t ={t} height ={height}/>
        </Grid>
    )
}
export const RoleMainForm = ({collapse, current, setCurrent, disable, t,  height }: MasterfileProps<IRole>) => {
    return (
        <Grid container spacing={0}  style={{...STYLES.outer0, display: !collapse?'none':''}} >
            <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                     disable ={disable} t ={t}  height ={height}/>
        </Grid>
    )
}
export const PermissionMainForm = ({collapse, current, setCurrent, disable, t,  height }: MasterfileProps<IPermission>) => {
  const  current1:IPermission = current
  return (
    <Grid container spacing={0}  style={{...STYLES.outer0, display: !collapse?'none':''}} >
      <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                              disable ={disable} t ={t}  height ={height}/>
      <Grid item sm={8} xs={2}>
        <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller}>
          <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
            <div>{t('common.permission')}</div>
          </Grid>
          <Grid item sm ={2} xs={2} justify="flex-end">
            <InputField
              fieldName="permission"
              current={current1}
              setCurrent={setCurrent}
              value={current1.short}
              disabled={disable}
              style={{ height: height}}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const ArticleGeneralForm:FC<ArticleGeneralFormProps> =
    ({ current, setCurrent,  t, quantityUnitData, groupData, disable }) => {

        return (
            <Grid container spacing={0} style={styles.outer}>
                {/**Id, enterdate*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.id')}</div>
                            </Grid>
                            <Grid item sm ={3} xs={10} justify="flex-start">
                                <InputField
                                    fieldName="id"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.id}
                                    disabled={disable}
                                    style={{ height: 20, width: 120 }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                           <BooleanField
                               fieldName="stocked" current={current}
                               setCurrent={setCurrent}
                               label={t('article.stocked')}
                               disabled={disable}
                               checked={current.stocked}
                               style={{height: 20, paddingLeft: 2, fontSize: 10}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/**Name, changedate*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('common.name')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5} justify="flex-start">
                                <InputField
                                    fieldName="name"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.name}
                                    disabled={disable}
                                    style={{ height: 20 }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.changedate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <DatePickerField
                                    fieldName="changedate"
                                    label={t('common.changedate')}
                                    selected={current.changedate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**QuantityUnit, changedate */}
                {/**PPrice, SPrice, AVGPrice, changedate*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('article.quantityUnit')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                              <MasterfileXComboBox fieldName={'quantityUnit'} current={current} setCurrent={setCurrent}
                                   data={quantityUnitData} defaultValue={initQuantity[0]} zIndex={11} disable={disable}
                                 styles={{...styles, minHeight:25, height:25, minWidth:430, width:'100%', color: '#6b7280'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.postingdate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <DatePickerField
                                    fieldName="postingdate"
                                    label={t('common.postingdate')}
                                    selected={current.changedate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**PackUnit, PPrice*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('article.packUnit')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                              <MasterfileXComboBox fieldName={'packUnit'} current={current} setCurrent={setCurrent}
                                  data={quantityUnitData} defaultValue={initQuantity[0]} zIndex={11} disable={disable}
                                  styles={{...styles, minHeight:25, height:25, minWidth:350, width:'100%', color: '#6b7280'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('article.pprice')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={4} justify="flex-start" alignItems="stretch">
                                <InputField
                                    fieldName="pprice"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={Number(current?.pprice).toFixed(2)}
                                    disabled={disable}
                                    style={{ height: 20, width:140, textAlign: 'right', padding: 2, fontSize:12}}
                                />
                                <FieldLabel  title={current.currency}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                 {/**Group, PPrice*/}
                <Grid container spacing={1}>
                  <Grid item sm={8} xs={2}>
                      <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                          <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                              <div>{t('article.group')}</div>
                          </Grid>
                          <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <MasterfileXComboBox fieldName={'parent'} current={current} setCurrent={setCurrent}
                                  data={groupData} defaultValue={initArticleGroup[0]} zIndex={11} disable={disable}
                                 styles={{...styles, minHeight:25, height:25, minWidth:430, width:'100%', color: '#6b7280'}}/>
                          </Grid>
                      </Grid>
                  </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('article.sprice')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={4} justify="flex-start" alignItems="stretch">
                                <InputField
                                    fieldName="sprice"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={Number(current?.sprice).toFixed(2)}
                                    disabled={disable}
                                    style={{ height: 20, width:140, textAlign: 'right', padding:5, fontSize:12}}
                                />
                                <FieldLabel  title={current.currency}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**Description, avgPrice */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.description')}</div>
                            </Grid>
                            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                                <TextareaField
                                    fieldName="description"
                                    placeholder={t('common.description')}
                                    disabled={disable}
                                    value={current.description}
                                    current={current}
                                    setCurrent={setCurrent}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item  sm={2} xs={3} justify="flex-start" alignItems="flex-start">
                                <div>{t('article.avgPrice')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={4} justify="flex-start" alignItems="stretch">
                                <InputField
                                    fieldName="avgPrice"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={Number(current?.avgPrice).toFixed(2)}
                                    disabled={disable}
                                    style={{ height: 20, width:140, textAlign: 'right', padding: 5, fontSize:12}}
                                />
                                <FieldLabel  title={current.currency}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

export const ArticleQRForm:FC<ArticleQRFormProps> =
  ({ current }) => {

    return (
      <Grid container spacing={0} style={{...styles.outer, minWidth:'100%', height: 260, maxWidth: 1000, display: 'flex'}}>
        {/**QR Code */}
          <Grid item sm={12} xs={2}>
            <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>

              <Grid item sm ={8} xs={2} justify="flex-start" alignItems="stretch">
                  <QRCode fgColor ={'#000000'} bgColor ={'#FFFFFF'}
                    size={256}
                    style={{ height: "auto", background: 'white', padding: '15px',  paddingRight:'15px'}}
                    title={current.name}
                    value={`${current.id}${current.name}`}
                    viewBox={`0 0 256 256`}
                  />
               </Grid>
              <Grid item sm ={4} xs={4} justify="flex-end" alignItems="stretch">
                  <img src="/apple-icon-180x180.png" alt="product.name"   style={{ padding: '20px',   paddingLeft:'50px'}}/>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    )
  }

export const UserMainForm = ({ collapse, current, setCurrent, disable, t }:UserFormProps) => {

   const styles = STYLES
  return (
        <Grid container spacing={0} style={{...styles.outer, display: !collapse ? 'none' : ''}}>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.id')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} justify="flex-end">
                            <InputField
                                fieldName="id"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.id}
                                //placeholder="User-id"
                                disabled={disable}
                                //style={{height: height}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.enterdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="enterdate"
                                label={t('common.enterdate')}
                                selected={new Date()}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Name */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('user.userName')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="userName"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.userName}
                                disabled={disable}
                                style={{height: 20, width: 300}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.changedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="changedate"
                                label={t('common.changedate')}
                                selected={new Date()}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**firstName */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('user.firstName')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="firstName"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.firstName}
                                disabled={disable}
                                style={{height: 20, width: 300}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.postingdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="postingdate"
                                label={t('common.postingdate')}
                                selected={new Date()}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**LastName */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('user.lastName')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="lastName"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.lastName}
                                disabled={disable}
                                style={{height: 20, width: 300}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Email */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <div>{t('common.email')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="email"
                                disabled={disable}
                                value={current.email}
                                current={current}
                                setCurrent={setCurrent}
                                style={{height: 20, width: 300}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.company')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField fieldName="company" current={current}
                                        setCurrent={setCurrent}
                                        value={current.company}
                                        disabled={disable}
                                        style={{height: 20, width: 80, textAlign: 'right'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        )

}
export const AddressForm = ({ current, setCurrent, disable, t, height }:
                            { current:IAddress, setCurrent:(arg:IAddress)=>void, disable:boolean
                                , t:TFunction<'transation', undefined>, height:number }) => {
    return (<>
            <Grid container spacing={0} style={{...styles.outer, height:120}}>
                {/*street, zip */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.street')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={2} justify="flex-end">
                                <InputField
                                    fieldName="street"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.street}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={{...styles.fuller, height:20}} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.zip')}</div>
                            </Grid>
                            <Grid item sm={6} xs={1} alignItems="stretch" justify="flex-start">
                                <InputField
                                    fieldName="zip"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.zip}
                                    disabled={disable}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*city, country */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('common.city')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={10} justify="flex-end">
                                <InputField
                                    fieldName="city"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.city}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.country')}</div>
                            </Grid>
                            <Grid item sm={6} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField
                                    fieldName="country"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.country}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*email,  */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('common.email')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={10} justify="flex-end">
                                <InputField
                                    fieldName="email"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.email}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.phone')}</div>
                            </Grid>
                            <Grid item sm={6} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField
                                    fieldName="phone"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.phone}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export const CustomerGeneralForm =
  ({current, setCurrent, ccyData, disable, t }: CustomerGeneralFormProps) => {

    return (
        <Grid container spacing={0} style={{...styles.outer, height: 200}}>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.id')}</div>
                        </Grid>
                        <Grid item sm ={2} xs={2} justify="flex-end">
                            <InputField
                                fieldName="id"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.id}
                                disabled={disable}
                                style={{ height: 20}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.enterdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="enterdate"
                                label={t('common.enterdate')}
                                selected={current.enterdate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Name */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('common.name')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={10} justify="flex-end">
                            <InputField
                                fieldName="name"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.name}
                                disabled={disable}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.changedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="changedate"
                                label={t('common.changedate')}
                                selected={current.changedate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**taxCode postingdate */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('common.taxCode')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={10} justify="flex-end">
                            <InputField
                                fieldName="taxCode"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.taxCode}
                                disabled={disable}
                                style={{ height: 20 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.postingdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="postingdate"
                                label={t('common.postingdate')}
                                selected={current.postingdate}
                                current={current}
                                setCurrent={setCurrent}
                                disabled={true}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Description  companyId*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.description')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <TextareaField
                                fieldName="description"
                                placeholder={t('common.description')}
                                disabled={disable}
                                value={current.description}
                                current={current}
                                setCurrent={setCurrent}
                                style={{ width: 500 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item  sm={4}  xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.company')}</div>
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName="company"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.company}
                                disabled={true}
                                style={{ height: 20, width: 90, textAlign: 'right' }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item  sm={2}  xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('common.currency')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} alignItems="stretch" justify="flex-start">
                          <MasterfileXComboBox fieldName={'currency'} current={current} setCurrent={setCurrent}
                                  data={ccyData} defaultValue={initCurrency[0]} zIndex={11} disable={disable}
                             styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export const CompanyGeneralForm =
  ({current, setCurrent, ccyData, disable, t }: CustomerGeneralFormProps) => {
  return (
    <Grid container spacing={0} style={{...styles.outer}}>
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div>{t('common.id')}</div>
            </Grid>
            <Grid item sm ={2} xs={2} justify="flex-end">
              <InputField
                fieldName="id"
                current={current}
                setCurrent={setCurrent}
                value={current.id}
                disabled={disable}
                style={{ height: 20}}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.enterdate')}</div>
            </Grid>
            <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="enterdate"
                label={t('common.enterdate')}
                selected={current.enterdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**Name */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div >{t('common.name')}</div>
            </Grid>
            <Grid item sm ={10} xs={10} justify="flex-end">
              <InputField
                fieldName="name"
                current={current}
                setCurrent={setCurrent}
                value={current.name}
                disabled={disable}
                style={{ height: 20 }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.changedate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="changedate"
                label={t('common.changedate')}
                selected={current.changedate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**taxCode postingdate */}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={2}>
          <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
              <div >{t('common.taxCode')}</div>
            </Grid>
            <Grid item sm ={10} xs={10} justify="flex-end">
              <InputField
                fieldName="taxCode"
                current={current}
                setCurrent={setCurrent}
                value={current.taxCode}
                disabled={disable}
                style={{ height: 20 }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.postingdate')}</div>
            </Grid>
            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
              <DatePickerField
                fieldName="postingdate"
                label={t('common.postingdate')}
                selected={current.postingdate}
                current={current}
                setCurrent={setCurrent}
                disabled={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/**currency*/}
      <Grid container spacing={1}>
        <Grid item sm={8} xs={6}>
          <Grid container maximize style={styles.fuller} alignItems="stretch">
            <Grid item  sm={2}  xs={2} alignItems="stretch" justify="flex-start">
              <div>{t('common.currency')}</div>
            </Grid>
            <Grid item sm={10} xs={10} alignItems="stretch" justify="flex-start">
              <MasterfileXComboBox fieldName={'currency'} current={current} setCurrent={setCurrent}
                   data={ccyData} defaultValue={initCurrency[0]} zIndex={11} disable={disable}
                   styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const StoreGeneralForm = ({collapse, current, setCurrent, disable, t, height}: StoreGeneralFormProps) => {
    return (
      <Grid container spacing={0}  style={{...styles.outer, display: !collapse?'none':''}} >
        <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                disable ={disable} t ={t} height ={height}/>
      </Grid>
    )
}

const FromPeriod = ({ name, label, value, current, setCurrent, t, labelStyle, style }:
                    { name:string, label:string, value:any, current:any, setCurrent:(arg:any)=>void, t:TFunction<'translation', undefined>
                        , labelStyle:any, style:any }) => {
  console.log('name', name)
  console.log('value', value )
    return (
        <>
            <CCol sm="0.5" style={labelStyle}>
                <FieldLabel title={t(label)} />
            </CCol>
            <CCol sm="1" style={{ paddingLeft: 10 }}>
                <InputField
                    fieldName={name}
                    current={current}
                    setCurrent={setCurrent}
                    value={value}
                    style={style ? style : { height: 30, padding: 1, textAlign: 'right' }}
                />
            </CCol>
        </>
    )
}

// const salaryField = ({ current, setCurrent, t, disable, locale, currency}:
//                      { current:IEmployee, setCurrent:(arg:IEmployee)=>void, t:TFunction<'translation', undefined>
//                       , disable:boolean,  locale:string, currency:string }) => {
//   return (
//       current.modelid === formEnum.EMPLOYEE && (
//           <>
//             <Col sm="2" style={{ paddingLeft: 10 }}>
//               <FieldLabel title={t('employee.salary')} />
//             </Col>
//             <Col sm="2">
//               <InputField
//                   fieldName="salary"
//                   //type="currency"
//                   current={current}
//                   setCurrent={setCurrent}
//                   value={Number(current?.salary ?? 0.0).toLocaleString(locale, {
//                     maximumFractionDigits: 2,
//                     minimumFractionDigits: 2,
//                     style: 'currency',
//                     currency: currency,
//                   })}
//                   disabled={disable}
//                   style={{ textAlign: 'right', padding: 2 }}
//               />
//             </Col>
//           </>
//       )
//   )
// }

const  getAccountLabel = (current:ICustomer|ISupplier|IEmployee|IArticle|IStore
    , t:TFunction<'transalation', undefined>) =>
    current.modelid === formEnum.SUPPLIER
        ? t('supplier.account') :
        current.modelid === formEnum.CUSTOMER
            ? t('customer.account')
            :
            current.modelid === formEnum.EMPLOYEE
                ? t('employee.account')
                : t('article.stock.account')


const  getOAccountLabel = (current:ICustomer|ISupplier|IEmployee|IArticle|IStore
    , t:TFunction<'transalation', undefined>) =>
    current.modelid === formEnum.SUPPLIER ? t('supplier.oaccount')
        :
        current.modelid === formEnum.CUSTOMER
            ? t('customer.oaccount')
            :
            current.modelid === formEnum.EMPLOYEE
                ? t('employee.oaccount')
                : t('article.expense.account')

const setTransactionR = ( transaction:ITransaction
    , setTransaction:(arg:ITransaction)=>void
    , line:ILineTransaction
    , setCurrent:(arg:ILineTransaction)=>void) => {
    const idx = transaction.lines.findIndex((obj) => obj.id === line.id);
    const linex: ILineTransaction = {...line, transid: transaction.id1};
    (idx === -1) ? transaction.lines.push(linex) : (transaction.lines[idx] = linex)
    setTransaction(transaction)
    setCurrent(linex)
}

export const TransactionDetailsForm = (
    { transaction, setTransaction, currentLineTransaction, setCurrentLineTransaction
        , articleData, vatData, t,  disable, height }: TransactionDetailsFormProps<ITransaction, ILineTransaction> ) => {
    const current = currentLineTransaction
    const setCurrent = setCurrentLineTransaction
    const currentArticle = articleData?.find((acc: { id: any }) => acc.id === current.article)
    const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)
    console.log('currentVatX', currentVat)

    return (
        <Grid container spacing={0} style={styles.outer}>
            {/**Article,  quatity*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('transaction.line.article')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentArticle?currentArticle.id:'', label: currentArticle?`${currentArticle.id} ${currentArticle.name}` :''}}
                                onChange={(value:any, _event:any) => {
                                    const article = articleData?.find((acc: { id: any }) => acc.id === value)
                                    const currentVat = vatData?.find((vat: { id: any }) => vat.id === article?.vatCode)
                                    const percent= currentVat?.percent??0.0
                                    const vatAmount = percent*current.quantity*current.price
                                    const vatCode = currentVat?currentVat?.id:''
                                    console.log('vatAmount', vatAmount)
                                    const currentx:ILineTransaction = {...current,
                                        article: value, articleName: article ?article.name:'', unit:article ?article.quantityUnit:''
                                        // @ts-ignore
                                        ,  vatCode:vatCode, vat:vatAmount,  currency:article?article.currency:'', company:`-${transaction.company}`}
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                values={articleData.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('transaction.line.quantity')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='quantity'
                                current={current}
                                setCurrent={setCurrent}
                                value={Number(current.quantity)}
                                onChange={(event:any) => {
                                    const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*event.target.value*current.price
                                    const currentx = { ...current, quantity: event.target.value, vat:vatAmount, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={disable}
                                style={ { height: height, padding: 1, textAlign: 'right' }}
                            />
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='unit'
                                current={current}
                                setCurrent={setCurrent}
                                value={current.unit}
                                onChange={(event:any) => {
                                    const currentx = { ...current, unit: event.target.value, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={true}
                                style={ { height: height, padding: 1, paddingLeft: 15, textAlign: 'left' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Vat price */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.vatCode')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentVat?currentVat.id:'', label: currentVat?`${currentVat.id} ${currentVat.name}` :''}}
                                onChange={(value:any, _event:any) => {
                                    const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)
                                    const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*current.quantity*current.price
                                    const currentx = {...current, vatCode: value,  vat:vatAmount
                                        ,  company:`-${transaction.company}` /*, accountName: _event?.name*/}
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                values={vatData.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('transaction.line.price')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='price'
                                current={current}
                                setCurrent={setCurrent}
                                value={Number(current.price)}
                                onChange={(event:any) => {
                                    const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*current.quantity*event.target.value
                                    const currentx = { ...current, price: event.target.value, vat:vatAmount, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={disable}
                                style={ { height: height, padding: 1, textAlign: 'right' }}
                            />
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='currency'
                                current={current}
                                setCurrent={setCurrent}
                                value={current.currency}
                                disabled={true}
                                style={{ height: height, padding: 1, paddingLeft: 10, textAlign: 'left' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Text, duedate */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('transaction.line.text')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} alignItems="stretch" justify="flex-start">
                            <TextareaField
                                fieldName="text"
                                placeholder={t('transaction.line.text')}
                                disabled={disable}
                                value={current.text}
                                current={current}
                                setCurrent={setCurrent}
                                onChange={(event:any) => {
                                    const currentx = { ...current, text: event.target.value, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={2} xs={1} alignItems="stretch" justify="flex-start">
                            <div>{t('transaction.line.duedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={4} alignItems="stretch" justify="flex-start">
                            <DatePickerField
                                fieldName="duedate"
                                label={t('transaction.line.duedate')}
                                selected={current.duedate}
                                current={current}
                                setCurrent={setCurrent}
                                onChange={(_event:any) => {
                                  console.log('_event', _event)
                                    const currentx = { ...current, duedate: _event, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionR(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={disable}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
const setTransactionF = ( transaction:IFinancials
    , setTransaction:(arg:IFinancials)=>void
    , line:ILineFinancials
    , setCurrent:(arg:ILineFinancials)=>void) => {
    const idx = transaction.lines.findIndex((obj) => obj.id === line.id);
    const linex: ILineTransaction|ILineFinancials = {...line, transid: transaction.id1};
    (idx === -1) ? transaction.lines.push(linex) : (transaction.lines[idx] = linex)
    setTransaction(transaction)
    setCurrent(linex)
}
export const FinancialsDetailsForm = (
    { transaction, setTransaction, currentLineFinancials, setCurrentLineFinancials
        , accData,  t, zIndex, disable, height }: FinancialsDetailsFormProps<IFinancials, ILineFinancials>) => {
    const current = currentLineFinancials
    const setCurrent = setCurrentLineFinancials
    const currentAccount = accData?.find((acc: { id: any }) => acc.id === current.account)
    const currentOAccount = accData?.find((acc: { id: any }) => acc.id === current.oaccount)

    return (
        <Grid container spacing={0} style={styles.outer}>
            {/**Account,  Amount, currency*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('financials.line.account')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(value:any,  _event:any) => {
                                    const currentAccount = accData?.find((acc: { id: any }) => acc.id ===value)
                                    const currentx = {...current, account: value, accountName: currentAccount ?currentAccount.name:''
                                        ,  company:`-${transaction.company}`}
                                    setCurrent(currentx)
                                    setTransactionF(transaction, setTransaction, currentx, setCurrent)
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={zIndex-1}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('financials.line.amount')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='amount'
                                current={current}
                                setCurrent={setCurrent}
                                value={Number(current.amount)}
                                onChange={(event:any) => {
                                    const currentx = { ...current, amount: Number(event.target.value), company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionF(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={disable}
                                style={ { height: height, padding: 1, textAlign: 'right' }}
                            />
                        </Grid>
                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField
                                fieldName ='currency'
                                current={current}
                                setCurrent={setCurrent}
                                value={current.currency}
                                disabled={true}
                                style={ { height: height, padding: 1, textAlign: 'left' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Vat price */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('financials.line.oaccount')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentOAccount?currentOAccount.id:''
                                    , label: currentOAccount?`${currentOAccount.id} ${currentOAccount.name}` :''}}
                                onChange={(value:any, _event:any) => {
                                    const currentOAccount = accData?.find((acc: { id: any }) => acc.id === value)
                                    const currentx = {...current, oaccount: value, oaccountName: currentOAccount ?currentOAccount.name:''
                                        ,  company:`-${transaction.company}`}
                                    setCurrent(currentx)
                                    setTransactionF(transaction, setTransaction, currentx, setCurrent)
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={zIndex-2}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('financials.line.duedate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                          <DatePickerField
                            fieldName="duedate"
                            label={t('financials.line.duedate')}
                            selected={current.duedate}
                            current={current}
                            disabled={disable}
                            onChange={(_event:any) => {

                              const currentx = { ...current, duedate: _event, company:`-${transaction.company}`}
                              console.log('currentx', currentx)
                              setCurrent(currentx)
                              setTransactionF(transaction, setTransaction, currentx, setCurrent)
                            }}
                          />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Vat */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller}  alignItems="stretch">
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('financials.line.text')}</div>
                        </Grid>
                        <Grid item sm={8} xs={12} alignItems="stretch" justify="flex-start">
                            <TextareaField
                                fieldName="text"
                                placeholder={t('financials.line.text')}
                                disabled={disable}
                                value={current.text}
                                current={current}
                                setCurrent={setCurrent}
                                onChange={(_event:any) => {
                                    const currentx = { ...current, text: _event.target.value, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionF(transaction, setTransaction, currentx, setCurrent)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const setBusinessPartnerR = ( businessPartner:IBusinespartner
    , setBusinessPartner:(arg:IBusinespartner)=>void
    , selectedBankAccount:IBankAccount
    , oldBankAccount:IBankAccount
    , setCurrent:(arg:IBankAccount)=>void) => {
     const idx = businessPartner?.bankaccounts?.findIndex((obj) =>
    (obj.id === selectedBankAccount.id) || (obj.modelid === -1) || (obj.id === oldBankAccount.id))
       const bankAccount: IBankAccount = {...selectedBankAccount, owner: `${businessPartner.id}`, company:`-${businessPartner.company}`};
      (idx === -1) ? void (0) : (businessPartner.bankaccounts[idx] = bankAccount)
      setBusinessPartner(businessPartner)
      setCurrent(bankAccount)
}


export const BankAccountForm = (
    { currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner, bankData, t,  disable, height , zIndex}:BankAccountFormProps) => {
    const current = currentBankAccount
    const setCurrent = setCurrentBankAccount
    const currentBank = bankData?.find((acc: { id: any }) => acc.id === current.bic)
    console.log('currentBank', currentBank)
    return (
        <Grid container spacing={0} style={{...styles.outer, height: 100}}>
          {/* Iban  */}
          <Grid container spacing={1}>
            <Grid item sm={8} xs={2}>
              <Grid container maximize style={{...styles.fuller40H, paddingTop: 10}} justify="flex-start" alignItems="flex-start">
                <Grid item sm={2} xs={2} alignItems="flex-start" justify="flex-start">
                  <div>{t('common.iban')}</div>
                </Grid>
                <Grid item sm={8} xs={2} justify="flex-start" alignItems="stretch" >
                  <InputField
                    fieldName ='id'
                    current={current}
                    setCurrent={setCurrent}
                    value={current.id}
                    onChange={(_event:any) => {
                      const currentx = { ...current, id: _event.target.value, company:`-${current.company}` }
                      setCurrent(currentx)
                      setBusinessPartnerR( businessPartner, setBusinessPartner, currentx, current, setCurrent)
                    }}
                    disabled={disable}
                    style={ { height: height,  textAlign: 'left'}}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
            {/**Account,  accountName*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.bank')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentBank?currentBank.id:''
                                    , label: currentBank?`${currentBank.id} ${currentBank.name}` :''}}
                                onChange={(value:any, _event:any) => {
                                    const currentx:IBankAccount = {...current,
                                        bic: value, owner:`${businessPartner.id}`, company:`-${current.company}`}
                                    setCurrent(currentx)
                                    setBusinessPartnerR( businessPartner, setBusinessPartner, currentx, current, setCurrent)
                                }}
                                values={bankData.slice().sort(sortById).map(toOption)}
                                zIndex={zIndex}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export const CustomerAccountForm = (
    { current, setCurrent, accData, vatData, t,  disable }:
    {current: IArticle|ICustomer|ISupplier|IEmployee|ICompany, setCurrent: (art:any)=>void, accData: IAccount[]
        , vatData: IVat[],  t:TFunction<'transalation', undefined>,  disable: boolean, height?: number, zIndex:number}) => {
    const accountLabel = getAccountLabel(current, t)
    const oaccountLabel = getOAccountLabel(current, t)
    return (
        <Grid container spacing={0} style={{...styles.outer, height: 120}}>
            {/**Account,  accountName*/}
            <Grid container spacing={1}>
                <Grid item sm={12} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{accountLabel}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
                               data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                            styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Oaccount oaccountName */}
            <Grid container spacing={1}>
                <Grid item sm={12} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{oaccountLabel}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'oaccount'} current={current} setCurrent={setCurrent}
                              data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                            styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
                {/**Vat */}
                {!current.hasOwnProperty('vatCode') && !current.hasOwnProperty('vatcode') ? null:
                    <Grid item sm={12} xs={2}>
                        <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.vatCode')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                              <MasterfileXComboBox fieldName={'vatCode'} current={current} setCurrent={setCurrent}
                                 data={vatData} defaultValue={initVat[0]} zIndex={11} disable={disable}
                                 styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}
export const CompanyAccountForm = (
    { current, setCurrent, accData, vatData, t,  disable }:
    {current: ICompany, setCurrent: (art:any)=>void, accData: IAccount[]
        , vatData: IVat[],  t:TFunction<'transalation', undefined>,  disable: boolean; height?: number}) => {

    return (
        <Grid container spacing={0} style={{...styles.outer}}>
              {/**bankAcc, balanceSheetAcc */}
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.balanceSheetAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'balanceSheetAcc'} current={current} setCurrent={setCurrent}
                                                  data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>

                    </Grid>
                </Grid>
              {/**incomeStmtAcc */}
              <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                  <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                    <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                      <div>{t('common.incomeStmtAcc')}</div>
                    </Grid>
                    <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                      <MasterfileXComboBox fieldName={'incomeStmtAcc'} current={current} setCurrent={setCurrent}
                                              data={accData} defaultValue={initAcc[0]} zIndex={10} disable={disable}
                                              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          {/*bankAcc */}
          <Grid item sm={8} xs={2}>
            <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
              <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                <div>{t('common.bankAcc')}</div>
              </Grid>
              <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                <MasterfileXComboBox fieldName={'bankAcc'} current={current} setCurrent={setCurrent}
                                        data={accData} defaultValue={initAcc[0]} zIndex={12} disable={disable}
                                        styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
              </Grid>
            </Grid>
          </Grid>
            {/*</Grid>*/}
          {/**stockAccount ,  accountName*/}
          <Grid container spacing={1}>
            <Grid item sm={8} xs={2}>
              <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                  <div>{t('article.stock.account')}</div>
                </Grid>
                <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                  <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
                                          data={accData} defaultValue={initAcc[0]} zIndex={13} disable={disable}
                                          styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
            {/**purchasingClearingAcc */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.purchasingClearingAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'purchasingClearingAcc'} current={current} setCurrent={setCurrent}
                                                  data={accData} defaultValue={initAcc[0]}  zIndex={9} disable={disable}
                              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**salesClearingAcc */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.salesClearingAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'salesClearingAcc'} current={current} setCurrent={setCurrent}
                                                  data={accData} defaultValue={initAcc[0]}  zIndex={8} disable={disable}
                              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**cashAcc */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.cashAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'cashAcc'} current={current} setCurrent={setCurrent}
                                                  data={accData}  zIndex={7} disable={disable} defaultValue={initAcc[0]}
                             styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**VatCode */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.vatCode')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                          <MasterfileXComboBox fieldName={'vatCode'} current={current} setCurrent={setCurrent}
                                                  data={vatData} defaultValue={initVat[0]} zIndex={13} disable={disable}
                              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const MasterfileXComboBox:FC<MasterfileComboboxProps<IMasterfile, IMasterfile>> = ({current, setCurrent, data
                            , fieldName, defaultValue,  zIndex, styles, disable})=> {
  // @ts-ignore
  const currentAcc = (data ?? [defaultValue]).find((acc) => acc.id === current[fieldName]) ?? defaultValue
  return (
    <ComboBox<{ value: string | bigint, label: string }>
      style={{...styles}}
      //style={{...styles, minHeight: 25, height: 25, minWidth: 100, width: '100%', color: '#6b7280', fontSize: 12}}
      disable={disable}
      value={{value: currentAcc ? currentAcc.id : '', label: currentAcc ? `${currentAcc.id} ${currentAcc.name}` : ''}}
      onChange={(value: any, _event: any) => setCurrent({...current, [fieldName]: value})}
      values={data.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  )
}
const MasterfileComboBox:FC<FinancialsCBoxProps2<IFinancials|ITransaction, IMasterfile>> =({current, setCurrent, data
                             , fieldName, defaultValue,  zIndex, styles})=>{
  // @ts-ignore
  const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === current[fieldName])??defaultValue

  return (
    <ComboBox<{value:string|bigint,  label:string}>
      style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
      disable={current.posted}
      value={ {value:currentAcc?currentAcc.id:'', label: currentAcc?`${currentAcc.id} ${currentAcc.name}` :''}}
      onChange={(value:any, _event:any) => setCurrent({...current, [fieldName]: value })}
      values={data.slice().sort(sortById).map(toOption)}
      zIndex={zIndex}
    />
  )
}

export const FromTransactionComboBox  = ({current, transactions, currentModule, onChange}:
                                {current:IFinancials, transactions:IFinancials[], currentModule:IFmodule, onChange:(value:BigInt, event:any)=>void})=> {
  return (
    <ComboBox<{value:bigint|string,  label:string}>
      style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:8}}
      disable={current.posted}
      value={{value:BigInt(currentModule?currentModule?.id:0), label:currentModule?currentModule?.name:'' }}
      onChange={onChange}
      values={transactions.slice().sort(sortById).map(transactionToOption)}
      zIndex={99999}
    />
  )
}

export const FinancialsMainForm =
                     ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules
                        , copyFromTransaction, submitCopy, height, zIndex}:
                      { collapse:boolean, current:IFinancials, setCurrent:(arg:IFinancials) =>void
                       , t:TFunction<'translation', undefined>
                       , storeData:IMasterfile[], accData:IAccount[], modules:IFmodule[]
                       , copyFromTransaction:IFinancials[]
                       , handleModuleChange:(value:any)=>void
                       , submitCopy:(id:BigInt) =>void
                       , height:number, zIndex:number}) => {

                       console.log('storeData', storeData)
    const styles = STYLES
    const currentx:IFinancials = Array.isArray(current)?current[0]:current
    const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(currentx?.modelid))??initfModule[0]
    return (
        <Grid container spacing={0} style={{...STYLES.inner, display: !collapse?'none':''}}>
            {/**id, postingdate*/}
            <Grid container spacing={1} >
                {/*<Grid container maximize  justify="flex-start" alignItems="stretch">*/}
                   <Grid item sm={8} xs={2}>
                      <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.id')}</div>
                        </Grid>
                        <Grid item sm ={2} xs={2} justify="flex-start" >
                            <InputField
                                fieldName="id"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.id}
                                disabled={current.posted}
                                style={{ height: height, textAlign:'right' }}
                            />
                        </Grid>
                    </Grid>
                    </Grid>
                   <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('fmodule.title')}</div>
                        </Grid>
                        <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
                          <ComboBox<{value:bigint|string,  label:string}>
                            style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:10}}
                            disable={false}
                            value={{value:BigInt(currentModule?currentModule?.id:0),
                              label: `${BigInt(currentModule?currentModule?.id:0)} ${currentModule?currentModule?.name:''}` }}
                            onChange={handleModuleChange}
                            values={modules.slice().sort(sortById).map(toOption)}
                            zIndex={99999}
                          />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**oid, transdate*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('transaction.oid')}</div>
                        </Grid>
                        <Grid item sm ={2} xs={2} justify="flex-start">
                            <InputField
                                fieldName="oid"
                                current={current}
                                setCurrent={setCurrent}
                                value={current.oid}
                                disabled={current.posted}
                                style={{ height: 20 , textAlign:'right'}}
                            />
                        </Grid>
                        <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
                          <FromTransactionComboBox current={current} transactions={copyFromTransaction}
                                                   currentModule={currentModule} onChange = {submitCopy}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('transaction.transdate')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="flex-end" justify="flex-start">
                            <DatePickerField
                                fieldName="transdate"
                                label={t('transaction.transdate')}
                                selected={current.transdate}
                                current={current}
                                onChange={(_event:any) => {
                                  const date = new Date(_event)
                                  const month_ = date.getMonth()+1
                                  const month = month_ <10?`0${month_}`:`${month_}`
                                  const period = Number(`${date.getFullYear()}${month}`)
                                  const currentx:IFinancials = { ...current, transdate: date, period:period}
                                  setCurrent(currentx)
                                }}
                                setCurrent={setCurrent}
                                disabled={current.posted}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**Store,  period*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                  <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                    <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                      <div>{t('financials.costcenter')}</div>
                    </Grid>
                     <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" style={{paddingLeft:5}}>
                       <MasterfileComboBox current ={current} setCurrent ={setCurrent} data={storeData}
                                  fieldName={"costcenter"} defaultValue={initCc[0]} zIndex={zIndex} styles={styles}/>
                      </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <div>{t('transaction.period')}</div>
                        </Grid>
                        <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                            <InputField fieldName="period" current={current}
                                        setCurrent={setCurrent}
                                        value={current.period}
                                        disabled={true}
                                        style={{ height: 20, width: 100, textAlign: 'right' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**OutputVat */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                  <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                    <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                      <div>{t('transaction.account')}</div>
                    </Grid>
                    <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start" style={{paddingLeft:5}}>
                      <MasterfileComboBox  current={current} setCurrent={setCurrent} data={accData}
                                           fieldName={"account"} defaultValue={initAcc[0]} zIndex={zIndex} styles={styles}/>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <div>{t('transaction.text')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <TextareaField
                                fieldName="text"
                                placeholder={t('transaction.text')}
                                disabled={current.posted}
                                value={current.text}
                                current={current}
                                setCurrent={setCurrent}
                                style={{ width: 1000 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <Grid container maximize style={styles.fuller} alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <BooleanField
                                fieldName="posted" current={current}
                                setCurrent={setCurrent}
                                label={t('transaction.posted')}
                                disabled={current.posted}
                                checked={current.posted}
                                style={{ height: 20, paddingLeft: 20, textAlign:'right' }}
                                styleC={{ height: 20, paddingLeft: 50, textAlign:'right' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export const TransactionMainForm =
    ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules, copyFromTransaction, submitCopy, height, zIndex}:
     { collapse:boolean, current:ITransaction, setCurrent:(arg:ITransaction) =>void
         , t:TFunction<'translation', undefined>, storeData:IStore[]
         , accData:ICustomer[]|ISupplier[], modules:IFmodule[], copyFromTransaction:ITransaction[]
         , handleModuleChange:(value:any, event:any)=>void
         , submitCopy:(id:BigInt, event:any)=>void
         , height:number, zIndex:number}) => {
           console.log('accData>>>>', accData)

        const styles = STYLES
        const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(current?.modelid??0))
        const copyFromModule= modules.find((m:IFmodule) =>m.id == BigInt(currentModule?.copyFrom??0))
        return (
            <Grid container spacing={0} style={{...STYLES.inner, display: !collapse?'none':''}}>
                {/**id, postingdate*/}
                <Grid container spacing={1} >
                    {/*<Grid container maximize  justify="flex-start" alignItems="stretch">*/}
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
                            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.id')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={2} justify="flex-start" >
                                <InputField
                                    fieldName="id"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.id}
                                    disabled={current.posted}
                                    style={{ height: height, textAlign:'right' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('fmodule.title')}</div>
                            </Grid>
                            <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
                                <ComboBox<{value:bigint|string,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:10}}
                                    disable={false}
                                    value={{value:BigInt(currentModule?currentModule?.id:0),
                                        label: `${BigInt(currentModule?currentModule?.id:0)} ${currentModule?currentModule?.name:''}` }}
                                    onChange={handleModuleChange}
                                    values={modules.slice().sort(sortById).map(toOption)}
                                    zIndex={99999}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**oid, transdate*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('transaction.oid')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={2} justify="flex-start">
                                <InputField
                                    fieldName="oid"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.oid}
                                    disabled={current.posted}
                                    style={{ height: 20 , textAlign:'right'}}
                                />
                            </Grid>
                            <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
                                <ComboBox<{value:bigint|string,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:10}}
                                    disable={current.posted}
                                    value={{value:BigInt(copyFromModule?copyFromModule?.id:0)
                                        , label:`${BigInt(copyFromModule?copyFromModule?.id:0)} ${copyFromModule?copyFromModule?.name:''}` }}
                                    onChange={submitCopy}
                                    values={copyFromTransaction.slice().sort(sortById).map(transactionToOption)}
                                    zIndex={99999}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('transaction.transdate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="flex-end" justify="flex-start">
                                <DatePickerField
                                    fieldName="transdate"
                                    label={t('transaction.transdate')}
                                    selected={current.transdate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={current.posted}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**Store,  period*/}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                      <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                          <div>{t('transaction.store')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" style={{paddingLeft:5}}>
                          <MasterfileComboBox  current={current} setCurrent={setCurrent} data={storeData}
                              fieldName={"store"} defaultValue={initStore[0]} zIndex={zIndex} styles={styles}/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('transaction.period')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField fieldName="period" current={current}
                                            setCurrent={setCurrent}
                                            value={current.period}
                                            disabled={true}
                                            style={{ height: 20, width: 100, textAlign: 'right' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**OutputVat */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                      <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                          <div>{t('transaction.account')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start"style={{paddingLeft:5}}>
                        <MasterfileComboBox  current={current} setCurrent={setCurrent} data={accData}
                           fieldName={"account"} defaultValue={initCust[0]} zIndex={zIndex} styles={styles}/>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                            <Grid item sm={2} xs={12}
                                  justify="flex-start" alignItems="flex-start">
                                <div>{t('transaction.text')}</div>
                            </Grid>
                            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                                <TextareaField
                                    fieldName="text"
                                    placeholder={t('transaction.text')}
                                    disabled={current.posted}
                                    value={current.text}
                                    current={current}
                                    setCurrent={setCurrent}
                                    style={{ width: 1000 }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={2} xs={12}
                                  justify="flex-start" alignItems="flex-start">
                                <BooleanField
                                    fieldName="posted" current={current}
                                    setCurrent={setCurrent}
                                    label={t('transaction.posted')}
                                    disabled={current.posted}
                                    checked={current.posted}
                                    style={{ height: 20, paddingLeft: 20, textAlign:'right' }}
                                    styleC={{ height: 20, paddingLeft: 50, textAlign:'right' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

export const JournalMainForm = ({ current, setCurrent,  t, accData,  height, ids }:
                                { current:IPACBQueryParam, setCurrent:(arg:IPACBQueryParam)=>void
                                    , t:TFunction<'transalation', undefined>, accData:IAccount[], height:number, ids:string[]}) => {
    const styles = STYLES
    const accounts = current?.isMulti?accData.filter((acc) =>ids.includes(acc.account)):accData
    const currentAccount = accounts?.find((acc:IAccount) => acc.id === current.account)
    return (
        <>
            <Grid container spacing={1}>
                <Grid item sm={6} xs={2}>
                    <Grid container maximize style={{...styles.fuller, height:30}} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
                            <div>{t('common.account')}</div>
                        </Grid>
                        <Grid item sm ={8} xs={5}  justify="flex-start"  alignItems="flex-start" style={{...styles.fuller, height:20, paddingTop:10}} >
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={false}
                                value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(value:any, _event:any) => setCurrent({...current, account: value /*, accountName: _event?.name*/})}
                                values={accounts?.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
                        <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
                            <FromPeriod
                                //id="fromPeriod-id"
                                name="fromPeriod"
                                label="common.from"
                                current={current}
                                value={current.fromPeriod}
                                setCurrent={setCurrent}
                                t={t}
                                labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
                                style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
                        <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
                            <FromPeriod
                                //id="fromPeriod-id"
                                name="toPeriod"
                                label="common.to"
                                current={current}
                                value={current.toPeriod}
                                setCurrent={setCurrent}
                                t={t}
                                labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
                                style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export const VatMainForm =
    ({current, setCurrent, accData, t, disable, height, zIndex}:
     {current:IVat, setCurrent:(arg:IVat)=>void, accData:IAccount[]
         , t:TFunction<'transalation', undefined>, disable:boolean, height:number, zIndex:number}) => {
        return (
            <Grid container spacing={0} style={STYLES.outer50}>
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller}>
                            <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('common.id')}</div>
                            </Grid>
                            <Grid item sm ={2} xs={2} justify="flex-end">
                                <InputField
                                    fieldName="id"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.id}
                                    disabled={disable}
                                    style={{ height: height}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={STYLES.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.enterdate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
                                <DatePickerField
                                    fieldName="enterdate"
                                    label={t('common.enterdate')}
                                    selected={current.enterdate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**Name */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize justify="flex-start" alignItems="stretch" style={STYLES.fuller} >
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('vat.name')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={10} justify="flex-end">
                                <InputField
                                    fieldName="name"
                                    current={current}
                                    setCurrent={setCurrent}
                                    value={current.name}
                                    disabled={disable}
                                    style={{ height: 20, width: 1000 }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={STYLES.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.changedate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <DatePickerField
                                    fieldName="changedate"
                                    label={t('common.changedate')}
                                    selected={current.changedate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**InputVat */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('vat.input.account')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" >
                              <MasterfileXComboBox fieldName={'inputVatAccount'} current={current} setCurrent={setCurrent}
                                  data={accData} defaultValue={initAcc[0]} zIndex={zIndex} disable={disable}
                                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={STYLES.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.postingdate')}</div>
                            </Grid>
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <DatePickerField
                                    fieldName="postingdate"
                                    label={t('common.postingdate')}
                                    selected={current.postingdate}
                                    current={current}
                                    setCurrent={setCurrent}
                                    disabled={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**OutputVat */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={STYLES.fuller} justify="flex-start" alignItems="stretch">
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('vat.output.account')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                              <MasterfileXComboBox fieldName={'outputVatAccount'} current={current} setCurrent={setCurrent}
                                data={accData} defaultValue={initAcc[0]} zIndex={zIndex} disable={disable}
                                styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={STYLES.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('vat.percent')}</div>
                            </Grid>
                            <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField fieldName="percent" current={current}
                                            setCurrent={setCurrent}
                                            value={current.percent}
                                            disabled={disable}
                                            style={{ height: 20,width: 80, textAlign: 'right' }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={STYLES.fuller40H} justify="flex-start" alignItems="stretch">
                            <Grid item sm={2} xs={12}
                                  justify="flex-start" alignItems="flex-start">
                                <div>{t('common.description')}</div>
                            </Grid>
                            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                                <TextareaField
                                    fieldName="description"
                                    placeholder={t('common.description')}
                                    disabled={disable}
                                    value={current.description}
                                    current={current}
                                    setCurrent={setCurrent}
                                    style={{ width: 1000 }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={STYLES.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.company')}</div>
                            </Grid>
                            <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField fieldName="company" current={current}
                                            setCurrent={setCurrent}
                                            value={current.company}
                                            disabled={disable}
                                            style={{ height: 20,width: 80, textAlign: 'right' }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
const signUp = (t:TFunction<'translation', undefined>) =>(
  <CCard className="text-white bg-primary py-5 d-md-down-none"
         style={{width: '44%'}}>
    <CCardBody className="text-center">
      <div>
        <h2>Sign up</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/register">
          <CButton color="primary" className="mt-3" active tabIndex={-1}>
            {t('login.signUpNow')}
          </CButton>
        </Link>
      </div>
    </CCardBody>
  </CCard>
)
const  errorFn = (error?: string) =>{
  return (
    <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
      <CCardBody className="text-center">
        <div><h2>Error!!!</h2><p>{error}</p></div>
      </CCardBody>
    </CCard>
  )
}
export const LoginForm = ({languages, companies, current, t, i18n, profile, setProfile, submit
                            , handleEvent}:LoginProps ) => {
  return (
  <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">{t('login.signIn')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroup>
                        <CInputGroupText/>
                      </CInputGroup>
                      <CFormInput
                        type="text"
                        placeholder="UserName"
                        id="userName"
                        autoComplete="username"
                        onChange={(event: any) =>
                          handleEvent(event, {...current, userName: event.target.value})
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroup>
                        <CInputGroupText/>
                      </CInputGroup>
                      <CFormInput
                        type="password"
                        id="pwd"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(event: any) =>
                          handleEvent(event, {...current, password: event.target.value})
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroup>
                        <CInputGroupText/>
                      </CInputGroup>
                      <CFormSelect
                        className="flex-row"
                        type="select"
                        name="company"
                        id="company-id"
                        value={current.company}
                        onFocus={(event) =>
                          handleEvent(event, {...current, company: event.target.value})
                        }
                        onChange={(event) =>
                          handleEvent(event, {...current, company: event.target.value})
                        }
                      >
                        {companies.map((item) => (
                          <option key={item.id} value={item.id}>{`${item.id} ${item.name}`}</option>
                        ))}
                      </CFormSelect>
                      <CFormSelect
                        className="flex-row"
                        type="select"
                        name="language"
                        id="language-id"
                        value={current.language}
                        onFocus={(event) =>
                          handleEvent(event, {...current, language: event.target.value})
                        }
                        onChange={(event) => {
                          handleEvent(event, {...current, language: event.target.value})
                          i18n.changeLanguage(event.target.value)
                            .then(() => setProfile({...profile, language: event.target.value}))
                          setDefaultLocale(event.target.value)
                        }}
                      >
                        {languages.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.id.concat(' ').concat(item.name)}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={(event: any) => submit(event)}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          {t('login.forgotpwd')}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/*{Show(profile?.error??'', signUp(), child(profile.error))}*/}
              <
                // @ts-ignore
                Show when={profile.error} fallback={signUp} children={errorFn(profile.error)}/>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </>
)
}
