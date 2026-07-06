import { JSX, ReactNode } from 'react';
import { CInputGroup } from '@coreui/react-pro';

interface FormRowProps {
  readonly children: ReactNode;
  readonly height?: number;
  readonly marginBottom?: number;
  readonly autoHeight?: boolean;
}

export const FormRow = ({
                          children,
                          height = 28,
                          marginBottom = 8,
                          autoHeight = false
                        }: FormRowProps): JSX.Element => {
  return (
    <CInputGroup
      style={{
        height: autoHeight ? 'auto' : height,
        minHeight: autoHeight ? height : 'auto',
        marginBottom: `${marginBottom}px`
      }}
    >
      {children}
    </CInputGroup>
  )
}
