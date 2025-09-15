import React, {CSSProperties, Dispatch, FC, MouseEventHandler} from 'react'
import {toOption, transactionToOption} from '../utils/FormUtils.tsx'
import Grid from 'react-fast-grid'
import {IoMdMenu} from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  CBadge,
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CHeaderToggler,
  CInputGroup,
} from '@coreui/react'
import {formEnum} from '../utils/FormEnum'
import {sortById} from '../utils/Utils'
import {saveXlsx} from './../utils/XlsUtils.ts'
import {
  AccountMainProps,
  ArticleProps,
  AssetProps,
  BankAccountFormProps,
  BankStatementParamProps,
  BankStatementProps,
  CustomerGeneralFormProps, FinancialsCBoxProps,
  FinancialsDetailsFormProps,
  MasterfileProps,
  MasterfileProps2,
  SaveProps,
  StoreGeneralFormProps,
  TransactionDetailsFormProps,
  UserFormProps
} from '../Props.ts'
import DatePicker from 'react-datepicker'
import '../../public/css/custom-datepicker.css'
import {green} from '@mui/material/colors'
import SvgIcon from '@mui/material/SvgIcon'
//import {styles} from './BasicTreeTableProps'
import {initAcc, initCc, initCust, initfModule, initStore} from './Menu'
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
  IJournal,
  ILineFinancials,
  ILineTransaction,
  IMasterfile,
  IPACBQueryParam,
  IPayrollTaxRange,
  IPeriodicAccountBalance2,
  IPermission,
  IRole,
  IStore,
  ISupplier,
  ITransaction,
  IVat
} from '../Models.ts'
import {TFunction} from 'i18next'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import CheckIcon from '@mui/icons-material/Check'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import {Checkbox, FormControlLabel} from "@mui/material";
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {languages} from './Login.tsx'
import {useSelector} from 'react-redux'
import ComboBox from './ComboBox.tsx'
import {showFile} from '../utils/XlsUtils.ts'


export const svgIcons = {
    cubeLoader:
        'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
    loader2:
        'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
    plusCircle:
        'M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v-2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z',
    plus: 'M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-4 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z',
    delete: 'M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z',
    delete4ever:
        'M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z',
    copyRight:
        'M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-3.84-18.27c.11-.65.31-1.23.6-1.74s.69-.92 1.18-1.23c.47-.29 1.06-.45 1.79-.46.48.01.92.09 1.3.26.41.18.75.42 1.04.72s.51.66.67 1.06.25.83.27 1.28h3.58c-.03-.94-.22-1.8-.55-2.58s-.81-1.45-1.41-2.02-1.32-1-2.16-1.31-1.77-.47-2.79-.47c-1.3 0-2.43.22-3.39.67s-1.76 1.06-2.4 1.84-1.12 1.68-1.43 2.71-.46 2.12-.46 3.27v.55c0 1.16.16 2.25.47 3.28s.79 1.93 1.43 2.7 1.44 1.38 2.41 1.83 2.1.67 3.4.67c.94 0 1.82-.15 2.64-.46s1.54-.73 2.16-1.27 1.12-1.16 1.48-1.88.57-1.48.6-2.3h-3.58c-.02.42-.12.8-.3 1.16s-.42.66-.72.91-.65.45-1.05.59c-.38.13-.78.2-1.21.2-.72-.02-1.31-.17-1.79-.47-.5-.32-.9-.73-1.19-1.24s-.49-1.09-.6-1.75-.15-1.3-.15-1.97v-.55c0-.68.05-1.35.16-2z',
    copyContent:
        'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
    clearAll: 'M10 26h28v-4H10v4zm-4 8h28v-4H6v4zm8-20v4h28v-4H14z',
    libraryAdd:
        'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z',
    checkCircle:
        'M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z',
    highlightRemove:
        'M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z',
    highlightOff:
        'M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    doneAll:
        'M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z',
    done: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
    close:
        'M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z',
    spinner: 'M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z',
    swapVertCircle: 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z',
    addCircleOutline:
        'M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    addBox:
        'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
    save1:
        'M7.6557,6.6063l4.1865-.0606a1.8,1.8,0,0,1,1.5406.8267,1.7242,1.7242,0,0,0,1.1358.2111h3.5622a2.9963,2.9963,0,0,0,1.6765-.451L32.6628,6.993a1.3244,1.3244,0,0,1,1.3006.7408,1.4817,1.4817,0,0,1,1.7249-1.19q.051.0094.1011.0223a2.1725,2.1725,0,0,1,1.5928.6661l3.2346,3.1824a2.4138,2.4138,0,0,1,.7207,1.7013l.21,26.4876a2.3209,2.3209,0,0,1-.7134,1.6925l-.4364.4189a2.4944,2.4944,0,0,1-1.7214.6949l-29.5692.07a2.3325,2.3325,0,0,1-1.6912-.72l-.2712-.2835a2.4922,2.4922,0,0,1-.6912-1.7226V9.0345a3.0417,3.0417,0,0,1,.5261-1.7517Z',
    save: 'M8 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H9M8 20V14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14V20M8 20H16M16 20H18C19.1046 20 20 19.1046 20 18V8.82843C20 8.29799 19.7893 7.78929 19.4142 7.41421L16.5858 4.58579C16.2107 4.21071 15.702 4 15.1716 4H15M15 4V7C15 7.55228 14.5523 8 14 8H10C9.44772 8 9 7.55228 9 7V4M15 4H9',
    doubleAngleUp:
        'M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z',
    doubleAngleUp1:
        'M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z',
    doubleAngleDown:
        'M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z',
    doubleAngleDown1:
        'M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z',
    arrowUpSolid:
        'M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z',
    arrowDownSolid:
        'M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z',
    checkBox:
        'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    refresh:
        'm19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z',
    logo: 'M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z',
}

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    //padding: 20,
    padding: 50,
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
    outer: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10,
        // paddingRight: 50,
        // paddingTop: 10,
        // paddingBottom: 10,
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

