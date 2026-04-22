import { JSX } from 'react'
import { CRow, CCol, CContainer } from '@coreui/react'
import { DatePickerField, InputField, TextareaField,  BooleanField, FormMasterfileXComboBox } from './common'
import { styles } from './FormsProps'
import { AccountMainProps } from '../Props'
import { initAcc } from './Menu'

const FormRow = ({ children }: { children: React.ReactNode }) => (
  <CRow className="g-2 align-items-center mb-2">
    {children}
  </CRow>
);

const Label = ({ children, width = 100 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ minWidth: width }}>{children}</div>
);

export const AccountMainForm = ({ current, setCurrent, accData, t, disable }: AccountMainProps): JSX.Element => {
  const inputStyle = { height: 28, width: '100%', fontSize: '0.875rem' };
  const inputStyleRight = { ...inputStyle, textAlign: 'right' as const };
  const textareaStyle = { width: '100%', minHeight: 40, fontSize: '0.875rem', paddingTop: 5 };

  return (
    <CContainer fluid className="p-0">
      <div style={{ ...styles.outer }}>
        {/* Row 1: ID and Enterdate */}
        <FormRow>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.id')}</Label>
            <InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={disable} style={inputStyle} />
          </CCol>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.enterdate')}</Label>
            <DatePickerField fieldName="enterdate" label={t('common.enterdate')} selected={current.enterdate} current={current} setCurrent={setCurrent} disabled={true}  />
          </CCol>
        </FormRow>

        {/* Row 2: Name and Changedate */}
        <FormRow>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('account.name')}</Label>
            <InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={inputStyle} />
          </CCol>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.changedate')}</Label>
            <DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true}  />
          </CCol>
        </FormRow>

        {/* Row 3: Account and Postingdate */}
        <FormRow>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.account')}</Label>
            <FormMasterfileXComboBox
              fieldName="account"
              current={current}
              setCurrent={setCurrent}
              data={accData}
              defaultValue={initAcc[0]}
              zIndex={11}
              disable={disable}
              styles={inputStyle}
            />
          </CCol>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.postingdate')}</Label>
            <DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true} />
          </CCol>
        </FormRow>

        {/* Row 4: Currency and Company */}
        <FormRow>
          <CCol sm={6} className="d-flex gap-3 align-items-center">
            <BooleanField
              fieldName="isDebit"
              current={current}
              setCurrent={setCurrent}
              label={t('account.debit_credit')}
              disabled={disable}
              checked={current.isDebit}
              style={{ height: 30, paddingLeft: 2 }}
            />
            <BooleanField
              fieldName="balancesheet"
              current={current}
              setCurrent={setCurrent}
              label={t('account.balancesheet')}
              disabled={disable}
              checked={current.balancesheet}
              style={{ height: 30, paddingLeft: 20, width: 150 }}
            />
          </CCol>
          <CCol sm={6} className="d-flex gap-2 align-items-center">
            <Label>{t('common.currency')}</Label>
            <InputField fieldName="currency" current={current} setCurrent={setCurrent} value={current.currency} disabled={disable} style={inputStyleRight} />
          </CCol>
          {/*<CCol sm={6} className="d-flex gap-2 align-items-center">*/}
          {/*  <Label>{t('common.company')}</Label>*/}
          {/*  <InputField fieldName="company" current={current} setCurrent={setCurrent} value={current.company} disabled={disable} style={inputStyleRight} />*/}
          {/*</CCol>*/}
        </FormRow>

        {/* Row 5: Boolean Fields */}
        {/*<FormRow>*/}
        {/*  <CCol sm={6} className="d-flex gap-3 align-items-center">*/}
        {/*    <BooleanField*/}
        {/*      fieldName="isDebit"*/}
        {/*      current={current}*/}
        {/*      setCurrent={setCurrent}*/}
        {/*      label={t('account.debit_credit')}*/}
        {/*      disabled={disable}*/}
        {/*      checked={current.isDebit}*/}
        {/*      style={{ height: 30, paddingLeft: 2 }}*/}
        {/*    />*/}
        {/*    <BooleanField*/}
        {/*      fieldName="balancesheet"*/}
        {/*      current={current}*/}
        {/*      setCurrent={setCurrent}*/}
        {/*      label={t('account.balancesheet')}*/}
        {/*      disabled={disable}*/}
        {/*      checked={current.balancesheet}*/}
        {/*      style={{ height: 30, paddingLeft: 20, width: 150 }}*/}
        {/*    />*/}
        {/*  </CCol>*/}
        {/*  <CCol sm={6} />*/}
        {/*</FormRow>*/}

        {/* Row 6: Description - Full Width */}
        <FormRow>
          <CCol xs={12} className="d-flex gap-2 align-items-start">
            <Label width={100}>{t('common.description')}</Label>
            <TextareaField
              fieldName="description"
              placeholder={t('common.description')}
              disabled={disable}
              value={current.description}
              current={current}
              setCurrent={setCurrent}
              style={textareaStyle}
            />
          </CCol>
        </FormRow>
      </div>
    </CContainer>
  )
}

export default AccountMainForm
