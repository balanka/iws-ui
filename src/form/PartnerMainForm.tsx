import { JSX } from 'react';
import { MasterfileProps } from '../Props';
import { IPartner } from '../Models';
import { MasterfileMainBase0Form } from './MasterfileMainBase0Form';
import { AddressForm } from './AddressForm';
import {styles} from "./FormsProps.tsx";
import { CInputGroup } from "@coreui/react";

export const PartnerMainForm = ({
                                  collapse = true,
                                  current,
                                  setCurrent,
                                  disable,
                                  t,
                                  height = 28
                                }: MasterfileProps<IPartner> & { collapse?: boolean; height?: number }): JSX.Element | null => (
  !collapse ? null : (
    <CInputGroup  style={{...styles.outer , display: !collapse?'none':''}} >
    <MasterfileMainBase0Form
      current={current}
      setCurrent={setCurrent}
      disable={disable}
      t={t}
      height={height}
    />
    <AddressForm
      current={current}
      setCurrent={setCurrent}
      t={t}
      disable={disable}
      height={height}
    />
  </CInputGroup>
  )
)
