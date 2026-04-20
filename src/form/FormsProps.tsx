import {CSSProperties, FC, ReactNode} from 'react'
import { toOption} from '../utils/FormUtils.tsx'
import {
  // CBadge,
  CCol,
  CFormInput,
  CFormLabel,
  // CFormSelect,
  CFormTextarea,
  // CHeaderToggler,
  CInputGroup,
  // CTooltip,
} from '@coreui/react'
import {formEnum} from '../utils/FormEnum'
import {sortById} from '../utils/Utils'
// import {languages} from './languages.ts'
import {

  MasterfileComboboxProps,
  MasterfileProps,
} from '../Props.ts'
import DatePicker from 'react-datepicker'
import '../../public/css/custom-datepicker.css'
import {green} from '@mui/material/colors'
import {
  initAcc,
} from './Menu'
import {
  IAccount,
  IArticle,
  ICompany,
  ICustomer,
  IEmployee,
  IMasterfile,
  IPayrollTaxRange,
  IPermission,
  IStore,
  ISupplier,
  IVat
} from '../Models.ts'
import {TFunction} from 'i18next'
import ComboBox from './ComboBox.tsx'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const styles = {
  outer0: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 4,
  },
  outer: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 5,
    //width: '100%',
    //height: 200,
    //padding: 50,
  },
  fuller: {
    borderRadius: 5,
    boxShadow: "0 1px 50px #BBE",
    padding: 1,
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

export const STYLES = {
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
        boxShadow: '0 20px 50px #BBF',
        padding: 10,
        //height: 350,
        paddingTop: 20,
    },
    innerX: {
        borderRadius: 5,
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


// const headStyle = {
//     header: {
//         borderRadius: 5,
//         boxShadow: '0 10px 30px #BBB',
//         padding: 1,
//         height: 40,
//         //paddingTop: 1,
//         paddingBottom: 15,
//     },
// }
// const mapping = (item:{id:string, name:string}) => (
//   <option key={item.id} value={item.id}>
//     {item.name}
//   </option>
// )
// export const CommonIwsFormHead = ({title, collapse, initAdd, edited, edit, disable, added, cancelEdit, submitEdit //, submitQuery
//                                    , reload, toggle,  toggleTable, onNewBankAccount, onDeleteBankAccount //, onNewSalaryItem, disable
//                                    , handleLanguageChange, navigate, language, dispatch, logout, t}:
//                                {title:string, collapse:boolean, initAdd:()=>void, edited:boolean, disable:boolean
//                                    , added:boolean, edit:()=>void, cancelEdit:(e:any)=>void
//                                    , submitEdit:(e:any)=>void, submitQuery:(e:any)=>void, reload:()=>void, toggle:()=>void
//                                    , toggleTable:()=>void, onNewBankAccount?:()=>void, onDeleteBankAccount?:(e:any)=>void
//                                    , onNewSalaryItem?:()=>void, handleLanguageChange: (arg:any)=>void
//                                    , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
//                                    , logout:(navigate:NavigateFunction) =>void, t:TFunction<'translation', undefined> }) => {
//   console.log('edited', edited)
//   console.log('edit', edit)
//   console.log('disable', disable)
//
//     const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
//     const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
//     const listIcon=<ListIcon/>
//     const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon
//     const sidebarShow = useSelector((state:any) => state.sidebarShow)
//     return (
//       <Grid container xs style={{ ...headStyle.header }} justify="flex-start" alignItems="center">
//             <Grid item justify="center" alignItems="center">
//                 <CHeaderToggler
//                     className="ps-1"
//                     onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
//                     <IoMdMenu/>
//                 </CHeaderToggler>
//             </Grid>
//             <Grid xs item>
//                 <h5>
//                     <CBadge color="primary">{title}</CBadge>
//                 </h5>
//             </Grid>
//             <Grid container xs spacing={0} justify="flex-end"  alignItems="center">
//                 <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
//                     <CFormSelect  style={{ height: 24, paddingLeft:10, fontSize:10}}
//                         className="flex-row"
//                         type="select"
//                         name="language"
//                         id="language-id"
//                         value={language}
//                         onChange={(event) => handleLanguageChange(event)}
//                     >
//                         {languages.map((item) => mapping(item))}
//                     </CFormSelect>
//                 </CHeaderToggler>
//               <CTooltip content={t('toolTip.common.removeBankAccount')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
//                             style={{ height: 20, padding:1, display:onDeleteBankAccount? 'block':'none'}}
//                             onClick={(event)=>
//                                 onDeleteBankAccount?onDeleteBankAccount(event):void(0)} disabled={!onDeleteBankAccount} >
//                     <RemoveCircleOutlineIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.addBankAccount')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
//                             style={{ height: 20, padding:1, display:onNewBankAccount?'block':'none'}} onClick={()=>
//                     onNewBankAccount?onNewBankAccount():void(0)} disabled={!onNewBankAccount}>
//                     <AddCircleOutlineIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.add')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             disabled={!edited}      onClick={()=>initAdd()}>
//                     <AddBoxIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.save')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             disabled={disable && !edited && !added} onClick={(e)=>submitEdit(e)}>
//                     <SaveIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.edit')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             disabled={!edited && !added} onClick={(e)=>cancelEdit(e)}>
//                     <CancelIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.edit')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={edit}>
//                     <EditSquareIcon />
//                 </IconButton>
//               </CTooltip>
//
//               <CTooltip content={t('toolTip.common.load')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={reload}>
//                     <FilterListIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.table')} placement="top">
//                 <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>toggleTable()}>
//                   {listIcon}
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.form')} placement="top">
//                 <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>toggle()}>
//                     {UpDownIcon}
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.exit')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>logout(navigate)}>
//                     <ExitToAppIcon/>
//                 </IconButton>
//              </CTooltip>
//             </Grid>
//         </Grid>
//     )
// }
//
// export const BSFormHead = ({title, collapse, cancelEdit, submitEdit, importData
//                              , submitPost, reload, toggle, toggleTable, logout, navigate
//                            , language, handleLanguageChange, dispatch, current, t}:{title:string, collapse:boolean
//                             ,  cancelEdit:(e:any)=>void, submitEdit: (e:any)=>void, importData:()=>void
//                             , submitPost:(e:any)=>void, reload: ()=>void, toggle:()=>void, toggleTable:()=>void
//                             , logout:(navigate:NavigateFunction) =>void, navigate:NavigateFunction, language:string
//                             ,  handleLanguageChange: (arg:any)=>void,  dispatch:Dispatch<any>, current:IBankStatement
//                             , t:TFunction<'translation', undefined>}) => {
//     const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
//     const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
//     const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon
//     const sidebarShow = useSelector((state:any) => state.sidebarShow)
//     return (
//         // eslint-disable-next-line react/prop-types
//         <Grid container xs style={{ ...STYLES.header }} justify="flex-start">
//           <Grid item justify="center" alignItems="center">
//             <CHeaderToggler
//               className="ps-1"
//               onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
//               <IoMdMenu/>
//             </CHeaderToggler>
//           </Grid>
//           <Grid xs item>
//             <h5>
//               <CBadge color="primary">{title}</CBadge>
//             </h5>
//           </Grid>
//           <Grid container xs spacing={0} justify="flex-end"  alignItems="center">
//             <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
//               <CFormSelect  style={{ height: 30, paddingLeft:10}}
//                             className="flex-row"
//                             type="select"
//                             name="language"
//                             id="language-id"
//                             value={language}
//                             onChange={(event) => handleLanguageChange(event)}
//               >
//                 {languages.map((item) => mapping(item))}
//               </CFormSelect>
//             </CHeaderToggler>
//             <CTooltip content={t('toolTip.common.save')} placement="top">
//               <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         disabled={current.posted} onClick={(e)=>submitEdit(e)}>
//                   <SaveIcon/>
//                 </IconButton>
//              </CTooltip>
//             <CTooltip content={t('toolTip.common.canceln')} placement="top">
//                   <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         disabled={current.posted} onClick={(e)=>cancelEdit(e)}>
//                       <CancelIcon />
//                    </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.transaction.post')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         disabled={current.posted} onClick={(event)=>submitPost(event)}>
//                   <CheckCircleOutlineIcon />
//               </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.common.import')} placement="top">
//               <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                 onClick={importData}>
//                 <DriveFolderUploadIcon />
//               </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.common.load')} placement="top">
//               <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         onClick={reload}>
//                     <FilterListIcon/>
//               </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.common.table')} placement="top">
//               <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                           onClick={toggleTable}>
//                 <ListIcon/>
//               </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.common.form')} placement="top">
//                 <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         onClick={toggle}>
//                   {UpDownIcon}
//                 </IconButton>
//             </CTooltip>
//             <CTooltip content={t('toolTip.common.exit')} placement="top">
//               <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                         onClick={()=>logout(navigate)}>
//                 <ExitToAppIcon/>
//               </IconButton>
//             </CTooltip>
//           </Grid>
//         </Grid>
//     )
// }
// export const FinancialsFormHead = ({ title, templateName, saveProps, collapse, initAdd
//                                        , onNewLine, onDeleteLine,  submitCancel, submitEdit, getData, submitPrintPreview
//                                       , toggle, toggleTable, submitPost,  reload, handleLanguageChange
//                                        , navigate, language, dispatch, logout, current, t
//                                     }:TransactionToolBarProps<ITransaction|IFinancials, ILineTransaction|ILineFinancials>)=> {
//
//     const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon/>
//     const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon/>
//     const UpDownIcon =  collapse ? keyboardDoubleArrowUpIcon:keyboardDoubleArrowDwnIcon
//
//     const sidebarShow = useSelector((state) =>
//         // @ts-ignore
//         state.sidebarShow)
//     const mapping = (item:{id:string, name:string}) => (
//         <option key={item.id} value={item.id}>
//             {item.name}
//         </option>
//     )
//
//     return (
//         <Grid container xs style={{ ...headStyle.header }} justify="flex-start">
//             <Grid item justify="center" alignItems="center">
//                 <CHeaderToggler
//                     className="ps-1"
//                     onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
//                 >
//                     <IoMdMenu/>
//                 </CHeaderToggler>
//             </Grid>
//             <Grid xs item justify="flex-start" alignItems="center">
//                 <h5>
//                     <CBadge color="primary">{title}</CBadge>
//                 </h5>
//             </Grid>
//
//             <Grid container xs spacing={0} justify="flex-end" style={{ ...headStyle.header, paddingBottom:25 }} alignItems="flex-end">
//                 <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
//                     <CFormSelect style={{ height: 30, paddingLeft:10}}
//                         className="flex-row"
//                         type="select"
//                         name="language"
//                         id="language-id"
//                         value={language}
//                         onChange={(event) => handleLanguageChange(event)}
//                     >
//                         {languages.map((item) => mapping(item))}
//                     </CFormSelect>
//                 </CHeaderToggler>
//               <CTooltip content={t('toolTip.transaction.removeLine')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={(event)=>onDeleteLine(event)} disabled={current?.posted}>
//                     <RemoveCircleOutlineIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.transaction.addLine')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
//                             style={{ height: 20, padding:1}} onClick={onNewLine} disabled={current?.posted}>
//                     <AddCircleOutlineIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.add')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={initAdd} >
//                     <AddBoxIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.save')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={(event)=>submitEdit(event)} disabled={current?.posted}>
//                     <SaveIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.canceln')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={(event) =>submitCancel(event)} disabled={current?.posted}>
//                     <CancelIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.transaction.post')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={(event)=>submitPost(event)} disabled={current?.posted}>
//                     <CheckCircleOutlineIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content= {t('toolTip.common.print')} placement="top">
//               <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                           onClick={()=>submitPrintPreview(current, templateName, getData)}>
//                 <PrintOutlined/>
//               </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.export')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>saveXlsx(saveProps)}>
//                     <ArrowCircleDownIcon />
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.load')} placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={reload}>
//                     <FilterListIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.table')} placement="top">
//                 <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                           onClick={toggleTable}>
//                   <ListIcon/>
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content={t('toolTip.common.form')} placement="top">
//                 <IconButton size="small" edge="start"  color="primary" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={toggle}>
//                     {UpDownIcon}
//                 </IconButton>
//               </CTooltip>
//               <CTooltip content="Exit the application " placement="top">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>logout(navigate)}>
//                     <ExitToAppIcon/>
//                 </IconButton>
//               </CTooltip>
//             </Grid>
//         </Grid>
//     )
// }
// export const BalanceSheetHead = ({ style, title, submitQuery
//                                   ,  t, dispatch, logout, templateFileName}:
//                                 { style: CSSProperties, title:string, submitQuery:(event:any)=>void
//                                   , t:TFunction<'translation', undefined>
//                                   , dispatch:Dispatch<any>
//                                   , logout:(navigate:NavigateFunction) =>void, templateFileName:string }) => {
//   const headStyle = {
//     header: {
//       borderRadius: 5,
//       //boxShadow: '0 10px 30px #BBB',
//       padding: 1,
//       height: 40,
//       paddingTop: 1,
//       paddingBottom: 10,
//     },
//   }
//   console.log('wordFileName>>>', templateFileName)
//   // @ts-ignore
//   const sidebarShow = useSelector((state) => state.sidebarShow)
//   let navigate = useNavigate()
//   return (
//     <Grid
//       container
//       spacing={2}
//       justify="space-between"
//       style={{ ...style }}
//       direction="column"
//     >
//       <Grid container justify="space-between">
//         <Grid container xs spacing={1} justify="flex-start">
//           <Grid item justify="center" alignItems="center">
//             <CHeaderToggler
//               className="ps-1"
//               onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
//             >
//               <IoMdMenu/>
//             </CHeaderToggler>
//           </Grid>
//           <Grid item>
//             <h5>
//               <CBadge color="primary">{title}</CBadge>
//             </h5>
//           </Grid>
//           <Grid container xs spacing={0} justify="flex-end" style={{...headStyle.header}}
//                 alignItems="flex-end">
//
//             <Grid item justify="center" alignItems="center">
//               <CHeaderToggler className="ps-1">
//                 <FormButton title={t('common.run')}
//                             onClick={(e) => submitQuery(e)}
//                             style={{textAlign: 'left', height: 25, padding: 1 }}
//                             className="ps-1"/>
//               </CHeaderToggler>
//             </Grid>
//             <Grid item justify="center" alignItems="center">
//               <CHeaderToggler className="ps-1">
//                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                             onClick={()=>logout(navigate)}>
//                   <ExitToAppIcon/>
//                 </IconButton>
//               </CHeaderToggler>
//             </Grid>
//
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   )
// }
// export const JournalFormHead = ({ style, title, submitQuery, submitQuery2
//                                     , balancesheet, t, dispatch, logout, templateName, current, getData
//                                     , submitPrintPreview}:JournalToolBarProps<any>)=> {
//     const headStyle = {
//         header: {
//             borderRadius: 5,
//             //boxShadow: '0 10px 30px #BBB',
//             padding: 1,
//             height: 40,
//             paddingTop: 1,
//             paddingBottom: 10,
//         },
//     }
//     console.log('wordFileName>>>', templateName())
//     // @ts-ignore
//     const sidebarShow = useSelector((state) => state.sidebarShow)
//     let navigate = useNavigate()
//     return (
//         <Grid
//             container
//             spacing={2}
//             justify="space-between"
//             style={{ ...style }}
//             direction="column"
//         >
//             <Grid container justify="space-between">
//                 <Grid container xs spacing={1} justify="flex-start">
//                     <Grid item justify="center" alignItems="center">
//                         <CHeaderToggler
//                             className="ps-1"
//                             onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
//                         >
//                             <IoMdMenu/>
//                         </CHeaderToggler>
//                     </Grid>
//                     <Grid item>
//                         <h5>
//                             <CBadge color="primary">{title}</CBadge>
//                         </h5>
//                     </Grid>
//                     <Grid container xs spacing={0} justify="flex-end" style={{...headStyle.header}}
//                           alignItems="flex-end">
//                       <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                                   onClick={()=>submitPrintPreview(current, templateName, getData)}>
//                         <PrintOutlined/>
//                       </IconButton>
//                         <Grid item justify="center" alignItems="center">
//                             <CHeaderToggler className="ps-1">
//                                 <FormButton title={t('common.run')}
//                                     onClick={(e) => submitQuery(e, current)}
//                                     style={{textAlign: 'left', height: 25, padding: 1 }}
//                                     className="ps-1"/>
//                             </CHeaderToggler>
//                         </Grid>
//                       {submitQuery2?
//                         <Grid item justify="center" alignItems="center">
//                             <CHeaderToggler className="ps-1">
//                             <FormButton
//                                 title={t('common.runAll')}
//                                 onClick={(e)=>submitQuery2(e, current)}
//                                 style={{ textAlign: 'right', height: 25, padding: 1 }}
//                                 className="ps-1"
//                                 disable={!submitQuery2===undefined && balancesheet}/>
//                             </CHeaderToggler>
//                         </Grid>
//                         : null}
//
//                         <Grid item justify="center" alignItems="center">
//                             <CHeaderToggler className="ps-1">
//                                 <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
//                                             onClick={()=>logout(navigate)}>
//                                     <ExitToAppIcon/>
//                                 </IconButton>
//                             </CHeaderToggler>
//                         </Grid>
//
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }

