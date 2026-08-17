import React, { JSX } from 'react'
import { CCol, CInputGroup } from '@coreui/react-pro'
import {DatePickerField, InputField, TextareaField, FormMasterfileXComboBox, BooleanField} from './common'
import {  styles } from './FormsProps.tsx'
import { ArticleGeneralFormProps } from '../Props'
import { initArticleGroup, initCurrency, initQuantity } from './Menu'
import CurrencyInput from "react-currency-input-field";

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
                                     height = 28,
                                     currency,
                                     locale
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
            <CurrencyInput
              value={current.pprice}
              intlConfig={{ locale, currency }}
              groupSeparator="."
              decimalSeparator=","
              decimalsLimit={2}
              decimalScale={2}
              onValueChange={(value) => {
                let cleanValue = value || '0';
                cleanValue = cleanValue.replace(/\./g, ''); // Remove thousands separators
                cleanValue = cleanValue.replace(/,/g, '.'); // Convert decimal comma to dot
                const numberValue = parseFloat(cleanValue);
                const finalValue = isNaN(numberValue) ? 0 : numberValue;
                setCurrent({...current, pprice: finalValue})}}
              disabled={disable}
              style={numberStyle}
            />
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
            <CurrencyInput
              value={current.sprice}
              intlConfig={{ locale, currency }}
              groupSeparator="."
              decimalSeparator=","
              decimalsLimit={2}
              decimalScale={2}
              onValueChange={(value) => {
                let cleanValue = value || '0';
                cleanValue = cleanValue.replace(/\./g, ''); // Remove thousands separators
                cleanValue = cleanValue.replace(/,/g, '.'); // Convert decimal comma to dot
                const numberValue = parseFloat(cleanValue);
                const finalValue = isNaN(numberValue) ? 0 : numberValue;
                setCurrent({...current, sprice: finalValue})}}
              disabled={disable}
              style={numberStyle}
            />
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
            <CurrencyInput
              value={current.avgPrice}
              intlConfig={{ locale, currency }}
              groupSeparator="."
              decimalSeparator=","
              decimalsLimit={2}
              decimalScale={2}
              disabled={disable}
              style={numberStyle}
            />
          </div>
        </CCol>
      </CInputGroup>
      {/* Row 7: stocked (Full Width) */}
      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol md="2"><Label>{t('article.stocked')}</Label></CCol>
        <CCol xs="10" md="10">
          <BooleanField
            fieldName="stocked"
            current={current}
            setCurrent={setCurrent}
            label=""
            disabled={disable}
            checked={current.stocked}
            style={{ height: 20, paddingLeft: 5, align: 'right' }}
          />
        </CCol>
      </CInputGroup>

      {/* Row 8: Description (Full Width) */}
      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol md="2"><Label>{t('common.description')}</Label></CCol>
        <CCol xs="10" md="10">
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
