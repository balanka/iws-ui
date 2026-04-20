import { JSX, ReactNode } from 'react';
import { CCol, CInputGroup } from '@coreui/react';
import { FormMasterfileXComboBox } from './common';
import { DatePickerField, InputField, TextareaField, FieldLabel, styles } from './FormsProps';
import { MasterfileProps2 } from '../Props';
import { IMasterfile2, IStore } from '../Models';
import { initAcc } from './Menu';

interface MasterfileFormWithChildrenProps extends MasterfileProps2<IMasterfile2 | IStore> {
  fieldName: string;
  propertyName: string;
  accData: any[];
  children?: (props: {
    fieldName: string;
    propertyName: string;
    current: IMasterfile2 | IStore;
    setCurrent: (arg: any) => void;
    data: any[];
    defaultValue: any;
    disable: boolean;
    styles: React.CSSProperties;
  }) => ReactNode;
}

export const MasterfileFormWithChildren = ({
                                             current,
                                             setCurrent,
                                             accData,
                                             t,
                                             disable,
                                             height = 28,
                                             fieldName,
                                             propertyName,
                                             children
                                           }: MasterfileFormWithChildrenProps): JSX.Element => {

  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const ta = { width: '100%', minHeight: 60, fontSize: '0.875rem' };
  const taCompact = { width: '100%', minHeight: 40, fontSize: '0.875rem', paddingTop: 5 };
  const rm = { marginBottom: '6px' };
  const hasProp = current?.hasOwnProperty(propertyName);

  // Props to pass to the child render function
  const childProps = {
    fieldName,
    propertyName,
    current,
    setCurrent,
    data: accData,
    defaultValue: initAcc[0],
    disable,
    styles: s
  };

  // Render the combobox field - if children provided as function, call it, otherwise render default
  const renderComboBoxField = () => {
    if (typeof children === 'function') {
      return children(childProps);
    }
    return (
      <FormMasterfileXComboBox
        fieldName={propertyName}
        current={current}
        setCurrent={setCurrent}
        data={accData}
        defaultValue={initAcc[0]}
        zIndex={11}
        disable={disable}
        styles={s}
      />
    );
  };

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, width: '100%' }}>
      {/* Row 1: ID and Enterdate */}
      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('common.id')} /></CCol>
        <CCol sm="4">
          <InputField
            fieldName="id"
            current={current}
            setCurrent={setCurrent}
            value={current.id}
            disabled={disable}
            style={s}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.enterdate')} /></CCol>
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

      {/* Row 2: Name and Changedate */}
      <CInputGroup style={{ height, ...rm }}>
        <CCol sm="2"><FieldLabel title={t('common.name')} /></CCol>
        <CCol sm="4">
          <InputField
            fieldName="name"
            current={current}
            setCurrent={setCurrent}
            value={current.name}
            disabled={disable}
            style={s}
          />
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.changedate')} /></CCol>
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

      {/* Row 3: Group/Parent Field and Postingdate */}
      <CInputGroup style={{ height: hasProp ? height : 'auto', minHeight: hasProp ? 'auto' : height, ...rm }}>
        <CCol sm="2"><FieldLabel title={hasProp ? fieldName : t('common.group')} /></CCol>
        <CCol sm="4">
          {hasProp ? renderComboBoxField() : (
            <TextareaField
              fieldName="description"
              placeholder={t('common.description')}
              disabled={disable}
              value={current.description}
              current={current}
              setCurrent={setCurrent}
              style={ta}
            />
          )}
        </CCol>
        <CCol sm="2" style={{ paddingLeft: 10 }}><FieldLabel title={t('common.postingdate')} /></CCol>
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

      {/* Row 4: Description (only if hasProp) */}
      {hasProp && (
        <CInputGroup style={{ height: 'auto', minHeight: height }}>
          <CCol sm="2"><FieldLabel title={t('common.description')} /></CCol>
          <CCol sm="10">
            <TextareaField
              fieldName="description"
              placeholder={t('common.description')}
              disabled={disable}
              value={current.description}
              current={current}
              setCurrent={setCurrent}
              style={taCompact}
            />
          </CCol>
        </CInputGroup>
      )}
    </div>
  );
};

export default MasterfileFormWithChildren;