export const TextareaField = ({ fieldName, value, current, setCurrent, rows, disabled, style
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
// const InputNumberField = ({ fieldName, type, current, setCurrent, value, disabled, style, onChange }:
//                     { fieldName:string, type?:'text', current:any, setCurrent:(arg:any)=>void, value:any
//                       , disabled?:boolean, style?: CSSProperties | undefined, onChange?:(event:any)=>void}) => {
//   const style_ = style ? style : { height: 20 }
//   //onChange=(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })
//   return (
//     <CFormInput
//       type={type ? type : 'text'}
//       id={fieldName?.concat('id')}
//       className="input-sm"
//       disabled={disabled}
//       style={style_}
//       value={value}
//       placeholder={fieldName}
//       onChange={onChange?onChange:(event:any) => setCurrent({ ...current, [fieldName]: Number(event.target.value) })}
//     />
//   )
// }

export const InputField = ({ fieldName, type, current, setCurrent, value, disabled, style, onChange, placeholder }:
                    { fieldName:string, type?:'text', current:any, setCurrent:(arg:any)=>void, value:any
                      , disabled?:boolean, style?: CSSProperties | undefined, onChange?:(event:any)=>void, placeholder?:string}) => {
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
      placeholder={placeholder?? fieldName}
      onChange={onChange?onChange:(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })}
    />
  )
}
// const CurrencyInputField = ({ fieldName, type, current, setCurrent, value, disabled, style, onChange, placeholder }:
//                     { fieldName:string, type?:'text', current:any, setCurrent:(arg:any)=>void, value:any
//                      , disabled?:boolean, style?: CSSProperties | undefined, onChange?:(event:any)=>void, placeholder?:string}) => {
//     const style_ = style ? style : { height: 20 }
//     //onChange=(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })
//     return (
//       <CurrencyInput
//         id={fieldName?.concat('id')}
//         name={fieldName}
//         intlConfig={{ locale: 'fr-FR', currency: 'EUR' }}
//         style={style_}
//         //className={`form-control`}
//         onValueChange={onChange?onChange:(event:any) => setCurrent({ ...current, [fieldName]: event.target.value })}
//         defaultValue={1000}
//         decimalsLimit={2}
//         value={value}
//         step={1}
//         disabled={disabled}
//         placeholder={placeholder?? fieldName}
//       />
//     )
// }

// const BooleanField = ({ fieldName, label, current, setCurrent
//                           , checked, disabled, style, styleC, onChange }:
//                       { fieldName:string, label?:string, current:any, setCurrent:(arg:any)=>void, checked:boolean
//                           , disabled?:boolean, style?: CSSProperties | undefined, styleC?: CSSProperties | undefined
//                           , onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void }) => {
//     return (
//         <FormControlLabel
//             id={fieldName?.concat('id')}
//             disabled={disabled}
//             required
//             control={
//                 <Checkbox
//                     style={styleC}
//                     checked={checked}
//                     onChange={onChange ? onChange : (event: React.ChangeEvent<HTMLInputElement>) => {
//                         setCurrent({...current, [fieldName]: event.target.checked})
//                     }}
//                 />}
//             label={label??''}
//             color="success"
//             value={checked}
//             style={style}
//         />
//     )
// }
export const FieldLabel = ({ title }:{ title:string}) => {
    return (
        <CFormLabel htmlFor="input-small">
            {title}
        </CFormLabel>
    )
}
// const FormButton = ({ title, type, color, style, size, height, onClick, className, disable }:
//                     { title:string, type?: "submit" | "reset" | "button" | undefined, color?:string
//                         , style?: CSSProperties | undefined, size?:'sm'|'lg', height?:number, onClick: MouseEventHandler<any> | undefined
//                         , className?: string | undefined,  disable?:boolean}) => {
//     return (
//         <CButton
//             type={type ?? 'submit'}
//             size={size ?? 'sm'}
//             color={color ?? 'primary'}
//             disabled={disable ? disable : false}
//             className={className}
//             style={style ?? { height: height }}
//             onClick={onClick}>
//             <i className="fa fa-dot-circle-o">{title}</i>
//         </CButton>
//     )
// }
export const DatePickerField = ({ fieldName,  current, setCurrent, selected, label, disabled, onChange }:
                         { fieldName:string,  current:any, setCurrent?:(arg:any)=>void, selected:Date
                          , label:string, disabled:boolean, onChange?:(event:any)=>void} ) => {

    return (
        <DatePicker
            disabled={disabled}
            selected={selected}
            title={label}
            showTimeInput
            wrapperClassName="custom-datepicker-width"
           // calendarClassName="custom-calendar"
            z-Index ={9999}
            className="text-center date-picker-reports"
            dateFormat="dd.MM.YYYY"
            id={fieldName?.concat('id')}
            onChange={ onChange ? onChange :(newValue:any) => {
              setCurrent?({...current, [fieldName]: newValue}):void(0)
            }}
            customInput={
              <input
                style={{ width: "80%" }}
                onFocus={(e) => e.target.style.border = "2px solid blue"}
              />
            }
        />
    )
}

