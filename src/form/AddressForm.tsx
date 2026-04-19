import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { InputField, FieldLabel, styles } from './FormsProps';
import {AddressProps} from "../Props.ts";

export const AddressForm = ({
                              current, setCurrent, t, disable, height = 28
                            }: AddressProps): JSX.Element => {
  const inputStyle = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const rowMargin = { marginBottom: '4px' };

  return (
    <CInputGroup style={{ ...styles.outer, paddingBottom: 8 }}>
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('address.street')} /></CCol>
        <CCol sm="10"><InputField fieldName="street" current={current} setCurrent={setCurrent} value={current.street} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('address.city')} /></CCol>
        <CCol sm="10"><InputField fieldName="city" current={current} setCurrent={setCurrent} value={current.city} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm="2"><FieldLabel title={t('address.zip')} /></CCol>
        <CCol sm="10"><InputField fieldName="zip" current={current} setCurrent={setCurrent} value={current.zip} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('address.country')} /></CCol>
        <CCol sm="10"><InputField fieldName="country" current={current} setCurrent={setCurrent} value={current.country} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('address.email')} /></CCol>
        <CCol sm="10"><InputField fieldName="email" current={current} setCurrent={setCurrent} value={current.email} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
    </CInputGroup>
  )
}
