import { JSX, ReactNode } from 'react';
import Box from '@mui/material/Box';

type Alignment = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';

interface FormRow4ColProps {
  // Column 1
  readonly col1Content: ReactNode;
  readonly col1Align?: Alignment;
  readonly col1Width?: string;

  // Column 2
  readonly col2Content: ReactNode;
  readonly col2Align?: Alignment;
  readonly col2Width?: string;

  // Column 3
  readonly col3Content: ReactNode;
  readonly col3Align?: Alignment;
  readonly col3Width?: string;

  // Column 4
  readonly col4Content: ReactNode;
  readonly col4Align?: Alignment;
  readonly col4Width?: string;

  // Layout options
  readonly gap?: string;
  readonly rowHeight?: string | number;
  readonly marginBottom?: string | number;
}

export const FormRow4Col = ({
                              // Column 1
                              col1Content,
                              col1Align = 'center',
                              col1Width = '20%',

                              // Column 2
                              col2Content,
                              col2Align = 'center',
                              col2Width = '55%',

                              // Column 3
                              col3Content,
                              col3Align = 'center',
                              col3Width = '20%',

                              // Column 4
                              col4Content,
                              col4Align = 'center',
                              col4Width = '5%',

                              // Layout
                              gap = '4px',
                              rowHeight = '32px',
                              marginBottom = 1
                            }: FormRow4ColProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${col1Width} ${col2Width} ${col3Width} ${col4Width}`,
        gap: gap,
        alignItems: 'stretch',
        width: '100%',
        height: rowHeight !== 'auto' ? rowHeight : 'auto',
        minHeight: rowHeight !== 'auto' ? rowHeight : 'auto',
        mb: marginBottom
      }}
    >
      <Box sx={{ display: 'flex', alignItems: col1Align }}>{col1Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col2Align }}>{col2Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col3Align }}>{col3Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col4Align }}>{col4Content}</Box>
    </Box>
  )
}
