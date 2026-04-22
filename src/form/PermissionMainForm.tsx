import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { FieldLabel, InputField } from './common'
import { MasterfileProps } from '../Props'
import { IPermission } from '../Models'
import { styles } from './FormsProps'
import MasterfileFormWithout from "./MasterfileFormWithout.tsx";

export const PermissionMainForm = ({
                                     collapse, current, setCurrent, disable, t, height
                                   }: MasterfileProps<IPermission>): React.JSX.Element => (
  <div style={{ ...styles.outer, display: !collapse ? 'none' : '' }}>

    <MasterfileFormWithout collapse={collapse}
      //@ts-ignore
                           current={current} setCurrent={setCurrent} disable={disable} t={t} height={height}
                           accData={[]} propertyName={""} fieldName={""} />
    <CRow className="g-2 align-items-center mt-2">
      <CCol md={2}><FieldLabel title={t('common.permission')} /></CCol>
      <CCol md={10}>
        <InputField fieldName="permission" current={current} setCurrent={setCurrent} value={current.short} disabled={disable} style={{ height: height - 3, width: '100%' }} />
      </CCol>
    </CRow>
  </div>
)

export default PermissionMainForm
