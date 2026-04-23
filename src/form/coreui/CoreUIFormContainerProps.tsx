import { JSX, ReactNode } from 'react';

interface CoreUIFormContainerProps {
  readonly children: ReactNode;
  readonly paddingBottom?: number;
  readonly display?: string;
}

export const CoreUIFormContainer = ({
                                      children,
                                      paddingBottom = 10,
                                      display = ''
                                    }: CoreUIFormContainerProps): JSX.Element => {
  return (
    <div style={{ paddingBottom, display }}>
      {children}
    </div>
  )
}
