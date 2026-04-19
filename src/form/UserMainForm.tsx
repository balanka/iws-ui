import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { InputField, DatePickerField } from './FormsProps'
import { UserFormProps } from '../Props'
import { STYLES } from './FormsProps'

const FormRow = ({ children }: any) => <CRow className="g-2 align-items-center mb-2">{children}</CRow>
const Label = ({ children }: any) => <div style={{ minWidth: 100 }}>{children}</div>

export const UserMainForm = ({ collapse, current, setCurrent, disable, t }: UserFormProps): React.JSX.Element => {
  const fieldStyle = { height: 20, flex: 1 }

  const rows = [
    { left: { label: t('common.id'), name: 'id', type: 'input' }, right: { label: t('common.enterdate'), name: 'enterdate', type: 'date', disabled: true } },
    { left: { label: t('user.userName'), name: 'userName', type: 'input' }, right: { label: t('common.changedate'), name: 'changedate', type: 'date', disabled: true } },
    { left: { label: t('user.firstName'), name: 'firstName', type: 'input' }, right: { label: t('common.postingdate'), name: 'postingdate', type: 'date', disabled: true } },
    { left: { label: t('user.lastName'), name: 'lastName', type: 'input' }, right: null },
    { left: { label: t('common.email'), name: 'email', type: 'input' }, right: { label: t('common.company'), name: 'company', type: 'input', textAlign: 'right' } },
  ]

  const renderField = (field: any, value: any) => {
    if (field.type === 'date') {
      return <DatePickerField fieldName={field.name} label={field.label} selected={value || new Date()} current={current} setCurrent={setCurrent} disabled={field.disabled} />
    }
    return <InputField fieldName={field.name} current={current} setCurrent={setCurrent} value={value} disabled={disable} style={{ ...fieldStyle, textAlign: field.textAlign || 'left' }} />
  }


  return (
    <div style={{ ...STYLES.outer, display: !collapse ? 'none' : '' }}>
      {rows.map((row, idx) => (
        <FormRow key={idx}>
          <CCol sm={8} className="d-flex gap-2">
            <Label>{row.left.label}</Label>
            {renderField(row.left,
              // @ts-ignore
              current[row.left.name])}
          </CCol>
          <CCol sm={4} className="d-flex gap-2">
            {row.right && (
              <>
                <Label>{row.right.label}</Label>
                {renderField(row.right,
                  // @ts-ignore
                  current[row.right.name])}
              </>
            )}
          </CCol>
        </FormRow>
      ))}
    </div>
  )
}

export default UserMainForm
