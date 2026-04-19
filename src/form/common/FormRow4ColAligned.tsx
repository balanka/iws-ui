import { JSX, ReactNode } from 'react';
import Box from '@mui/material/Box';

type Alignment = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';

interface FormRow4ColAlignedProps {
  // Column 1 - Label (same width as first row's col1)
  readonly col1Content: ReactNode;
  readonly col1Align?: Alignment;
  readonly col1Width?: string;

  // Column 2 - Field (spans across col2-col6 of first row)
  readonly col2Content: ReactNode;
  readonly col2Align?: Alignment;
  readonly col2Width?: string;

  // Column 3 - Not used (set to 0%)
  readonly col3Content?: ReactNode;
  readonly col3Align?: Alignment;
  readonly col3Width?: string;

  // Column 4 - Not used (set to 0%)
  readonly col4Content?: ReactNode;
  readonly col4Align?: Alignment;
  readonly col4Width?: string;

  readonly gap?: string;
  readonly rowHeight?: string | number;
  readonly marginBottom?: string | number;
}

export const FormRow4ColAligned = ({
                                     col1Content,
                                     col1Align = 'center',
                                     col1Width = '15%',

                                     col2Content,
                                     col2Align = 'center',
                                     col2Width = '85%',

                                     col3Content = null,
                                     col3Align = 'center',
                                     col3Width = '0%',

                                     col4Content = null,
                                     col4Align = 'center',
                                     col4Width = '0%',

                                     gap = '4px',
                                     rowHeight = '32px',
                                     marginBottom = 1
                                   }: FormRow4ColAlignedProps): JSX.Element => {
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
      <Box sx={{ display: 'flex', alignItems: col1Align, width: '100%' }}>{col1Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col2Align, width: '100%' }}>{col2Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col3Align, width: '100%' }}>{col3Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col4Align, width: '100%' }}>{col4Content}</Box>
    </Box>
  )
}
