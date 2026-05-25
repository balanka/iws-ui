import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react'
import {DatePickerField, InputField, TextareaField,  MasterfileXComboBox} from './common'
import { styles } from './FormsProps'
import { CustomerGeneralFormProps } from '../Props'
import {initCurrency} from "./Menu.tsx";
import { IBusinespartner, IMasterfile} from "../Models.ts";

export const CustomerGeneralForm = ({
                                      collapse = true,
                                      ccyData,
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
  const Label = ({ children, w = 100 }: { children: React.ReactNode; w?: number }) =>
    <div style={{ minWidth: w }}>{children}</div>

  const accComboBox = (data:IMasterfile[], initData:IMasterfile, height:number, fieldName: keyof IBusinespartner,)=> {
    const initAccx = { id: String(initData.id), name: initData.name };
    const acc_data = data.map((m: IMasterfile) => ({id: `${m.id}`, name: m.name}));
    return MasterfileXComboBox<IBusinespartner, { id: string, name: string }>({
      current, setCurrent, data: acc_data, fieldName: fieldName, defaultValue:initAccx, height:height,  zIndex: 10, styles:inputStyle, disable
    })
  }
  return (
    <CInputGroup  style={{...styles.outer, padding:5, paddingTop: 20 }} >
      {/* Row 1: ID + Enter Date */}
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm={2}><Label>{t('common.id')}</Label></CCol>
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
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm={2}><Label>{t('common.name')}</Label></CCol>
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

      {/* Row 3: Tax Code + Posting Date */}
      <CInputGroup style={{ height, ...rowMargin }}>
        <CCol sm={2}><Label>{t('common.taxCode')}</Label></CCol>
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
        <CCol sm={2} style={{ paddingLeft: 10 }}><Label>{t('common.postingdate')}</Label></CCol>
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
      {/*<CInputGroup style={{ height, ...rowMargin }}>*/}
      <CInputGroup style={{ height: 'auto', minHeight: height }}>
        <CCol sm={2}><Label>{t('common.description')}</Label></CCol>
        <CCol sm={4}>
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
        <CCol sm={2} style={{ paddingLeft: 10, paddingRight: 40 }}><Label>{t('common.currency')}</Label></CCol>
        <CCol  md="2" style={{paddingLeft: 45 }}>{accComboBox(ccyData, initCurrency, height-8, "currency")}</CCol>
      </CInputGroup>
    </CInputGroup>
  )
}
