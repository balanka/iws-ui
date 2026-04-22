import { JSX, ReactNode } from 'react'
import Box from '@mui/material/Box'

type Alignment = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';

interface FormRow6ColAlignedProps {
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

  // Column 5
  readonly col5Content: ReactNode;
  readonly col5Align?: Alignment;
  readonly col5Width?: string;

  // Column 6
  readonly col6Content: ReactNode;
  readonly col6Align?: Alignment;
  readonly col6Width?: string;

  // Layout options
  readonly gap?: string;
  readonly rowHeight?: string | number;
  readonly marginBottom?: string | number;
}

export const FormRow6ColAligned = ({
                                     // Column 1
                                     col1Content,
                                     col1Align = 'center',
                                     col1Width = '20%',

                                     // Column 2
                                     col2Content,
                                     col2Align = 'center',
                                     col2Width = '30%',

                                     // Column 3
                                     col3Content,
                                     col3Align = 'center',
                                     col3Width = '25%',

                                     // Column 4
                                     col4Content,
                                     col4Align = 'center',
                                     col4Width = '10%',

                                     // Column 5
                                     col5Content,
                                     col5Align = 'center',
                                     col5Width = '10%',

                                     // Column 6
                                     col6Content,
                                     col6Align = 'center',
                                     col6Width = '5%',

                                     // Layout
                                     gap = '4px',
                                     rowHeight = '32px',
                                     marginBottom = 1
                                   }: FormRow6ColAlignedProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${col1Width} ${col2Width} ${col3Width} ${col4Width} ${col5Width} ${col6Width}`,
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
      <Box sx={{ display: 'flex', alignItems: col5Align }}>{col5Content}</Box>
      <Box sx={{ display: 'flex', alignItems: col6Align }}>{col6Content}</Box>
    </Box>
  )
}
