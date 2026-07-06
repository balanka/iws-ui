import { JSX } from 'react';
import { CCol, CInputGroup } from '@coreui/react-pro';
import { FieldLabel, FormMasterfileXComboBox } from './common';
import { styles } from './FormsProps';
import { ArticleAcccountProps } from '../Props';
import { initAcc, initVat } from './Menu';

export const ArticleAccountForm = ({
                                     current, setCurrent, accData, vatData, t, disable, height = 28
                                   }: ArticleAcccountProps & { height?: number }): JSX.Element => {
  const inputStyle = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const hasVat = current?.hasOwnProperty('vatCode') || current?.hasOwnProperty('vatcode');

  const fields = [
    { label: t('article.stock.account'), name: 'account', data: accData, default: initAcc },
    { label: t('article.expense.account'), name: 'oaccount', data: accData, default: initAcc },
    { label: t('article.revenue.account'), name: 'revenueAccount', data: accData, default: initAcc },
  ];

  return (
    <div style={{ ...styles.outer, paddingBottom: 10 }}>
      {fields.map((field) => (
        <CInputGroup key={field.name} style={{ height }}>
          <CCol sm="2"><FieldLabel title={field.label} /></CCol>
          <CCol sm="10">
            <FormMasterfileXComboBox
              fieldName={field.name}
              current={current}
              setCurrent={setCurrent}
              data={field.data}
              defaultValue={field.default}
              zIndex={11}
              disable={disable}
              styles={inputStyle}
              fontSize={12}
            />
          </CCol>
        </CInputGroup>
      ))}

      {hasVat && (
        <CInputGroup style={{ height }}>
          <CCol sm="2"><FieldLabel title={t('common.vatCode')} /></CCol>
          <CCol sm="10">
            <FormMasterfileXComboBox
              fieldName="vatCode"
              current={current}
              setCurrent={setCurrent}
              data={vatData}
              defaultValue={initVat}
              zIndex={11}
              disable={disable}
              styles={inputStyle}
              fontSize={12}
            />
          </CCol>
        </CInputGroup>
      )}
    </div>
  )
}