export function IwsIcon({ style, d }:{ style:CSSProperties|undefined, d:IconProp|string }) {
    return (
        <SvgIcon style={{ ...style }}>
            <path
                // @ts-ignore
                d ={d} />
        </SvgIcon>
    )
}
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
                        {languages.data.map((item) => mapping(item))}
                    </CFormSelect>
                </CHeaderToggler>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
                            style={{ height: 20, padding:1, display:onDeleteBankAccount? 'block':'none'}}
                            onClick={(event)=>
                                onDeleteBankAccount?onDeleteBankAccount(event):void(0)} disabled={!edited} >
                    <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer"
                            style={{ height: 20, padding:1, display:onNewBankAccount?'block':'none'}} onClick={()=>
                    onNewBankAccount?onNewBankAccount():void(0)} disabled={!edited}>
                    <AddCircleOutlineIcon/>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            disabled={!added && added !==undefined}      onClick={()=>initAdd()}>
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
                {languages.data.map((item) => mapping(item))}
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

export const FinancialsFormHead = ({ title, saveProps,  collapse, initAdd
                                       , onNewLine, onDeleteLine, cancelEdit, submitEdit//, submitCancel
                                       , toggle, submitPost,  reload, handleLanguageChange, navigate, language
                                       , dispatch, logout, current
                                    }:
                                   { title:string, saveProps:SaveProps, collapse:boolean,  initAdd:()=>void, onNewLine:()=>void
                                       , onDeleteLine:(arg:any)=>void, cancelEdit:()=>void, submitEdit: (arg:any)=>void
                                       , submitCancel:(arg:any)=>void, toggle:()=>void
                                       , submitPost:(arg:any)=>void,  reload:()=>void, handleLanguageChange: (arg:any)=>void
                                       , navigate:NavigateFunction, language:string, dispatch:Dispatch<any>
                                       , logout:(navigate:NavigateFunction) =>void
                                       , current:IFinancials|ITransaction
                                   }) => {
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
                        {languages.data.map((item) => mapping(item))}
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
                            onClick={cancelEdit} disabled={current.posted}>
                    <CancelIcon />
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}
                            onClick={(event)=>submitPost(event)} disabled={current.posted}>
                    <CheckIcon />
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
                                    , balancesheet, t, dispatch, logout, templateFileName, current}:
                       { style: CSSProperties, title:string, submitQuery:(event:any)=>void
                        , submitQuery2:(event:any)=>void, balancesheet:boolean, t:TFunction<'translation', undefined>
                        , dispatch:Dispatch<any>
                        , logout:(navigate:NavigateFunction) =>void, templateFileName:string
                        , current:{ fromPeriod:number, toPeriod:number, currency:string
                        , lines:IPeriodicAccountBalance2[]|IJournal[]}}) => {
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

                        <IconButton size="small" edge="start" color="inherit" aria-label="open drawer" style={{ height: 20, padding:1}}>
                             {/*onClick={(event:any) => showFile({e: event, templateFileName: templateFileName, data: current})}>*/}
                            <input type="file" onInput={(event:any) =>  showFile({e: event, templateFileName: templateFileName, data: current})}/>
                            {/*<DriveFolderUploadIcon/>*/}
                        </IconButton>

                        <Grid item justify="center" alignItems="center">
                            <CHeaderToggler className="ps-1">
                                <FormButton title={t('common.run')}
                                    onClick={(e) => submitQuery(e)}
                                    style={{textAlign: 'left', height: 25, padding: 1 }}
                                    className="ps-1"/>
                            </CHeaderToggler>
                        </Grid>

                        <Grid item justify="center" alignItems="center">
                            <CHeaderToggler className="ps-1">
                            <FormButton
                                title={t('common.runAll')}
                                onClick={(e)=>submitQuery2(e)}
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
                         {fieldName:string,  current:any, setCurrent:(arg:any)=>void, selected:Date
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
            dateFormat="dd.MM.yyyy"
            id={fieldName?.concat('id')}
            onChange={ onChange ? onChange :(newValue) => setCurrent({...current, [fieldName]: newValue})}
        />
    )
}

