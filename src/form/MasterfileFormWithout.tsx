import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { DatePickerField, InputField, TextareaField, FieldLabel, FormMasterfileXComboBox } from './common';
import {  styles } from './FormsProps';
import { MasterfileProps2 } from '../Props';
import {IMasterfile, IMasterfile2, IStore} from '../Models';
import { initAcc } from './Menu';


export const MasterfileFormWithout = ({
                                        current, setCurrent, accData, t, disable, height = 28, fieldName, propertyName
                                      }: MasterfileProps2<IMasterfile|IMasterfile2 | IStore> &
                      { fieldName: string; propertyName: string; accData: any[] }): JSX.Element => {
  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const ta = { width: '100%', minHeight: 60, fontSize: '0.875rem' };
  const taCompact = { width: '100%', minHeight: 40, fontSize: '0.875rem', paddingTop: 5 };
  const rm = { marginBottom: '6px' };
  const hasProp = current?.hasOwnProperty(propertyName);

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, width: '100%' }}>
      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('common.id')} /></CCol>
        <CCol sm="4"><InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={disable} style={s} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.enterdate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="enterdate" label={t('common.enterdate')} selected={current.enterdate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
      </CInputGroup>

      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('common.name')} /></CCol>
        <CCol sm="4"><InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={s} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
      </CInputGroup>

      <CInputGroup style={{ height: hasProp ? height : 'auto', minHeight: hasProp ? 'auto' : height, ...rm }}>
        <CCol sm="2"><FieldLabel title={hasProp ? fieldName : t('common.group')} /></CCol>
        <CCol sm="4">
          {hasProp ? (
            <FormMasterfileXComboBox fieldName={propertyName} current={current} setCurrent={setCurrent} data={accData} defaultValue={initAcc} zIndex={11} disable={disable} styles={s} fontSize={12} />
          ) : (
            <TextareaField fieldName="description" placeholder={t('common.description')} disabled={disable} value={current.description} current={current} setCurrent={setCurrent} style={ta} />
          )}
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.postingdate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true} /></CCol>
      </CInputGroup>

      {hasProp && (
        <CInputGroup style={{ height: 'auto', minHeight: height }}>
          <CCol sm="2"><FieldLabel title={t('common.description')} /></CCol>
          <CCol sm="10"><TextareaField fieldName="description" placeholder={t('common.description')} disabled={disable} value={current.description} current={current} setCurrent={setCurrent} style={taCompact} /></CCol>
        </CInputGroup>
      )}
    </div>
  )
}
export default MasterfileFormWithout;
