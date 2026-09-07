import React from 'react'
import {CRow, CCol, CInputGroup} from '@coreui/react-pro'
import {FieldLabel, InputField, DatePickerField, FormMasterfileXComboBox, MasterfileXComboBox} from './common'
import { FModuleProps2 } from '../Props.ts'
import {IFmodule, IMasterfile} from '../Models.ts'
import {STYLES} from './FormsProps'
import iwsStore from "../utils/Store.tsx"
import {formEnum} from "../utils/FormEnum.tsx";
import {initfModule, initModule} from "./Menu.tsx";

const comboStyles = {
  minHeight: 25,
  height: 25,
  minWidth: 100,
  width: '100%',
  color: '#6b7280',
  fontSize: 12
};

// Reusable row component for consistent layout
const FormRow = ({ children, style, className = "g-2 align-items-center" }: any) =>
  <CRow className={className} style={style}>
    {children}
  </CRow>
;

export const FModuleMainForm = ({
                                   current, setCurrent, accData, accountData, rowData, disable, t, height
                                }: FModuleProps2<IFmodule>): React.JSX.Element => {
  const modules:IMasterfile[] = iwsStore.getByModelId(formEnum.MODULE)
  console.log('accData', accData)
  console.log('accountData', accountData)
  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const rm = { marginBottom: '6px' };
  const zIndex = 99999
  return (
    <div style={{ ...STYLES.outer0, paddingBottom: 10, width:"100%" }}>
        <CInputGroup style={{ height, ...rm }}>
          <CCol sm="2"><FieldLabel title={t('common.id')} /></CCol>
          <CCol sm="4"><InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={disable} style={s} /></CCol>
          <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.enterdate')} /></CCol>
          <CCol sm="4"><DatePickerField fieldName="enterdate" label={t('common.enterdate')} selected={current.enterdate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
        </CInputGroup>
        <CInputGroup style={{ height, ...rm }}>
          <CCol sm="2"><FieldLabel title={t('vat.name')} /></CCol>
          <CCol sm="4"><InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={s} /></CCol>
          <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
          <CCol sm="4"><DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true} /></CCol>
        </CInputGroup>
      <FormRow style={{ height }}>
        <CCol sm={2}><FieldLabel title={t('fmodule.template1')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="template1" current={current} setCurrent={setCurrent}
                      value={current.template1} disabled={disable}/>
        </CCol>
        <CCol sm={2}><FieldLabel title={t('fmodule.template2')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="template2" current={current} setCurrent={setCurrent}
                      value={current.template2} disabled={disable}/>
        </CCol>
      </FormRow>
      <FormRow style={{ height }}>
        <CCol sm={2}><FieldLabel title={t('fmodule.accountFilter')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="accFilter" current={current} setCurrent={setCurrent}
                      value={current.accFilter} disabled={disable}/>
        </CCol>
        <CCol sm={2}><FieldLabel title={t('fmodule.oaccountFilter')} /></CCol>
        <CCol sm={4}>
          <InputField fieldName="oaccFilter" current={current} setCurrent={setCurrent}
                      value={current.oaccFilter} disabled={disable}/>
        </CCol>
      </FormRow>

      <FormRow style={{ marginBottom: 8, height }}>
        <CCol sm={2}><FieldLabel title={t('common.account')} /></CCol>
        <CCol sm="4">
          <FormMasterfileXComboBox fieldName="account" current={current} setCurrent={setCurrent}
                                   data={modules} defaultValue={initModule} zIndex={zIndex} disable={disable} styles={s} fontSize={12}/>
        </CCol>
        <CCol sm={1}><FieldLabel title={t('common.copyFrom')} /></CCol>
        <CCol sm={5}>
          {/*<FormMasterfileXComboBox fieldName="copyFrom" current={current} setCurrent={setCurrent}*/}
          {/*                         data={rowData} defaultValue={initfModule} isMulti={true}*/}
          {/*                         zIndex={zIndex} disable={disable} styles={comboStyles} fontSize={12}/>*/}
          <MasterfileXComboBox fieldName="copyFrom" current={current} setCurrent={setCurrent}
            isMulti={true} zIndex={zIndex}
            //@ts-ignore
            data={rowData} defaultValue={initfModule} disable={disable} styles={comboStyles}
          />
        </CCol>
      </FormRow>
    </div>
  )
}

export default FModuleMainForm
