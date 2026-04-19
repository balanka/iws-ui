import { CSSProperties,  MouseEventHandler } from "react";
import { CButton, CTooltip} from "@coreui/react";
import IconButton from "@mui/material/IconButton";


export const FormButton = ({ title, type, color, style, size, height, onClick, className, disable }:
                    { title: string, type?: "submit" | "reset" | "button" | undefined, color?: string
                      , style?: CSSProperties | undefined, size?: 'sm' | 'lg', height?: number, onClick: MouseEventHandler<any> | undefined
                      , className?: string | undefined, disable?: boolean }) => {
  return (
    <CButton
      type={type ?? 'submit'}
      size={size ?? 'sm'}
      color={color ?? 'primary'}
      disabled={disable ? disable : false}
      className={className}
      style={style ?? { height: height }}
      onClick={onClick}>
      <i className="fa fa-dot-circle-o">{title}</i>
    </CButton>
  )
}

export const ToolbarButton = ({ tooltip, onClick, disabled, icon}: any) => (
  <CTooltip content={tooltip} placement="top">
    <IconButton size="small" sx={{ height: 22, width: 18 }} onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </CTooltip>
)

