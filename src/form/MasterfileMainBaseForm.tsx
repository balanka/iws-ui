// import React from 'react'
// import { CRow, CCol } from '@coreui/react-pro'
// import { MasterfileMainBase0Form } from './MasterfileMainBase0Form'
// import { FieldLabel, TextareaField, DatePickerField } from './common'
// import { MasterfileProps } from '../Props'
// import { IMasterfile } from '../Models'
// import { styles } from './FormsProps'
//
// export const MasterfileMainBaseForm = ({
//                                          collapse, current, setCurrent, disable, t, height
//                                        }: MasterfileProps<IMasterfile>): React.JSX.Element => (
//   <div style={{ ...styles.outer, display: !collapse ? 'none' : '' }}>
//     <MasterfileMainBase0Form  current={current} setCurrent={setCurrent} disable={disable} t={t} height={height} />
//     <CRow className="g-2 align-items-center mt-2">
//       <CCol md={2}><FieldLabel title={t('common.description')} /></CCol>
//       <CCol md={6}>
//         <TextareaField fieldName="description" placeholder={t('common.description')} disabled={disable} value={current.description} current={current} setCurrent={setCurrent} style={{ height: height - 3, width: '100%' }} />
//       </CCol>
//       <CCol md={2}><FieldLabel title={t('common.postingdate')} /></CCol>
//       <CCol md={2}>
//         <DatePickerField fieldName="postingdate" label={t('common.postingdate')} selected={current.postingdate} current={current} setCurrent={setCurrent} disabled={true} />
//       </CCol>
//     </CRow>
//   </div>
// )

//export default MasterfileMainBaseForm
