import type { ReactNode } from 'react'
import { CInputGroup } from '@coreui/react-pro'
import { styles } from './BasicTreeTableProps.tsx'
import type { State } from '../Props.ts'

interface MasterfileFormShellProps {
  readonly header: ReactNode
  readonly body: ReactNode  | null
  readonly table: ReactNode
  readonly state: State
  readonly minHeight: number
  readonly maxHeight: number
  readonly mainForm: ReactNode
  readonly paddingTop?: number
}

export const MasterfileFormShell = ({
                                      header,
                                      body,
                                      table,
                                      state,
                                      minHeight,
                                      maxHeight,
                                      mainForm,
                                      paddingTop = 2,
                                    }: MasterfileFormShellProps) => {

  return (
    <>
      {header}
      <CInputGroup style={{ ...styles.outer, display: state.collapseForm ? '' : 'none' }}>
        {body ?? mainForm}
      </CInputGroup>
      <div
        style={{
          ...styles.outer0,
          paddingTop,
          height: state.collapseForm ? minHeight : maxHeight,
          minWidth: '100%',
          display: state.collapseTable ? '' : 'none',
        }}
      >
        {table}
      </div>
    </>
  )
}
