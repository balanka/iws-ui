import { JSX } from 'react'
import { MasterfileProps } from '../Props'
import { IContact } from '../Models'
import { AddressForm } from './AddressForm'
import {styles} from './FormsProps'
import { CInputGroup } from "@coreui/react-pro"
import MasterfileFormWithout from "./MasterfileFormWithout.tsx"
export const PartnerMainForm = ({
                                  collapse = true,
                                  current,
                                  setCurrent,
                                  disable,
                                  t,
                                  height = 28
                                }: MasterfileProps<IContact> & { collapse?: boolean; height?: number }): JSX.Element | null =>

  !collapse ? null : (
    <CInputGroup style={{ ...styles.outer, display: !collapse ? 'none' : '' }}>
      <MasterfileFormWithout
        current={current}
        setCurrent={setCurrent}
        disable={disable}
        t={t}
        height={height}
        collapse={false}
        accData={[]}
        propertyName=""
        fieldName=""
      >
        <AddressForm
          current={current}
          setCurrent={setCurrent}
          t={t}
          disable={disable}
          height={height}
        />
      </MasterfileFormWithout>
    </CInputGroup>
  )

