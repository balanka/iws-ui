import {CompanyAccountForm} from './CompanyAccountForm'
import { BankAccountGrid } from "../IWSGrid"
import {bankAccountColumnDefs} from "../ColumnsDefs"
import IWSTabs from './IWSTabs.tsx'
import {AddressProps, BankAccountFormProps, CompanyTabProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initBankAccount} from "./Menu.tsx";
import {styles} from "./BasicTreeTableProps.tsx";
import {CustomerGeneralForm} from "./CustomerGeneralForm.tsx"
import { BankAccountForm } from './BankAccountForm'
import {AddressForm} from "./AddressForm.tsx";

const CompanyTabs  = ({collapse, current, setCurrent
                           , currentBankAccount, setCurrentBankAccount, token, modifyUrl, t
                  , locale, data, accData, bankData, vatData, ccyData, height, disable
                  , zIndex, onGridReady }:CompanyTabProps) => {
  const  props:CompanyTabProps = { collapse, current, setCurrent, currentBankAccount, setCurrentBankAccount
      , token, modifyUrl, t, locale, data, accData, bankData, vatData, ccyData, height, disable, zIndex, onGridReady }

  const  addressProps:AddressProps = { current, setCurrent,  t, disable, height:height }
  const businessPartner = current
  const setBusinessPartner = setCurrent
 const  bankAccountProps:BankAccountFormProps =
   {currentBankAccount, setCurrentBankAccount, businessPartner, setBusinessPartner,  bankData, t,  disable,  height:height-5, zIndex }

    const onRowSelected = (event: RowSelectedEvent) => setCurrentBankAccount(event.data)

  const defaultColDef= {
    resizable: true,
      editable: true,
      filter: "agTextColumnFilter",
  }

  const table =
    <div
      // @ts-ignore
      style={{...styles.outer, height:180, padding:5, paddingTop: 20 }} >
            <BankAccountGrid
                // @ts-ignore
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef} onGridReady={onGridReady}
                rowData ={current?.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
    </div>

  const tabContent = [
      { title: t('common.general'), id: 1, form: CustomerGeneralForm (props)},
      { title: t('common.address'), id: 2, form: AddressForm(addressProps) },
      { title: t('common.accounts'), id: 3, form: CompanyAccountForm(props)},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form: BankAccountForm(bankAccountProps)},
    ]
  return <IWSTabs
    //@ts-ignore
    tabList={tabContent} />
}
export {CompanyTabs}
