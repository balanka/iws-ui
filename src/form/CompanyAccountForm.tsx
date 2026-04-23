import { JSX } from 'react'
import { FormRow1Col } from './common'
import { FormMasterfileXComboBox } from './common'
import { IAccount, ICompany, IVat } from '../Models'
import { TFunction } from 'i18next'
import { initAcc, initVat } from './Menu'
import {styles} from "./FormsProps.tsx";
import {CInputGroup} from "@coreui/react";

interface CompanyAccountFormProps {
  readonly current: ICompany
  readonly setCurrent: (art: any) => void
  readonly accData: IAccount[]
  readonly vatData: IVat[]
  readonly t: TFunction<'translation', undefined>
  readonly disable: boolean
  readonly height?: number
}

export const CompanyAccountForm = ({
                                     current, setCurrent, accData, vatData, t, disable, height = 28
                                   }: CompanyAccountFormProps): JSX.Element => {
  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' }
  const cw = { labelWidth: '20%', fieldWidth: '80%' }

  const fields = [
    { label: t('common.balanceSheetAcc'), name: 'balanceSheetAcc', zIndex: 11 },
    { label: t('common.incomeStmtAcc'), name: 'incomeStmtAcc', zIndex: 10 },
    { label: t('common.bankAcc'), name: 'bankAcc', zIndex: 12 },
    { label: t('article.stock.account'), name: 'account', zIndex: 13 },
    { label: t('common.purchasingClearingAcc'), name: 'purchasingClearingAcc', zIndex: 9 },
    { label: t('common.salesClearingAcc'), name: 'salesClearingAcc', zIndex: 8 },
    { label: t('common.cashAcc'), name: 'cashAcc', zIndex: 7 },
    { label: t('common.vatCode'), name: 'vatCode', zIndex: 13, isVat: true },
  ]

  return (
    <CInputGroup  style={{...styles.outer}}>
      {fields.map((field) => (
        <FormRow1Col
          key={field.name}
          label={field.label}
          field={
            <FormMasterfileXComboBox
              fieldName={field.name}
              current={current}
              setCurrent={setCurrent}
              data={field.isVat ? vatData : accData}
              defaultValue={field.isVat ? initVat[0] : initAcc[0]}
              zIndex={field.zIndex}
              disable={disable}
              styles={s}
              fontSize={12}
            />
          }
          {...cw}
          rowHeight="32px"
          gap="4px"
        />
      ))}
    </CInputGroup>
  )
}
