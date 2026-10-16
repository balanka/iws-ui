import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react-pro';
import {
  FormMasterfileXComboBox,
  DatePickerField,
  InputField,
  TextareaField,
  FieldLabel,
} from './common';
import { styles } from './FormsProps';
import { initAcc } from './Menu';
import { IAccount, IVat } from '../Models.ts';
import { TFunction } from 'i18next';

interface VatMainFormProps {
  readonly current: IVat;
  readonly setCurrent: (arg: IVat) => void;
  readonly accData: IAccount[];
  readonly t: TFunction<'translation', undefined>;
  readonly disable: boolean;
  readonly height?: number;
  readonly zIndex: number;
}

const ROW_STYLE = { marginBottom: '6px' } as const;

export const VatMainForm = ({
                              current,
                              setCurrent,
                              accData,
                              t,
                              disable,
                              height = 28,
                              zIndex,
                            }: VatMainFormProps): JSX.Element => {
  const fieldStyle = { height: height - 3, width: '100%', fontSize: '0.875rem' } as const;
  const percentStyle = { ...fieldStyle, width: '50%', textAlign: 'right' } as const;

  const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <CInputGroup style={{ height, ...ROW_STYLE }}>{children}</CInputGroup>
  );

  const Field = ({label, offset, children,}: {
    label: string; offset?: boolean; children: JSX.Element; }) => (
    <>
      <CCol sm="2" style={offset ? { paddingLeft: 10 } : undefined}>
        <FieldLabel title={label} />
      </CCol>
      <CCol sm="4">{children}</CCol>
    </>
  );

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, width: '100%' }}>
      <Row>
        <Field label={t('common.id')}>
          <InputField fieldName="id" current={current} setCurrent={setCurrent}
                      value={current.id} disabled={disable} style={fieldStyle} />
        </Field>
        <Field label={t('common.enterdate')} offset>
          <DatePickerField fieldName="enterdate" label={t('common.enterdate')}
                           selected={current.enterdate} current={current}
                           setCurrent={setCurrent} disabled />
        </Field>
      </Row>

      <Row>
        <Field label={t('vat.name')}>
          <InputField fieldName="name" current={current} setCurrent={setCurrent}
                      value={current.name} disabled={disable} style={fieldStyle} />
        </Field>
        <Field label={t('common.changedate')} offset>
          <DatePickerField fieldName="changedate" label={t('common.changedate')}
                           selected={current.changedate} current={current}
                           setCurrent={setCurrent} disabled />
        </Field>
      </Row>

      <Row>
        <Field label={t('vat.input.account')}>
          <FormMasterfileXComboBox fieldName="inputVatAccount" current={current}
                                   setCurrent={setCurrent} data={accData}
                                   defaultValue={initAcc} zIndex={zIndex}
                                   disable={disable} styles={fieldStyle} fontSize={12} />
        </Field>
        <Field label={t('common.postingdate')} offset>
          <DatePickerField fieldName="postingdate" label={t('common.postingdate')}
                           selected={current.postingdate} current={current}
                           setCurrent={setCurrent} disabled />
        </Field>
      </Row>

      <Row>
        <Field label={t('vat.output.account')}>
          <FormMasterfileXComboBox fieldName="outputVatAccount" current={current}
                                   setCurrent={setCurrent} data={accData}
                                   defaultValue={initAcc} zIndex={zIndex}
                                   disable={disable} styles={fieldStyle} fontSize={12} />
        </Field>
        <Field label={t('vat.percent')} offset>
          <InputField fieldName="percent" current={current} setCurrent={setCurrent}
                      value={current.percent} disabled={disable} style={percentStyle} />
        </Field>
      </Row>

      <CInputGroup style={{ height: 'auto', minHeight: height, ...ROW_STYLE }}>
        <CCol sm="2"><FieldLabel title={t('common.description')} /></CCol>
        <CCol sm="8">
          <TextareaField fieldName="description" placeholder={t('common.description')}
                         disabled={disable} value={current.description}
                         current={current} setCurrent={setCurrent}
                         style={{ width: '100%', minHeight: 40, fontSize: '0.875rem' }} />
        </CCol>
      </CInputGroup>
    </div>
  );
};
