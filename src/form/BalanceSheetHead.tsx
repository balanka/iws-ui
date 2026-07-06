import React, { CSSProperties, Dispatch } from "react";
import { TFunction } from "i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CBadge, CHeaderToggler, CInputGroup } from "@coreui/react-pro";
import { IoMdMenu } from "react-icons/io";
import { FormButton } from './common'

export const BalanceSheetHead = ({
                                   style, title, submitQuery, t, dispatch, logout}: {
  style?: CSSProperties;
  title: string;
  submitQuery: (event: any) => void;
  t: TFunction<'translation', undefined>;
  dispatch: Dispatch<any>;
  logout: (navigate: NavigateFunction) => void;
}): React.JSX.Element => {
  const sidebarShow = useSelector((state: any) => state.sidebarShow);
  const navigate = useNavigate();
  return (
    <CInputGroup style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
       backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd',
      minHeight: 28, flexWrap: 'wrap', gap: 0.2, ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <IoMdMenu size={20} />
        </CHeaderToggler>
        <h5 className="m-0"><CBadge color="primary">{title}</CBadge></h5>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <FormButton
          title={t('common.run')}
          onClick={submitQuery}
          style={{ height: 25, padding: 1 }}
        />
        <FormButton
          title={t('common.exit')}
          onClick={() => logout(navigate)}
          style={{ height: 25, padding: 1 }}
          color="secondary"
        />
      </div>
    </CInputGroup>
  )
}
export default BalanceSheetHead;