export const AccountMainForm = ({ current, setCurrent, accData, t, disable}:AccountMainProps) => {
    //const styles = STYLES
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
    };
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.name} //eslint-disable-next-line react/prop-types
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
                                onChange={(_event:any) => {
                                    setCurrent({...current,
                                        account: _event /*, accountName: _event?.name*/})
                                }}
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//         .concat('/') // eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
//                 setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                        value={current.path}
                        disabled={false}
                        style={{ paddingLeft: 0 }}
                    />
                </CCol>
            </CInputGroup>
        </>
    )
}
export const BankStatementMainForm = ({ current, setCurrent, t, locale, currency /*, height*/}:BankStatementProps) => {

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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.depositor} //eslint-disable-next-line react/prop-types
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
                                label={t('bankstatement.valuedate')} //eslint-disable-next-line react/prop-types
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.info} //eslint-disable-next-line react/prop-types
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.companyIban} //eslint-disable-next-line react/prop-types
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.company} //eslint-disable-next-line react/prop-types
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.accountno} //eslint-disable-next-line react/prop-types
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
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.bankCode} //eslint-disable-next-line react/prop-types
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
                                placeholder={t('common.purpose')} // eslint-disable-next-line react/prop-types
                                disabled={current.posted} // eslint-disable-next-line react/prop-types
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
export const AssetMainForm = ({ current, setCurrent, t, accData, height, disable, locale } :AssetProps) => {

    const currentAccount = accData?.find((acc: { id: any }) => acc.id === current.account)
    const currentOAccount = accData?.find((acc: { id: any }) => acc.id === current.oaccount)
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
                    <ComboBox<{value:string|bigint,  label:string}>
                        style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                        disable={disable}
                        value={ {value:currentAccount?currentAccount.id:''
                            , label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                        onChange={(_event:any) => {
                            console.log('_event', _event)
                            setCurrent({...current,
                                account: _event /*, accountName: _event?.name*/})
                        }}
                        values={accData.slice().sort(sortById).map(toOption)}
                    />
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
                    <ComboBox<{value:string|bigint,  label:string}>
                        style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                        disable={disable}
                        value={ {value:currentOAccount?currentOAccount.id:''
                            , label: currentOAccount?`${currentOAccount.id} ${currentOAccount.name}` :''}}
                        onChange={(_event:any) => {
                            setCurrent({...current, oaccount: _event })
                        }}
                        values={accData.slice().sort(sortById).map(toOption)}
                    />
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
                        onChange={(event:any) => {
                            const currentx = { ...current, amount: Number(event.target.value) }
                            setCurrent(currentx)
                        }}
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
                        onChange={(event:any) => {
                            const currentx = { ...current, scrapValue: Number(event.target.value) }
                            setCurrent(currentx)
                        }}
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
                        onChange={(event:any) => {
                            const currentx = { ...current, lifeSpan: Number(event.target.value) }
                            setCurrent(currentx)
                        }}
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
                        onChange={(event:any) => {
                            const currentx = { ...current, depMethod: Number(event.target.value) }
                            setCurrent(currentx)
                        }}
                        disabled={disable}
                        //placeholder="depreciation method"
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
                        onChange={(event:any) => {
                            const currentx = { ...current, frequency:Number(event.target.value)}
                            setCurrent(currentx)
                        }}
                        disabled={disable}
                        //placeholder="depreciation frequency"
                        style={{ height: 30, textAlign: 'right', padding: 2 }}
                    />
                </CCol>
                <CCol sm="1" style={{ height: height, paddingLeft: 6 }}>
                    <InputField
                        fieldName="rate"
                        current={current}
                        setCurrent={setCurrent}
                        value={current.rate}
                        onChange={(event:any) => {
                            const currentx = { ...current, rate:Number(event.target.value) }
                            setCurrent(currentx)
                        }}
                        disabled={disable}
                        //placeholder="depreciation rate"
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

export const MasterfilesMainForm2 = ({collapse,  current, setCurrent, accData, t,  disable}:MasterfileProps2) => {
    console.log('accData>>>>???', accData)
    const currentAccount = (accData ??[]).find((acc: { id: any }) => acc.id === current.parent)
    console.log('currentAccount>>>>???', currentAccount)
    console.log('accData>>>>???', accData)
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
    };
    return (
        <Grid container spacing={0} style={{...styles.outer, display: !collapse?'none':''}}>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
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
                <Grid item sm={8} xs={12}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch"  >
                        <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div >{t('common.name')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={10} justify="flex-start" alignItems="stretch">
                            <InputField
                                fieldName="name"
                                current={current}
                                setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                value={current.name} //eslint-disable-next-line react/prop-types
                                disabled={disable}
                                style={{ height: 20, width: 300 }}/>
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
                                label={t('common.changedate')} //eslint-disable-next-line react/prop-types
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
                            <div>{current.hasOwnProperty('parent') && current.parent?t('common.parent'):null}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            { current.hasOwnProperty('parent')?// && current.parent?
                                <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={disable}
                                value={ {value:currentAccount?currentAccount.id:''
                                    , label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(_event:any) => {
                                    console.log('_event', _event)
                                    setCurrent({...current, parent: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).filter(m=>m.id!==current?.id).map(toOption)}
                            />:null}

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
            {/**OutputVat */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                        <Grid item sm={2} xs={12}
                              justify="flex-start" alignItems="flex-start">
                            <div>{t('common.description')}</div>
                        </Grid>
                        <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                            <TextareaField
                                fieldName="description"
                                placeholder={t('common.description')} // eslint-disable-next-line react/prop-types
                                disabled={disable} // eslint-disable-next-line react/prop-types
                                value={current.description}
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
                                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                        value={current.company} //eslint-disable-next-line react/prop-types
                                        disabled={disable}
                                        style={{ height: 20,width: 80, textAlign: 'right' }}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

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
                        setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                        value={current.id} //eslint-disable-next-line react/prop-types
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
                        //placeholder="From amount"
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
                        //placeholder="From amount"
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
                        //placeholder="From amount"
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
export const    MasterfilesMainBaseForm = ({ current, setCurrent, disable, t,  height }: MasterfileProps<IMasterfile>)=> {
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
                            <div >{t('vat.name')}</div>
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
export const PermissionMainBaseForm = ({ current, setCurrent, disable, t,  height }: MasterfileProps<IPermission>)=> {
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
                            <div >{t('vat.name')}</div>
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
export const RoleMainBaseForm:FC<MasterfileProps<IRole>> = ({ current, setCurrent, disable, t,  height })=> {

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
                        <div >{t('vat.name')}</div>
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

export const MasterfileMainForm:FC<MasterfileProps<IMasterfile>> = ({collapse, current, setCurrent, disable, t,  height }) => {
    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
        }
    }
    return (
        <Grid container spacing={0}  style={{...styles.outer, display: !collapse?'none':''}} >
            <MasterfilesMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                     disable ={disable} t ={t}  height ={height}/>
        </Grid>
    )
}
export const RoleMainForm = ({collapse, current, setCurrent, disable, t,  height }: MasterfileProps<IRole>) => {
    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
        }
    }
    return (
        <Grid container spacing={0}  style={{...styles.outer, display: !collapse?'none':''}} >
            <RoleMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                     disable ={disable} t ={t}  height ={height}/>
        </Grid>
    )
}
export const PermissionMainForm = ({collapse, current, setCurrent, disable, t,  height }: MasterfileProps<IPermission>) => {
    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 30,
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:30
        },
    }
    console.log('current', current)
    const  current1:IPermission = current
   return (
    <Grid container spacing={0}  style={{...styles.outer, display: !collapse?'none':''}} >
        <PermissionMainBaseForm collapse ={collapse} current={current} setCurrent ={setCurrent}
                                 disable ={disable} t ={t}  height ={height}/>
        <Grid item sm={8} xs={2}>
            <Grid container maximize justify="flex-start" alignItems="stretch" style={styles.fuller}>
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
export const ArticleGeneralForm =
    ({ current, setCurrent,  t, quantityUnitData, groupData, disable }:ArticleProps) => {
        const currentQuantityUnit = quantityUnitData?.find((m: { id: any }) => m.id === current?.quantityUnit)
        const currentPackUnit = quantityUnitData?.find((m: { id: any }) => m.id === current?.packUnit)
        const currentGroup = groupData?.find((m: { id: any }) => m.id === current?.parent)


        const styles = {
            outer: {
                borderRadius: 5,
                boxShadow: "0 30px 40px #BBB",
                //padding: 2,
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
                                <ComboBox<{value:string|bigint,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:250, width:430, color: '#6b7280', fontSize:10}}
                                    disable={disable}
                                    value={ {value:currentQuantityUnit?currentQuantityUnit.id:''
                                        , label: currentQuantityUnit?`${currentQuantityUnit.id} ${currentQuantityUnit.name}` :''}}
                                    onChange={(_event:any) => setCurrent({...current,
                                        quantityUnit: _event /*, accountName: _event?.name*/})}
                                    values={quantityUnitData.slice().sort(sortById).map(toOption)}
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
                                <ComboBox<{value:string|bigint,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:250, width:430, color: '#6b7280'}}
                                    disable={disable}
                                    value={ {value:currentPackUnit?currentPackUnit.id:''
                                        , label: currentPackUnit?`${currentPackUnit.id} ${currentPackUnit.name}` :''}}
                                    onChange={(_event:any) => setCurrent({...current,
                                        packUnit: _event /*, accountName: _event?.name*/})
                                    }
                                    values={quantityUnitData.slice().sort(sortById).map(toOption)}
                                />
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
                              <ComboBox<{value:string|bigint,  label:string}>
                                  style={{...styles, minHeight:25, height:25, minWidth:250, width:430, color: '#6b7280'}}
                                  disable={disable}
                                  value={ {value:currentGroup?currentGroup.id:''
                                      , label: currentGroup?`${currentGroup.id} ${currentGroup.name}` :''}}
                                  onChange={(_event:any) => setCurrent({...current,
                                      parent: _event /*, accountName: _event?.name*/})
                                  }
                                  values={groupData.slice().sort(sortById).map(toOption)}
                              />
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
                                    placeholder={t('common.description')} // eslint-disable-next-line react/prop-types
                                    disabled={disable} // eslint-disable-next-line react/prop-types
                                    value={current.description}
                                    current={current}
                                    setCurrent={setCurrent}
                                    //style={{ width: 500 }}
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
// export const SalaryItemForm = ({ current, setCurrent, t, disable, locale, currency, height }:
//                                { current:ISalaryItem, setCurrent:(arg:any|ISalaryItem)=>void, t:TFunction<'translation', undefined>
//                                    , disable:boolean, locale:string, currency:string, height:number })=> {
//     const props = { current, setCurrent, locale, currency, disable, t, height }
//     return (
//         <div style={{ height: 210 }}>
//             {MasterfilesMainForm(props)}
//             <CInputGroup  style={{ height: height, paddingTop: 12 }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('salary.item.amount')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="amount"
//                         current={current}
//                         setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
//                         value={Number(current.amount).toLocaleString(locale, {
//                             maximumFractionDigits: 2,
//                             minimumFractionDigits: 2,
//                             style: 'currency',
//                             currency: currency,
//                         })}
//                         //placeholder="Amount"
//                         disabled={disable}
//                         style={{ height: height, textAlign: 'right' }}
//                     />
//                 </CCol>
//                 <CCol sm="1" style={{ height: height, paddingLeft: 5 }}>
//                     <InputField
//                         fieldName="currency"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.currency}
//                         //placeholder="Currency"
//                         disabled={true}
//                         style={{ height: height, padding: 2 }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 10 }}>
//                     <FieldLabel title={t('salary.item.percentage')} />
//                 </CCol>
//                 <CCol sm="1">
//                     <InputField
//                         fieldName="percentage"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={Number(current.percentage).toLocaleString(locale, {
//                             maximumFractionDigits: 2,
//                             minimumFractionDigits: 2,
//                         })}
//                         //placeholder="Percentage"
//                         disabled={disable}
//                         style={{ height: height, textAlign: 'right', padding: 2 }}
//                     />
//                 </CCol>
//             </CInputGroup>
//         </div>
//     )
// }

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
                                label={t('common.changedate')} //eslint-disable-next-line react/prop-types
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
    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
            height:120
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:20
        },
    }
    return (<>
            <Grid container spacing={0} style={styles.outer}>
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
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('common.zip')}</div>
                            </Grid>
                            <Grid item sm={6} xs={1} alignItems="stretch" justify="flex-start">
                                <InputField
                                    fieldName="zip"
                                    current={current}
                                    setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                    value={current.zip} //eslint-disable-next-line react/prop-types
                                    disabled={disable}/>
                                {/*style={{ height: 20, width: 1000 }}/>*/}
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
                                    setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                    value={current.city} //eslint-disable-next-line react/prop-types
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
                            {/*{current.hasOwnProperty('email')? getEmail(current, setCurrent, disable):null}*/}
                            <Grid item  sm={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div >{t('common.email')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={10} justify="flex-end">
                                <InputField
                                    fieldName="email"
                                    current={current}
                                    setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                    value={current.email} //eslint-disable-next-line react/prop-types
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

export const CustomerGeneralForm = ({current, setCurrent, ccyData, disable, t }: CustomerGeneralFormProps) => {

    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
            height:200
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:20
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
    const currentCurrency= ccyData.find((ccy)=>ccy.id === current?.currency)
    console.log('ccyData', ccyData)
    console.log('current', current)
    console.log('currentCurrency', currentCurrency)
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:140, width:'100%', color: '#6b7280', fontSize:12}}
                                disable ={disable}
                                value={{ value:currentCurrency?currentCurrency.id:''
                                    , label: currentCurrency?`${currentCurrency.id} ${currentCurrency.name}` :''}}
                                onChange={(_event:any) => {
                                    setCurrent({...current, currency: _event /*, accountName: _event?.name*/})
                                }}
                                values={ccyData.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export const StoreGeneralForm = ({current, setCurrent, disable, t }: StoreGeneralFormProps) => {

    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
            height:200
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:20
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
            </Grid>
        </Grid>
    )
}

const FromPeriod = ({ name, label, value, current, setCurrent, t, labelStyle, style }:
                    { name:string, label:string, value:any, current:any, setCurrent:(arg:any)=>void, t:TFunction<'translation', undefined>
                        , labelStyle:any, style:any }) => {
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
//                   setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
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
        , articleData, vatData, t,  disable, height }: TransactionDetailsFormProps ) => {
    const current = currentLineTransaction
    const setCurrent = setCurrentLineTransaction

    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
            //height: 20,
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            //padding: 1,
            height:30
        },
        fuller1: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:40
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
                                onChange={(_event:any) => {
                                    const article = articleData?.find((acc: { id: any }) => acc.id === _event)
                                    const currentVat = vatData?.find((vat: { id: any }) => vat.id === article?.vatCode)
                                    const percent= currentVat?.percent??0.0
                                    const vatAmount = percent*current.quantity*current.price
                                    const vatCode = currentVat?currentVat?.id:''
                                    console.log('vatAmount', vatAmount)

                                    const currentx:ILineTransaction = {...current,
                                        article: _event, articleName: article ?article.name:'', unit:article ?article.quantityUnit:''
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
                                onChange={(_event:any) => {
                                    const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)
                                    const vatAmount = (currentVat?.percent?currentVat?.percent:0.0)*current.quantity*current.price
                                    const currentx = {...current, vatCode: _event,  vat:vatAmount
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
                                    const currentx = { ...current, duedate: _event.id, company:`-${transaction.company}` }
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
        , accData,  t, zIndex, disable, height }: FinancialsDetailsFormProps) => {
    const current = currentLineFinancials
    const setCurrent = setCurrentLineFinancials

    /* eslint-disable-next-line react/prop-types */
    const styles = {
        outer: {
            borderRadius: 5,
            boxShadow: "0 30px 40px #BBB",
            padding: 20,
            //height: 20,
        },
        fuller: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            //padding: 5,
            height:27
        },
        fuller1: {
            borderRadius: 5,
            boxShadow: "0 1px 50px #BBE",
            padding: 5,
            height:40
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
                                onChange={(_event:any) => {
                                    const currentAccount = accData?.find((acc: { id: any }) => acc.id === _event)
                                    const currentx = {...current, account: _event, accountName: currentAccount ?currentAccount.name:''
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
                                onChange={(_event:any) => {
                                    const currentOAccount = accData?.find((acc: { id: any }) => acc.id === _event)
                                    const currentx = {...current, oaccount: _event, oaccountName: currentOAccount ?currentOAccount.name:''
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
                                label={t('transaction.line.duedate')}
                                selected={current.duedate}
                                current={current}
                                setCurrent={setCurrent}
                                onChange={(_event:any) => {
                                    const currentx = { ...current, duedate: _event.id, company:`-${transaction.company}` }
                                    setCurrent(currentx)
                                    setTransactionF(transaction, setTransaction, currentx, setCurrent)
                                }}
                                disabled={disable}
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
//    const idx = businessPartner.bankaccounts.findIndex((obj) =>
//         (obj.id === selectedBankAccount.id) || ( obj.modelid ===-1) || ( obj.id === oldBankAccount.id))
//     console.log('selectedBankAccount>>', selectedBankAccount)
//     console.log('businessPartner>>', businessPartner)
//     const bankAccount: IBankAccount = {...selectedBankAccount, owner: `${businessPartner.id}`};
//     (idx === -1) ? void(0) : (businessPartner.bankaccounts[idx] = bankAccount)
//     setBusinessPartner(businessPartner)
//     console.log('idx>>', idx)
//     console.log('bankAccount>>', bankAccount)
//     setCurrent(bankAccount)
const setBusinessPartnerR = ( businessPartner:IBusinespartner
    , setBusinessPartner:(arg:IBusinespartner)=>void
    , selectedBankAccount:IBankAccount
    , oldBankAccount:IBankAccount
    , setCurrent:(arg:IBankAccount)=>void) => {
     const idx = businessPartner?.bankaccounts?.findIndex((obj) =>
    (obj.id === selectedBankAccount.id) || (obj.modelid === -1) || (obj.id === oldBankAccount.id))
      console.log('selectedBankAccount>>', selectedBankAccount)
      console.log('businessPartner>>', businessPartner)
       const bankAccount: IBankAccount = {...selectedBankAccount, owner: `${businessPartner.id}`, company:`-${businessPartner.company}`};
      (idx === -1) ? void (0) : (businessPartner.bankaccounts[idx] = bankAccount)
      setBusinessPartner(businessPartner)
      console.log('idx>>', idx)
      console.log('bankAccount>>', bankAccount)
      setCurrent(bankAccount)
}


export const BankAccountForm = (
    { currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner, bankData, t,  disable, height , zIndex}:BankAccountFormProps) => {
    const current = currentBankAccount
    const setCurrent = setCurrentBankAccount
    const currentBank = bankData?.find((acc: { id: any }) => acc.id === current.bic)
console.log('currentBank', currentBank)
    return (
        <Grid container spacing={0} style={{...styles.outer}}>
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
                                onChange={(_event:any) => {
                                    const currentx:IBankAccount = {...current,
                                        bic: _event, owner:`${businessPartner.id}`, company:`-${current.company}`}
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
    const currentAccount = accData?.find((acc: { id: any }) => acc.id === current.account)
    const currentOAccount = accData?.find((acc: { id: any }) => acc.id === current.oaccount)
    const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)
    const accountLabel = getAccountLabel(current, t)
    const oaccountLabel = getOAccountLabel(current, t)
    console.log('current', current)
     console.log('currentAccount', currentAccount)
    console.log('currentOAccount', currentOAccount)
    console.log('currentVat', currentVat)
    return (
        <Grid container spacing={0} style={{...styles.outer}}>
            {/**Account,  accountName*/}
            <Grid container spacing={1}>
                <Grid item sm={12} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{accountLabel}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(_event:any) => {
                                    setCurrent({...current, account: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                            />
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%'}}
                                disable={disable}
                                value={ {value:currentOAccount?currentOAccount.id:''
                                    , label: currentOAccount?`${currentOAccount.id} ${currentOAccount.name}` :''}}
                                onChange={(_event:any) => {
                                    setCurrent({...current, oaccount: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                            />
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
                                <ComboBox<{value:string|bigint,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%'}}
                                    disable={disable}
                                    value={ {value:currentVat?currentVat.id:'', label: currentVat?`${currentVat.id} ${currentVat.name}` :''}}
                                    onChange={(_event:any) => {setCurrent({...current, vatCode: _event })}}
                                    values={vatData.slice().sort(sortById).map(toOption)}
                                />
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

    const stockAccount = accData?.find((acc: { id: any }) => acc.id === current.account)
    const bankAccount = accData?.find((acc: { id: any }) => acc.id === current.bankAcc)
    const balanceSheetAcc = accData?.find((acc: { id: any }) => acc.id === current.balanceSheetAcc)
    const incomeStmtAcc= accData?.find((acc: { id: any }) => acc.id === current.incomeStmtAcc)
    const purchasingClearingAcc= accData?.find((acc: { id: any }) => acc.id === current.purchasingClearingAcc)
    const salesClearingAcc= accData?.find((acc: { id: any }) => acc.id === current.salesClearingAcc)
    const cashAcc= accData?.find((acc: { id: any }) => acc.id === current.cashAcc)
    const currentVat = vatData?.find((vat: { id: any }) => vat.id === current.vatCode)

    return (
        <Grid container spacing={0} style={{...styles.outer}}>
            {/**stockAccount ,  accountName*/}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('article.stock.account')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:stockAccount?stockAccount.id:''
                                    , label: stockAccount?`${stockAccount.id} ${stockAccount.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                        account: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={13}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/**bankAcc, balanceSheetAcc */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.bankAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:bankAccount?bankAccount.id:''
                                    , label: bankAccount?`${bankAccount.id} ${bankAccount.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current, bankAcc: _event /*, accountName: _event?.name*/})}}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={12}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.balanceSheetAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:balanceSheetAcc?balanceSheetAcc.id:''
                                    , label: balanceSheetAcc?`${balanceSheetAcc.id} ${balanceSheetAcc.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current, balanceSheetAcc: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={11}
                            />
                        </Grid>

                    </Grid>
                </Grid>
                {/**Vat */}


            </Grid>
            {/**incomeStmtAcc */}
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                            <div>{t('common.incomeStmtAcc')}</div>
                        </Grid>
                        <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start">
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:incomeStmtAcc?incomeStmtAcc.id:''
                                    , label: incomeStmtAcc?`${incomeStmtAcc.id} ${incomeStmtAcc.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                    incomeStmtAcc: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={10}
                            />
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:purchasingClearingAcc?purchasingClearingAcc.id:''
                                    , label: purchasingClearingAcc?`${purchasingClearingAcc.id} ${purchasingClearingAcc.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                    purchasingClearingAcc: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={9}
                            />
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:salesClearingAcc?salesClearingAcc.id:''
                                    , label: salesClearingAcc?`${salesClearingAcc.id} ${salesClearingAcc.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                    salesClearingAcc: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={8}
                            />
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:cashAcc?cashAcc.id:''
                                    , label: cashAcc?`${cashAcc.id} ${cashAcc.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                    cashAcc: _event /*, accountName: _event?.name*/})
                                }}
                                values={accData.slice().sort(sortById).map(toOption)}
                                zIndex={7}
                            />
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
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280'}}
                                disable={disable}
                                value={ {value:currentVat?currentVat.id:''
                                    , label: currentVat?`${currentVat.id} ${currentVat.name}` :''}}
                                onChange={(_event:any) => {setCurrent({...current,
                                    vatCode: _event /*, accountName: _event?.name*/})
                                }}
                                values={vatData.slice().sort(sortById).map(toOption)}
                                zIndex={7}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

const AccountComboBox:FC<FinancialsCBoxProps<IFinancials, IAccount>> =({current, setCurrent, data, zIndex, styles})=>{
    const currentAcc:IAccount = (data ??  [initAcc]).find((acc) => acc.id === current.account)??initAcc[0]
  return (
      <ComboBox<{value:string|bigint,  label:string}>
          style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
          disable={current.posted}
          value={ {value:currentAcc?currentAcc.id:'', label: currentAcc?`${currentAcc.id} ${currentAcc.name}` :''}}
          onChange={(_event:any) => {
                    setCurrent({...current, account: _event })}}
          values={data.slice().sort(sortById).map(toOption)}
          zIndex={zIndex}
      />
  )
}
const PartnerComboBox:FC<FinancialsCBoxProps<ITransaction, ICustomer|ISupplier>> =({current,  setCurrent, data,  zIndex, styles}) =>{
  const currentAcc:ICustomer|ISupplier = (data ??  [initCust]).find((acc) =>
    acc.id === current.account)??initCust[0]
   return ( <>
        <ComboBox<{value:string|bigint,  label:string}>
          style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
          disable={current.posted}
          value={ {value:currentAcc?currentAcc.id:'', label: currentAcc?`${currentAcc.id} ${currentAcc.name}` :''}}
          onChange={(_event:any) => {
            setCurrent({...current, account: _event })}}
          //@ts-ignore
          values={data??[].sort(sortById).map(toOption)}
          zIndex={zIndex}
        />
    </>
  )
}

const CostCenterComboBox:FC<FinancialsCBoxProps<IFinancials, IMasterfile>> = ({current, setCurrent, data, zIndex, styles}) => {
    const currentCC = (data ?? []).find((store: { id: any }) => store.id ===  current.costcenter )??initCc[0]
    return (
            <ComboBox<{value:string|bigint,  label:string}>
              style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
              disable={current.posted}
              value={ {value:currentCC?currentCC.id:'', label: currentCC?`${currentCC.id} ${currentCC.name}` :''}}
              onChange={(_event:any) => {setCurrent({...current, costcenter: _event})}}
              //@ts-ignore
              values={data??[].sort(sortById).map(toOption)}
              zIndex={zIndex}
            />
    )
}
export const  StoreComboBox:FC<FinancialsCBoxProps<ITransaction, IStore>> = ({current,  setCurrent, data, zIndex, styles}) => {

    const currentStore = (data ?? []).find((store: { id: any }) => store.id ===  current.store )??initStore[0]
    return (
                <ComboBox<{value:string|bigint,  label:string}>
                    style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                    disable={current.posted}
                    value={ {value:currentStore?currentStore.id:'', label: currentStore?`${currentStore.id} ${currentStore.name}` :''}}
                    onChange={(_event:any) => {
                        setCurrent({...current, store: _event /*, accountName: _event?.name*/})}}
                    values={data.slice().sort(sortById).map(toOption)}
                    zIndex={zIndex}
                />
    )
}


export const FromTransactionComboBox  = ({current, transactions, currentModule, onChange}:
                                {current:IFinancials, transactions:IFinancials[], currentModule:IFmodule, onChange:(value:BigInt)=>void})=> {
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
export const ModuleComboBox  = ({currentModule, modules, handleModuleChange}:
                    {currentModule:IFmodule, modules:IFmodule[], handleModuleChange:(value:any)=>void})=> {
  return (
    <ComboBox<{ value: bigint | string, label: string }>
      style={{...styles, minHeight: 25, height: 25, minWidth: 50, width: '100%', color: '#6b7280', fontSize: 8}}
      disable={false}
      value={{value: BigInt(currentModule ? currentModule?.id : 0), label: currentModule ? currentModule?.name : ''}}
      onChange={handleModuleChange}
      values={modules.slice().sort(sortById).map(toOption)}
      zIndex={99999}
    />
  )
}
export const FinancialsMainForm =
                     ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules
                        , copyFromTransaction, submitCopy, height, zIndex}:
                      { collapse:boolean, current:IFinancials, setCurrent:(arg:IFinancials) =>void
                       , t:TFunction<'translation', undefined>, storeData:IMasterfile[]
                       , accData:IAccount[], modules:IFmodule[]
                       , copyFromTransaction:IFinancials[]
                       , handleModuleChange:(value:any)=>void
                       , submitCopy:(id:BigInt) =>void
                       , height:number, zIndex:number}) => {

    const styles = STYLES
    const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(current.modelid))??initfModule[0]
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
                          <ModuleComboBox currentModule = {currentModule} modules ={modules} handleModuleChange ={handleModuleChange}/>
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
                                selected={current.enterdate}
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
                      <div>{t('financials.costcenter')}</div>
                    </Grid>
                     <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" style={{paddingLeft:5}}>
                       <CostCenterComboBox current ={current} setCurrent ={setCurrent} data={storeData??[]} zIndex={zIndex}
                                          styles={styles}/>
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
                      <AccountComboBox  current={current} setCurrent={setCurrent} data={accData} zIndex={zIndex} styles={styles}/>
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

export const FinancialsMainFormX =
  ({ collapse, current,  setCurrent, t, handleModuleChange, storeData, accData, modules
     , copyFromTransaction, submitCopy, height, zIndex}:
   { collapse:boolean, current:IFinancials, setCurrent:(arg:IFinancials) =>void
     , t:TFunction<'translation', undefined>, storeData:IMasterfile[]
     , accData:IAccount[], modules:IFmodule[]
     , copyFromTransaction:IFinancials[]
     , handleModuleChange:(value:any)=>void
     , submitCopy:(id:BigInt) =>void
     , height:number, zIndex:number}) => {

    const styles = STYLES
    const currentModule= modules.find((m:IFmodule) =>m.id == BigInt(current.modelid))??initfModule[0]


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
                <ModuleComboBox currentModule = {currentModule} modules ={modules} handleModuleChange ={handleModuleChange}/>
              </Grid>
            </Grid>
          </Grid>
          {/*</Grid>*/}
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
                  setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                  value={current.oid} //eslint-disable-next-line react/prop-types
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
                  selected={current.enterdate}
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
                <div>{t('financials.costcenter')}</div>
              </Grid>
              <Grid item sm ={10} xs={5} justify="flex-start" alignItems="flex-start" style={{paddingLeft:5}}>
                 <CostCenterComboBox current={current} setCurrent={setCurrent} data={storeData} zIndex={zIndex}
                                     styles ={styles}/>
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
                 <AccountComboBox current={current} setCurrent={setCurrent} data={accData} zIndex={zIndex} styles={styles} />
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
         , handleModuleChange:(value:any)=>void
         , submitCopy:(id:BigInt)=>void
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
                                    style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:8}}
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
                    {/*</Grid>*/}
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
                                    style={{...styles, minHeight:25, height:25, minWidth:50, width:'100%', color: '#6b7280', fontSize:8}}
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
                                    selected={current.enterdate}
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
                         <StoreComboBox current ={current} setCurrent={setCurrent} data={storeData} zIndex={zIndex} styles={styles}/>
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
                          <PartnerComboBox current ={current} setCurrent={setCurrent} data={accData} zIndex={zIndex}  styles={styles}/>
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
    console.log('accounts', accounts)
    const currentAccount = accounts.find((acc:IAccount) => acc.id === current.account)
    return (
        <>
            <Grid container spacing={1}>
                <Grid item sm={8} xs={2}>
                    <Grid container maximize style={{...styles.fuller, height:30}} justify="flex-start" alignItems="stretch">
                        <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start" style={{...styles.fuller, height:40, paddingTop:10}}>
                            <div>{t('common.account')}</div>
                        </Grid>
                        <Grid item sm ={8} xs={5}  justify="flex-start"  alignItems="flex-start" style={{...styles.fuller, height:20, paddingTop:10}} >
                            <ComboBox<{value:string|bigint,  label:string}>
                                style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                disable={false}
                                value={ {value:currentAccount?currentAccount.id:'', label: currentAccount?`${currentAccount.id} ${currentAccount.name}` :''}}
                                onChange={(_event:any) => {
                                    console.log('_event', _event)
                                    setCurrent({...current,
                                        account: _event /*, accountName: _event?.name*/})
                                }}
                                values={accounts.slice().sort(sortById).map(toOption)}
                            />
                        </Grid>
                        {/*<Grid item sm={1} xs={2} justify="flex-start" alignItems="flex-start">*/}
                        {/*    <BooleanField*/}
                        {/*        fieldName="isMulti" current={current}*/}
                        {/*        setCurrent={setCurrent}*/}
                        {/*        label="Aux?" //{t('transaction.posted')}*/}
                        {/*        disabled={false}*/}
                        {/*        checked={current?.isMulti??false}*/}
                        {/*        //checked={current?.isMulti?current?.isMulti:false}*/}
                        {/*        style={{ height: 20, paddingLeft:1, textAlign:'right', paddingTop:25 }}*/}
                        {/*        //styleC={{ height: 20, paddingLeft: 5, textAlign:'right' }}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid item sm={1} xs={2} justify="flex-start" alignItems="flex-start">
                            <BooleanField
                                fieldName="isDebit" current={current}
                                setCurrent={setCurrent}
                                label="D/C?" //{t('transaction.posted')}
                                disabled={false}
                                checked={current.isDebit??false}
                                //checked={current?.isMulti?current?.isMulti:false}
                                style={{ height: 20, paddingLeft:1, textAlign:'right', paddingTop:25 }}
                                //styleC={{ height: 20, paddingLeft: 5, textAlign:'right' }}
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

        const currentInputAccount = accData?.find((acc: { id: any }) => acc.id === current.inputVatAccount)
        const currentOutputAccount = accData?.find((acc: { id: any }) => acc.id === current.outputVatAccount)
        const styles = {
            outer: {
                borderRadius: 5,
                boxShadow: "0 30px 40px #BBB",
                padding: 50,
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
        };
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
                                <div >{t('vat.name')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={10} justify="flex-end">
                                <InputField
                                    fieldName="name"
                                    current={current}
                                    setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                    value={current.name} //eslint-disable-next-line react/prop-types
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
                                    label={t('common.changedate')} //eslint-disable-next-line react/prop-types
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
                                <ComboBox<{value:string|bigint,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                    disable={disable}
                                    value={ {value:currentInputAccount?currentInputAccount.id:''
                                        , label: currentInputAccount?`${currentInputAccount.id} ${currentInputAccount.name}` :''}}
                                    onChange={(_event:any) => {
                                        setCurrent({...current, inputVatAccount: _event /*, accountName: _event?.name*/})
                                    }}
                                    values={accData.slice().sort(sortById).map(toOption)}
                                    zIndex={zIndex}
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
                {/**OutputVat */}
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={styles.fuller} justify="flex-start" alignItems="stretch">
                            <Grid item sm ={2} xs={2} justify="flex-start" alignItems="flex-start">
                                <div>{t('vat.output.account')}</div>
                            </Grid>
                            <Grid item sm ={10} xs={5}  justify="flex-start"  alignItems="flex-start">
                                <ComboBox<{value:string|bigint,  label:string}>
                                    style={{...styles, minHeight:25, height:25, minWidth:100, width:'100%', color: '#6b7280', fontSize:12}}
                                    disable ={disable}
                                    value={ {value:currentOutputAccount?currentOutputAccount.id:''
                                        , label: currentOutputAccount?`${currentOutputAccount.id} ${currentOutputAccount.name}` :''}}
                                    onChange={(_event:any) => {
                                        setCurrent({...current, outputVatAccount: _event /*, accountName: _event?.name*/})
                                    }}
                                    values={accData.slice().sort(sortById).map(toOption)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <Grid container maximize style={styles.fuller} alignItems="stretch">
                            <Grid item sm={4} xs={2} alignItems="stretch" justify="flex-start">
                                <div>{t('vat.percent')}</div>
                            </Grid>
                            <Grid item sm={2} xs={2} alignItems="stretch" justify="flex-start">
                                <InputField fieldName="percent" current={current}
                                            setCurrent={setCurrent} //eslint-disable-next-line react/prop-types
                                            value={current.percent} //eslint-disable-next-line react/prop-types
                                            disabled={disable}
                                            style={{ height: 20,width: 80, textAlign: 'right' }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item sm={8} xs={2}>
                        <Grid container maximize style={styles.fuller40H} justify="flex-start" alignItems="stretch">
                            <Grid item sm={2} xs={12}
                                  justify="flex-start" alignItems="flex-start">
                                <div>{t('common.description')}</div>
                            </Grid>
                            <Grid item sm={10} xs={10} justify="flex-start" alignItems="stretch">
                                <TextareaField
                                    fieldName="description"
                                    placeholder={t('common.description')} // eslint-disable-next-line react/prop-types
                                    disabled={disable} // eslint-disable-next-line react/prop-types
                                    value={current.description}
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
            </Grid>
        )
    }