// export const AccountMainForm = ({current, setCurrent, accData, t, disable}:AccountMainProps) => {
//
//     const currentAccount = accData?.find((acc: { id: any }) => acc.id === current?.account)??initAcc[0]
//
//     return (
//         <Grid container spacing={0} style={styles.outer}>
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.id')}</div>
//                         </Grid>
//                         <Grid item sm ={2} xs={2} justify="flex-end">
//                             <InputField
//                                 fieldName="id"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.id}
//                                 disabled={disable}
//                                 style={{ height: 20}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.enterdate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="enterdate"
//                                 label={t('common.enterdate')}
//                                 selected={current.enterdate}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Name */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
//                         <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div >{t('account.name')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={10} justify="flex-end">
//                             <InputField
//                                 fieldName="name"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.name}
//                                 disabled={disable}
//                                 style={{ height: 20, width: 1000 }}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.changedate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="changedate"
//                                 label={t('common.changedate')}
//                                 selected={current.changedate}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**InputVat postingdate */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.account')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ { value:currentAccount?currentAccount.id:''
//                                     , label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
//                                 onChange={(value:any, _event:any) => setCurrent({...current,
//                                         account:value /*, accountName: _event?.name*/})}
//                                 values={accData.slice().sort(sortById).map(toOption)}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.postingdate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="postingdate"
//                                 label={t('common.postingdate')}
//                                 selected={current.postingdate}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**OutputVat company */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={12}
//                               justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.description')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch"  spacing={1}>
//                             <TextareaField
//                                 fieldName="description"
//                                 placeholder={t('common.description')} // eslint-disable-next-line react/prop-types
//                                 value={current.description}
//                                 disabled={disable}
//                                 rows={2}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 style={{ width: 1000 }}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.company')}</div>
//                         </Grid>
//                         <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField fieldName="company" current={current}
//                                         setCurrent={setCurrent}
//                                         value={current.company}
//                                         disabled={disable}
//                                         style={{ height: 20,width: 80, textAlign: 'right' }}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**isDebit isBalancesheet */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={12}
//                               justify="flex-start" alignItems="flex-start">
//                             <BooleanField
//                                 fieldName="isDebit" current={current}
//                                 setCurrent={setCurrent}
//                                 label={t('account.debit_credit')}
//                                 disabled={disable}
//                                 checked={current.isDebit}
//                                 style={{ height: 30, paddingLeft: 2 }}
//                             />
//                         </Grid>
//                         <Grid item sm={4} xs={12}
//                               justify="flex-start" alignItems="flex-start">
//                             <BooleanField
//                                 fieldName="balancesheet" current={current}
//                                 setCurrent={setCurrent}
//                                 label={t('account.balancesheet')}
//                                 disabled={disable}
//                                 checked={current.balancesheet}
//                                 style={{ height: 30, paddingLeft: 20, width:150 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.currency')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-end">
//                             <InputField fieldName="currency" current={current}
//                                         setCurrent={setCurrent}
//                                         value={current.currency}
//                                         disabled={disable}
//                                         style={{ height: 20, textAlign: 'right' }}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }
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
// export const BankStatementParameterForm = ({ current, setCurrent, t, height }:BankStatementParamProps) => {
//
//     return (
//         <>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="1">
//                     <FieldLabel title={t('bankstatement.header')}  />
//                 </CCol>
//                 <CCol sm="1.5" style={{ height: height-8 }}>
//                     <InputField
//                         fieldName="header"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.header}
//                         disabled={false}
//                         style={{ paddingLeft: 0 }}
//                     />
//                 </CCol>
//                 <CCol sm="1" style={{ height: height-8, paddingLeft: 10 }}>
//                     <FieldLabel title={t('bankstatement.char')} />
//                 </CCol>
//                 <CCol sm="1" style={{ height: 25 }}>
//                     <InputField
//                         fieldName="char"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.char}
//                         disabled={false}
//                         style={{ paddingLeft: 0 }}
//                     />
//                 </CCol>
//                 <CCol sm="1" style={{ height: height-5, paddingLeft: 10 }}>
//                     <FieldLabel title={t('bankstatement.extension')}/>
//                 </CCol>
//                 <CCol sm="1" style={{ height: 25 }}>
//                     <InputField
//                         fieldName="extension"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.extension}
//                         placeholder=".CSV"
//                         disabled={false}
//                         style={{ paddingLeft: 0 }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{  paddingTop: 5 }}>
//                 <CCol sm="1">
//                     <FieldLabel title={t('bankstatement.path')} />
//                 </CCol>
//                 <CCol sm="12" md="10" style={{ height: height-5, paddingLeft: 10 }}>
//                     <InputField
//                         fieldName="path"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.path}
//                         disabled={false}
//                         style={{ paddingLeft: 0 }}
//                     />
//                 </CCol>
//             </CInputGroup>
//         </>
//     )
// }
// export const BankStatementMainForm = ({  current, setCurrent, t, locale, currency , height}:BankStatementProps) => {
//     return (
//         <>
//             {/**Id, postingdate*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('common.id')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="id"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.id}
//                 disabled={current.posted}
//                 style={{ height: height-3 }}
//               />
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('common.postingdate')} />
//             </CCol>
//             <CCol sm="2">
//               <DatePickerField
//                 fieldName="postingdate"
//                 label={t('common.postingdate')}
//                 selected={current.postingdate}
//                 current={current}
//                 setCurrent={setCurrent}
//                 disabled={true}
//               />
//             </CCol>
//           </CInputGroup>
//             {/**Depositor, valuedate*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('bankstatement.depositor')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="depositor"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.depositor}
//                 disabled={current.posted}
//                 style={{ height: height-3 }}/>
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('bankstatement.valuedate')} />
//             </CCol>
//             <CCol sm="2">
//               <DatePickerField
//                 fieldName="valuedate"
//                 label={t('bankstatement.valuedate')}
//                 selected={current.valuedate}
//                 current={current}
//                 setCurrent={setCurrent}
//                 disabled={current.posted}/>
//             </CCol>
//           </CInputGroup>
//             {/**Beneficiary, Info*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('bankstatement.beneficiary')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="beneficiary"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.beneficiary}
//                 disabled={current.posted}
//                 style={{ height: height-3 }}/>
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('bankstatement.info')} />
//             </CCol>
//             <CCol sm="2">
//               <InputField
//                 fieldName="info"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.postingtext}
//                 disabled={current.posted}
//                 style={{ textAlign: 'left', width: 190, height: height-3 }}/>
//             </CCol>
//           </CInputGroup>
//             {/** postingtext, valuedate*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('bankstatement.postingtext')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="postingtext"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.postingtext}
//                 disabled={current.posted}
//                 style={{ height: height-3 }}/>
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('bankstatement.amount')} />
//             </CCol>
//             <CCol sm="2">
//               <InputField
//                 fieldName="amount"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={Number(current.amount).toLocaleString(locale, {
//                   maximumFractionDigits: 2,
//                   minimumFractionDigits: 2,
//                   style: 'currency',
//                   currency: currency,
//                 })}
//                 disabled={current.posted}
//                 style={{ textAlign: 'right', width: 140, height: height-3 }}
//               />
//             </CCol>
//           </CInputGroup>
//             {/**IBAN, company*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('bankstatement.companyIban')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="companyIban"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.companyIban}
//                 disabled={current.posted}
//                 style={{ height: height-3 }}/>
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('common.company')} />
//             </CCol>
//             <CCol sm="2">
//               <InputField
//                 fieldName="company"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.company}
//                 disabled={true}
//                 style={{ textAlign: 'right', padding: 2, width: 120 }}/>
//             </CCol>
//           </CInputGroup>
//             {/**Accountno, accountno*/}
//           <CInputGroup  style={{ height: height }}>
//             <CCol sm="2">
//               <FieldLabel title={t('bankstatement.accountno')} />
//             </CCol>
//             <CCol sm="4">
//               <InputField
//                 fieldName="accountno"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.accountno}
//                 disabled={current.posted}
//                 style={{ height: height-3, }}/>
//             </CCol>
//             <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('bankstatement.bankCode')} />
//             </CCol>
//             <CCol sm="2">
//               <InputField
//                 fieldName="bankCode"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.bankCode}
//                 disabled={true}
//                 style={{ textAlign: 'left', padding: 2, height: height-3, width: 120 }}/>
//             </CCol>
//           </CInputGroup>
//           <CInputGroup  style={{ height: height }}>
//             <CCol md="2" style={{ height: height-3, paddingLeft: 10 }}>
//               <FieldLabel title={t('bankstatement.purpose')} />
//             </CCol>
//             <CCol  md={10}>
//               <TextareaField
//                 fieldName="purpose"
//                 placeholder={t('common.purpose')}
//                 disabled={current.posted}
//                 value={current.purpose}
//                 current={current}
//                 rows ={3}
//                 setCurrent={setCurrent}
//               />
//             </CCol>
//           </CInputGroup>
//         </>
//     )
// }
// export const AssetMainForm =
//   ({collapse, current, setCurrent, t, accData, ccyData, height, disable, locale } :AssetProps) => {
//     const amountLabel = t('asset.amount')
//     const scrapValueLabel = t('asset.scrapValue')
//     console.log('locale', locale)
//     return (
//         <CInputGroup  style={{...styles.outer, paddingBottom:10, display: !collapse?'none':''}} >
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.id')} />
//                 </CCol>
//                 <CCol sm="4">
//                     <InputField
//                         fieldName="id"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.id}
//                         disabled={disable}
//                         style={{ height: 30 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
//                     <FieldLabel title={t('common.enterdate')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <DatePickerField
//                         fieldName="enterdate"
//                         label={t('common.enterdate')}
//                         selected={current.enterdate}
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={true}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.name')} />
//                 </CCol>
//                 <CCol sm="4">
//                     <InputField
//                         fieldName="name"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.name}
//                         disabled={disable}
//                         style={{ height: 30 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
//                     <FieldLabel title={t('common.changedate')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <DatePickerField
//                         fieldName="changedate"
//                         label={t('common.changedate')}
//                         selected={current.enterdate}
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={true}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.account')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
//                      data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                     styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//                     <FieldLabel title={t('common.postingdate')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <DatePickerField
//                         fieldName="postingdate"
//                         label={t('common.postingdate')}
//                         selected={current.postingdate}
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={true}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.oaccount')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'oaccount'} current={current} setCurrent={setCurrent}
//                       data={accData.slice()} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                       styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//                     <FieldLabel title={ t('common.currency')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <MasterfileXComboBox fieldName={'currency'} current={current} setCurrent={setCurrent}
//                                              data={ccyData} defaultValue={initCurrency[0]} zIndex={11} disable={disable}
//                                              styles={{...styles, minHeight:25, height:25, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={ `${amountLabel}/${scrapValueLabel}`} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="amount"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={ Number(current.amount).toFixed(2)}
//                         onChange={(event:any) => setCurrent({ ...current, amount: Number(event.target.value) })}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 5 }}>
//                     <InputField
//                         fieldName="scrap_value"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={Number(current.scrapValue)}
//                         onChange={(event:any) => setCurrent({ ...current, scrapValue: Number(event.target.value) })}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
//                     <FieldLabel title={t('asset.lifeSpan')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="life_span"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.lifeSpan}
//                         onChange={(event:any) => setCurrent({ ...current, lifeSpan: Number(event.target.value) })}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('asset.depreciation')} />
//                 </CCol>
//                 <CCol sm="4">
//                     <InputField
//                         fieldName="dep_Method"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.depMethod}
//                         onChange={(event:any) => setCurrent({ ...current, depMethod: Number(event.target.value) })}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
//                     <FieldLabel title={t('asset.frequency').concat('/').concat(t('asset.rate'))} />
//                 </CCol>
//                 <CCol sm="1">
//                     <InputField
//                         fieldName="frequency"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.frequency}
//                         onChange={(event:any) => setCurrent({ ...current, frequency:Number(event.target.value)})}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//                 <CCol sm="1" style={{ height: height, paddingLeft: 6 }}>
//                     <InputField
//                         fieldName="rate"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.rate}
//                         onChange={(event:any) => setCurrent({ ...current, rate:Number(event.target.value) })}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol md="2">
//                     <FieldLabel title={t('common.description')} />
//                 </CCol>
//                 <CCol xs="12" md="9">
//                     <TextareaField
//                         fieldName="description"
//                         placeholder={t('common.description')}
//                         disabled={disable}
//                         value={current.description}
//                         current={current}
//                         setCurrent={setCurrent}
//                     />
//                 </CCol>
//             </CInputGroup>
//         </CInputGroup>
//     )
// }

// export const MasterfilesFormWithout =
//   ({current, setCurrent, accData, t,  disable, height, fieldName, propertyName}:MasterfileProps2<IMasterfile2|IStore>) => {
//     return (
//       <>
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.id')} />
//           </CCol>
//           <CCol sm="4">
//             <InputField
//               fieldName="id"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.id}
//               disabled={disable}
//               style={{ height: height-3 }}
//             />
//           </CCol>
//           <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.enterdate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="enterdate"
//               label={t('common.enterdate')}
//               selected={current.enterdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         {/**Name */}
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.name')} />
//           </CCol>
//           <CCol sm="4">
//             <InputField
//               fieldName="name"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.name}
//               disabled={disable}
//               style={{ height: height-3 }}
//             />
//           </CCol>
//           <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.changedate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="enterdate"
//               label={t('common.changedate')}
//               selected={current.enterdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         {/**InputVat */}
//         <CInputGroup  style={{ height: height-3 }}>
//           <CCol sm="2">
//             <FieldLabel title={current?.hasOwnProperty(propertyName)?fieldName:'group'} />
//           </CCol>
//           <CCol sm="4">
//             {current?.hasOwnProperty(propertyName)?
//               <MasterfileXComboBox fieldName={propertyName} current={current} setCurrent={setCurrent}
//                                    data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                                    styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//               :
//               <CInputGroup  style={{ height: height }}>
//                 <CCol md="2">
//                   <FieldLabel title={t('common.description')} />
//                 </CCol>
//                 <CCol xs="12" md="9">
//                   <TextareaField
//                     fieldName="description"
//                     placeholder={t('common.description')}
//                     disabled={disable}
//                     value={current.description}
//                     current={current}
//                     setCurrent={setCurrent}
//                     style={{ height: height-3 }}
//                   />
//                 </CCol>
//               </CInputGroup>
//             }
//           </CCol>
//           <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.postingdate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="postingdate"
//               label={t('common.postingdate')}
//               selected={current.postingdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         {/**description */}
//         {current?.hasOwnProperty(propertyName)?
//           <CInputGroup  style={{ height: height }}>
//             <CCol md="2">
//               <FieldLabel title={t('common.description')} />
//             </CCol>
//             <CCol xs="12" md="9">
//               <TextareaField
//                 fieldName="description"
//                 placeholder={t('common.description')}
//                 disabled={disable}
//                 value={current.description}
//                 current={current}
//                 setCurrent={setCurrent}
//                 style={{ height: height-3 }}
//               />
//             </CCol>
//           </CInputGroup>
//           : null
//         }
//       </>
//     )
//   }

// export const MasterfilesForm =
//   ({collapse,  current, setCurrent, accData, t,  disable, height, fieldName, propertyName}:MasterfileProps2<IMasterfile2|IStore>) => {
//   return (
//     <div  style={{...styles.outer, paddingBottom:10, display: !collapse?'none':''}} >
//       <MasterfilesFormWithout collapse={collapse} current={current} setCurrent={setCurrent} accData={accData} t={t}
//                               disable={disable} height={height} propertyName={propertyName} fieldName={fieldName}/>
//     </div>
//   )
// }


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
export const MasterfileMainBase0Form =
  ({ current, setCurrent, t,  disable, height}:MasterfileProps<IMasterfile>) => {
    return (
      <>
        {/*<div style={{...styles.outer, display: !collapse?'none':''}} >*/}
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
              style={{ height: height-3 }}
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
        {/**Name */}
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
              style={{ height: height-3 }}
            />
          </CCol>
          <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
            <FieldLabel title={t('common.changedate')} />
          </CCol>
          <CCol sm="2">
            <DatePickerField
              fieldName="enterdate"
              label={t('common.changedate')}
              selected={current.enterdate}
              current={current}
              setCurrent={setCurrent}
              disabled={true}
            />
          </CCol>
        </CInputGroup>
      </>
    )
  }


export const    MasterfileMainBaseForm = ({ collapse,  current, setCurrent, disable, t,  height }:MasterfileProps<IMasterfile>)=> {
  return (
    <>
     {/*<div style={{...styles.outer, display: !collapse?'none':''}} >*/}
      <MasterfileMainBase0Form collapse ={collapse} current={current} setCurrent={setCurrent} disable={disable} t={t}  height={height}/>
      {/** Description */}
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
               style={{ height: height-3 }}
             />
          </CCol>
          <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
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
     </>
  )
}


//
// export const    FModuleMainForm = ({collapse, current, setCurrent, accData, accountData, rowData, disable, t,  height }:FModuleProps2<IFmodule>)=> {
//     return (
//       <div style={{...STYLES.outer0, paddingBottom:10, display: !collapse?'none':''}} >
//         <MasterfilesFormWithout collapse={collapse} current={current} setCurrent={setCurrent} accData={accData} t={t}
//                                 disable={disable} height={height} propertyName={'parent'} fieldName={t('fmodule.parent')}/>
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.account')} />
//           </CCol>
//           <CCol sm="4">
//             <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
//                                  data={accountData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//           </CCol>
//           <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//             <FieldLabel title={t('fmodule.accountFilter')} />
//           </CCol>
//           <CCol sm="2">
//             <InputField
//               fieldName="accFilter"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.accFilter}
//               disabled={disable}
//               style={{ height: height }}/>
//           </CCol>
//         </CInputGroup>
//           {/*</Grid>*/}
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.copyFrom')} />
//           </CCol>
//           <CCol sm="4">
//             <MasterfileXComboBox fieldName={'copyFrom'} current={current} setCurrent={setCurrent}
//                                  data={rowData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//               styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//           </CCol>
//           <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//             <FieldLabel title={t('fmodule.oaccountFilter')} />
//           </CCol>
//           <CCol sm="2">
//             <InputField
//               fieldName="oaccFilter"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.oaccFilter}
//               disabled={disable}
//               style={{ height: height }}/>
//           </CCol>
//         </CInputGroup>
//
//      </div>
//     )
// }


