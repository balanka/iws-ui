import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { InputField, FieldLabel, styles } from './FormsProps';
import ComboBox from './ComboBox';
import { BankAccountFormProps } from '../Props';
import { sortById } from '../utils/Utils';
import { toOption } from '../utils/FormUtils';

const setBusinessPartnerR = (bp: any, setBp: any, selected: any, old: any, setCurrent: any) => {
  const idx = bp?.bankaccounts?.findIndex((obj: any) => obj.id === selected.id || obj.modelid === -1 || obj.id === old.id);
  if (idx !== -1) bp.bankaccounts[idx] = { ...selected, owner: `${bp.id}`, company: `-${bp.company}` };
  setBp(bp);
  setCurrent(bp.bankaccounts[idx]);
};

export const BankAccountForm = ({
                                  currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner,
                                  bankData, t, disable, height = 24, zIndex
                                }: BankAccountFormProps): JSX.Element => {
  const current = currentBankAccount;
  const setCurrent = setCurrentBankAccount;
  const currentBank = bankData?.find((acc: any) => acc.id === current.bic);
  const inputStyle = { height: height - 2, width: '100%', fontSize: '0.75rem' };
  const comboStyle = { minHeight: height, height: height, width: '100%', fontSize: 12 };

  const handleIban = (e: any) => {
    const x = { ...current, id: e.target.value, company: `-${current.company}` };
    setCurrent(x);
    setBusinessPartnerR(businessPartner, setBusinessPartner, x, current, setCurrent);
  };

  const handleBank = (value: any) => {
    const x = { ...current, bic: value, owner: `${businessPartner.id}`, company: `-${current.company}` };
    setCurrent(x);
    setBusinessPartnerR(businessPartner, setBusinessPartner, x, current, setCurrent);
  };

  return (
    <div
      // @ts-ignore
      style={{...styles.outer, height:180, padding:5 }} >
      <CInputGroup style={{ height, marginBottom: 8 }}>
        <CCol sm="2"><FieldLabel title={t('common.iban')} /></CCol>
        <CCol sm="10"><InputField fieldName="id"
             current={current} setCurrent={setCurrent} value={current.id}
             onChange={handleIban} disabled={disable} style={inputStyle} /></CCol>
      </CInputGroup>
      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('common.bank')} /></CCol>
        <CCol sm="10"><ComboBox style={comboStyle} disable={disable} value={{ value: currentBank?.id || ''
          , label: currentBank ? `${currentBank.id} ${currentBank.name}` : '' }}
          onChange={handleBank} values={bankData.slice().sort(sortById).map(toOption)} zIndex={zIndex} /></CCol>
      </CInputGroup>
    </div>
  )
}
