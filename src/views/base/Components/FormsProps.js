import React from 'react'
import Grid from 'react-fast-grid'
import { IoMdMenu } from 'react-icons/io'
import { Button, Col, Input } from 'reactstrap'
import {
  CBadge,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formEnum } from '../utils/FORMS'
import { sortById, sortByName } from '../utils/utils'
import CustomerTabs from './CustomerTabs'
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faSave,
  faSpinner,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import CDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './width-datepicker.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { blue, lightGreen } from '@material-ui/core/colors'
import SvgIcon from '@material-ui/core/SvgIcon'
import { styles } from '../Tree/BasicTreeTableProps'
import RoleTabs from './RoleTabs'
import UserTabs from './UserTabs'
import BankStatementTabs from './BankStatementTabs'
import EmployeeTabs from './EmployeeTabs'
import ComboBox from './ComboBox'

export const svgIcons = {
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

export function IwsIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { style, d } = props
  return (
    <SvgIcon style={{ ...style }}>
      <path d={d} />
    </SvgIcon>
  )
}

const wrapIcon = (title, icon, action, isDisabled) => (
  <div className="card-header-actions">
    <Button
      color="link"
      disabled={isDisabled}
      className="card-header-action btn-minimize"
      title={title}
      onClick={action}
    >
      <IwsIcon style={{ style: styles.imageIcon, textAlign: 'end' }} d={icon} />
    </Button>
  </div>
)
const wrapFontAwesomeIcon = (title, icon, action, isDisabled) => (
  <div className="card-header-actions">
    <Button
      color="link"
      disabled={isDisabled}
      className="card-header-action btn-minimize"
      title={title}
      onClick={action}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  </div>
)

const mappingSelect = (item) => (
  <option key={item.id} value={item.id}>
    {item?.id.toString().concat(' ').concat(item?.name)}
  </option>
)

