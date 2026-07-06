import React, {JSX} from 'react'
import {CCol, CInputGroup} from '@coreui/react-pro'
import {FieldLabel, } from '../common'

interface FormRow1ColProps {
  readonly label: string;
  readonly field: React.ReactNode;
  readonly labelWidth?: string;
  readonly fieldWidth?: string;
  readonly alignLabel?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  readonly alignField?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  readonly gap?: string;
  readonly rowHeight?: string | number;
}

export const FormRow1Col = ({label, field, rowHeight = '32px'
                            }: FormRow1ColProps): JSX.Element => (
  <CInputGroup  style={{ height: rowHeight }}>
    <CCol sm="2">
      <FieldLabel title={label}  />
    </CCol>
    <CCol sm="10" >
      {field}
    </CCol>
  </CInputGroup>

)
