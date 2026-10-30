import { CTooltip } from '@coreui/react-pro'
import { IconButton } from '@mui/material'

export const ToolbarButton = ({ tooltip, onClick, disabled, icon, zIndex }: any) => (
  <CTooltip content={tooltip} placement="top" style={{ zIndex: zIndex ?? 99999 }}>
    <IconButton
      size="small"
      sx={{ height: 22, width: 18 }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  </CTooltip>
)
