// CustomerGeneralForm.tsx - Super Compact
import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react'
import { DatePickerField, InputField, TextareaField, FieldLabel } from './common'
import { styles } from './FormsProps'
import { CustomerGeneralFormProps } from '../Props'

export const CustomerGeneralForm = ({
                                      collapse = true,
                                      current,
                                      setCurrent,
                                      disable,
                                      t,
                                      height = 28
                                    }: CustomerGeneralFormProps & { collapse?: boolean; height?: number }): JSX.Element | null => {
  if (!collapse) return null;

  const inputStyle = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const textareaStyle = { width: '100%', minHeight: 60, fontSize: '0.875rem' };
  const rowMargin = { marginBottom: '6px' };

  return (
    <CInputGroup  style={{...styles.outer, padding:5, paddingTop: 20 }} >
      {/* Row 1: ID + Enter Date */}
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('common.id')} /></CCol>
        <CCol sm="4">
          <InputField
            fieldName="id"
            current={current}
            setCurrent={setCurrent}
            value={current.id}
            disabled={disable}
            style={inputStyle}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.enterdate')} /></CCol>
        <CCol sm="4">
          <DatePickerField
            fieldName="enterdate"
            label={t('common.enterdate')}
            selected={current.enterdate}
            current={current}
            setCurrent={setCurrent}
            disabled={true}
          />
        </CCol>
      </CInputGroup>

      {/* Row 2: Name + Change Date */}
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('common.name')} /></CCol>
        <CCol sm="4">
          <InputField
            fieldName="name"
            current={current}
            setCurrent={setCurrent}
            value={current.name}
            disabled={disable}
            style={inputStyle}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
        <CCol sm="4">
          <DatePickerField
            fieldName="changedate"
            label={t('common.changedate')}
            selected={current.changedate}
            current={current}
            setCurrent={setCurrent}
            disabled={true}
          />
        </CCol>
      </CInputGroup>

      {/* Row 3: Tax Code + Posting Date */}
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('common.taxCode')} /></CCol>
        <CCol sm="4">
          <InputField
            fieldName="taxCode"
            current={current}
            setCurrent={setCurrent}
            value={current.taxCode}
            disabled={disable}
            style={inputStyle}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.postingdate')} /></CCol>
        <CCol sm="4">
          <DatePickerField
            fieldName="postingdate"
            label={t('common.postingdate')}
            selected={current.postingdate}
            current={current}
            setCurrent={setCurrent}
            disabled={true}
          />
        </CCol>
      </CInputGroup>

      {/* Row 4: Description (Full Width) */}
      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol md="2"><FieldLabel title={t('common.description')} /></CCol>
        <CCol xs="12" md="10">
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
      </CInputGroup>
    </CInputGroup>
  )
}