const isNullOrUndef = (value) => value === null || value === 'undefined'
export const CommonFormHead = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    styles,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    collapse,
    // eslint-disable-next-line react/prop-types
    initAdd,
    // eslint-disable-next-line react/prop-types
    cancelEdit,
    // eslint-disable-next-line react/prop-types
    submitEdit,
    // eslint-disable-next-line react/prop-types
    submitQuery,
    // eslint-disable-next-line react/prop-types
    reload,
    // eslint-disable-next-line react/prop-types
    toggle,
    // eslint-disable-next-line react/prop-types
    toggleToolbar,
    // eslint-disable-next-line react/prop-types
    onNewBankAccount,
    // eslint-disable-next-line react/prop-types
    onNewSalaryItem,
    // eslint-disable-next-line react/prop-types
    disable,
    // eslint-disable-next-line react/prop-types
    setDisable,
  } = props
  return (
    // eslint-disable-next-line react/prop-types
    <Grid container xs style={{ ...styles.header }} justify="flex-start">
      <Grid item justify="center" alignItems="center">
        <IoMdMenu />
      </Grid>
      <Grid item>
        <CBadge color="primary">{title}</CBadge>
      </Grid>
      <Grid
        container
        xs
        spacing={0.5}
        justify="flex-end"
        /* eslint-disable-next-line react/prop-types */
        style={{ ...styles.header }}
        alignItems="right"
      >
        {wrapIcon('Reload', svgIcons.refresh, reload, false)}
        {wrapFontAwesomeIcon('Cancel edit', faWindowClose, (e) => cancelEdit(e), disable)}
        {wrapIcon(
          'Add Bank Account',
          svgIcons.libraryAdd,
          onNewBankAccount,
          isNullOrUndef(onNewBankAccount) || disable,
        )}
        {wrapIcon(
          'Add salary item ',
          svgIcons.libraryAdd,
          onNewSalaryItem,
          isNullOrUndef(onNewSalaryItem) || disable,
        )}
        {wrapIcon('Add Item', svgIcons.plusCircle, initAdd, false)}
        <div className="card-header-actions">
          <Button
            color="link"
            className="card-header-action btn-minimize"
            title="Save entry"
            onClick={(e) => submitEdit(e)}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </div>
        <div>
          <Button
            block
            color="link"
            type="submit"
            className="card-header-action btn-minimize"
            onClick={(event) => {
              event.preventDefault()
              submitQuery(event)
            }}
          >
            <FontAwesomeIcon icon={faSpinner} rotation={90} />
          </Button>
        </div>
        {wrapIcon('Edit', svgIcons.plusCircle, () => setDisable(!disable), false)}
        <div className="card-header-actions" style={{ align: 'right' }}>
          <Button color="link" className="card-header-action btn-minimize" onClick={() => toggle()}>
            <FontAwesomeIcon icon={collapse ? faAngleDoubleUp : faAngleDoubleDown} />
          </Button>
        </div>
        {wrapIcon('Toggle tool bar', svgIcons.swapVertCircle, toggleToolbar, false)}
      </Grid>
    </Grid>
  )
}
export const BSFormHead = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    styles,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    collapse,
    // eslint-disable-next-line react/prop-types
    importData,
    // eslint-disable-next-line react/prop-types
    submitEdit,
    // eslint-disable-next-line react/prop-types
    reload,
    // eslint-disable-next-line react/prop-types
    submitQuery,
    // eslint-disable-next-line react/prop-types
    submitPost,
    // eslint-disable-next-line react/prop-types
    toggle,
    // eslint-disable-next-line react/prop-types
    toggleToolbar,
    // eslint-disable-next-line react/prop-types
    current,
  } = props
  // eslint-disable-next-line react/prop-types
  const posted = current ? current.posted : false
  return (
    // eslint-disable-next-line react/prop-types
    <Grid container xs style={{ ...styles.header }} justify="flex-start">
      <Grid item justify="center" alignItems="center">
        <IoMdMenu />
      </Grid>
      <Grid item>
        <CBadge color="primary">{title}</CBadge>
      </Grid>
      <Grid
        container
        xs
        spacing={0.5}
        justify="flex-end"
        /* eslint-disable-next-line react/prop-types */
        style={{ ...styles.header }}
        alignItems="right"
      >
        {wrapIcon('Reload', svgIcons.refresh, reload, false)}
        {wrapIcon('Post', svgIcons.done, (e) => submitPost(e), false)}
        {wrapIcon('Add new entry', svgIcons.addCircleOutline, importData, posted)}
        <div className="card-header-actions">
          <Button
            color="link"
            className="card-header-action btn-minimize"
            title="Save entry"
            onClick={(e) => submitEdit(e)}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </div>
        <div>
          <Button
            block
            color="link"
            type="submit"
            className="card-header-action btn-minimize"
            onClick={(event) => {
              event.preventDefault()
              submitQuery(event)
            }}
          >
            <FontAwesomeIcon icon={faSpinner} rotation={90} />
          </Button>
        </div>
        <div className="card-header-actions">
          <Button
            color="link"
            className="card-header-action btn-minimize"
            title="Hide/Display transaction"
            onClick={() => toggle()}
          >
            <FontAwesomeIcon icon={collapse ? faAngleDoubleUp : faAngleDoubleDown} />
          </Button>
        </div>
        {wrapIcon('Toggle tool bar', svgIcons.swapVertCircle, toggleToolbar, false)}
      </Grid>
    </Grid>
  )
}
export const FinancialsFormHead = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    styles,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    collapse,
    // eslint-disable-next-line react/prop-types
    module,
    // eslint-disable-next-line react/prop-types
    modules,
    // eslint-disable-next-line react/prop-types
    initAdd,
    // eslint-disable-next-line react/prop-types
    onNewLine,
    // eslint-disable-next-line react/prop-types
    cancelEdit,
    // eslint-disable-next-line react/prop-types
    submitEdit,
    // eslint-disable-next-line react/prop-types
    submitCanceln,
    // eslint-disable-next-line react/prop-types
    toggle,
    // eslint-disable-next-line react/prop-types
    submitCopy,
    // eslint-disable-next-line react/prop-types
    submitPost,
    // eslint-disable-next-line react/prop-types
    handleModuleChange,
    // eslint-disable-next-line react/prop-types
    toggleToolbar,
    // eslint-disable-next-line react/prop-types
    reload,
    // eslint-disable-next-line react/prop-types
    current,
  } = props
  console.log('module', module)
  // eslint-disable-next-line react/prop-types
  const posted = current ? current.posted : false
  return (
    // eslint-disable-next-line react/prop-types
    <Grid container xs style={{ ...styles.header }} justify="flex-start">
      <Grid item justify="center" alignItems="center">
        <IoMdMenu />
      </Grid>
      <Grid item>
        <h5>
          <CBadge color="primary">{title}</CBadge>
        </h5>
      </Grid>
      <Grid
        container
        xs
        spacing={0.5}
        justify="flex-end"
        /* eslint-disable-next-line react/prop-types */
        style={{ ...styles.header }}
        alignItems="right"
      >
        <div className="card-header-actions">
          <ComboBox
            id="module-id"
            idCol={true}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            data={modules.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            //value={module}
            placeholder={'Module number'}
            onChange={handleModuleChange}
          />
        </div>
        {wrapIcon('Reload all transaction', svgIcons.refresh, reload, false)}
        {wrapIcon('Copy transaction', svgIcons.copyContent, submitCopy, posted)}
        {wrapIcon('Add new line transaction', svgIcons.libraryAdd, onNewLine, posted)}
        {wrapIcon('Cancel editing', svgIcons.highlightOff, (e) => cancelEdit(e), posted)}
        {wrapIcon('Add new transaction', svgIcons.addCircleOutline, initAdd, false)}
        {wrapIcon('Save transaction', svgIcons.save, (e) => submitEdit(e), posted)}
        {wrapIcon('Canceln transaction', svgIcons.save, (e) => submitCanceln(e), false)}
        {wrapIcon('Post', svgIcons.done, submitPost, posted)}
        <div className="card-header-actions">
          <Button
            color="link"
            className="card-header-action btn-minimize"
            title="Hide/Display transaction"
            onClick={() => toggle()}
          >
            <FontAwesomeIcon icon={collapse ? faAngleDoubleUp : faAngleDoubleDown} />
          </Button>
        </div>
        {wrapIcon('Toggle tool bar', svgIcons.swapVertCircle, toggleToolbar, false)}
      </Grid>
    </Grid>
  )
}
export const JournalFormHead = (props) => {
  // eslint-disable-next-line react/prop-types
  const { styles, title, collapse, toggle, toggleToolbar } = props
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      /* eslint-disable-next-line react/prop-types */
      style={{ ...styles.inner }}
      direction="column"
    >
      <Grid container justify="space-between">
        <Grid container xs spacing={1} justify="flex-start">
          <Grid item justify="center" alignItems="center">
            <IoMdMenu size={'26px'} />
          </Grid>
          <Grid item>
            <h5>
              <CBadge color="primary">{title}</CBadge>
            </h5>
          </Grid>
          <Grid container xs spacing={1} justify="flex-end" alignItems="right">
            {wrapIcon(
              'Hide/Display  header',
              collapse ? svgIcons.doubleAngleUp : svgIcons.doubleAngleDown,
              () => toggle(),
              false,
            )}
            {wrapIcon('Toggle tool bar', svgIcons.swapVertCircle, toggleToolbar, false)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const getForm = (formId) => {
  switch (formId) {
    case formEnum.ASSET:
      return AssetForm
    case formEnum.ACCOUNT:
      return AccountMainForm
    case formEnum.BANKSTATEMENT:
      return BankStatementTabs
    case formEnum.COSTCENTER:
    case formEnum.BANK:
      return MasterfilesMainForm2
    case formEnum.MODULE:
    case formEnum.FMODULE:
    case formEnum.ARTICLE:
    case formEnum.STORE:
    case formEnum.SALARY_ITEM:
    case formEnum.PERMISSION:
      return MasterfilesMainForm
    case formEnum.USER:
      return UserTabs
    case formEnum.ROLE:
      return RoleTabs
    case formEnum.COMPANY:
    case formEnum.CUSTOMER:
    case formEnum.SUPPLIER:
      return CustomerTabs
    case formEnum.EMPLOYEE:
      return EmployeeTabs
    case formEnum.FINANCIALS:
      return FinancialsMainForm
    case formEnum.JOURNAL:
    case formEnum.PACB:
    case formEnum.BALANCETREE:
      return JournalMainForm
    case formEnum.VAT:
      return VatMainForm
    case formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM:
      return CustomerGeneralForm
    case formEnum.COMPANY_GENERAL_INFO_FORM:
      return CompanyGeneralForm
    case formEnum.BUSINESS_PARTNER_ACCOUNT_FORM:
      return CustomerAccountForm
    case formEnum.BUSINESS_PARTNER_ADDRESS_FORM:
      return AddressForm
    case formEnum.COMPANY_ACCOUNT_FORM:
      return CompanyAccountForm
    default:
      return <>NODATA</>
  }
}
const companyGeneralInfoForm = (props) => (
  <Grid
    container
    spacing={0.5}
    style={{ ...styles.inner, backgroundColor: blue }}
    direction="column"
  >
    <CompanyGeneralForm
      /* eslint-disable-next-line react/prop-types */
      current={props.current}
      /* eslint-disable-next-line react/prop-types */
      setCurrent={props.setCurrent}
      /* eslint-disable-next-line react/prop-types */
      t={props.t}
      /* eslint-disable-next-line react/prop-types */
      height={props.height}
      /* eslint-disable-next-line react/prop-types */
      disable={props.disable}
    />
  </Grid>
)
const businessPartnerGeneralInfoForm = (props) => (
  <Grid
    container
    spacing={0.5}
    style={{ ...styles.inner, backgroundColor: blue }}
    direction="column"
  >
    <CustomerGeneralForm
      /* eslint-disable-next-line react/prop-types */
      current={props.current}
      /* eslint-disable-next-line react/prop-types */
      setCurrent={props.setCurrent}
      /* eslint-disable-next-line react/prop-types */
      t={props.t}
      /* eslint-disable-next-line react/prop-types */
      height={props.height}
      /* eslint-disable-next-line react/prop-types */
      disable={props.disable}
    />
  </Grid>
)
const businessPartnerAccountForm = (props) => (
  <Grid
    container
    spacing={0.5}
    style={{ ...styles.inner, backgroundColor: blue }}
    direction="column"
  >
    <CustomerAccountForm
      /* eslint-disable-next-line react/prop-types */
      current={props.current}
      /* eslint-disable-next-line react/prop-types */
      setCurrent={props.setCurrent}
      /* eslint-disable-next-line react/prop-types */
      t={props.t}
      /* eslint-disable-next-line react/prop-types */
      locale={props.locale}
      /* eslint-disable-next-line react/prop-types */
      currency={props.currency}
      /* eslint-disable-next-line react/prop-types */
      accData={props.accData}
      /* eslint-disable-next-line react/prop-types */
      vatData={props.vatData}
      /* eslint-disable-next-line react/prop-types */
      height={props.height}
      /* eslint-disable-next-line react/prop-types */
      disable={props.disable}
    />
  </Grid>
)
const companyAccountForm = (props) => (
  <Grid
    container
    spacing={0.5}
    style={{ ...styles.inner, backgroundColor: blue }}
    direction="column"
  >
    <CompanyAccountForm
      /* eslint-disable-next-line react/prop-types */
      current={props.current}
      /* eslint-disable-next-line react/prop-types */
      setCurrent={props.setCurrent}
      /* eslint-disable-next-line react/prop-types */
      t={props.t}
      /* eslint-disable-next-line react/prop-types */
      accData={props.accData}
      /* eslint-disable-next-line react/prop-types */
      vatData={props.vatData}
      /* eslint-disable-next-line react/prop-types */
      height={props.height}
      /* eslint-disable-next-line react/prop-types */
      disable={props.disable}
    />
  </Grid>
)
export const FormFactory = (props) => {
  // eslint-disable-next-line react/prop-types
  switch (props.formid) {
    case formEnum.ASSET:
    case formEnum.ACCOUNT:
    case formEnum.BANKSTATEMENT:
    case formEnum.COSTCENTER:
    case formEnum.BANK:
    case formEnum.MODULE:
    case formEnum.FMODULE:
    case formEnum.ARTICLE:
    case formEnum.STORE:
    case formEnum.SALARY_ITEM:
    case formEnum.PERMISSION:
    case formEnum.USER:
    case formEnum.ROLE:
    case formEnum.COMPANY:
    case formEnum.CUSTOMER:
    case formEnum.SUPPLIER:
    case formEnum.EMPLOYEE:
    case formEnum.FINANCIALS:
    case formEnum.JOURNAL:
    case formEnum.PACB:
    case formEnum.BALANCETREE:
    case formEnum.BUSINESS_PARTNER_ADDRESS_FORM:
    case formEnum.VAT:
      // eslint-disable-next-line react/prop-types
      return <FormWrapper {...props} form={getForm(props.formid)} />
    case formEnum.BUSINESS_PARTNER_GENERAL_INFO_FORM:
      return businessPartnerGeneralInfoForm(props)
    case formEnum.COMPANY_GENERAL_INFO_FORM:
      return companyGeneralInfoForm(props)
    case formEnum.BUSINESS_PARTNER_ACCOUNT_FORM:
      return businessPartnerAccountForm(props)
    case formEnum.COMPANY_ACCOUNT_FORM:
      return companyAccountForm(props)
    default:
      return <>NODATA</>
  }
}

export const FormWrapper = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { form, table, collapse } = props
  return (
    <Grid
      container
      spacing={0.5}
      style={{ ...styles.inner, backgroundColor: lightGreen }}
      direction="column"
    >
      <CCollapse
        visible={collapse}
        id="JScollapse"
        style={{ ...styles.inner, backgroundColor: lightGreen }}
      >
        <>
          {form && form(props)}
          {table && table(props)}
        </>
      </CCollapse>
    </Grid>
  )
}

export const AccountMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, accData, height } = props
  // eslint-disable-next-line react/prop-types
  const currentAccount = accData.find((acc) => acc.id === current.account)
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="4" />
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            bssize="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
            className="text-center"
            placeholder="date"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.name')}
          </CFormLabel>
        </Col>
        <Col sm="6">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="changedate-id"
            className="text-center"
            placeholder="date"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="account"
            idCol={true}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            placeholder={'account number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="accountName"
            idCol={false}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentAccount ? currentAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
            className="text-center"
            placeholder="date"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="company-id"
            name="company"
            className="input-sm"
            placeholder="company"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            onChange={(event) => setCurrent({ ...current, company: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 20 }}>
          <FormControlLabel
            id="isDebit"
            name="isDebit"
            control={
              <Switch
                disabled={disable}
                style={{ height: 30, paddingLeft: 2 }}
                /* eslint-disable-next-line react/prop-types */
                checked={current.isDebit}
                onChange={(event) => setCurrent({ ...current, isDebit: event.target.checked })}
              />
            }
            label={t('account.debit_credit')}
          />
        </Col>
        <Col sm="1">
          <FormControlLabel
            id="balancesheet"
            name="balancesheet"
            control={
              <Switch
                disabled={disable}
                style={{ height: 30, paddingLeft: 2 }}
                /* eslint-disable-next-line react/prop-types */
                checked={current.balancesheet}
                onChange={(event) => setCurrent({ ...current, balancesheet: event.target.checked })}
              />
            }
            label={t('account.balancesheet')}
          />
        </Col>
        <Col sm="1">
          <Input
            bssize="sm"
            type="text"
            id="currency-id"
            name="currency"
            className="input-sm"
            placeholder="currency"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.currency}
            onChange={(event) => setCurrent({ ...current, currency: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="textarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}

export const BankStatementParameterForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, t, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.header')}
          </CFormLabel>
        </Col>
        <Col sm="1.5" style={{ height: 30 }}>
          <Input
            bssize="sm"
            type="text"
            id="header-input"
            name="header"
            className="input-sm"
            placeholder="Auftragskonto"
            /* eslint-disable-next-line react/prop-types */
            value={current.header}
            onChange={(event) => setCurrent({ ...current, header: event.target.value })}
            style={{ paddingLeft: 0 }}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.char')}
          </CFormLabel>
        </Col>
        <Col sm="1" style={{ height: 30 }}>
          <Input
            bssize="sm"
            type="text"
            id="char-input"
            name="char"
            className="input-sm"
            placeholder='"'
            /* eslint-disable-next-line react/prop-types */
            value={current.char}
            onChange={(event) => setCurrent({ ...current, char: event.target.value })}
            style={{ paddingLeft: 0 }}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.extension')}
          </CFormLabel>
        </Col>
        <Col sm="1" style={{ height: 30 }}>
          <Input
            bssize="sm"
            type="text"
            id="extension-input"
            name="extension"
            className="input-sm"
            placeholder=".CSV"
            /* eslint-disable-next-line react/prop-types */
            value={current.extension}
            onChange={(event) => setCurrent({ ...current, extension: event.target.value })}
            style={{ paddingLeft: 0 }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height, paddingTop: 5 }}>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.path')}
          </CFormLabel>
        </Col>
        <Col sm="12" md="10">
          <Input
            bssize="sm"
            type="text"
            id="path-input"
            name="path"
            className="input-sm"
            placeholder="path"
            /* eslint-disable-next-line react/prop-types */
            value={current.path}
            onChange={(event) => setCurrent({ ...current, path: event.target.value })}
            style={{ paddingLeft: 0 }}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const BankStatementMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, t, locale, currency, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            disabled={true}
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
            className="text-center"
            onChange={(newValue) => setCurrent({ ...current, postingdate: newValue })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.depositor')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="depositor-input"
            name="depositor"
            className="input-sm"
            placeholder="depositor"
            /* eslint-disable-next-line react/prop-types */
            value={current.depositor}
          />
        </Col>
        <Col sm="1.5" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.valuedate')}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <CDatePicker
            size="sm"
            inputReadOnly
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.valuedate)}
            label={t('bankstatement.valuedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
            className="text-center"
            onChange={(newValue) => setCurrent({ ...current, valuedate: newValue })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.beneficiary')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            type="text"
            id="beneficiary-input"
            name="beneficiary"
            className="input-sm"
            placeholder="beneficiary"
            /* eslint-disable-next-line react/prop-types */
            value={current.beneficiary}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.postingtext')}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="postingtext-id"
            name="postingtext"
            className="input-sm"
            placeholder="postingtext"
            /* eslint-disable-next-line react/prop-types */
            value={current.postingtext}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.info')}
          </CFormLabel>
        </Col>
        <Col xs="4">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="info-input"
            name="info"
            className="input-sm"
            placeholder="info"
            /* eslint-disable-next-line react/prop-types */
            value={current.info}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.amount')}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="amount-input"
            name="amount"
            className="input-sm"
            placeholder="amount"
            /* eslint-disable-next-line react/prop-types */
            value={Number(current.amount).toLocaleString(locale, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
              style: 'currency',
              currency: currency,
            })}
            style={{ textAlign: 'right' }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.companyIban')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="companyIban-id"
            name="companyIban"
            className="input-sm"
            placeholder="companyIban"
            /* eslint-disable-next-line react/prop-types */
            value={current.companyIban}
            onChange={(event) => setCurrent({ ...current, accountno: event.target.value })}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="company-input"
            name="company"
            className="input-sm"
            placeholder="company"
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            style={{ textAlign: 'right' }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.accountno')}{' '}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="accountno-input"
            name="accountno"
            className="input-sm"
            placeholder="accountno"
            /* eslint-disable-next-line react/prop-types */
            value={current.accountno}
            onChange={(event) => setCurrent({ ...current, accountno: event.target.value })}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('bankstatement.bankCode')}{' '}
          </CFormLabel>
        </Col>
        <Col sm="1.5">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="bankCode-input"
            name="bankCode"
            className="input-sm"
            placeholder="bankCode"
            /* eslint-disable-next-line react/prop-types */
            value={current.bankCode}
            onChange={(event) => setCurrent({ ...current, bankCode: event.target.value })}
            style={{ paddingLeft: 0 }}
          />
        </Col>
        <Col sm="1" style={{ height: 30, paddingLeft: 20 }}>
          <FormControlLabel
            id="posted"
            name="posted"
            bssize="sm"
            /* eslint-disable-next-line react/prop-types */
            control={<Switch checked={current.posted} />}
            label={t('bankstatement.posted')}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height, paddingTop: 5 }}>
        <Col sm="2">
          {/* eslint-disable-next-line react/prop-types */}
          <CFormLabel disabled={current.posted} size="sm" htmlFor="input-small">
            {t('bankstatement.purpose')}
          </CFormLabel>
        </Col>
        <Col xs="12" md="10">
          <CFormTextarea
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="textarea"
            id="purpose-input"
            name="purpose"
            className="input-sm"
            placeholder="purpose"
            /* eslint-disable-next-line react/prop-types */
            value={current.purpose}
            onChange={(event) => setCurrent({ ...current, purpose: event.target.value })}
            rows="2"
          />
        </Col>
      </CInputGroup>
    </>
  )
}

export const AssetForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, t, accData, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
            className="text-end"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('costcenter.name')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="changedate-id"
            className="text-end"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.account')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="account"
            id="account-id"
            size="sm"
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            onChange={(event) => setCurrent({ ...current, account: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
            className="text-end"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.oaccount')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="oaccount"
            id="oaccount-id"
            size="sm"
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.oaccount}
            onChange={(event) => setCurrent({ ...current, oaccount: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            disabled={true}
            bssize="sm"
            type="text"
            id="company-id"
            name="company"
            className="input-sm"
            placeholder="company"
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            readonly
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('asset.scrapValue')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="scrap_value-input"
            name="scrap_value"
            className="input-sm"
            placeholder="scrap_value"
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.scrapValue}
            onChange={(event) => setCurrent({ ...current, scrap_value: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('asset.lifeSpan')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="number"
            id="life_span-input"
            name="life_span"
            className="input-sm"
            placeholder="life span"
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.lifeSpan}
            onChange={(event) => setCurrent({ ...current, life_span: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('asset.depreciation')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="number"
            id="depreciation-input"
            name="depreciation"
            className="input-sm"
            placeholder="depreciation"
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.depMethod}
            onChange={(event) => setCurrent({ ...current, dep_Method: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('asset.frequency')}/{t('asset.rate')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <Input
            bssize="sm"
            type="number"
            id="frequency-input"
            name="frequency"
            className="input-sm"
            placeholder="frequency"
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.frequency}
            onChange={(event) => setCurrent({ ...current, frequency: event.target.value })}
          />
        </Col>
        <Col sm="1">
          <Input
            bssize="sm"
            type="number"
            id="rate-input"
            name="rate"
            className="input-sm"
            placeholder="rate"
            style={{ height: 30, textAlign: 'right', padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.rate}
            onChange={(event) => setCurrent({ ...current, rate: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="texarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const MasterfilesMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, accData, height } = props
  // eslint-disable-next-line react/prop-types
  const id = current.modelid === formEnum.SALARY_ITEM ? current.account : current.id
  // eslint-disable-next-line react/prop-types
  const currentAccount = accData.find((acc) => acc.id === id)
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            style={{ height: 30 }}
            /* eslint-disable-next-line no-undef */
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="4" />
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            /* eslint-disable-next-line no-undef */
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('costcenter.name')}
          </CFormLabel>
        </Col>
        <Col sm="6">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            style={{ height: 30 }}
            /* eslint-disable-next-line no-undef */
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        {/* eslint-disable-next-line react/prop-types */}
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="account"
            idCol={true}
            sm="4"
            /* eslint-disable-next-line no-undef */
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            placeholder={'account number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="accountName"
            idCol={false}
            sm="4"
            /* eslint-disable-next-line no-undef */
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentAccount ? currentAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        {/* eslint-disable-next-line react/prop-types */}
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            disabled={true}
            bssize="sm"
            type="text"
            id="company-id"
            name="company"
            className="input-sm"
            placeholder="company"
            style={{ height: 30, padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            readonly
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="texarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            style={{ height: 30 }}
            /* eslint-disable-next-line no-undef */
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const MasterfilesMainForm2 = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="id"
            name="id"
            className="input-sm"
            placeholder="Id"
            style={{ height: 30 }}
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="4" />
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.name')}
          </CFormLabel>
        </Col>
        <Col sm="6">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            style={{ height: 30 }}
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        {/* eslint-disable-next-line react/prop-types */}
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            disabled={true}
            bssize="sm"
            type="text"
            id="company-id"
            name="company"
            className="input-sm"
            placeholder="company"
            style={{ height: 30, padding: 2 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            readonly
          />
        </Col>
        <Col sm="4" />
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="texarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            style={{ height: 30 }}
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const UserForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="user-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('user.role')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="role-id"
            name="role"
            className="input-sm"
            placeholder="role"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.role}
            onChange={(event) => setCurrent({ ...current, role: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('user.userName')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="userName-input"
            name="userName"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.userName}
            onChange={(event) => setCurrent({ ...current, userName: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('user.firstName')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="firstName-id"
            name="firstName"
            className="input-sm"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.firstName}
            onChange={(event) => setCurrent({ ...current, firstName: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('user.lastName')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="lastName-id"
            name="lastName"
            className="input-sm"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.lastName}
            onChange={(event) => setCurrent({ ...current, lastName: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('user.email')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="email-id"
            name="email"
            className="input-sm"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.email}
            onChange={(event) => setCurrent({ ...current, email: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="6" />
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            disabled={true}
            type="text"
            id="company-id"
            name="company"
            className="input-sm"
            placeholder="company"
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.phone')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <Input
            bssize="sm"
            type="text"
            id="menu-id"
            name="menu"
            className="input-sm"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.menu}
            onChange={(event) => setCurrent({ ...current, menu: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const AddressForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, height } = props
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.street')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="street-id"
            name="street"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.street}
            onChange={(event) => setCurrent({ ...current, street: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.zip')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="zip-id"
            name="zip"
            className="input-sm"
            placeholder="zip"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.zip}
            onChange={(event) => setCurrent({ ...current, zip: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.city')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="city-input"
            name="city"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.city}
            onChange={(event) => setCurrent({ ...current, city: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.country')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="country-id"
            name="country"
            className="input-sm"
            placeholder="country"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.country}
            onChange={(event) => setCurrent({ ...current, country: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const CustomerGeneralForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, height } = props
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      style={{ ...styles.inner }}
      direction="column"
    >
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.name')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="changedate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.email')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="email-id"
            name="email"
            className="input-sm"
            placeholder="Email"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.email}
            onChange={(event) => setCurrent({ ...current, email: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ height: 30, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.phone')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="phone-id"
            name="phone"
            className="input-sm"
            placeholder="phone"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.phone}
            onChange={(event) => setCurrent({ ...current, phone: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="texarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </Grid>
  )
}

const fromPeriod = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, balancesheet, t } = props
  /* eslint-disable-next-line react/prop-types */
  return (
    !balancesheet && (
      <>
        <Col sm="0.5" style={{ align: 'right', padding: 2, paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.from')}
          </CFormLabel>
        </Col>
        <Col sm="1" style={{ paddingLeft: 10 }}>
          <Input
            bssize="sm"
            type="text"
            id="fromPeriod-id"
            name="fromPeriod"
            className="input-sm"
            placeholder="fromPeriod"
            /* eslint-disable-next-line react/prop-types */
            value={current.fromPeriod}
            onChange={(event) => setCurrent({ ...current, fromPeriod: event.target.value })}
            style={{ height: 30, padding: 1, textAlign: 'right' }}
          />
        </Col>
      </>
    )
  )
}
const salaryField = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, locale, currency, t } = props
  /* eslint-disable-next-line react/prop-types */
  return (
    current.modelid === formEnum.EMPLOYEE && (
      <>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('employee.salary')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="salary-id"
            name="salary"
            className="input-sm form-select-bg-size"
            placeholder="salary"
            disabled={disable}
            inputProps={{ type: 'number' }}
            /* eslint-disable-next-line react/prop-types */
            value={Number(current.salary).toLocaleString(locale, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
              style: 'currency',
              currency: currency,
            })}
            onChange={(event) => setCurrent({ ...current, salary: event.target.value })}
            style={{ textAlign: 'right', padding: 2 }}
          />
        </Col>
      </>
    )
  )
}
export const CustomerAccountForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, accData, vatData, height } = props
  const accountLabel =
    /* eslint-disable-next-line react/prop-types */
    current.modelid === 1
      ? t('supplier.account')
      : /* eslint-disable-next-line react/prop-types */
        current.modelid === 3
        ? t('customer.account')
        : t('employee.account')
  // eslint-disable-next-line react/prop-types
  const currentAccount = accData.find((acc) => acc.id === current.account)
  // eslint-disable-next-line react/prop-types
  const currentOAccount = accData.find((acc) => acc.id === current.oaccount)
  // eslint-disable-next-line react/prop-types
  const currentVat = vatData.find((vat) => vat.id === current.vatcode)
  const oaccountLabel =
    /* eslint-disable-next-line react/prop-types */
    current.modelid === 1
      ? t('supplier.oaccount')
      : // eslint-disable-next-line react/prop-types
        current.modelid === 3
        ? t('customer.oaccount')
        : t('employee.oaccount')
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      style={{ ...styles.inner }}
      direction="column"
    >
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {accountLabel}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="account"
            idCol={true}
            sm="4"
            data={accData}
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            placeholder={'account number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="accountName"
            idCol={false}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentAccount ? currentAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {oaccountLabel}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="oaccount"
            idCol={true}
            sm="4"
            data={accData}
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.oaccount}
            placeholder={' o acc number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, oaccount: newValue?.id, oaccountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="oaccountName"
            idCol={false}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentOAccount ? currentOAccount.name : ''}
            placeholder={'oaccount name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, oaccountName: newValue?.name })
            }}
          />
        </Col>
        {/* eslint-disable-next-line react/prop-types */}
        {current.modelid === formEnum.EMPLOYEE ? salaryField(props) : null}
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.vatCode')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="vatcode"
            idCol={true}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={vatData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.vatcode}
            placeholder={'vat code'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, vatcode: newValue?.id, vatName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="vatName"
            idCol={false}
            sm="4"
            disable={disable}
            /* eslint-disable-next-line react/prop-types */
            data={vatData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentVat ? currentVat.name : ''}
            placeholder={'vat name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, vatcode: newValue?.id, vatName: newValue?.name })
            }}
          />
        </Col>
      </CInputGroup>
    </Grid>
  )
}
export const CompanyGeneralForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, height } = props
  console.log('props', props)
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      style={{ ...styles.inner }}
      direction="column"
    >
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('company.name')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="changedate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('common.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="texarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </Grid>
  )
}
export const CompanyAccountForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, accData, vatData, height } = props

  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.bankAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="bankAcc"
            id="bankAcc-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.bankAcc}
            onChange={(event) => setCurrent({ ...current, bankAcc: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.vatCode')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="vatcode"
            id="vatcode-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.vatCode}
            onChange={(event) => setCurrent({ ...current, vatCode: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {vatData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.paymentClearingAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="paymentClearingAcc"
            id="paymentClearingAcc-id"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.paymentClearingAcc}
            onChange={(event) => setCurrent({ ...current, paymentClearingAcc: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.settlementClearingAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="settlementClearingAcc"
            id="settlementClearingAcc-id"
            size="sm"
            style={{ height: 30 }}
            disabled={disable}
            /* eslint-disable-next-line react/prop-types */
            value={current.settlementClearingAcc}
            onChange={(event) =>
              setCurrent({ ...current, settlementClearingAcc: event.target.value })
            }
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.cashAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="cashAcc"
            id="cashAcc-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.cashAcc}
            onChange={(event) => setCurrent({ ...current, cashAcc: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.purchasingClearingAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="purchasingClearingAcc"
            id="purchasingClearingAcc-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.purchasingClearingAcc}
            onChange={(event) =>
              setCurrent({ ...current, purchasingClearingAcc: event.target.value })
            }
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.balanceSheetAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="balanceSheetAcc"
            id="balanceSheetAcc-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.balanceSheetAcc}
            onChange={(event) => setCurrent({ ...current, balanceSheetAcc: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.incomeStmtAcc')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <CFormSelect
            className="flex-row"
            type="select"
            name="incomeStmtAcc"
            id="incomeStmtAcc-id"
            size="sm"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.incomeStmtAcc}
            onChange={(event) => setCurrent({ ...current, incomeStmtAcc: event.target.value })}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {accData.sort(sortById).map((item) => mappingSelect(item))}
          </CFormSelect>
        </Col>
      </CInputGroup>
    </>
  )
}

export const FinancialsMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  let { current, current_, setCurrent, t, accData, ccData, height } = props
  current = current ? current : current_
  // eslint-disable-next-line react/prop-types
  const currentAccount = accData.find((acc) => acc.id === current.account)
  // eslint-disable-next-line react/prop-types
  const ccData_ = ccData ? ccData : []
  // eslint-disable-next-line react/prop-types
  const currentCC = ccData_.find((cc) => cc.id === current.costcenter)
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1">
          <CFormLabel size="xs" htmlFor="input-small">
            {t('financials.id')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="id"
            name="id"
            className="sm"
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            placeholder={t('financials.id')}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
          />
        </Col>
        <Col sm="4" />
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('financials.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <CDatePicker
            size="sm"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('financials.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
          />
        </Col>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 20 }}>
            {t('financials.period')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <Input
            disabled={true}
            bssize="sm"
            className="input-sm"
            type="text"
            id="period"
            name="period"
            /* eslint-disable-next-line react/prop-types */
            value={current.period}
            style={{ textAlign: 'right', padding: 2 }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1" style={{ height: 30 }}>
          <CFormLabel size="xs" htmlFor="input-small" style={{ height: 30 }}>
            {t('financials.oid')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            bssize="sm"
            type="text"
            id="oid-input"
            name="oid"
            className="input-sm"
            placeholder="oid"
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.oid}
            onChange={(event) => setCurrent({ ...current, oid: event.target.value })}
          />
        </Col>
        <Col sm="4" />
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('financials.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <CDatePicker
            size="xs"
            disabled={true}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('financials.enterdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="enterdate-id"
          />
        </Col>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 20 }}>
            {t('common.company')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <Input
            disabled={true}
            bssize="sm"
            type="text"
            id="company-input"
            name="company"
            className="input-sm"
            placeholder={t('common.company')}
            /* eslint-disable-next-line react/prop-types */
            value={current.company}
            style={{ textAlign: 'right', height: 30 }}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('financials.account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="account"
            idCol={true}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            disable={current.posted}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            placeholder={'account number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 5 }}>
          <ComboBox
            id="accountName"
            idCol={false}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            disable={current.posted}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentAccount ? currentAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small" style={{ height: 30, paddingLeft: 10 }}>
            {t('financials.transdate')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <CDatePicker
            size="xs"
            /* eslint-disable-next-line react/prop-types */
            disabled={current.posted}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.transdate)}
            label={t('financials.transdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="transdate-id"
            onChange={(newValue) => setCurrent({ ...current, transdate: newValue })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('financials.costcenter')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="costcenter"
            idCol={true}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            disable={current.posted}
            /* eslint-disable-next-line react/prop-types */
            data={ccData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.costcenter}
            placeholder={'cost center number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, costcenter: newValue?.id, costcenterName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 5 }}>
          <ComboBox
            id="costCenterName"
            idCol={false}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            disable={current.posted}
            /* eslint-disable-next-line react/prop-types */
            data={ccData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentCC ? currentCC.name : ''}
            placeholder={'cost center name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, costcenter: newValue?.id, accountName: newValue?.name })
            }}
          />
        </Col>
        <Col sm="1">
          <FormControlLabel
            disabled={true}
            id="posted"
            name="posted"
            style={{ paddingLeft: 60 }}
            /* eslint-disable-next-line react/prop-types */
            control={<Switch checked={current.posted} />}
            label={t('financials.posted')}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
export const JournalMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, t, accData, submitQuery, submitQuery2, height } = props
  // eslint-disable-next-line react/prop-types
  const currentAccount = accData.find((acc) => acc.id === current.account)
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="1">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="account-id"
            idCol={true}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.account}
            placeholder={'account number'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, account2: newValue?.name })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 10 }}>
          <ComboBox
            id="account2-id"
            idCol={false}
            sm="4"
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentAccount ? currentAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({ ...current, account: newValue?.id, account2: newValue?.name })
            }}
          />
        </Col>
        {fromPeriod(props)}
        <Col sm="0.5" style={{ padding: 2, paddingLeft: 10, textAlign: 'right' }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.to')}
          </CFormLabel>
        </Col>
        <Col sm="1" style={{ paddingLeft: 10, textAlign: 'right' }}>
          <Input
            bssize="sm"
            type="text"
            id="toPeriod-id"
            name="toPeriod"
            className="input-sm"
            placeholder="toPeriod"
            /* eslint-disable-next-line react/prop-types */
            value={current.toPeriod}
            onChange={(event) => setCurrent({ ...current, toPeriod: event.target.value })}
            style={{ height: 30, padding: 1, textAlign: 'right' }}
          />
        </Col>
        <Col sm="1" style={{ paddingLeft: 10, align: 'right' }}>
          <Button
            type="submit"
            size="sm"
            color="primary"
            style={{ align: 'right' }}
            onClick={submitQuery}
          >
            <i className="fa fa-dot-circle-o"></i>
          </Button>
        </Col>
        <Col sm="1" style={{ paddingLeft: 10, align: 'right' }}>
          <Button
            type="submit"
            size="sm"
            color="primary"
            style={{ align: 'right' }}
            onClick={submitQuery2}
          >
            <i className="fa fa-dot-circle-o"></i>
          </Button>
        </Col>
      </CInputGroup>
    </>
  )
}
export const VatMainForm = (props) => {
  /* eslint-disable-next-line react/prop-types */
  const { current, setCurrent, disable, t, accData, height } = props
  // eslint-disable-next-line react/prop-types
  const currentInputAccount = accData.find((acc) => acc.id === current.inputVatAccount)
  // eslint-disable-next-line react/prop-types
  const currentOutputAccount = accData.find((acc) => acc.id === current.outputVatAccount)
  return (
    <>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('common.id')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <Input
            bssize="sm"
            type="text"
            id="account-id"
            name="id"
            className="input-sm"
            placeholder="Id"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.id}
            onChange={(event) => setCurrent({ ...current, id: event.target.value })}
          />
        </Col>
        <Col sm="4" />
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.enterdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.enterdate)}
            label={t('common.enterdate')}
            id="enterdate-id"
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.name')}
          </CFormLabel>
        </Col>
        <Col sm="4">
          <Input
            bssize="sm"
            type="text"
            id="name-input"
            name="name"
            className="input-sm"
            placeholder="Name"
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.name}
            onChange={(event) => setCurrent({ ...current, name: event.target.value })}
          />
        </Col>
        <Col sm="2" />
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.changedate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.changedate)}
            label={t('common.changedate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="changedate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.input_account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="inputaccount"
            idCol={true}
            sm="4"
            disable={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.inputVatAccount}
            placeholder={'input vat account Nr'}
            onChange={(event, newValue) => {
              setCurrent({
                ...current,
                inputVatAccount: newValue?.id,
                inputVatAccountName: newValue?.name,
              })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 5 }}>
          <ComboBox
            id="accountName"
            idCol={false}
            sm="4"
            disable={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentInputAccount ? currentInputAccount.name : ''}
            placeholder={'account name'}
            onChange={(event, newValue) => {
              setCurrent({
                ...current,
                inputVatAccount: newValue?.id,
                inputVatAccountName: newValue?.name,
              })
            }}
          />
        </Col>
        <Col sm="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.postingdate')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <CDatePicker
            size="sm"
            disabled={true}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            selected={Date.parse(current.postingdate)}
            label={t('common.postingdate')}
            showTimeInput
            footer
            dateFormat="dd.MM.yyyy"
            id="postingdate-id"
            className="text-end w-50"
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col sm="2">
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.output_account')}
          </CFormLabel>
        </Col>
        <Col sm="2">
          <ComboBox
            id="outputVataccount"
            idCol={true}
            sm="4"
            disable={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortById)}
            /* eslint-disable-next-line react/prop-types */
            value={current.outputVatAccount}
            placeholder={'output vat account Nr'}
            onChange={(event, newValue) => {
              setCurrent({
                ...current,
                outputVatAccount: newValue?.id,
                outputVatAccountName: newValue?.name,
              })
            }}
          />
        </Col>
        <Col sm="4" style={{ paddingLeft: 5 }}>
          <ComboBox
            id="outputVataccountName"
            idCol={false}
            sm="4"
            disable={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            data={accData.sort(sortByName)}
            /* eslint-disable-next-line react/prop-types */
            value={currentOutputAccount ? currentOutputAccount.name : ''}
            placeholder={'Output vat account name'}
            onChange={(event, newValue) => {
              setCurrent({
                ...current,
                outputVatAccount: newValue?.id,
                outputVatAccountName: newValue?.name,
              })
            }}
          />
        </Col>
        <Col md="2" style={{ paddingLeft: 10 }}>
          <CFormLabel size="sm" htmlFor="input-small">
            {t('vat.percent')}
          </CFormLabel>
        </Col>
        <Col sm="1">
          <Input
            bssize="sm"
            type="text"
            id="percent-id"
            name="percent"
            className="input-sm"
            placeholder="percent"
            disabled={disable}
            style={{ height: 30, textAlign: 'right' }}
            /* eslint-disable-next-line react/prop-types */
            value={current.percent}
            onChange={(event) => setCurrent({ ...current, percent: event.target.value })}
          />
        </Col>
      </CInputGroup>
      <CInputGroup row style={{ height: height }}>
        <Col md="2">
          <CFormLabel htmlFor="textarea-input">{t('vat.description')}</CFormLabel>
        </Col>
        <Col xs="12" md="9">
          <CFormTextarea
            type="textarea"
            name="description"
            id="description-id"
            rows="1"
            placeholder="Content..."
            disabled={disable}
            style={{ height: 30 }}
            /* eslint-disable-next-line react/prop-types */
            value={current.description}
            onChange={(event) => setCurrent({ ...current, description: event.target.value })}
          />
        </Col>
      </CInputGroup>
    </>
  )
}
