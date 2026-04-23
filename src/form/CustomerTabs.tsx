//import React from 'react'
import {AddressForm} from './AddressForm'
import {CustomerAccountMainForm} from './CustomerAccountMainForm'
import {CustomerGeneralForm} from './CustomerGeneralForm'
import { BankAccountGrid } from '../IWSGrid'
import {bankAccountColumnDefs} from '../ColumnsDefs'
import IWSTabs from './IWSTabs.tsx'
import {BankAccountForm} from './BankAccountForm.tsx'
import {CustomerTabProps, AddressProps, BankAccountFormProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initBankAccount} from './Menu.tsx'
import {styles} from "./BasicTreeTableProps.tsx";

const CustomerTabs  = ({ collapse, current, setCurrent
                           , currentBankAccount, setCurrentBankAccount, token, modifyUrl, t
                           , locale, data, accData, bankData, vatData, ccyData, height, disable, zIndex
                           , onGridReady
                       }: CustomerTabProps) => {
    const props: CustomerTabProps = {collapse,
        current, setCurrent, currentBankAccount, setCurrentBankAccount
        , token, modifyUrl, t, locale, data, bankData, accData, vatData, ccyData, height, disable, zIndex, onGridReady
    }

    const addressProps: AddressProps = {current, setCurrent, t, disable, height: height}
    const businessPartner = current
    const setBusinessPartner = setCurrent

    const bankAccountProps: BankAccountFormProps = {
        currentBankAccount,
        setCurrentBankAccount,
        businessPartner,
        setBusinessPartner,
        bankData,
        t,
        disable,
        height,
        zIndex,
    }
    bankAccountProps['zIndex']=zIndex-1

    const onRowSelected = (event: RowSelectedEvent) =>
        setCurrentBankAccount(event.data)

    const defaultColDef = {
        resizable: true,
        editable: false,
        filter: "agTextColumnFilter",
    }

  const table =
    <div
      // @ts-ignore
      style={{...styles.outer, height:180, padding:5, paddingTop: 20 }} >
       {/*style={{...styles.outer, height:180}} >*/}
            <BankAccountGrid
                // @ts-ignore
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef} onGridReady={onGridReady}
                rowData ={current?.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
    </div>

  const tabContent = [
      { title: t('common.general'), id: 1, form: CustomerGeneralForm (props)},
      { title: t('common.address'), id: 2, form: AddressForm(addressProps) },
      { title: t('common.accounts'), id: 3, form:CustomerAccountMainForm(props)},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form: BankAccountForm(bankAccountProps)}
      //{ title: t('TEST2'), id: 6, form: FileInput()},
      //{ title: t('TEST3'), id: 7, form: FileOutput()},
    ]
  return <IWSTabs
    //@ts-ignore
    tabList={tabContent} />
}
export {CustomerTabs}
