import React from 'react'
import {AddressForm, BankAccountForm, CompanyAccountForm, CustomerGeneralForm} from './FormsProps'
import { BankAccountGrid } from "../IWSGrid"
import Grid from "react-fast-grid";
import {bankAccountColumnDefs} from "../ColumnsDefs"
import IWSTabs from './IWSTabs.tsx'
import {AddressProps, BankAccountFormProps, CompanyTabProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {ICompany} from "../Models.ts";
import {initBankAccount} from "./Menu.tsx";


const STYLES ={
    outer: {
        backgroundColor: '#e8e6f6',
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 5,
    },
}
const CompanyTabs  = ({ formid, current, setCurrent
                           , currentBankAccount, setCurrentBankAccount, token, modifyUrl, t
                  , locale, data, accData, bankData, vatData, ccyData, height, disable, zIndex }:CompanyTabProps) => {
  const  props:CompanyTabProps = { formid, current, setCurrent, currentBankAccount, setCurrentBankAccount
      , token, modifyUrl, t, locale, data, accData, bankData, vatData, ccyData, height, disable, zIndex }
    const currentC:ICompany = current
    // const  compProps:CompanyTabProps = { formid, currentC, setCurrent, currentBankAccount, setCurrentBankAccount
    //     , token, modifyUrl, t, locale, data, accData, vatData, height, disable }
  const  addressProps:AddressProps = { current, setCurrent,  t, disable, height:20 }
   // const nusinessPartner:ICustomer|ISupplier|IEmployee = current
    console.log('current>>>>', current)
    console.log('currentC>>>>', currentC);
    console.log('currentBankAccount', currentBankAccount)
    console.log('current.bankaccounts', current.bankaccounts)
    //console.log('bankData', bankData)
    const businessPartner = current
    const setBusinessPartner = setCurrent
 const  bankAccountProps:BankAccountFormProps = {currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner,  bankData, t,  disable, height, zIndex }

    const onRowSelected = (event: RowSelectedEvent) => {
        console.log('selected currentBankAccount>>>>', event.data)
        setCurrentBankAccount(event.data)
    }
  const defaultColDef= {
    resizable: true,
      editable: true,
      filter: "agTextColumnFilter",
  }

  const table =
      <Grid container spacing={1} style={{...STYLES.outer, width:1000, height:200, padding:5,  paddingTop: 20}} maximize direction="row" justify="flex-start" alignItems="stretch" >
            <BankAccountGrid
                // @ts-ignore
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef}
                rowData ={current.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
     </Grid>

  const tabContent = [
      { title: t('common.general'), id: 1, form: CustomerGeneralForm (props)},
      { title: t('common.address'), id: 2, form: AddressForm(addressProps) },
      { title: t('common.accounts'), id: 3, form: CompanyAccountForm(props)},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form: BankAccountForm(bankAccountProps)},
    ]
  return <IWSTabs tabList={tabContent} />
}
export {CompanyTabs}
