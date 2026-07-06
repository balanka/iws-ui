import { JSX } from 'react'
import { CCol, CInputGroup } from '@coreui/react-pro'
import { InputField, FieldLabel } from './common'
import { styles } from './FormsProps'
import {AddressProps} from '../Props'

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
        <CCol sm="2"><FieldLabel title={t('address.zip')} /></CCol>
        <CCol sm="4"><InputField fieldName="zip" current={current} setCurrent={setCurrent} value={current.zip} disabled={disable} style={inputStyle} /></CCol>
        <CCol sm="1"><FieldLabel title={t('address.city')} /></CCol>
        <CCol sm="4"><InputField fieldName="city" current={current} setCurrent={setCurrent} value={current.city} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('address.country')} /></CCol>
        <CCol sm="4"><InputField fieldName="country" current={current} setCurrent={setCurrent} value={current.country} disabled={disable} style={inputStyle} /></CCol>
        <CCol sm="1"><FieldLabel title={t('address.state')} /></CCol>
        <CCol sm="4"><InputField fieldName="state" current={current} setCurrent={setCurrent} value={current.state} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('address.email')} /></CCol>
        <CCol sm="4">
          <InputField fieldName="email" current={current} setCurrent={setCurrent} value={current.email} disabled={disable} style={inputStyle} />
        </CCol>
        <CCol sm="1"><FieldLabel title={t('common.phone')}/></CCol>
        <CCol sm="4">
          <InputField fieldName="phone" current={current} setCurrent={setCurrent} value={current.phone} disabled={disable} style={inputStyle} />
        </CCol>
      </CInputGroup>
    </CInputGroup>
  )
}
