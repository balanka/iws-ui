import React from 'react'
import { CCol } from '@coreui/react-pro'
import ComboBox from "./ComboBox.tsx"
import { MasterfileComboBox } from './common'
import { BooleanField, DatePickerField, InputField, TextareaField } from './common'
import { styles} from "./FormsProps.tsx"
import { sortById } from "../utils/Utils.ts"
import { toOption, transactionToOption } from "../utils/FormUtils.tsx"
import { initCust, initStore } from "./Menu.tsx"
import CurrencyInput from "react-currency-input-field";
import  { FormRow, Label} from '../utils/FormUtils'

export const TransactionMainForm = ({
                                      collapse, current, setCurrent, t, handleModuleChange, storeData, accData,
                                      modules, copyFromTransaction, submitCopy, height, zIndex, locale, currency
                                    }: any): React.JSX.Element => {
  const inputStyle = { height: height-10, width: '100%', color: '#6b7280', fontSize: 12 }
  const currencyStyle = { height: height - 3, padding: 5, textAlign: 'right' as const, width: '100%' };
  const currentModule = modules.find((m: any) => m.id === BigInt(current?.modelid ?? 0))
  const copyFromModule = modules.find((m: any) => m.id === BigInt(currentModule?.copyFrom ?? 0))
  const total:number = current?.lines?.reduce((prev: number, line: any) => prev + line?.quantity * line?.price + line?.vat, 0) ?? 0
  console.log('storeData', storeData)
  return (
    <div
      //@ts-ignore
      style={{ ...styles.outer, paddingBottom:2, width:'100%', height:210,  display: !collapse ? 'none' : ''  }}>
      {/* Row 1 */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height}}>
          <Label>{t('common.id')}</Label>
          <InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={current.posted} style={{ ...inputStyle, width: '50%', textAlign: 'right' }} />
          <Label>{t('fmodule.title')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(currentModule?.id ?? 0), label: `${BigInt(currentModule?.id ?? 0)} ${currentModule?.name ?? ''}` }}
                    onChange={handleModuleChange} values={modules.slice().sort(sortById).map(toOption)} zIndex={99999}  height ={height-5}/>
        </CCol>
      </FormRow>

      {/* Row 2 */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height, paddingTop:2}}>
          <Label>{t('transaction.oid')}</Label>
          <InputField fieldName="oid" current={current} setCurrent={setCurrent} value={current.oid} disabled={current.posted} style={{...inputStyle, width:'50%', textAlign: 'right' }} />
          <Label>{t('common.copyFrom')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(copyFromModule?.id ?? 0), label: `${BigInt(copyFromModule?.id ?? 0)} ${copyFromModule?.name ?? ''}` }}
                    onChange={submitCopy} values={copyFromTransaction.slice().sort(sortById).map(transactionToOption)} zIndex={99999} height ={height-5}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.period')}</Label>
          <InputField fieldName="period" current={current} setCurrent={setCurrent} value={current.period} disabled={true} style={{ paddingLeft:5, width: 90, textAlign:'right', height:height-5 }} />
          <BooleanField fieldName="posted" current={current} setCurrent={setCurrent} label="" disabled={current.posted} checked={current.posted} />
        </CCol>
      </FormRow>

      {/* Row 3 */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height, paddingTop:2}}>
          <Label>{t('transaction.store')}</Label>
          <MasterfileComboBox current={current} setCurrent={setCurrent} data={storeData} fieldName="store" defaultValue={initStore} zIndex={zIndex} styles={inputStyle}  height ={height-5}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.transdate')}</Label>
          <DatePickerField fieldName="transdate" label={t('transaction.transdate')} selected={current.transdate} current={current} setCurrent={setCurrent} disabled={current.posted} zIndex={zIndex} />
        </CCol>
      </FormRow>

      {/* Row 4 */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height, paddingTop:2}}>
          <Label>{t('transaction.account')}</Label>
          <MasterfileComboBox current={current} setCurrent={setCurrent} data={accData} fieldName="account" defaultValue={initCust} zIndex={zIndex} styles={inputStyle} />
        </CCol>
        <CCol sm={3} className="d-flex gap-2 align-items-center">
          <Label bold>{t('common.total')}</Label>
          <CurrencyInput
            value={total}
            intlConfig={{ locale, currency }}
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            decimalScale={2}
            disabled={true}
            style={{...currencyStyle, fontSize:14, fontWeight:'bold'}}
          />
        </CCol>
      </FormRow>
      {/* Row 5 */}
      <FormRow height={height}>
        <CCol sm={12} className="d-flex gap-2 align-items-start" style={{height: height, paddingTop:4}}>
          <Label>{t('transaction.text')}</Label>
          <TextareaField fieldName="text" placeholder={t('transaction.text')} disabled={current.posted} value={current.text} current={current} setCurrent={setCurrent} style={{ width: '100%' }} />
        </CCol>
      </FormRow>
      {/* Row 6 */}
      <FormRow height={height}>
        <CCol sm={12} className="d-flex gap-2 align-items-start" style={{height: height, paddingTop:4}}>
          <Label>{t('transaction.footText')}</Label>
          <TextareaField fieldName="footText" placeholder={t('transaction.footText')} disabled={current.posted} value={current.footText} current={current} setCurrent={setCurrent} style={{ width: '100%' }} />
        </CCol>
      </FormRow>
    </div>
  )
}

export default TransactionMainForm
