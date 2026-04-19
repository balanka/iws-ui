import React from 'react'
import { CRow, CCol } from '@coreui/react'
import ComboBox from "./ComboBox.tsx"
import { MasterfileComboBox } from './common'
import { BooleanField } from './common'
import {DatePickerField, InputField, styles, TextareaField} from "./FormsProps.tsx"
import { sortById } from "../utils/Utils.ts"
import { toOption, transactionToOption } from "../utils/FormUtils.tsx"
import { initCust, initStore } from "./Menu.tsx"


const inputStyle = { minHeight: 25, height: 25, width: '100%', color: '#6b7280', fontSize: 12 }
const FormRow = ({ children }: any) => <CRow className="g-2 align-items-center mb-2">{children}</CRow>
const Label = ({ children, width = 80, bold = false }: any) => (
  <div style={{ minWidth: width, fontWeight: bold ? 'bold' : 'normal' }}>{children}</div>
)

export const TransactionMainForm = ({
                                      collapse, current, setCurrent, t, handleModuleChange, storeData, accData,
                                      modules, copyFromTransaction, submitCopy, height, zIndex
                                    }: any): React.JSX.Element => {

  const currentModule = modules.find((m: any) => m.id === BigInt(current?.modelid ?? 0))
  const copyFromModule = modules.find((m: any) => m.id === BigInt(currentModule?.copyFrom ?? 0))
  const total = current?.lines?.reduce((prev: number, line: any) => prev + line?.quantity * line?.price + line?.vat, 0) ?? 0

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, width:'100%', display: !collapse ? 'none' : ''  }}>
      {/* Row 1 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center">
          <Label>{t('common.id')}</Label>
          <InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={current.posted} style={{ height, width: 100, textAlign: 'right' }} />
          <Label>{t('fmodule.title')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(currentModule?.id ?? 0), label: `${BigInt(currentModule?.id ?? 0)} ${currentModule?.name ?? ''}` }} onChange={handleModuleChange} values={modules.slice().sort(sortById).map(toOption)} zIndex={99999} />
        </CCol>
      </FormRow>

      {/* Row 2 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.oid')}</Label>
          <InputField fieldName="oid" current={current} setCurrent={setCurrent} value={current.oid} disabled={current.posted} style={{ height, width: 100, textAlign: 'right' }} />
          <Label>{t('common.copyFrom')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(copyFromModule?.id ?? 0), label: `${BigInt(copyFromModule?.id ?? 0)} ${copyFromModule?.name ?? ''}` }} onChange={submitCopy} values={copyFromTransaction.slice().sort(sortById).map(transactionToOption)} zIndex={99999} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.transdate')}</Label>
          <DatePickerField fieldName="transdate" label={t('transaction.transdate')} selected={current.transdate} current={current} setCurrent={setCurrent} disabled={current.posted} />
        </CCol>
      </FormRow>

      {/* Row 3 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.store')}</Label>
          <MasterfileComboBox current={current} setCurrent={setCurrent} data={storeData} fieldName="store" defaultValue={initStore[0]} zIndex={zIndex} styles={inputStyle} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.period')}</Label>
          <InputField fieldName="period" current={current} setCurrent={setCurrent} value={current.period} disabled={true} style={{ height, width: 90 }} />
          <BooleanField fieldName="posted" current={current} setCurrent={setCurrent} label="" disabled={current.posted} checked={current.posted} />
        </CCol>
      </FormRow>

      {/* Row 4 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.account')}</Label>
          <MasterfileComboBox current={current} setCurrent={setCurrent} data={accData} fieldName="account" defaultValue={initCust[0]} zIndex={zIndex} styles={inputStyle} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label bold>{t('common.total')}</Label>
          <InputField fieldName="total" current={current} setCurrent={setCurrent} value={total.toFixed(2)} disabled={true} style={{ fontWeight: 'bold', height, width: 100, textAlign: 'right' }} />
          <InputField fieldName="currency" current={current} setCurrent={setCurrent} value={current.lines?.[0]?.currency ?? ''} disabled={true} style={{ height, width: 60 }} />
        </CCol>
      </FormRow>
      {/* Row 5 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-start">
          <Label>{t('transaction.text')}</Label>
          <TextareaField fieldName="text" placeholder={t('transaction.text')} disabled={current.posted} value={current.text} current={current} setCurrent={setCurrent} style={{ width: '100%' }} />
        </CCol>
      </FormRow>
      {/* Row 6 */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-start">
          <Label>{t('transaction.footText')}</Label>
          <TextareaField fieldName="footText" placeholder={t('transaction.footText')} disabled={current.posted} value={current.footText} current={current} setCurrent={setCurrent} style={{ width: '100%' }} />
        </CCol>
      </FormRow>
    </div>
  )
}

export default TransactionMainForm
