import { JSX, ReactNode } from 'react';
import { CCol, CInputGroup } from '@coreui/react';

interface CoreUIFormRowProps {
  readonly label: ReactNode;
  readonly field: ReactNode;
  readonly labelSm?: number;
  readonly fieldSm?: number;
  readonly label2?: ReactNode;
  readonly field2?: ReactNode;
  readonly label2Sm?: number;
  readonly field2Sm?: number;
  readonly label3?: ReactNode;
  readonly field3?: ReactNode;
  readonly label3Sm?: number;
  readonly field3Sm?: number;
  readonly height?: number;
  readonly paddingLeft?: number;
}

export const CoreUIFormRow = ({
                                label,
                                field,
                                labelSm = 2,
                                fieldSm = 4,
                                label2,
                                field2,
                                label2Sm = 2,
                                field2Sm = 4,
                                label3,
                                field3,
                                label3Sm = 1,
                                field3Sm = 1,
                                height = 28,
                                paddingLeft = 10
                              }: CoreUIFormRowProps): JSX.Element => {
  return (
    <CInputGroup style={{ height }}>
      <CCol sm={labelSm}>
        {typeof label === 'string' ? <div>{label}</div> : label}
      </CCol>
      <CCol sm={fieldSm}>{field}</CCol>

      {label2 && (
        <>
          <CCol sm={label2Sm} style={{ paddingLeft }}>
            {typeof label2 === 'string' ? <div>{label2}</div> : label2}
          </CCol>
          <CCol sm={field2Sm}>{field2}</CCol>
        </>
      )}

      {label3 && (
        <>
          <CCol sm={label3Sm} style={{ paddingLeft: 5 }}>
            {typeof label3 === 'string' ? <div>{label3}</div> : label3}
          </CCol>
          <CCol sm={field3Sm}>{field3}</CCol>
        </>
      )}
    </CInputGroup>
  )
}