// export const MasterfileMainForm = ({collapse, current, setCurrent, disable, t,  height }:MasterfileProps<IMasterfile>) => {
//     return (
//       <div style={{...styles.outer, display: !collapse?'none':''}} >
//             <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
//                                     disable ={disable} t ={t} height ={height}/>
//       </div>
//     )
// }

export const PermissionMainForm = ({collapse, current, setCurrent, disable, t,  height }: MasterfileProps<IPermission>) => {
  const  current1:IPermission = current
  return (
    <div style={{...styles.outer, display: !collapse?'none':''}} >
      <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                              disable ={disable} t ={t}  height ={height}/>
      <CInputGroup  style={{ height: height }}>
        <CCol md="2">
          <FieldLabel title={t('common.permission')} />
        </CCol>
        <CCol xs="12" md="9">
          <InputField
            fieldName="permission"
            current={current1}
            setCurrent={setCurrent}
            value={current1.short}
            disabled={disable}
            style={{ height: height}}/>
        </CCol>
      </CInputGroup>
    </div>
  )
}

// export const ArticleGeneralForm =
//     ({ collapse, current, setCurrent,  t, quantityUnitData, groupData, ccyData, disable, height}:ArticleGeneralFormProps) => {
//
//         return (
//           <div  style={{...styles.outer, paddingBottom:15, display: !collapse?'none':''}} >
//                 {/**Id, enterdate*/}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('common.id')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <InputField
//                     fieldName="id"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={current.id}
//                     disabled={disable}
//                     style={{ height: height-3 }}
//                   />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//                   <FieldLabel title={t('common.enterdate')} />
//                 </CCol>
//                 <CCol sm="2">
//                   <DatePickerField
//                     fieldName="enterdate"
//                     label={t('common.enterdate')}
//                     selected={current.enterdate}
//                     current={current}
//                     setCurrent={setCurrent}
//                     disabled={true}
//                   />
//                 </CCol>
//               </CInputGroup>
//               {/**Name */}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('common.name')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <InputField
//                     fieldName="name"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={current.name}
//                     disabled={disable}
//                     style={{ height: height-3 }}
//                   />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//                   <FieldLabel title={t('common.changedate')} />
//                 </CCol>
//                 <CCol sm="2">
//                   <DatePickerField
//                     fieldName="enterdate"
//                     label={t('common.changedate')}
//                     selected={current.enterdate}
//                     current={current}
//                     setCurrent={setCurrent}
//                     disabled={true}
//                   />
//                 </CCol>
//               </CInputGroup>
//                 {/**QuantityUnit, changedate */}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('article.quantityUnit')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'quantityUnit'} current={current} setCurrent={setCurrent}
//                            data={quantityUnitData} defaultValue={initQuantity[0]} zIndex={11} disable={disable}
//                     styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//                   <FieldLabel title={t('common.postingdate')} />
//                 </CCol>
//                 <CCol sm="2">
//                   <DatePickerField
//                     fieldName="postingdate"
//                     label={t('common.postingdate')}
//                     selected={current.enterdate}
//                     current={current}
//                     setCurrent={setCurrent}
//                     disabled={true}
//                   />
//                 </CCol>
//               </CInputGroup>
//                 {/**PackUnit, PPrice*/}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('article.packUnit')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'packUnit'} current={current} setCurrent={setCurrent}
//                        data={quantityUnitData} defaultValue={initQuantity[0]} zIndex={11} disable={disable}
//                      styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 5 }}>
//                   <FieldLabel title={t('article.pprice')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <InputNumberField
//                     fieldName="pprice"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={Number(current?.pprice).toFixed(2)}
//                     disabled={disable}
//                     style={{ height: 20, width:120, textAlign: 'right', padding: 2, fontSize:12}}
//                   />
//                   <FieldLabel  title={current.currency}/>
//                 </CCol>
//               </CInputGroup>
//
//                  {/**Group, SPrice*/}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('article.group')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'parent'} current={current} setCurrent={setCurrent}
//                          data={groupData} defaultValue={initArticleGroup[0]} zIndex={11} disable={disable}
//                       styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 5 }}>
//                   <FieldLabel title={t('article.sprice')} />
//                 </CCol>
//                 <CCol sm="3">
//                   <InputNumberField
//                     fieldName="sprice"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={Number(current?.sprice).toFixed(2)}
//                     //value={current?.pprice}
//                     disabled={disable}
//                     style={{ height: 20, width:120, textAlign: 'right', padding: 2, fontSize:12}}
//                   />
//                   <FieldLabel  title={current.currency}/>
//                 </CCol>
//               </CInputGroup>
//                 {/**Description, avgPrice */}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('common.currency')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <MasterfileXComboBox fieldName={'currency'} current={current} setCurrent={setCurrent}
//                                        data={ccyData} defaultValue={initCurrency[0]} zIndex={11} disable={disable}
//                                        styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
//                 </CCol>
//
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 5 }}>
//                   <FieldLabel title={t('article.avgPrice')} />
//                 </CCol>
//                 <CCol sm="3">
//                   <InputNumberField
//                     fieldName="avgPrice"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={Number(current?.avgPrice).toFixed(2)}
//                     disabled={disable}
//                     style={{ height: 20, width:120, textAlign: 'right', padding: 2, fontSize:12}}
//                   />
//                   <FieldLabel  title={current.currency}/>
//                 </CCol>
//               </CInputGroup>
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('common.description')} />
//                 </CCol>
//                 <CCol sm="10">
//                   <TextareaField
//                     fieldName="description"
//                     placeholder={t('common.description')}
//                     disabled={disable}
//                     value={current.description}
//                     current={current}
//                     setCurrent={setCurrent}
//                   />
//                 </CCol>
//               </CInputGroup>
//           </div>
//         )
//     }
//
// export const ArticleQRForm:FC<ArticleQRFormProps> =
//   ({ current }) => {
//
//     return (
//       <Grid container spacing={0} style={{...styles.outer, minWidth:'100%', height: 260, maxWidth: 1000, display: 'flex'}}>
//         {/**QR Code */}
//           <Grid item sm={12} xs={2}>
//             <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//
//               <Grid item sm ={8} xs={2} justify="flex-start" alignItems="stretch">
//                   {/*<QRCode fgColor ={'#000000'} bgColor ={'#FFFFFF'}*/}
//                   {/*  size={256}*/}
//                   {/*  style={{ height: "auto", background: 'white', padding: '15px',  paddingRight:'15px'}}*/}
//                   {/*  title={current.name}*/}
//                   {/*  value={`${current.id}${current.name}`}*/}
//                   {/*  viewBox={`0 0 256 256`}*/}
//                   {/*/>*/}
//                </Grid>
//               <Grid item sm ={4} xs={4} justify="flex-end" alignItems="stretch">
//                   <img src="/apple-icon-180x180.png" alt="product.name"   style={{ padding: '20px',   paddingLeft:'50px'}}/>
//               </Grid>
//             </Grid>
//         </Grid>
//       </Grid>
//     )
//   }

// export const UserMainForm = ({ collapse, current, setCurrent, disable, t }:UserFormProps) => {
//
//    const styles = STYLES
//   return (
//         <Grid container spacing={0} style={{...styles.outer, display: !collapse ? 'none' : ''}}>
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.id')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} justify="flex-end">
//                             <InputField
//                                 fieldName="id"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.id}
//                                 //placeholder="User-id"
//                                 disabled={disable}
//                                 //style={{height: height}}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.enterdate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="enterdate"
//                                 label={t('common.enterdate')}
//                                 selected={new Date()}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Name */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={12}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('user.userName')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <InputField
//                                 fieldName="userName"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.userName}
//                                 disabled={disable}
//                                 style={{height: 20, width: 300}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.changedate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="changedate"
//                                 label={t('common.changedate')}
//                                 selected={new Date()}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**firstName */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={12}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('user.firstName')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <InputField
//                                 fieldName="firstName"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.firstName}
//                                 disabled={disable}
//                                 style={{height: 20, width: 300}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.postingdate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="postingdate"
//                                 label={t('common.postingdate')}
//                                 selected={new Date()}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 disabled={true}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**LastName */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={12}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('user.lastName')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <InputField
//                                 fieldName="lastName"
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.lastName}
//                                 disabled={disable}
//                                 style={{height: 20, width: 300}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Email */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={12}
//                               justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.email')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <InputField
//                                 fieldName="email"
//                                 disabled={disable}
//                                 value={current.email}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 style={{height: 20, width: 300}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('common.company')}</div>
//                         </Grid>
//                         <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField fieldName="company" current={current}
//                                         setCurrent={setCurrent}
//                                         value={current.company}
//                                         disabled={disable}
//                                         style={{height: 20, width: 80, textAlign: 'right'}}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//         )
//
// }
// export const AddressForm = ({ current, setCurrent, disable, t, height }:IAddressProps) => {
//
//     return (
//         <CInputGroup  style={{...styles.outer}} >
//               {/*street, zip */}
//               <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                   <FieldLabel title={t('common.street')} />
//                 </CCol>
//                 <CCol sm="4">
//                   <InputField
//                     fieldName="street"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={current.street}
//                     disabled={disable}
//                     style={{ height: height-3 }}
//                   />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//                   <FieldLabel title={t('common.zip')} />
//                 </CCol>
//                 <CCol sm="2">
//                   <InputField
//                     fieldName="zip"
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={current.zip}
//                     disabled={disable}
//                     style={{ height: height-3 }}
//                   />
//                 </CCol>
//               </CInputGroup>
//                   <CInputGroup  style={{ height: height }}>
//                     <CCol sm="2">
//                       <FieldLabel title={t('common.city')} />
//                     </CCol>
//                     <CCol sm="4">
//                       <InputField
//                         fieldName="city"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.city}
//                         disabled={disable}
//                         style={{ height: height-3 }}
//                       />
//                     </CCol>
//                     <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//                       <FieldLabel title={t('common.state')} />
//                     </CCol>
//                     <CCol sm="2">
//                       <InputField
//                         fieldName="state"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.state}
//                         disabled={disable}
//                         style={{ height: height-3 }}
//                       />
//                     </CCol>
//                   </CInputGroup>
//                   <CInputGroup  style={{ height: height }}>
//                     <CCol sm="2">
//                       <FieldLabel title={t('common.country')} />
//                     </CCol>
//                     <CCol sm="4">
//                       <InputField
//                         fieldName="country"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.country}
//                         disabled={disable}
//                         style={{ height: height-3 }}
//                       />
//                     </CCol>
//                   </CInputGroup>
//                 {/*email,  */}
//             <CInputGroup  style={{ height: height }}>
//               <CCol sm="2">
//                 <FieldLabel title={t('common.email')} />
//               </CCol>
//               <CCol sm="4">
//                 <InputField
//                   fieldName="email"
//                   current={current}
//                   setCurrent={setCurrent}
//                   value={current.email}
//                   disabled={disable}
//                   style={{ height: height-3 }}
//                 />
//               </CCol>
//               <CCol sm="2" style={{ height: 30, paddingLeft: 10 }}>
//                 <FieldLabel title={t('common.phone')} />
//               </CCol>
//               <CCol sm="2">
//                 <InputField
//                   fieldName="phone"
//                   current={current}
//                   setCurrent={setCurrent}
//                   value={current.phone}
//                   disabled={disable}
//                   style={{ height: height-3 }}
//                 />
//               </CCol>
//             </CInputGroup>
//           </CInputGroup>
//     )
// }

