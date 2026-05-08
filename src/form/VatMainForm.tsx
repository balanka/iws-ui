import {JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { FormMasterfileXComboBox, DatePickerField, InputField, TextareaField, FieldLabel } from './common';
import { styles } from './FormsProps';
import { initAcc } from './Menu';
import {IAccount, IVat} from "../Models.ts";
import {TFunction} from "i18next";

interface VatMainFormProps {
  readonly current: IVat;
  readonly setCurrent: (arg: IVat) => void;
  readonly accData: IAccount[];
  readonly t: TFunction<'translation', undefined>;
  readonly disable: boolean;
  readonly height?: number;
  readonly zIndex: number;
}
export const VatMainForm = ({
                              current, setCurrent, accData, t, disable, height = 28, zIndex
                            }: VatMainFormProps): JSX.Element => {
  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const rm = { marginBottom: '6px' };

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, width:'100%' }}>
      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('common.id')} /></CCol>
        <CCol sm="4"><InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={disable} style={s} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.enterdate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="enterdate" label={t('common.enterdate')} selected={current.enterdate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
      </CInputGroup>

      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('vat.name')} /></CCol>
        <CCol sm="4"><InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={s} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true} /></CCol>
      </CInputGroup>

      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('vat.input.account')} /></CCol>
        <CCol sm="4"><FormMasterfileXComboBox fieldName="inputVatAccount" current={current} setCurrent={setCurrent} data={accData} defaultValue={initAcc[0]} zIndex={zIndex} disable={disable} styles={s} fontSize={12} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.postingdate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
      </CInputGroup>

      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('vat.output.account')} /></CCol>
        <CCol sm="4"><FormMasterfileXComboBox fieldName="outputVatAccount" current={current} setCurrent={setCurrent} data={accData} defaultValue={initAcc[0]} zIndex={zIndex} disable={disable} styles={s} fontSize={12} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('vat.percent')} /></CCol>
        <CCol sm="4"><InputField fieldName="percent" current={current} setCurrent={setCurrent} value={current.percent} disabled={disable} style={{ ...s, width: '50%', textAlign: 'right' }} /></CCol>
      </CInputGroup>

      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol sm="2"><FieldLabel title={t('common.description')} /></CCol>
        <CCol sm="8"><TextareaField fieldName="description" placeholder={t('common.description')} disabled={disable} value={current.description} current={current} setCurrent={setCurrent} style={{ width: '100%', minHeight: 40, fontSize: '0.875rem' }} /></CCol>
      </CInputGroup>
    </div>
  )
}
