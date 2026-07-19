import React, {CSSProperties, MouseEventHandler} from 'react';
import {CHeaderToggler, CBadge, CInputGroup, CTooltip, CButton, CFormSelect} from '@coreui/react-pro';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import IconButton from '@mui/material/IconButton';
import PrintOutlined from '@mui/icons-material/PrintOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { JournalToolBarProps } from '../Props';
import {languages} from "./languages.ts";

const ToolbarButton = ({ tooltip, onClick, disabled, icon }: any) => (
  <CTooltip content={tooltip} placement="top">
    <IconButton size="small" sx={{ height: 22, width: 18 }} onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </CTooltip>
)
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

export const JournalFormHead = <T,>({
                                      style, title, submitQuery, submitQuery2, balancesheet,
                                      t, dispatch, logout, current, getData, submitPrintPreview
                                      , language, handleLanguageChange, template1EnumId, fmodule
                                    }: JournalToolBarProps<T>): React.JSX.Element => {

  const sidebarShow = useSelector((state: any) => state.sidebarShow);
  const navigate = useNavigate();

  return (
    <CInputGroup style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
       backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd',
      minHeight: 28, flexWrap: 'wrap', gap: 0.2, ...style
    }}>
      {/* Left section */}
      <div style={{ display: 'flex', alignItems:'flex-end', gap: 8 }}>
        <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <IoMdMenu size={20} />
        </CHeaderToggler>
        <h5 style={{ margin: 0 }}>
          <CBadge color="primary">{title}</CBadge>
        </h5>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', height: 30, alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        <CHeaderToggler onClick={(e) => handleLanguageChange(e)}>
          <CFormSelect style={{ height: 25, width: 100, fontSize: 10 }} value={language} onChange={(e) => handleLanguageChange(e)}>
            {languages.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </CFormSelect>
        </CHeaderToggler>
        <ToolbarButton
          tooltip={t('toolTip.common.print')}
          //@ts-ignore
          onClick={() => submitPrintPreview(current, getData, fmodule, template1EnumId)}
          icon={<PrintOutlined fontSize="small" />}
        />

        <FormButton
          title={t('common.run')}
          onClick={(e) => submitQuery(e, current)}
          style={{ textAlign: 'left', height: 25, padding: 1 }}
        />

        {submitQuery2 && (
          <FormButton
            title={t('common.runAll')}
            onClick={(e) => submitQuery2(e, current)}
            style={{ textAlign: 'right', height: 25, padding: 1 }}
            disable={!submitQuery2 === undefined && balancesheet}
          />
        )}

        <ToolbarButton
          tooltip={t('toolTip.common.exit')}
          onClick={() => logout(navigate)}
          icon={<ExitToAppIcon fontSize="small" />}
        />
      </div>
    </CInputGroup>
  )
}

export default JournalFormHead;
