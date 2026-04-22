import React from 'react'
import { CRow, CCol, CContainer } from '@coreui/react'
import { InputField } from './common'
import { TFunction } from 'i18next'

interface FileSystemFormProps {
  current: any
  setCurrent: (arg: any) => void
  t: TFunction<'translation', undefined>
  disable: boolean
  height: number
}

export const FileSystemForm = ({ current, setCurrent, t, disable, height }: FileSystemFormProps): React.JSX.Element => {
  const inputStyle = { height: height - 3, width: '100%' }
  const labelStyle = { minWidth: 80 }

  return (
    <CContainer fluid className="p-0">
      {/* Row 1: Three equal columns */}
      <CRow className="g-2 mb-2">
        <CCol sm={4}>
          <div className="d-flex align-items-center gap-2">
            <div style={labelStyle}>{t('bankstatement.header')}</div>
            <InputField fieldName="header" current={current} setCurrent={setCurrent} value={current.header} disabled={disable} style={inputStyle} />
          </div>
        </CCol>
        <CCol sm={4}>
          <div className="d-flex align-items-center gap-2">
            <div style={labelStyle}>{t('bankstatement.char')}</div>
            <InputField fieldName="char" current={current} setCurrent={setCurrent} value={current.char} disabled={disable} style={{...inputStyle, width: '50%'}} />
          </div>
        </CCol>
        <CCol sm={4}>
          <div className="d-flex align-items-center gap-2">
            <div style={labelStyle}>{t('bankstatement.extension')}</div>
            <InputField fieldName="extension" current={current} setCurrent={setCurrent} value={current.extension} disabled={disable} style={{...inputStyle, width: '50%'}} />
          </div>
        </CCol>
      </CRow>

      {/* Row 2: First column same width as row 1 columns */}
      <CRow className="g-2">
        <CCol sm={12}>
          <div className="d-flex align-items-center gap-2">
            <div style={labelStyle}>{t('bankstatement.path')}</div>
            <InputField fieldName="path" current={current} setCurrent={setCurrent} value={current.path} disabled={disable} style={{...inputStyle}} />
          </div>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default FileSystemForm
