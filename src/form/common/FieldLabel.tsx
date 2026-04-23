import {CFormLabel} from "@coreui/react"
export const FieldLabel = ({ title }:{ title:string}) => {
  return (
    <CFormLabel htmlFor="input-small">
      {title}
    </CFormLabel>
  )
}

