import { JSX } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import {CBadge, CFormSelect, CHeaderToggler, CInputGroup, CTooltip} from '@coreui/react';
import { IoMdMenu } from 'react-icons/io';
import { languages } from './languages';

// Icons
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ListIcon from '@mui/icons-material/List';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PrintOutlined from '@mui/icons-material/PrintOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const ToolbarButton = ({ tooltip, onClick, disabled, icon }: any) => (
  <CTooltip content={tooltip} placement="top">
    <IconButton size="small" sx={{ height: 22, width: 18 }} onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </CTooltip>
)

export const FinancialsFormHead = ({
                                     title, collapse, initAdd, onNewLine, onDeleteLine, submitCancel, submitEdit,
                                     toggle, toggleTable, submitPost, reload, handleLanguageChange, navigate, language,
                                     dispatch, logout, current, t
                                   }: any): JSX.Element => {
  const UpDownIcon = collapse ? <KeyboardDoubleArrowUpIcon fontSize="small" /> : <KeyboardDoubleArrowDownIcon fontSize="small" />;
  const sidebarShow = useSelector((state: any) => state.sidebarShow);

  return (
    <CInputGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', minHeight: 28, flexWrap: 'wrap', gap: 0.2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center',  gap: 1 }}>
        <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}><IoMdMenu size={20} /></CHeaderToggler>
        <h5 style={{ margin: 0 }}><CBadge color="primary">{title}</CBadge></h5>
      </Box>
      <Box sx={{ display: 'flex', height:30, alignItems:  'center', gap: 0.5, flexWrap: 'wrap' }}>
        <CHeaderToggler onClick={(e) => handleLanguageChange(e)}>
          <CFormSelect style={{ height: 25, width: 100, fontSize: 10 }} value={language} onChange={(e) => handleLanguageChange(e)}>
            {languages.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </CFormSelect>
        </CHeaderToggler>
        <ToolbarButton tooltip={t('toolTip.transaction.removeLine')} onClick={onDeleteLine} disabled={current?.posted} icon={<RemoveCircleOutlineIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.transaction.addLine')} onClick={onNewLine} disabled={current?.posted} icon={<AddCircleOutlineIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.add')} onClick={initAdd} icon={<AddBoxIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.save')} onClick={submitEdit} disabled={current?.posted} icon={<SaveIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.canceln')} onClick={submitCancel} disabled={current?.posted} icon={<CancelIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.transaction.post')} onClick={submitPost} disabled={current?.posted} icon={<CheckCircleOutlineIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.print')} onClick={() => {}} icon={<PrintOutlined fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.export')} onClick={() => {}} icon={<ArrowCircleDownIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.load')} onClick={reload} icon={<FilterListIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.table')} onClick={toggleTable} icon={<ListIcon fontSize="small" />} />
        <ToolbarButton tooltip={t('toolTip.common.form')} onClick={toggle} icon={UpDownIcon} />
        <ToolbarButton tooltip={t('toolTip.common.exit')} onClick={() => logout(navigate)} icon={<ExitToAppIcon fontSize="small" />} />
      </Box>
    </CInputGroup>
  );
};