// export const CustomerGeneralForm =
//   ({collapse, current, setCurrent, disable, t, height }: CustomerGeneralFormProps) => {
//
//     return (
//       <CInputGroup  style={{...styles.outer, paddingBottom:10, display: !collapse?'none':''}} >
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.id')} />
//           </CCol>
//           <CCol sm="4">
//             <InputField
//               fieldName="id"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.id}
//               disabled={disable}
//               style={{ height: height-3 }}
//             />
//           </CCol>
//           <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.enterdate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="enterdate"
//               label={t('common.enterdate')}
//               selected={current.enterdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.name')} />
//           </CCol>
//           <CCol sm="4">
//             <InputField
//               fieldName="name"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.name}
//               disabled={disable}
//               style={{ height: height-3 }}
//             />
//           </CCol>
//           <CCol sm="2" style={{ height: height-3, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.changedate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="changedate"
//               label={t('common.changedate')}
//               selected={current.enterdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         <CInputGroup  style={{ height: height }}>
//           <CCol sm="2">
//             <FieldLabel title={t('common.taxCode')} />
//           </CCol>
//           <CCol sm="4">
//             <InputField
//               fieldName="taxCode"
//               current={current}
//               setCurrent={setCurrent}
//               value={current.taxCode}
//               disabled={disable}
//               style={{ height: height-3 }}/>
//           </CCol>
//           <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//             <FieldLabel title={t('common.postingdate')} />
//           </CCol>
//           <CCol sm="2">
//             <DatePickerField
//               fieldName="postingdate"
//               label={t('common.postingdate')}
//               selected={current.postingdate}
//               current={current}
//               setCurrent={setCurrent}
//               disabled={true}
//             />
//           </CCol>
//         </CInputGroup>
//         <CInputGroup  style={{ height: height }}>
//           <CCol md="2">
//             <FieldLabel title={t('common.description')} />
//           </CCol>
//           <CCol xs="12" md="9">
//             <TextareaField
//               fieldName="description"
//               placeholder={t('common.description')}
//               disabled={disable}
//               value={current.description}
//               current={current}
//               setCurrent={setCurrent}
//               style={{ height: height}}
//             />
//           </CCol>
//         </CInputGroup>
//       </CInputGroup>
//     )
// }
// export const CompanyGeneralForm =
//   ({current, setCurrent, ccyData, disable, t }: CustomerGeneralFormProps) => {
//   return (
//     <Grid container spacing={0} style={{...styles.outer}}>
//       <Grid container spacing={1}>
//         <Grid item sm={8} xs={2}>
//           <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//             <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//               <div>{t('common.id')}</div>
//             </Grid>
//             <Grid item sm ={2} xs={2} justify="flex-end">
//               <InputField
//                 fieldName="id"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.id}
//                 disabled={disable}
//                 style={{ height: 20}}/>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item sm={4} xs={6}>
//           <Grid container maximize style={styles.fuller} alignItems="stretch">
//             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//               <div>{t('common.enterdate')}</div>
//             </Grid>
//             <Grid item sm={4} xs={1} alignItems="stretch" justify="flex-start">
//               <DatePickerField
//                 fieldName="enterdate"
//                 label={t('common.enterdate')}
//                 selected={current.enterdate}
//                 current={current}
//                 setCurrent={setCurrent}
//                 disabled={true}/>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/**Name */}
//       <Grid container spacing={1}>
//         <Grid item sm={8} xs={2}>
//           <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
//             <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//               <div >{t('common.name')}</div>
//             </Grid>
//             <Grid item sm ={10} xs={10} justify="flex-end">
//               <InputField
//                 fieldName="name"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.name}
//                 disabled={disable}
//                 style={{ height: 20 }}/>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item sm={4} xs={6}>
//           <Grid container maximize style={styles.fuller} alignItems="stretch">
//             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//               <div>{t('common.changedate')}</div>
//             </Grid>
//             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//               <DatePickerField
//                 fieldName="changedate"
//                 label={t('common.changedate')}
//                 selected={current.changedate}
//                 current={current}
//                 setCurrent={setCurrent}
//                 disabled={true}/>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/**taxCode postingdate */}
//       <Grid container spacing={1}>
//         <Grid item sm={8} xs={2}>
//           <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
//             <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//               <div >{t('common.taxCode')}</div>
//             </Grid>
//             <Grid item sm ={10} xs={10} justify="flex-end">
//               <InputField
//                 fieldName="taxCode"
//                 current={current}
//                 setCurrent={setCurrent}
//                 value={current.taxCode}
//                 disabled={disable}
//                 style={{ height: 20 }}/>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item sm={4} xs={6}>
//           <Grid container maximize style={styles.fuller} alignItems="stretch">
//             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//               <div>{t('common.postingdate')}</div>
//             </Grid>
//             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//               <DatePickerField
//                 fieldName="postingdate"
//                 label={t('common.postingdate')}
//                 selected={current.postingdate}
//                 current={current}
//                 setCurrent={setCurrent}
//                 disabled={true}/>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/**currency*/}
//       <Grid container spacing={1}>
//         <Grid item sm={8} xs={6}>
//           <Grid container maximize style={styles.fuller} alignItems="stretch">
//             <Grid item  sm={2}  xs={2} alignItems="stretch" justify="flex-start">
//               <div>{t('common.currency')}</div>
//             </Grid>
//             <Grid item sm={10} xs={10} alignItems="stretch" justify="flex-start">
//               <MasterfileXComboBox fieldName={'currency'} current={current} setCurrent={setCurrent}
//                    data={ccyData} defaultValue={initCurrency[0]} zIndex={11} disable={disable}
//                    styles={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280'}}/>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   )
// }

// export const StoreGeneralForm = ({collapse, current, setCurrent, disable, t, height}: StoreGeneralFormProps) => {
//     return (
//       <div  style={{...styles.outer, display: !collapse?'none':''}} >
//         <MasterfileMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
//                                 disable ={disable} t ={t} height ={height}/>
//       </div>
//     )
// }

export const FromPeriod = ({ name, label, value, current, setCurrent, t, labelStyle, style }:
                    { name:string, label:string, value:any, current:any, setCurrent:(arg:any)=>void, t:TFunction<'translation', undefined>
                        , labelStyle?:any, style:any }) => {
  // console.log('name', name)
  // console.log('value', value )
    return (
        <>
            <CCol sm="0.5" style={labelStyle??null}>
                <FieldLabel title={t(label)} />
            </CCol>
            <CCol sm="1" style={{ paddingLeft: 5, width: '100%' }}>
                <InputField
                    fieldName={name}
                    current={current}
                    setCurrent={setCurrent}
                    value={value}
                    style={style ? style : { height: 30, padding: 1, textAlign: 'right', width: '100%' }}
                />
            </CCol>
        </>
    )
}


const  getAccountLabel = (current:ICustomer|ISupplier|IEmployee|IArticle|IStore
    , t:TFunction<'transalation', undefined>) =>
    current?.modelid === formEnum.SUPPLIER
        ? t('supplier.account') :
        current?.modelid === formEnum.CUSTOMER
            ? t('customer.account')
            :
            current?.modelid === formEnum.EMPLOYEE
                ? t('employee.account')
                : t('article.stock.account')


const  getOAccountLabel = (current:ICustomer|ISupplier|IEmployee|IArticle|IStore
    , t:TFunction<'transalation', undefined>) =>
    current?.modelid === formEnum.SUPPLIER ? t('supplier.oaccount')
        :
        current?.modelid === formEnum.CUSTOMER
            ? t('customer.oaccount')
            :
            current?.modelid === formEnum.EMPLOYEE
                ? t('employee.oaccount')
                : t('article.expense.account')

// const setTransactionR = ( transaction:ITransaction
//     , setTransaction:(arg:ITransaction)=>void
//     , line:ILineTransaction
//     , setCurrent:(arg:ILineTransaction)=>void) => {
//     const idx = transaction?.lines?.findIndex((obj) => obj.id === line.id);
//     const linex: ILineTransaction = {...line, transid: transaction.id};
//     (idx === -1) ? transaction.lines.push(linex) : (transaction.lines[idx] = linex)
//     setTransaction(transaction)
//     setCurrent(linex)
// }

// export const TransactionDetailsForm = (
//     { transaction, setTransaction, currentLineTransaction, setCurrentLineTransaction
//         , articleData, vatData, t,  disable, height }: TransactionDetailsFormProps<ITransaction, ILineTransaction> ) => {
//     const current = currentLineTransaction
//     const setCurrent = setCurrentLineTransaction
//     const currentArticle = articleData?.find((acc: { id: any }) => acc.id === current.article)??initArticle[0]
//     const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)??initVat[0]
//     const  getPrice = (article:IArticle) => {
//     return (transaction.modelid == formEnum.SALES_ORDER || transaction.modelid == formEnum.CUSTOMER_INVOICE||
//       transaction.modelid == formEnum.DELIVERY) ? article.sprice :
//       (transaction.modelid == formEnum.PURCHASE_ORDER || transaction.modelid == formEnum.SUPPLIER_INVOICE||
//         transaction.modelid == formEnum.GOODRECEIVING) ? article.pprice : 0.0
//     }
//
//     return (
//         <Grid container spacing={0} style={styles.outer}>
//             {/**Article,  quatity*/}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('transaction.line.article')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ {value:currentArticle?currentArticle.id:'', label: currentArticle?`${currentArticle.id} ${currentArticle.name}` :''}}
//                                 onChange={(value:any, _event:any) => {
//                                     const article = articleData?.find((acc: { id: any }) => acc.id === value)??initArticle[0]
//                                     const currentVat = vatData?.find((vat: { id: any }) => vat.id === article?.vatCode)
//                                     const percent= currentVat?.percent??0.0
//                                     const vatAmount = percent*current.quantity*current.price
//                                     const vatCode = currentVat?currentVat?.id:''
//                                     const currentx:ILineTransaction = {...current,
//                                         article: value, articleName: article ?article.name:''
//                                       , unit:article ?article.quantityUnit:'', price:getPrice(article)
//                                         // @ts-ignore
//                                       ,  vatCode:vatCode, vat:vatAmount,  currency:article?article.currency:''
//                                       , company:`-${transaction.company}`}
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 values={articleData.slice().sort(sortById).map(toOption)}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('transaction.line.quantity')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='quantity'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={Number(current.quantity)}
//                                 onChange={(event:any) => {
//                                     const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*event.target.value*current.price
//                                     const currentx = { ...current, quantity: event.target.value, vat:vatAmount, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 disabled={disable}
//                                 style={ { height: height, padding: 1, textAlign: 'right' }}
//                             />
//                         </Grid>
//                         <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='unit'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.unit}
//                                 onChange={(event:any) => {
//                                     const currentx = { ...current, unit: event.target.value, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 disabled={true}
//                                 style={ { height: height, padding: 1, paddingLeft: 15, textAlign: 'left' }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Vat price */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.vatCode')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ {value:currentVat?currentVat.id:'', label: currentVat?`${currentVat.id} ${currentVat.name}` :''}}
//                                 onChange={(value:any, _event:any) => {
//                                     const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)
//                                     const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*current.quantity*current.price
//                                     const currentx = {...current, vatCode: value,  vat:vatAmount
//                                         ,  company:`-${transaction.company}` /*, accountName: _event?.name*/}
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 values={vatData.slice().sort(sortById).map(toOption)}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('transaction.line.price')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='price'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={Number(current.price)}
//                                 onChange={(event:any) => {
//                                     const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*current.quantity*event.target.value
//                                     const currentx = { ...current, price: event.target.value, vat:vatAmount, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 disabled={disable}
//                                 style={ { height: height, padding: 1, textAlign: 'right' }}
//                             />
//                         </Grid>
//                         <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='currency'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.currency}
//                                 disabled={true}
//                                 style={{ height: height, padding: 1, paddingLeft: 10, textAlign: 'left' }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Text, duedate */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('transaction.line.text')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} alignItems="stretch" justify="flex-start">
//                             <TextareaField
//                                 fieldName="text"
//                                 placeholder={t('transaction.line.text')}
//                                 disabled={disable}
//                                 value={current.text}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 onChange={(event:any) => {
//                                     const currentx = { ...current, text: event.target.value, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={2} xs={1} alignItems="stretch" justify="flex-start">
//                             <div>{t('transaction.line.duedate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={4} alignItems="stretch" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="duedate"
//                                 label={t('transaction.line.duedate')}
//                                 selected={current.duedate}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 onChange={(_event:any) => {
//                                   console.log('_event', _event)
//                                     const currentx = { ...current, duedate: _event, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionR(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 disabled={disable}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }
// const setTransactionF = ( transaction:IFinancials
//     , setTransaction:(arg:IFinancials)=>void
//     , line:ILineFinancials
//     , setCurrent:(arg:ILineFinancials)=>void) => {
//     const idx = transaction?.lines?.findIndex((obj) => obj.id === line.id);
//     const linex: ILineTransaction|ILineFinancials = {...line, transid: transaction.id};
//
//     (idx === -1) ? transaction?.lines?.push(linex) : (transaction.lines[idx] = linex)
//     setTransaction(transaction)
//     console.log('linex', linex)
//     setCurrent(linex)
// }
// export const FinancialsDetailsForm = (
//     { transaction, setTransaction, currentLineFinancials, setCurrentLineFinancials
//         , accData, accountFilter, oaccountFilter, t, zIndex, disable, height }: FinancialsDetailsFormProps<IFinancials, ILineFinancials>) => {
//     const current = currentLineFinancials
//     const setCurrent = setCurrentLineFinancials
//     const currentAccount = (accData?.find((acc: IAccount) => acc.id === current.account))??initAcc[0]
//     const currentOAccount  = (accData?.find((acc:IAccount) => acc.id === current.oaccount))??initAcc[0]
//
//     return (
//         <Grid container spacing={0} style={styles.outer}>
//             {/**Account,  Amount, currency*/}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('financials.line.account')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
//                                 onChange={(value:any,  _event:any) => {
//                                     const currentAccount = accData?.find((acc: { id: any }) => acc.id ===value)
//                                     const currentx = {...current, account: value, accountName: currentAccount ?currentAccount.name:''
//                                         ,  company:`-${transaction.company}`}
//                                     setCurrent(currentx)
//                                     setTransactionF(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 values={getFiltered(accData, accountFilter).slice().sort(sortById).map(toOption)}
//                                 zIndex={zIndex-1}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('financials.line.amount')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='amount'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={Number(current.amount)}
//                                 onChange={(event:any) => {
//                                     const currentx = { ...current, amount: Number(event.target.value), company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionF(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 disabled={disable}
//                                 style={ { height: height, padding: 1, textAlign: 'right' }}
//                             />
//                         </Grid>
//                         <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                             <InputField
//                                 fieldName ='currency'
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.currency}
//                                 disabled={true}
//                                 style={ { height: height, padding: 1, textAlign: 'left' }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Vat price */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('financials.line.oaccount')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ {value:currentOAccount?currentOAccount.id:''
//                                     , label: currentOAccount?`${currentOAccount.id} ${currentOAccount.name}` :''}}
//                                 onChange={(value:any, _event:any) => {
//                                     const currentOAccount = accData?.find((acc: { id: any }) => acc.id === value)
//                                     const currentx = {...current, oaccount: value, oaccountName: currentOAccount ?currentOAccount.name:''
//                                         ,  company:`-${transaction.company}`}
//                                     setCurrent(currentx)
//                                     setTransactionF(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                                 values={getFiltered(accData, oaccountFilter).slice().sort(sortById).map(toOption)}
//                                 zIndex={zIndex-2}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('financials.line.duedate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                           <DatePickerField
//                             fieldName="duedate"
//                             label={t('financials.line.duedate')}
//                             selected={current.duedate}
//                             current={current}
//                             disabled={disable}
//                             onChange={(_event:any) => {
//
//                               const currentx = { ...current, duedate: _event, company:`-${transaction.company}`}
//                               console.log('currentx', currentx)
//                               setCurrent(currentx)
//                               setTransactionF(transaction, setTransaction, currentx, setCurrent)
//                             }}
//                           />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Vat */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller}  alignItems="stretch">
//                         <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('financials.line.text')}</div>
//                         </Grid>
//                         <Grid item sm={8} xs={12} alignItems="stretch" justify="flex-start">
//                             <TextareaField
//                                 fieldName="text"
//                                 placeholder={t('financials.line.text')}
//                                 disabled={disable}
//                                 value={current.text}
//                                 current={current}
//                                 setCurrent={setCurrent}
//                                 onChange={(_event:any) => {
//                                     const currentx = { ...current, text: _event.target.value, company:`-${transaction.company}` }
//                                     setCurrent(currentx)
//                                     setTransactionF(transaction, setTransaction, currentx, setCurrent)
//                                 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }
//
// const setBusinessPartnerR = ( businessPartner:IBusinespartner
//     , setBusinessPartner:(arg:IBusinespartner)=>void
//     , selectedBankAccount:IBankAccount
//     , oldBankAccount:IBankAccount
//     , setCurrent:(arg:IBankAccount)=>void) => {
//      const idx = businessPartner?.bankaccounts?.findIndex((obj) =>
//     (obj.id === selectedBankAccount.id) || (obj.modelid === -1) || (obj.id === oldBankAccount.id))
//        const bankAccount: IBankAccount = {...selectedBankAccount, owner: `${businessPartner.id}`, company:`-${businessPartner.company}`};
//       (idx === -1) ? void (0) : (businessPartner.bankaccounts[idx] = bankAccount)
//       setBusinessPartner(businessPartner)
//       setCurrent(bankAccount)
// }

