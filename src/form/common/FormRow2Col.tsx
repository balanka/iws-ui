import React, {JSX} from 'react'
import Box from '@mui/material/Box'
type Alignment = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';

interface FormRow2ColProps {
  readonly label: string;
  readonly field: React.ReactNode;
  readonly labelWidth?: string;
  readonly fieldWidth?: string;
  readonly alignLabel?: Alignment;
  readonly alignField?: Alignment;
  readonly gap?: string;
  readonly rowHeight?: string | number;
}

export const FormRow2Col = ({
                              label,
                              field,
                              labelWidth = '20%',
                              fieldWidth = '80%',
                              alignLabel = 'center',
                              alignField = 'center',
                              gap = '4px',
                              rowHeight = '32px'
                            }: FormRow2ColProps): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `${labelWidth} ${fieldWidth}`,
      gap: gap,
      alignItems: 'stretch',
      width: '100%',
      height: rowHeight !== 'auto' ? rowHeight : 'auto',
      minHeight: rowHeight !== 'auto' ? rowHeight : 'auto'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: alignLabel, fontSize: '0.875rem' }}>
      <div>{label}</div>
    </Box>
    <Box sx={{ display: 'flex', alignItems: alignField }}>
      {field}
    </Box>
  </Box>
)

