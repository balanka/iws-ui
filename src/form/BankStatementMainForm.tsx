import React from 'react'
import { CRow, CCol, CContainer } from '@coreui/react'
import CurrencyInput from 'react-currency-input-field'
import { DatePickerField, InputField, TextareaField } from './common'
import { BankStatementProps } from "../Props.ts"

const FormRow = ({ children }: any) => <CRow className="g-2 align-items-center mb-2">{children}</CRow>
const Label = ({ children }: any) => <div style={{ minWidth: 80 }}>{children}</div>

const currencyInputConfig = {
  groupSeparator: ".",
  decimalSeparator: ",",
  decimalsLimit: 2,
  decimalScale: 2,
}

export const BankStatementMainForm = ({ current, setCurrent, t, locale, currency, height }: BankStatementProps): React.JSX.Element => {
  const inputStyle = { height: height - 3, flex: 1 }
  const currencyStyle = { height: height - 3, flex: 1, textAlign: 'right' as const }

  const handleAmountChange = (value: string | undefined) => {
    setCurrent({ ...current, amount: Number(value ?? '0.0') })
  }

  return (
    <CContainer fluid className="p-0">
      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('common.id')}</Label><InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('common.postingdate')}</Label><DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true} /></CCol>
      </FormRow>

      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.depositor')}</Label><InputField fieldName="depositor" current={current} setCurrent={setCurrent} value={current.depositor} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.valuedate')}</Label><DatePickerField fieldName="valuedate" label={t('bankstatement.valuedate')} selected={current.valuedate} current={current} setCurrent={setCurrent} disabled={current.posted} /></CCol>
      </FormRow>

      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.beneficiary')}</Label><InputField fieldName="beneficiary" current={current} setCurrent={setCurrent} value={current.beneficiary} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.info')}</Label><InputField fieldName="info" current={current} setCurrent={setCurrent} value={current.postingtext} disabled={current.posted} style={inputStyle} /></CCol>
      </FormRow>

      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.postingtext')}</Label><InputField fieldName="postingtext" current={current} setCurrent={setCurrent} value={current.postingtext} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.amount')}</Label>
          <CurrencyInput
            value={current.amount}
            intlConfig={{ locale, currency }}
            {...currencyInputConfig}
            onValueChange={handleAmountChange}
            disabled={current.posted}
            style={currencyStyle}
          />
        </CCol>
      </FormRow>

      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.companyIban')}</Label><InputField fieldName="companyIban" current={current} setCurrent={setCurrent} value={current.companyIban} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('common.company')}</Label><InputField fieldName="company" current={current} setCurrent={setCurrent} value={current.company} disabled={true} style={inputStyle} /></CCol>
      </FormRow>

      <FormRow>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.accountno')}</Label><InputField fieldName="accountno" current={current} setCurrent={setCurrent} value={current.accountno} disabled={current.posted} style={inputStyle} /></CCol>
        <CCol sm={6} className="d-flex gap-2"><Label>{t('bankstatement.bankCode')}</Label><InputField fieldName="bankCode" current={current} setCurrent={setCurrent} value={current.bankCode} disabled={true} style={inputStyle} /></CCol>
      </FormRow>

      <FormRow style={{ alignItems: 'flex-start' }}>
        <CCol xs={12} className="d-flex gap-2"><Label>{t('bankstatement.purpose')}</Label><TextareaField fieldName="purpose" placeholder={t('common.purpose')} disabled={current.posted} value={current.purpose} current={current} rows={3} setCurrent={setCurrent} style={{ flex: 1 }} /></CCol>
      </FormRow>
    </CContainer>
  )
}

export default BankStatementMainForm
