import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { DatePickerField, InputField, FieldLabel } from './common';
import { styles } from './FormsProps';
import { MasterfileBaseProps } from '../Props';
import { IMasterfile } from '../Models';

export const MasterfileMainBase0Form = ({
                                          current, setCurrent, t, disable, height = 28
                                        }: MasterfileBaseProps<IMasterfile> & { height?: number }): JSX.Element => {
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

      <CInputGroup style={{ height }}>
        <CCol sm="2"><FieldLabel title={t('common.name')} /></CCol>
        <CCol sm="4"><InputField fieldName="name" current={current} setCurrent={setCurrent} value={current.name} disabled={disable} style={s} /></CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
        <CCol sm="4"><DatePickerField fieldName="changedate" label={t('common.changedate')} selected={current.changedate} current={current} setCurrent={setCurrent} disabled={true}/></CCol>
      </CInputGroup>
    </div>
  )
}
//export default MasterfileMainBase0Form;
