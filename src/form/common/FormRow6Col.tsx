import { Box } from "@mui/material"

// 6-Column Row Component
export const FormRow6Col = ({
                       label1, field1, label2, field2, label3, field3,
                       label1Width = '15%', field1Width = '30%',
                       label2Width = '15%', field2Width = '20%',
                       label3Width = '10%', field3Width = '10%'
                     }: any) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `${label1Width} ${field1Width} ${label2Width} ${field2Width} ${label3Width} ${field3Width}`,
      gap: '4px',
      alignItems: 'center',
      width: '100%',
      mb: 1
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>{label1}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>{field1}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>{label2}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>{field2}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>{label3}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>{field3}</Box>
  </Box>
)
