import { JSX } from 'react'
import { CCol, CInputGroup } from '@coreui/react'
import { DatePickerField, InputField, TextareaField, FormMasterfileXComboBox } from './common'
import {  styles } from './FormsProps.tsx'
import { ArticleGeneralFormProps } from '../Props'
import { initArticleGroup, initCurrency, initQuantity } from './Menu'

const Label = ({ children, w = 100 }: { children: React.ReactNode; w?: number }) =>
  <div style={{ minWidth: w }}>{children}</div>

export const ArticleGeneralForm = ({
                                     collapse = true,
                                     current,
                                     setCurrent,
                                     t,
                                     quantityUnitData,
                                     groupData,
                                     ccyData,
                                     disable,
                                     height = 28
                                   }: ArticleGeneralFormProps & { height?: number }): JSX.Element | null => {
  if (!collapse) return null;

  const inputStyle = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const numberStyle = { height: height - 3, width: '100%', fontSize: '0.875rem', textAlign: 'right' as const, padding: 2 };
  const textareaStyle = { width: '100%', minHeight: 60, fontSize: '0.875rem' };

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, display: !collapse ? 'none' : '' }}>
      {/* Row 1: ID + Enter Date */}
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('common.id')}</Label></CCol>
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
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('common.enterdate')}</Label></CCol>
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
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('common.name')}</Label></CCol>
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
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('common.changedate')}</Label></CCol>
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

      {/* Row 3: Quantity Unit + Posting Date */}
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('article.quantityUnit')}</Label></CCol>
        <CCol sm="4">
          <FormMasterfileXComboBox
            fieldName="quantityUnit"
            current={current}
            setCurrent={setCurrent}
            data={quantityUnitData}
            defaultValue={initQuantity}
            zIndex={11}
            disable={disable}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('common.postingdate')}</Label></CCol>
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

      {/* Row 4: Pack Unit + Purchase Price */}
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('article.packUnit')}</Label></CCol>
        <CCol sm="4">
          <FormMasterfileXComboBox
            fieldName="packUnit"
            current={current}
            setCurrent={setCurrent}
            data={quantityUnitData}
            defaultValue={initQuantity}
            zIndex={11}
            disable={disable}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('article.pprice')}</Label></CCol>
        <CCol sm="3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 , paddingLeft:40 }}>
            <InputField
              fieldName="pprice"
              current={current}
              setCurrent={setCurrent}
              value={Number(current?.pprice).toFixed(2)}
              disabled={disable}
              style={numberStyle}
            />
            <span style={{ fontSize: '0.875rem' }}>{current.currency}</span>
          </div>
        </CCol>
      </CInputGroup>

      {/* Row 5: Group + Sales Price */}
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('article.group')}</Label></CCol>
        <CCol sm="4">
          <FormMasterfileXComboBox
            fieldName="parent"
            current={current}
            setCurrent={setCurrent}
            data={groupData}
            defaultValue={initArticleGroup}
            zIndex={11}
            disable={disable}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('article.sprice')}</Label></CCol>
        <CCol sm="3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 , paddingLeft:40 }}>
            <InputField
              fieldName="sprice"
              current={current}
              setCurrent={setCurrent}
              value={Number(current?.sprice).toFixed(2)}
              disabled={disable}
              style={numberStyle}
            />
            <span style={{ fontSize: '0.875rem' }}>{current.currency}</span>
          </div>
        </CCol>
      </CInputGroup>

      {/* Row 6: Currency + Average Price */}
      <CInputGroup style={{ height }}>
        <CCol sm="2"><Label>{t('common.currency')}</Label></CCol>
        <CCol sm="4">
          <FormMasterfileXComboBox
            fieldName="currency"
            current={current}
            setCurrent={setCurrent}
            data={ccyData}
            defaultValue={initCurrency}
            zIndex={11}
            disable={disable}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><Label>{t('article.avgPrice')}</Label></CCol>
        <CCol sm="3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft:40 }}>
            <InputField
              fieldName="avgPrice"
              current={current}
              setCurrent={setCurrent}
              value={Number(current?.avgPrice).toFixed(2)}
              disabled={disable}
              style={numberStyle}
            />
            <span style={{ fontSize: '0.875rem' }}>{current.currency}</span>
          </div>
        </CCol>
      </CInputGroup>

      {/* Row 7: Description (Full Width) */}
      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol md="2"><Label>{t('common.description')}</Label></CCol>
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
    </div>
  )
}
