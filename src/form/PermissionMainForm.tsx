import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { MasterfileMainBaseForm } from './MasterfileMainBaseForm'
import { FieldLabel, InputField } from './FormsProps'
import { MasterfileProps } from '../Props'
import { IPermission } from '../Models'
import { styles } from './FormsProps'

export const PermissionMainForm = ({
                                     collapse, current, setCurrent, disable, t, height
                                   }: MasterfileProps<IPermission>): React.JSX.Element => (
  <div style={{ ...styles.outer, display: !collapse ? 'none' : '' }}>
    <MasterfileMainBaseForm collapse={collapse} current={current} setCurrent={setCurrent} disable={disable} t={t} height={height} />
    <CRow className="g-2 align-items-center mt-2">
      <CCol md={2}><FieldLabel title={t('common.permission')} /></CCol>
      <CCol md={10}>
        <InputField fieldName="permission" current={current} setCurrent={setCurrent} value={current.short} disabled={disable} style={{ height: height - 3, width: '100%' }} />
      </CCol>
    </CRow>
  </div>
)

export default PermissionMainForm
