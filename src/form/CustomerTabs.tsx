import React from 'react'
import {AddressForm, BankAccountForm, CustomerAccountForm, CustomerGeneralForm} from './FormsProps'
import { BankAccountGrid } from '../IWSGrid'
import Grid from 'react-fast-grid'
import {bankAccountColumnDefs} from '../ColumnsDefs'
import IWSTabs from './IWSTabs.tsx'
import {CustomerTabProps, AddressProps, BankAccountFormProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initBankAccount} from './Menu.tsx'
import FileInput from './FileInput.tsx'
import FileOutput from './FileOutput.tsx'


const STYLES ={
    outer: {
        backgroundColor: '#e8e6f6',
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 5,
    },
}
const CustomerTabs  = ({ current, setCurrent
                           , currentBankAccount, setCurrentBankAccount, token, modifyUrl, t
                           , locale, data, accData, bankData, vatData, ccyData, height, disable, zIndex
                           , onGridReady
                       }: CustomerTabProps) => {
    const props: CustomerTabProps = {
        current, setCurrent, currentBankAccount, setCurrentBankAccount
        , token, modifyUrl, t, locale, data, bankData, accData, vatData, ccyData, height, disable, zIndex, onGridReady
    }

    const addressProps: AddressProps = {current, setCurrent, t, disable, height: 20}
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
      <Grid container spacing={1} style={{...STYLES.outer,  height:200,  padding:5,  paddingTop: 20}}
            maximize direction="row" justify="flex-start" alignItems="stretch" >
            <BankAccountGrid
                // @ts-ignore
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef} onGridReady={onGridReady}
                rowData ={current?.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
     </Grid>
console.log('bankAccountProps', bankAccountProps)
  const tabContent = [
      { title: t('common.general'), id: 1, form: CustomerGeneralForm (props)},
      { title: t('common.address'), id: 2, form: AddressForm(addressProps) },
      { title: t('common.accounts'), id: 3, form:CustomerAccountForm(props)},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form: BankAccountForm(bankAccountProps)},
      { title: t('TEST2'), id: 6, form: FileInput()},
      { title: t('TEST3'), id: 7, form: FileOutput()},
    ]
  return <IWSTabs tabList={tabContent} />
}
export {CustomerTabs}