export const MasterfileXComboBox:FC<MasterfileComboboxProps<IMasterfile, IMasterfile>> = ({current, setCurrent, data
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
// const MasterfileComboBox:FC<FinancialsCBoxProps2<IFinancials|ITransaction, IMasterfile>> =({current, setCurrent, data
//                                   , fieldName, defaultValue,  accFilter = [], zIndex, styles})=>{
//   // @ts-ignore
//   const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === current[fieldName])??defaultValue
//   const filtered= (current.modelid===formEnum.ACCOUNT)?getFiltered(data, accFilter):data
//
//   return (
//     <ComboBox<{value:string|bigint,  label:string}>
//       style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//       disable={current.posted}
//       value={ {value:currentAcc?currentAcc.id:'', label: currentAcc?`${currentAcc.id} ${currentAcc.name}` :''}}
//       onChange={(value:any, _event:any) => setCurrent({...current, [fieldName]: value })}
//       values={filtered.slice().sort(sortById).map(toOption)}
//       zIndex={zIndex}
//     />
//   )
// }
// const MasterfileComboBox2:FC<FinancialsCBoxProps3<IFinancials, IMasterfile, ILineFinancials>> =({current
//                                    , setCurrent, currentLine, setCurrentLine, data, id, name, defaultValue,  accFilter = []
//                                    , zIndex, styles})=>{
//   // console.log('id', id)
//   // console.log('name', name)
//    console.log('currentLine', currentLine)
//   console.log('current', current)
//   //console.log('accFilter', accFilter)
//   // @ts-ignore
//   //const currentAcc = (data ??  [defaultValue]).find((acc) => acc.id === currentLine[id])??defaultValue
//
//   const filtered= getFiltered(data, accFilter)
//   //console.log('filtered', filtered)
//   let currentLinex:ILineFinancials = {...currentLine}
//   let currentLinex1: {[index: string]:any} ={...currentLinex}
//   console.log('currentLinex1', currentLinex1)
//
//   return (
//     <ComboBox<{value:string|bigint,  label:string}>
//       style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//       disable={current.posted}
//       onChange={(value:any, _event:any) => {
//        const currentAccount = (data ?? [defaultValue]).find((acc: { id: any }) => acc.id ===value)
//         console.log('currentAccount', currentAccount);
//          currentLinex = {...currentLine, [id]: value, [name]: currentAccount ?currentAccount.name:''
//            ,  company:`-${current.company}`}
//         console.log('currentLinex', currentLinex);
//         //setCurrentLine({...currentLinex})
//         console.log('current?.hasOwnProperty(\'lines\')>>>>>>>>>>>>',current?.hasOwnProperty('lines') )
//         if(!current?.hasOwnProperty('lines')||current?.lines.length===0) current['lines']=[currentLinex]
//         const lines:ILineFinancials[] = current.lines
//         console.log('lines>>>>>>>>>>>>', lines)
//         const idx = lines?.findIndex((obj) => obj.id === currentLinex.id);
//         console.log('idx>>>>>>>>>>>>', idx);
//         if(idx === -1) {
//           current.lines?.push(currentLinex)
//         } else current.lines[idx] = currentLinex
//         const x= {...current, account:currentLinex.account}
//         //const x= {...current, account:currentLinex.account, lines: current.lines.filter((line)=>
//          //   (line.account.length==0|| line.oaccount.length==0))}
//         console.log('x>>>>>>>>>>>>', x)
//         console.log('currentLinex1>>>>>>>>>>>>', currentLinex1)
//         setCurrent(x)
//         setCurrentLine({...currentLinex})
//       }}
//       value={{value:currentLinex1[id], label: `${currentLinex1[id]} ${currentLinex1[name]}`}}
//       values={filtered.slice().sort(sortById).map(toOption)}
//       zIndex={zIndex}
//     />
//   )
// }

// export const FromTransactionComboBox  = ({current, transactions, currentModule, onChange}:
//                                          {current:IFinancials, transactions:IFinancials[], currentModule:IFmodule, onChange:(value:BigInt, event:any)=>void})=> {
//   return (
//     <ComboBox<{value:bigint|string,  label:string}>
//       style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:8}}
//       disable={current.posted}
//       value={{value:BigInt(currentModule?currentModule?.id:0), label:currentModule?currentModule?.name:'' }}
//       onChange={onChange}
//       values={transactions.slice().sort(sortById).map(transactionToOption)}
//       zIndex={99999}
//     />
//   )
// }
// export const BankAccountForm = (
//     { currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner, bankData, t,  disable, height , zIndex}:BankAccountFormProps) => {
//     const current = currentBankAccount
//     const setCurrent = setCurrentBankAccount
//     const currentBank = bankData?.find((acc: { id: any }) => acc.id === current.bic)
//     console.log('currentBank', currentBank)
//     return (
//         <Grid container spacing={0} style={{...styles.outer, height: 100}}>
//           {/* Iban  */}
//           <Grid container spacing={1}>
//             <Grid item sm={8} xs={2}>
//               <Grid container maximize style={{...styles.fuller40H, paddingTop: 10}} justify="flex-start" alignItems="flex-start">
//                 <Grid item sm={2} xs={2} alignItems="flex-start" justify="flex-start">
//                   <div>{t('common.iban')}</div>
//                 </Grid>
//                 <Grid item sm={8} xs={2} justify="flex-start" alignItems="stretch" >
//                   <InputField
//                     fieldName ='id'
//                     current={current}
//                     setCurrent={setCurrent}
//                     value={current.id}
//                     onChange={(_event:any) => {
//                       const currentx = { ...current, id: _event.target.value, company:`-${current.company}` }
//                       setCurrent(currentx)
//                       setBusinessPartnerR( businessPartner, setBusinessPartner, currentx, current, setCurrent)
//                     }}
//                     disabled={disable}
//                     style={ { height: height,  textAlign: 'left'}}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//             {/**Account,  accountName*/}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div>{t('common.bank')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={disable}
//                                 value={ {value:currentBank?currentBank.id:''
//                                     , label: currentBank?`${currentBank.id} ${currentBank.name}` :''}}
//                                 onChange={(value:any, _event:any) => {
//                                     const currentx:IBankAccount = {...current,
//                                         bic: value, owner:`${businessPartner.id}`, company:`-${current.company}`}
//                                     setCurrent(currentx)
//                                     setBusinessPartnerR( businessPartner, setBusinessPartner, currentx, current, setCurrent)
//                                 }}
//                                 values={bankData.slice().sort(sortById).map(toOption)}
//                                 zIndex={zIndex}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }
//
// export const ArticleAccountForm = (
//   { current, setCurrent, accData, vatData, t,  disable, height }: ArticleAcccountProps ) => {
//
//   return (
//     <div  style={{...styles.outer}} >
//       {/**Account,  accountName*/}
//       <CInputGroup  style={{ height: height-3 }}>
//         <CCol sm="2">
//           <FieldLabel title={t('article.stock.account')} />
//         </CCol>
//         <CCol sm="4">
//           <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
//                                data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                      styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//         </CCol>
//       </CInputGroup>
//       {/**Oaccount oaccountName */}
//       <CInputGroup  style={{ height: height-3 }}>
//         <CCol sm="2">
//           <FieldLabel title={t('article.expense.account')} />
//         </CCol>
//         <CCol sm="4">
//           <MasterfileXComboBox fieldName={'oaccount'} current={current} setCurrent={setCurrent}
//                                data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//                styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//         </CCol>
//       </CInputGroup>
//       {/**revenue account*/}
//       <CInputGroup  style={{ height: height-3 }}>
//         <CCol sm="2">
//           <FieldLabel title={t('article.revenue.account')} />
//         </CCol>
//         <CCol sm="4">
//           <MasterfileXComboBox fieldName={'revenueAccount'} current={current} setCurrent={setCurrent}
//                                data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
//              styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//         </CCol>
//       </CInputGroup>
//         {/**Vat */}
//         { !current?.hasOwnProperty('vatCode') && !current?.hasOwnProperty('vatcode') ? null:
//           <CInputGroup  style={{ height: height-3 }}>
//             <CCol sm="2">
//               <FieldLabel title={t('common.vatCode')} />
//             </CCol>
//             <CCol sm="4">
//               <MasterfileXComboBox fieldName={'vatCode'} current={current} setCurrent={setCurrent}
//                                    data={vatData} defaultValue={initVat[0]} zIndex={11} disable={disable}
//                styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
//             </CCol>
//           </CInputGroup>
//         }
//     </div>
//   )
// }
export const CustomerAccountBaseForm = (
    { current, setCurrent, accData,  t,  disable, children, height }:
    {current: IArticle|ICustomer|ISupplier|IEmployee|ICompany, setCurrent: (art:any)=>void, accData: IAccount[]
        , vatData: IVat[],  t:TFunction<'transalation', undefined>,  disable: boolean, children:() =>ReactNode, height:number}) => {
    const accountLabel = getAccountLabel(current, t)
    const oaccountLabel = getOAccountLabel(current, t)
    return (<>
            {/**Account,  accountName*/}
        <CInputGroup  style={{ height: height-3 }}>
          <CCol sm="2">
            <FieldLabel title={accountLabel} />
          </CCol>
          <CCol sm="4">
              <MasterfileXComboBox fieldName={'account'} current={current} setCurrent={setCurrent}
                                   data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                                   styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
          </CCol>
        </CInputGroup>
         {/**Oaccount oaccountName */}
        <CInputGroup  style={{ height: height-3 }}>
          <CCol sm="2">
            <FieldLabel title={oaccountLabel} />
          </CCol>
          <CCol sm="4">
            <MasterfileXComboBox fieldName={'oaccount'} current={current} setCurrent={setCurrent}
                                 data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable}
                                 styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
          </CCol>
        </CInputGroup>
        {/**Vat */}
        {children ()}
        </>
    )
}
  // export const CustomerAccountForm  = (
  //   { current, setCurrent, ccData, accData, vatData, t,  disable, height }:
  //   {current: IArticle|ICustomer|ISupplier|IEmployee|ICompany, setCurrent: (art:any)=>void, accData: IAccount[]
  //     , vatData: IVat[], ccData?: IMasterfile[],  t:TFunction<'transalation', undefined>,  disable: boolean, height: number, zIndex:number}) => {
  //
  //   const children = () =>(<>
  //     {!current?.hasOwnProperty('vatCode') && !current?.hasOwnProperty('vatcode') ? null:
  //       <Grid item sm={12} xs={2}>
  //         <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
  //           <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
  //             <div>{t('common.vatCode')}</div>
  //           </Grid>
  //           <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
  //             <MasterfileXComboBox fieldName={'vatCode'} current={current} setCurrent={setCurrent}
  //                                  data={vatData} defaultValue={initVat[0]} zIndex={11} disable={disable}
  //                                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     }</>)
  //   const costCenterChildren = () =>(<>
  //     {!current?.hasOwnProperty('costcenter')? null:
  //       <Grid item sm={12} xs={2}>
  //         <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
  //           <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
  //             <div>{t('costcenter.title')}</div>
  //           </Grid>
  //           <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
  //             <MasterfileXComboBox fieldName={'costcenter'} current={current} setCurrent={setCurrent}
  //                                  data={ccData??[]} defaultValue={initCc[0]} zIndex={11} disable={disable}
  //                                  styles={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}/>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     }</>)
  //   const child = current?.hasOwnProperty('vatCode')||current?.hasOwnProperty('vatcode')?children
  //                                     :current?.hasOwnProperty('costcenter')?costCenterChildren:() =>null
  //   return (
  //     <div  style={{...styles.outer, height: 120}}>
  //       <CustomerAccountBaseForm current ={current} setCurrent = {setCurrent} accData ={accData} vatData ={vatData} t={t}
  //                                disable={disable}  children={child} height={height}/>
  //
  //     </div>
  //   )
  // }

// export const FinancialsMainForm =
//                      ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules
//                         , copyFromTransaction, submitCopy, accountFilter, oaccountFilter, currentLineFinancials
//                         , setCurrentLineFinancials, height, zIndex, locale, currency}:
//                       { collapse:boolean, current:IFinancials, setCurrent:(arg:IFinancials) =>void
//                        , t:TFunction<'translation', undefined>
//                        , storeData:IMasterfile[], accData:IAccount[], modules:IFmodule[]
//                        , copyFromTransaction:IFinancials[]
//                        , handleModuleChange:(value:any)=>void
//                        , submitCopy:(id:BigInt, modelid:number) =>void
//                        , accountFilter:string[]
//                        , oaccountFilter:string[]
//                        , currentLineFinancials:ILineFinancials
//                        , setCurrentLineFinancials:Dispatch<SetStateAction<ILineFinancials>>
//                        , height:number, zIndex:number, locale:string, currency:string}) => {
//     const styles = STYLES
//       console.log('locale>>', locale)
//      console.log('current>>', current)
//       console.log('currentLineFinancials>>', currentLineFinancials)
//     const currentx:IFinancials = Array.isArray(current)?current[0]:current
//     const modelid= currentx?.modelid??0
//     const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(modelid))??initfModule[0]
//
//      const total = current?.lines?.reduce((prev, cur)=>  prev + cur?.amount, 0)
//     return (
//         <Grid container spacing={0} style={{...STYLES.inner, display: !collapse?'none':''}}>
//             {/**id, postingdate*/}
//             <Grid container spacing={1} >
//                 {/*<Grid container maximize  justify="flex-start" alignItems="stretch">*/}
//                    <Grid item sm={8} xs={2}>
//                      <Grid container maximize style={styles.fuller} alignItems="stretch">
//                        <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                          <div>{t('fmodule.title')}</div>
//                        </Grid>
//                        <Grid item sm={10} xs={5} alignItems="stretch" justify="flex-start" style={{paddingLeft:5}}>
//                          <ComboBox<{value:bigint|string,  label:string}>
//                            style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:10}}
//                            disable={false}
//                            value={{value:BigInt(currentModule?currentModule?.id:0),
//                              label: `${BigInt(currentModule?currentModule?.id:0)} ${currentModule?currentModule?.name:''}` }}
//                            onChange={handleModuleChange}
//                            values={modules.slice().sort(sortById).map(toOption)}
//                            zIndex={99999}
//                          />
//                        </Grid>
//                      </Grid>
//                     </Grid>
//                    <Grid item sm={4} xs={6}>
//                      <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//                        <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                          <div>{t('common.id')}</div>
//                        </Grid>
//                        <Grid item sm ={3} xs={2} justify="flex-start" >
//                          <InputField
//                            fieldName="id"
//                            current={current}
//                            setCurrent={setCurrent}
//                            value={current.id}
//                            disabled={true}
//                            style={{ height: height, textAlign:'right' }}
//                          />
//                        </Grid>
//                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                          <div >{t('transaction.oid')}</div>
//                        </Grid>
//                        <Grid item sm ={3} xs={2} justify="flex-start">
//                          <InputField
//                            fieldName="oid"
//                            current={current}
//                            setCurrent={setCurrent}
//                            value={current.oid}
//                            disabled={current.posted}
//                            style={{ height: 20 , textAlign:'right'}}
//                          />
//                        </Grid>
//                      </Grid>
//                    </Grid>
//             </Grid>
//             {/**oid, transdate*/}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
//                         <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                             <div >{t('common.copyFrom')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={5} alignItems="stretch" justify="flex-start" style={{paddingLeft:5}}>
//                           <FromTransactionComboBox current={current} transactions={copyFromTransaction}
//                                                    currentModule={currentModule} onChange = {submitCopy}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                         <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                             <div>{t('transaction.transdate')}</div>
//                         </Grid>
//                         <Grid item sm={4} xs={2} alignItems="flex-end" justify="flex-start">
//                             <DatePickerField
//                                 fieldName="transdate"
//                                 label={t('transaction.transdate')}
//                                 selected={current.transdate}
//                                 current={current}
//                                 onChange={(_event:any) => {
//                                   const date = new Date(_event)
//                                   const month_ = date.getMonth()+1
//                                   const month = month_ <10?`0${month_}`:`${month_}`
//                                   const period = Number(`${date.getFullYear()}${month}`)
//                                   const currentx:IFinancials = { ...current, transdate: date, period:period}
//                                   setCurrent(currentx)
//                                 }}
//                                 setCurrent={setCurrent}
//                                 disabled={current.posted}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/**Store,  period*/}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                   <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                     <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                       <div>{t('financials.costcenter')}</div>
//                     </Grid>
//                      <Grid item sm ={10} xs={5} justify="flex-start" alignItems="stretch" style={{paddingLeft:5}}>
//                        <MasterfileComboBox current ={current} setCurrent ={setCurrent} data={storeData}
//                                   fieldName={"costcenter"} defaultValue={initCc[0]}  zIndex={zIndex} styles={styles}/>
//                       </Grid>
//                   </Grid>
//                 </Grid>
//               <Grid item sm={4} xs={6}>
//                 <Grid container maximize style={styles.fuller} alignItems="stretch">
//                   <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                     <div>{t('financials.line.duedate')}</div>
//                   </Grid>
//                   <Grid item sm={4} xs={2} alignItems="flex-end" justify="flex-start">
//                     <DatePickerField
//                       fieldName="duedate"
//                       label={t('financials.line.duedate')}
//                       selected={currentLineFinancials.duedate}
//                       current={currentLineFinancials}
//                       onChange={(event:any) => {
//                         //event.preventDefault()
//                         const date = new Date(event)
//                         const currentLine = { ...currentLineFinancials, duedate: date, company:`-${current.company}`}
//                         setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)
//                       }}
//                       setCurrent={setCurrent}
//                       disabled={current.posted}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//
//             </Grid>
//             {/**Account */}
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                   <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                     <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                       <div>{t('financials.line.account')}</div>
//                     </Grid>
//                     <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="stretch" style={{paddingLeft:5}}>
//                       <MasterfileComboBox2  current={current} setCurrent={setCurrent} currentLine ={currentLineFinancials}
//                               setCurrentLine={setCurrentLineFinancials} data={accData} id={"account"}
//                               name={"accountName"} defaultValue={initAcc[0]} accFilter={accountFilter}
//                               zIndex={zIndex} styles={styles}/>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               <Grid item sm={4} xs={6}>
//                 <Grid container maximize style={styles.fuller} alignItems="stretch">
//                   <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                     <div>{t('transaction.period')}</div>
//                   </Grid>
//                   <Grid item sm={2} xs={1} alignItems="stretch" justify="flex-start">
//                     <InputField fieldName="period" current={current}
//                                 setCurrent={setCurrent}
//                                 value={current.period}
//                                 disabled={true}
//                                 style={{ height: 20, width: 90, textAlign: 'left' }}
//                     />
//                   </Grid>
//                   <Grid item sm={2} xs={6}
//                         justify="flex-start" alignItems="flex-start">
//                     <BooleanField
//                       fieldName="posted" current={current}
//                       setCurrent={setCurrent}
//                       label=''
//                       disabled={true}
//                       checked={current.posted}
//                       style={{ height: 20, paddingLeft:15, textAlign:'right' }}
//                       styleC={{ height: 20, paddingLeft:25, textAlign:'right' }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           {/**OAccount */}
//             <Grid container spacing={1}>
//               <Grid item sm={8} xs={2}>
//                 <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                    <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                      <div>{t('financials.line.oaccount')}</div>
//                    </Grid>
//                    <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="stretch" style={{paddingLeft:5}}>
//                      <MasterfileComboBox2  current={current} setCurrent={setCurrent} currentLine ={currentLineFinancials}
//                                            setCurrentLine={setCurrentLineFinancials} data={accData} id={"oaccount"}
//                        name={"oaccountName"} defaultValue={initAcc[0]} accFilter={oaccountFilter} zIndex={zIndex} styles={styles}/>
//                    </Grid>
//                 </Grid>
//               </Grid>
//
//               <Grid item sm={4} xs={6}>
//                 <Grid container maximize style={styles.fuller} alignItems="stretch">
//                   <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                     <div>{t('financials.line.amount')}</div>
//                   </Grid>
//                   <Grid item sm={4} xs={3} alignItems="stretch" justify="flex-start">
//                     <CurrencyInput
//                       value={currentLineFinancials?.amount}
//                       intlConfig={{ locale:locale, currency:currency}}
//                       groupSeparator ={'.'}
//                       decimalSeparator=","
//                       decimalsLimit={2}
//                       decimalScale={2}
//                       onValueChange ={(value, name, values) => {
//                         console.log(value, name, values)
//                         //event.preventDefault()
//                         const currentLine = { ...currentLineFinancials, amount: Number(value??'0.0')
//                           , company:`-${current?.company}` }
//                         setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)
//                       }}
//                       disabled={current.posted}
//                       style={ { height: height, padding: 5, textAlign: 'right' }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//
//             <Grid container spacing={1}>
//                 <Grid item sm={8} xs={2}>
//                     <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
//                         <Grid item sm={2} xs={12}
//                               justify="flex-start" alignItems="flex-start">
//                             <div>{t('transaction.text')}</div>
//                         </Grid>
//                         <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <TextareaField
//                                 fieldName="text"
//                                 placeholder={t('transaction.text')}
//                                 disabled={current.posted}
//                                 value={currentLineFinancials?.text}
//                                 onChange={(event:any) => {
//                                   event.preventDefault()
//                                   const currentLine = { ...currentLineFinancials, text: event.target.value
//                                     , company:`-${current?.company}` }
//                                   setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)
//                                 }}
//                                 current={currentLineFinancials}
//                                 setCurrent={setCurrentLineFinancials}
//                                 style={{ width: 1000 }}/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//               <Grid item sm={4} xs={6}>
//                 <Grid container maximize style={styles.fuller} alignItems="stretch">
//                   <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                     <div style={{ fontWeight: 'bold'}}>{t('common.total')} </div>
//                   </Grid>
//                   <Grid item sm={4} xs={3} alignItems="stretch" justify="flex-start">
//                     <CurrencyInput
//                       value={total}
//                       intlConfig={{ locale:locale, currency:currency}}
//                       groupSeparator ='.'
//                       decimalSeparator=","
//                       decimalsLimit={2}
//                       decimalScale={2}
//                       disabled={true}
//                       style={ { fontWeight: 'bold', height: height, padding:5, textAlign: 'right' }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//         </Grid>
//     )
// }

//
// export const TransactionMainForm =
//     ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules, copyFromTransaction, submitCopy, height, zIndex}:
//      { collapse:boolean, current:ITransaction, setCurrent:(arg:ITransaction) =>void
//          , t:TFunction<'translation', undefined>, storeData:IStore[]
//          , accData:ICustomer[]|ISupplier[], modules:IFmodule[], copyFromTransaction:ITransaction[]
//          , handleModuleChange:(value:any, event:any)=>void
//          , submitCopy:(id:BigInt, event:any)=>void
//          , height:number, zIndex:number}) => {
//
//         const styles = STYLES
//         const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(current?.modelid??0))
//         const copyFromModule= modules.find((m:IFmodule) =>m.id == BigInt(currentModule?.copyFrom??0))
//         return (
//             <Grid container spacing={0} style={{...STYLES.inner, display: !collapse?'none':''}}>
//                 {/**id, postingdate*/}
//                 <Grid container spacing={1} >
//                     {/*<Grid container maximize  justify="flex-start" alignItems="stretch">*/}
//                     <Grid item sm={8} xs={2}>
//                         <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
//                             <Grid item sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                                 <div>{t('common.id')}</div>
//                             </Grid>
//                             <Grid item sm ={2} xs={2} justify="flex-start" >
//                                 <InputField
//                                     fieldName="id"
//                                     current={current}
//                                     setCurrent={setCurrent}
//                                     value={current.id}
//                                     disabled={current.posted}
//                                     style={{ height: height, textAlign:'right' }}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item sm={4} xs={6}>
//                         <Grid container maximize style={styles.fuller} alignItems="stretch">
//                             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                                 <div>{t('fmodule.title')}</div>
//                             </Grid>
//                             <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
//                                 <ComboBox<{value:bigint|string,  label:string}>
//                                     style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:10}}
//                                     disable={false}
//                                     value={{value:BigInt(currentModule?currentModule?.id:0),
//                                         label: `${BigInt(currentModule?currentModule?.id:0)} ${currentModule?currentModule?.name:''}` }}
//                                     onChange={handleModuleChange}
//                                     values={modules.slice().sort(sortById).map(toOption)}
//                                     zIndex={99999}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 {/**oid, transdate*/}
//                 <Grid container spacing={1}>
//                     <Grid item sm={8} xs={2}>
//                         <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller} >
//                             <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
//                                 <div >{t('transaction.oid')}</div>
//                             </Grid>
//                             <Grid item sm ={2} xs={2} justify="flex-start">
//                                 <InputField
//                                     fieldName="oid"
//                                     current={current}
//                                     setCurrent={setCurrent}
//                                     value={current.oid}
//                                     disabled={current.posted}
//                                     style={{ height: 20 , textAlign:'right'}}
//                                 />
//                             </Grid>
//                             <Grid item sm={8} xs={4} alignItems="stretch" justify="flex-start">
//                                 <ComboBox<{value:bigint|string,  label:string}>
//                                     style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:10}}
//                                     disable={current.posted}
//                                     value={{value:BigInt(copyFromModule?copyFromModule?.id:0)
//                                         , label:`${BigInt(copyFromModule?copyFromModule?.id:0)} ${copyFromModule?copyFromModule?.name:''}` }}
//                                     onChange={submitCopy}
//                                     values={copyFromTransaction.slice().sort(sortById).map(transactionToOption)}
//                                     zIndex={99999}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item sm={4} xs={6}>
//                         <Grid container maximize style={styles.fuller} alignItems="stretch">
//                             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                                 <div>{t('transaction.transdate')}</div>
//                             </Grid>
//                             <Grid item sm={4} xs={2} alignItems="flex-end" justify="flex-start">
//                                 <DatePickerField
//                                     fieldName="transdate"
//                                     label={t('transaction.transdate')}
//                                     selected={current.transdate}
//                                     current={current}
//                                     setCurrent={setCurrent}
//                                     disabled={current.posted}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 {/**Store,  period*/}
//                 <Grid container spacing={1}>
//                     <Grid item sm={8} xs={2}>
//                       <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                           <div>{t('transaction.store')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" style={{paddingLeft:5}}>
//                           <MasterfileComboBox  current={current} setCurrent={setCurrent} data={storeData}
//                               fieldName={"store"} defaultValue={initStore[0]}  zIndex={zIndex} styles={styles}/>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                     <Grid item sm={4} xs={6}>
//                         <Grid container maximize style={styles.fuller} alignItems="stretch">
//                             <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                                 <div>{t('transaction.period')}</div>
//                             </Grid>
//                             <Grid item sm={2} xs={1} alignItems="stretch" justify="flex-start">
//                                 <InputField fieldName="period" current={current}
//                                             setCurrent={setCurrent}
//                                             value={current.period}
//                                             disabled={true}
//                                             style={{ height: 20, width: 90, textAlign: 'left' }}
//                                 />
//                             </Grid>
//                           <Grid item sm={2} xs={6}
//                                 justify="flex-start" alignItems="flex-start">
//                             <BooleanField
//                               fieldName="posted" current={current}
//                               setCurrent={setCurrent}
//                               label=''
//                               disabled={current.posted}
//                               checked={current.posted}
//                               style={{ height: 20, paddingLeft:15, textAlign:'right' }}
//                               styleC={{ height: 20, paddingLeft:25, textAlign:'right' }}
//                             />
//                           </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 {/**Account */}
//                 <Grid container spacing={1}>
//                     <Grid item sm={8} xs={2}>
//                       <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
//                           <div>{t('transaction.account')}</div>
//                         </Grid>
//                         <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start"style={{paddingLeft:5}}>
//                         <MasterfileComboBox  current={current} setCurrent={setCurrent} data={accData}
//                            fieldName={"account"} defaultValue={initCust[0]} zIndex={zIndex} styles={styles}/>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   <Grid item sm={4} xs={6}>
//                     <Grid container maximize style={styles.fuller} alignItems="stretch">
//                       <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
//                         <div style={{ fontWeight: 'bold'}}>{t('common.total')} </div>
//                       </Grid>
//                       <Grid item sm={4} xs={3} alignItems="stretch" justify="flex-start">
//                         <InputField
//                           fieldName ='total'
//                           current={current}
//                           setCurrent={setCurrent}
//                            value={Number(current?.lines?.reduce((prev, line)=>
//                              prev + line?.quantity* line?.price +line?.vat , 0)).toFixed(2)}
//                           disabled={true}
//                           style={ { fontWeight: 'bold', height: height, padding: 1, textAlign: 'right' }}
//                         />
//                       </Grid>
//                       <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
//                         <InputField
//                           fieldName ='currency'
//                           current={current}
//                           setCurrent={setCurrent}
//                           value={current.lines?current.lines[0]?.currency:''}
//                           disabled={true}
//                           style={ { height: height, padding: 1, textAlign: 'left' }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={1}>
//                     <Grid item sm={8} xs={2}>
//                         <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
//                             <Grid item sm={2} xs={12}
//                                   justify="flex-start" alignItems="flex-start">
//                                 <div>{t('transaction.text')}</div>
//                             </Grid>
//                             <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                                 <TextareaField
//                                     fieldName="text"
//                                     placeholder={t('transaction.text')}
//                                     disabled={current.posted}
//                                     value={current.text}
//                                     current={current}
//                                     setCurrent={setCurrent}
//                                     style={{ width: 1000 }}/>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item sm={4} xs={10}>
//                         <Grid container maximize style={styles.fuller} alignItems="stretch">
//                           <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
//                             <TextareaField
//                               fieldName="footText"
//                               placeholder={t('transaction.footText')}
//                               disabled={current.posted}
//                               value={current.footText }
//                               current={current}
//                               setCurrent={setCurrent}
//                               style={{ width: 1000 }}/>
//                           </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         )
//     }
// export const JournalMainForm = ({ current, setCurrent,  t, accData,  height, ids }:
//                                 { current:JournalProps, setCurrent:(arg:JournalProps)=>void
//                                   , t:TFunction<'transalation', undefined>, accData:IAccount[], height:number, ids:string[]}) => {
//   const styles = STYLES
//   const accounts = current?.isMulti?accData.filter((acc) =>ids.includes(acc.account)):accData
//   const currentAccount = accounts?.find((acc:IAccount) => acc.id === current.account)
//   return (
//     <>
//       <Grid container spacing={1}>
//         <Grid item sm={6} xs={2}>
//           <Grid container maximize style={{...styles.fuller, height:30}} justify="flex-start" alignItems="stretch">
//             <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//               <div>{t('common.account')}</div>
//             </Grid>
//             <Grid item sm ={8} xs={5}  justify="flex-start"  alignItems="flex-start" style={{...styles.fuller, height:20, paddingTop:10}} >
//               <ComboBox<{value:string|bigint,  label:string}>
//                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                 disable={false}
//                 value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
//                 onChange={(value:any, _event:any) => setCurrent({...current, account: value /*, accountName: _event?.name*/})}
//                 values={accounts?.slice().sort(sortById).map(toOption)}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item sm={2} xs={6}>
//           <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
//             <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//               <FromPeriod
//                 //id="fromPeriod-id"
//                 name="fromPeriod"
//                 label="common.from"
//                 current={current}
//                 value={current.fromPeriod}
//                 setCurrent={setCurrent}
//                 t={t}
//                 labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
//                 style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item sm={2} xs={6}>
//           <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
//             <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//               <FromPeriod
//                 //id="fromPeriod-id"
//                 name="toPeriod"
//                 label="common.to"
//                 current={current}
//                 value={current.toPeriod}
//                 setCurrent={setCurrent}
//                 t={t}
//                 labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
//                 style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   )
// }
// export const InventoryJournalMainForm = ({ current, setCurrent,  t, artData, storeData, height }:
//                                 { current:IJournalProps, setCurrent:(arg:IJournalProps)=>void
//                                     , t:TFunction<'transalation', undefined>, artData:IArticle[], storeData:IStore[], height:number}) => {
//     const styles = STYLES
//     //const articles = current?.isMulti?artData.filter((art) =>ids.includes(art.account)):artData
//     const currentArticle = artData?.find((acc:IArticle) => acc.id === current.article)
//   const currentStore = storeData?.find((store:IStore) => store.id === current.store)
//     return (
//         <>
//             <Grid container spacing={1}>
//                 <Grid item sm={6} xs={2}>
//                   <Grid container maximize style={{...styles.fuller, height:30}} justify="flex-start" alignItems="stretch">
//                     <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//                       <div>{t('article.title')}</div>
//                     </Grid>
//                     <Grid item sm ={8} xs={5}  justify="flex-start"  alignItems="flex-start" style={{...styles.fuller, height:20, paddingTop:10}} >
//                       <ComboBox<{value:string|bigint,  label:string}>
//                         style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                         disable={false}
//                         value={ {value:currentArticle?currentArticle.id:'', label: currentArticle?`${currentArticle.id} ${currentArticle.name}` :''}}
//                         onChange={(value:any, _event:any) => setCurrent({...current, article: value /*, accountName: _event?.name*/})}
//                         values={artData.concat(initArticle)?.slice().sort(sortById).map(toOption)}
//                       />
//                     </Grid>
//                   </Grid>
//                     <Grid container maximize style={{...styles.fuller, height:30}} justify="flex-start" alignItems="stretch">
//                         <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//                             <div>{t('store.title')}</div>
//                         </Grid>
//                         <Grid item sm ={8} xs={5}  justify="flex-start"  alignItems="flex-start" style={{...styles.fuller, height:20, paddingTop:10}} >
//                             <ComboBox<{value:string|bigint,  label:string}>
//                                 style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
//                                 disable={false}
//                                 value={ {value:currentStore?currentStore.id:'', label: currentStore?`${currentStore.id} ${currentStore.name}` :''}}
//                                 onChange={(value:any, _event:any) => setCurrent({...current, store: value /*, accountName: _event?.name*/})}
//                                 values={storeData.concat(initStore)?.slice().sort(sortById).map(toOption)}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={2} xs={6}>
//                     <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
//                         <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//                             <FromPeriod
//                                 //id="fromPeriod-id"
//                                 name="fromPeriod"
//                                 label="common.from"
//                                 current={current}
//                                 value={current.fromPeriod}
//                                 setCurrent={setCurrent}
//                                 t={t}
//                                 labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
//                                 style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item sm={2} xs={6}>
//                     <Grid container maximize style={{...styles.fuller, height:40}} alignItems="stretch">
//                         <Grid item sm={1} xs={2} alignItems="stretch" justify="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
//                             <FromPeriod
//                                 //id="fromPeriod-id"
//                                 name="toPeriod"
//                                 label="common.to"
//                                 current={current}
//                                 value={current.toPeriod}
//                                 setCurrent={setCurrent}
//                                 t={t}
//                                 labelStyle={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}
//                                 style={{ height: height, padding: 1, textAlign: 'right', width: 80 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </>
//     )
// }

// const signUp = (t:TFunction<'translation', undefined>) =>(
//   <CCard className="text-white bg-primary py-5 d-md-down-none"
//          style={{width: '44%'}}>
//     <CCardBody className="text-center">
//       <div>
//         <h2>Sign up</h2>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua.
//         </p>
//         <Link to="/register">
//           <CButton color="primary" className="mt-3" active tabIndex={-1}>
//             {t('login.signUpNow')}
//           </CButton>
//         </Link>
//       </div>
//     </CCardBody>
//   </CCard>
// )
// const  errorFn = (error?: string) =>{
//   return (
//     <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
//       <CCardBody className="text-center">
//         <div><h2>Error!!!</h2><p>{error}</p></div>
//       </CCardBody>
//     </CCard>
//   )
// }
// export const LoginForm = ({languages, companies, current, t, i18n, profile, setProfile, submit
//                             , handleEvent}:LoginProps ) => {
//   return (
//   <>
//     <div className="c-app c-default-layout flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md="8">
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm>
//                     <h1>Login</h1>
//                     <p className="text-muted">{t('login.signIn')}</p>
//                     <CInputGroup className="mb-3">
//                       <CInputGroup>
//                         <CInputGroupText/>
//                       </CInputGroup>
//                       <CFormInput
//                         type="text"
//                         placeholder="UserName"
//                         id="userName"
//                         autoComplete="username"
//                         onChange={(event: any) =>
//                           handleEvent(event, {...current, userName: event.target.value})
//                         }
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-4">
//                       <CInputGroup>
//                         <CInputGroupText/>
//                       </CInputGroup>
//                       <CFormInput
//                         type="password"
//                         id="pwd"
//                         placeholder="Password"
//                         autoComplete="current-password"
//                         onChange={(event: any) =>
//                           handleEvent(event, {...current, password: event.target.value})
//                         }
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-4">
//                       <CInputGroup>
//                         <CInputGroupText/>
//                       </CInputGroup>
//                       <CFormSelect
//                         className="flex-row"
//                         type="select"
//                         name="company"
//                         id="company-id"
//                         value={current.company}
//                         onFocus={(event) =>
//                           handleEvent(event, {...current, company: event.target.value})
//                         }
//                         onChange={(event) =>
//                           handleEvent(event, {...current, company: event.target.value})
//                         }
//                       >
//                         {companies.map((item) => (
//                           <option key={item.id} value={item.id}>{`${item.id} ${item.name}`}</option>
//                         ))}
//                       </CFormSelect>
//                       <CFormSelect
//                         className="flex-row"
//                         type="select"
//                         name="language"
//                         id="language-id"
//                         value={current.language}
//                         onFocus={(event) =>
//                           handleEvent(event, {...current, language: event.target.value})
//                         }
//                         onChange={(event) => {
//                           handleEvent(event, {...current, language: event.target.value})
//                           i18n.changeLanguage(event.target.value)
//                             .then(() => setProfile({...profile, language: event.target.value}))
//                           setDefaultLocale(event.target.value)
//                         }}
//                       >
//                         {languages.map((item) => (
//                           <option key={item.id} value={item.id}>
//                             {item.id.concat(' ').concat(item.name)}
//                           </option>
//                         ))}
//                       </CFormSelect>
//                     </CInputGroup>
//                     <CRow>
//                       <CCol xs="6">
//                         <CButton
//                           color="primary"
//                           className="px-4"
//                           onClick={(event: any) => submit(event)}
//                         >
//                           Login
//                         </CButton>
//                       </CCol>
//                       <CCol xs="6" className="text-right">
//                         <CButton color="link" className="px-0">
//                           {t('login.forgotpwd')}
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//               <
//                 // @ts-ignore
//                 Show when={profile.error} fallback={signUp(t)} children={errorFn(profile.error)}/>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   </>
// )
// }
