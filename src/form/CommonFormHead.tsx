import { JSX } from 'react'
import {CHeaderToggler, CBadge, CFormSelect, CTooltip, CInputGroup} from '@coreui/react-pro'
import { TFunction } from 'i18next'
import { NavigateFunction } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import { IoMdMenu } from 'react-icons/io'

// Icons
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import ListIcon from '@mui/icons-material/List'
import AddBoxIcon from '@mui/icons-material/AddBox'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import { languages } from './languages'
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"

interface CommonFormHeadProps {
  readonly title: string;
  readonly collapse: boolean;
  readonly initAdd: () => void;
  readonly edited: boolean;
  readonly disable: boolean;
  readonly added: boolean;
  readonly edit: () => void;
  readonly cancelEdit: (e: any) => void;
  readonly submitEdit: (e: any) => void;
  readonly reload: () => void;
  readonly toggle: () => void;
  readonly toggleTable: () => void;
  readonly onNewBankAccount?: () => void;
  readonly onDeleteBankAccount?: (e: any) => void;
  readonly onNewSalaryItem?: () => void;
  readonly handleLanguageChange: (arg: any) => void;
  readonly navigate: NavigateFunction;
  readonly language: string;
  readonly dispatch: Dispatch<any>;
  readonly logout: (navigate: NavigateFunction) => void;
  readonly t: TFunction<'translation', undefined>;
  readonly submitQuery?: (e: any) => void;
}

const ToolbarButton = ({ tooltip, onClick, disabled, icon }: any) => (
  <CTooltip content={tooltip} placement="top">
    <IconButton size="small" sx={{ height: 22, width: 18 }} onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </CTooltip>
)
export const CommonFormHead = ({
                                 title,
                                 collapse,
                                 initAdd,
                                 edited,
                                 edit,
                                 disable,
                                 added,
                                 cancelEdit,
                                 submitEdit,
                                 reload,
                                 toggle,
                                 toggleTable,
                                 onNewBankAccount,
                                 onDeleteBankAccount,
                                 handleLanguageChange,
                                 navigate,
                                 language,
                                 dispatch,
                                 logout,
                                 t
                               }: CommonFormHeadProps): JSX.Element => {
  const keyboardDoubleArrowUpIcon = <KeyboardDoubleArrowUpIcon fontSize="small" />;
  const keyboardDoubleArrowDwnIcon = <KeyboardDoubleArrowDownIcon fontSize="small" />;
  const listIcon = <ListIcon fontSize="small" />;
  const UpDownIcon = collapse ? keyboardDoubleArrowUpIcon : keyboardDoubleArrowDwnIcon;
  const sidebarShow = useSelector((state: any) => state.sidebarShow);

  const mapping = (item: { id: string; name: string }) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  );

  return (
    <CInputGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', minHeight: 28, flexWrap: 'wrap', gap: 0.2 }}>
      {/* Left section - Menu Toggle and Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <IoMdMenu size={20} />
        </CHeaderToggler>
        <h5 style={{ margin: 0 }}>
          <CBadge color="primary">{title}</CBadge>
        </h5>
      </div>

      {/* Right section - Toolbar Buttons */}
      <Box sx={{ display: 'flex', height:30, alignItems:  'center', gap: 0.5, flexWrap: 'wrap' }}>
        {/* Language Selector */}
        <CHeaderToggler className="ps-1" onClick={(event) => handleLanguageChange(event)}>
          <CFormSelect
            style={{ height: 25,  fontSize: 10, width: 100 }}
            className="flex-row"
            type="select"
            name="language"
            id="language-id"
            value={language}
            onChange={(event) => handleLanguageChange(event)}>
            {languages.map((item) => mapping(item))}
          </CFormSelect>
        </CHeaderToggler>

        {/* Remove Bank Account Button */}
        {onDeleteBankAccount && (
          <ToolbarButton
            tooltip={t('toolTip.common.removeBankAccount')}
            onClick={(event:any) => onDeleteBankAccount(event)}
            disabled={!onDeleteBankAccount}
            icon={<RemoveCircleOutlineIcon fontSize="small" />}
          />
        )}

        {/* Add Bank Account Button */}
        {onNewBankAccount && (
          <ToolbarButton
            tooltip={t('toolTip.common.addBankAccount')}
            onClick={() => onNewBankAccount()}
            disabled={!onNewBankAccount}
            icon={<AddCircleOutlineIcon fontSize="small" />}
          />
        )}

        {/* Add Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.add')}
          onClick={() => initAdd()}
          disabled={!edited}
          icon={<AddBoxIcon fontSize="small" />}
        />

        {/* Save Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.save')}
          onClick={(e: any) => submitEdit(e)}
          disabled={disable && !edited && !added}
          icon={<SaveIcon fontSize="small" />}
        />

        {/* Cancel Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.edit')}
          onClick={(e: any) => cancelEdit(e)}
          disabled={!edited && !added}
          icon={<CancelIcon fontSize="small" />}
        />

        {/* Edit Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.edit')}
          onClick={edit}
          icon={<EditSquareIcon fontSize="small" />}
        />

        {/* Reload Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.load')}
          onClick={reload}
          icon={<FilterListIcon fontSize="small" />}
        />

        {/* Toggle Table Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.table')}
          onClick={() => toggleTable()}
          icon={listIcon}
        />

        {/* Toggle Form Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.form')}
          onClick={() => toggle()}
          icon={UpDownIcon}
        />

        {/* Logout Button */}
        <ToolbarButton
          tooltip={t('toolTip.common.exit')}
          onClick={() => logout(navigate)}
          icon={<ExitToAppIcon fontSize="small" />}
        />
      </Box>
    </CInputGroup>
  )
}

export default CommonFormHead;
