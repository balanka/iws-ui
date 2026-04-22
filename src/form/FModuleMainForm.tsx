import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { MasterfileFormWithout } from './MasterfileFormWithout.tsx'
import { MasterfileXComboBox, FieldLabel, InputField  } from './common'
import { FModuleProps2 } from '../Props.ts'
import {IFmodule, IMasterfile} from '../Models.ts'
import { STYLES } from './FormsProps'

const comboStyles = {
  minHeight: 25,
  height: 25,
  minWidth: 100,
  width: '100%',
  color: '#6b7280',
  fontSize: 12
};

const initAcc = [{ id: '', name: '' }];

// Reusable row component for consistent layout
const FormRow = ({ children, style, className = "g-2 align-items-center" }: any) => (
  <CRow className={className} style={style}>
    {children}
  </CRow>
);

export const FModuleMainForm = ({
                                  collapse, current, setCurrent, accData, accountData, rowData, disable, t, height
                                }: FModuleProps2<IFmodule>): React.JSX.Element => {

  return (
    <div style={{ ...STYLES.outer0, paddingBottom: 10, width:"100%" }}>
      <MasterfileFormWithout
        collapse={collapse} current={current} setCurrent={setCurrent}
        accData={accData} t={t} disable={disable} height={height}
        propertyName="parent" fieldName={t('fmodule.parent')}
      />

      <FormRow style={{ marginBottom: 8, height }}>
        <CCol sm={2}><FieldLabel title={t('common.account')} /></CCol>
        <CCol sm={4}>
          <MasterfileXComboBox
            fieldName="account" current={current} setCurrent={setCurrent}
            //@ts-ignore
            data={accountData.map((m:IMasterfile)=>{m.id, m.name})}
            MasterfileXComboBox
            //@ts-ignore
            defaultValue={initAcc[0]} disable={disable} styles={comboStyles}
          />
        </CCol>
        <CCol sm={2}><FieldLabel title={t('fmodule.accountFilter')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="accFilter" current={current} setCurrent={setCurrent}
                      value={current.accFilter} disabled={disable} style={{ height }}
          />
        </CCol>
      </FormRow>

      <FormRow style={{ height }}>
        <CCol sm={2}><FieldLabel title={t('common.copyFrom')} /></CCol>
        <CCol sm={4}>
          <MasterfileXComboBox
            fieldName="copyFrom" current={current} setCurrent={setCurrent}
            //@ts-ignore
            data={rowData} defaultValue={initAcc[0]} disable={disable} styles={comboStyles}
          />
        </CCol>
        <CCol sm={2}><FieldLabel title={t('fmodule.oaccountFilter')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="oaccFilter" current={current} setCurrent={setCurrent}
                      value={current.oaccFilter} disabled={disable} style={{ height }}
          />
        </CCol>
      </FormRow>
    </div>
  )
}

export default FModuleMainForm
