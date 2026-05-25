import { JSX } from 'react';
import { CRow, CCol, CContainer } from '@coreui/react';
import { MasterfileXComboBox, DatePickerField, InputField, TextareaField } from './common'
import { styles } from './FormsProps';
import { AssetProps } from '../Props';
import { initAcc, initCurrency } from './Menu';
import CurrencyInput from "react-currency-input-field";
import { IAsset, IMasterfile} from "../Models.ts";

const FormRow = ({ children }: { children: React.ReactNode }) =>
  <CRow className="g-2 align-items-center mb-2">{children}</CRow>

const Label = ({ children, w = 100 }: { children: React.ReactNode; w?: number }) =>
  <div style={{ minWidth: w }}>{children}</div>

export const AssetMainForm = ({ collapse, current, setCurrent, t, accData, ccyData, height = 28, disable, locale, currency }: AssetProps): JSX.Element | null => {
  if (!collapse) return null;

  const inputStyle = {height: height - 3, width: '100%', fontSize: '0.875rem'};
  const inputRight = {...inputStyle, textAlign: 'right' as const, padding: 2};
  const handleCurrencyChange = (field: string) => (value: string | undefined) => {
    // Remove thousands separators and convert decimal comma to dot
    let cleanValue = value || '0';
    cleanValue = cleanValue.replace(/\./g, ''); // Remove thousands separators
    cleanValue = cleanValue.replace(/,/g, '.'); // Convert decimal comma to dot
    const numberValue = parseFloat(cleanValue);
    const finalValue = isNaN(numberValue) ? 0 : numberValue;
  setCurrent({...current, [field]: finalValue});
}

  const accComboBox = (data:IMasterfile[], initData:IMasterfile, fieldName:string,)=> {
    const initAccx = {id: initData.id, name: initData.name}
    const acc_data = data.map((m: IMasterfile) => ({id: m.id, name: m.name}));
    return MasterfileXComboBox<IAsset, { id: string, name: string }>({
      current, setCurrent
      //@ts-ignore
      , data: acc_data, initAccx, fieldName: fieldName, zIndex: 10, inputStyle, disable
    })
  }
  return (
    <CContainer fluid className="p-0">
      <div style={{ ...styles.outer, paddingBottom: 10 }}>
        <FormRow>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.id')}</Label><InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={disable} style={inputStyle} /></CCol>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.enterdate')}</Label><DatePickerField fieldName="enterdate" label={t('common.enterdate')} selected={current.enterdate} current={current} setCurrent={setCurrent} disabled={true}  /></CCol>
        </FormRow>
        <FormRow>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.name')}</Label><InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={inputStyle} /></CCol>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.changedate')}</Label><DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true}  /></CCol>
        </FormRow>
        <FormRow>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.account')}</Label>
             {accComboBox(accData, initAcc,"account")}
          </CCol>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.postingdate')}</Label><DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true} /></CCol>
        </FormRow>
        <FormRow>
          <CCol sm={6} className="d-flex gap-2"><Label>{t('common.oaccount')}</Label>
            {accComboBox(accData, initAcc,"oaccount")}
          </CCol>
          <CCol sm={2} className="d-flex gap-2"/>
          <CCol sm={4} className="d-flex gap-1"><Label>{t('common.currency')}</Label>
            {accComboBox(ccyData, initCurrency,"currency")}
          </CCol>
        </FormRow>
        <FormRow>
          <CCol sm={4} className="d-flex gap-2"><Label w={80}>{t('asset.amount')}</Label><CurrencyInput value={current?.amount??0.0} intlConfig={{ locale, currency }} groupSeparator="." decimalSeparator="," decimalsLimit={2} decimalScale={2} onValueChange={handleCurrencyChange('amount')} disabled={disable} style={inputRight} /></CCol>
          <CCol sm={4} className="d-flex gap-2"><Label w={100}>{t('asset.depreciation')}</Label><InputField fieldName="depMethod" current={current} setCurrent={setCurrent} value={current.depMethod} onChange={(e) => setCurrent({ ...current, depMethod: Number(e.target.value) })} disabled={disable} style={inputRight} /></CCol>
          <CCol sm={4} className="d-flex gap-2"><Label w={80}>{t('asset.lifeSpan')}</Label><InputField fieldName="lifeSpan" current={current} setCurrent={setCurrent} value={current.lifeSpan} onChange={(e) => setCurrent({ ...current, lifeSpan: Number(e.target.value) })} disabled={disable} style={inputRight} /></CCol>
        </FormRow>
        <FormRow>
          <CCol sm={4} className="d-flex gap-2"><Label w={80}>{t('asset.scrapValue')}</Label><CurrencyInput value={current?.scrapValue??0.0} intlConfig={{ locale, currency }} groupSeparator="." decimalSeparator="," decimalsLimit={2} decimalScale={2} onValueChange={handleCurrencyChange('scrapValue')} disabled={disable} style={inputRight} /></CCol>
          <CCol sm={4} className="d-flex gap-2"><Label w={100}>{t('asset.frequency')}</Label><InputField fieldName="frequency" current={current} setCurrent={setCurrent} value={current.frequency} onChange={(e) => setCurrent({ ...current, frequency: Number(e.target.value) })} disabled={disable} style={inputRight} /></CCol>
          <CCol sm={4} className="d-flex gap-2"><Label w={80}>{t('asset.rate')}</Label><InputField fieldName="rate" current={current} setCurrent={setCurrent} value={Number(current.rate)} onChange={(e) => setCurrent({ ...current, rate: Number(e.target.value) })} disabled={disable} style={inputRight} /></CCol>
        </FormRow>
        <FormRow>
          <CCol xs={12} className="d-flex gap-2"><Label w={100}>{t('common.description')}</Label><TextareaField fieldName="description" placeholder={t('common.description')} disabled={disable} value={current.description} current={current} setCurrent={setCurrent} style={{ width: '100%', minHeight: 60, fontSize: '0.875rem' }} /></CCol>
        </FormRow>
      </div>
    </CContainer>
  )
}

export default AssetMainForm
