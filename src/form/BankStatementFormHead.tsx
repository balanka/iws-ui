import { CHeaderToggler, CBadge, CFormSelect, CTooltip, CInputGroup } from '@coreui/react-pro'
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import FilterListIcon from '@mui/icons-material/FilterList'
import ListIcon from '@mui/icons-material/List'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { IoMdMenu } from 'react-icons/io'
import { languages } from './languages'

const Btn = ({ tip, onClick, disabled, icon }: any) => (
  <CTooltip content={tip} placement="top">
    <IconButton size="small" sx={{ height: 22, width: 18 }} onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </CTooltip>
)

export const BankStatementFormHead = ({ title, collapse, cancelEdit, submitEdit, importData, submitPost, reload, toggle, toggleTable, logout, navigate, language, handleLanguageChange, dispatch, current, t }: any) => {
  const sidebarShow = useSelector((s: any) => s.sidebarShow)

  return (
    <CInputGroup className="p-1 bg-light" style={{ borderBottom: '1px solid #ddd', minHeight: 28 }}>
      <div className="d-flex align-items-center gap-2">
        <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}><IoMdMenu size={20} /></CHeaderToggler>
        <h5 className="m-0"><CBadge color="primary">{title}</CBadge></h5>
      </div>

      <div className="d-flex align-items-center gap-1 ms-auto">
        <CFormSelect style={{ height: 25, fontSize: 10, width: 100 }} value={language} onChange={handleLanguageChange}>
          {languages.map((l: any) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </CFormSelect>
        <Btn tip={t('toolTip.common.save')} onClick={submitEdit} disabled={current.posted} icon={<SaveIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.canceln')} onClick={cancelEdit} disabled={current.posted} icon={<CancelIcon fontSize="small" />} />
        <Btn tip={t('toolTip.transaction.post')} onClick={submitPost} disabled={current.posted} icon={<CheckCircleOutlineIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.import')} onClick={importData} icon={<DriveFolderUploadIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.load')} onClick={reload} icon={<FilterListIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.table')} onClick={toggleTable} icon={<ListIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.form')} onClick={toggle} icon={collapse ? <KeyboardDoubleArrowUpIcon fontSize="small" /> : <KeyboardDoubleArrowDownIcon fontSize="small" />} />
        <Btn tip={t('toolTip.common.exit')} onClick={() => logout(navigate)} icon={<ExitToAppIcon fontSize="small" />} />
      </div>
    </CInputGroup>
  )
}

export default BankStatementFormHead
