import React, {JSX} from 'react';
import Box from '@mui/material/Box';

interface FormContainerProps {
  readonly children: React.ReactNode;
  readonly spacing?: number;
  readonly padding?: number;
  readonly className?: string;
}

export const FormContainer = ({
                                children,
                                spacing = 0.5,
                                padding = 1,
                                className
                              }: FormContainerProps): JSX.Element => (
  <Box
    className={className}
    sx={{
      flexGrow: 1,
      p: padding,
      width: '100%',
      overflow: 'auto'
    }}
  >
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing
    }}>
      {children}
    </Box>
  </Box>
);
