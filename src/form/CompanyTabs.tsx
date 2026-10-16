import {CompanyAccountForm} from './CompanyAccountForm'
import { BankAccountGrid } from "../IWSGrid"
import {bankAccountColumnDefs} from "../ColumnsDefs"
import IWSTabs from './IWSTabs.tsx'
import { CompanyTabProps} from '../Props'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initBankAccount} from "./Menu.tsx";
import {styles} from "./BasicTreeTableProps.tsx";
import {CustomerGeneralForm} from "./CustomerGeneralForm.tsx"
import { BankAccountForm } from './BankAccountForm'
import {AddressForm} from "./AddressForm.tsx";

const CompanyTabs  = ({collapse, current, setCurrent
                           , currentBankAccount, setCurrentBankAccount
                        //, token, modifyUrl
                         , t
                       //, locale, data
                        , accData, bankData, vatData, ccyData, contactData, height, disable
                  , zIndex, onGridReady }:CompanyTabProps) => {
  // const  props:CompanyTabProps = { collapse, current, setCurrent, currentBankAccount, setCurrentBankAccount
  //     , token, modifyUrl, t, locale, data, accData, bankData, vatData, ccyData, contactData, height, disable
  //     , zIndex, onGridReady }



    const onRowSelected = (event: RowSelectedEvent) => setCurrentBankAccount(event.data)

  const defaultColDef= {resizable: true, editable: true, filter: "agTextColumnFilter"}

  const table =
    <div
      // @ts-ignore
      style={{...styles.outer, height:180, padding:5, paddingTop: 20 }} >
            <BankAccountGrid
                // @ts-ignore
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef} onGridReady={onGridReady}
                rowData ={current?.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
    </div>
  const addressForm = <AddressForm current={current} setCurrent={setCurrent} t={t} disable={disable} height={height}/>
  const bankAccountForm =<BankAccountForm currentBankAccount={currentBankAccount}
                                          setCurrentBankAccount={setCurrentBankAccount} businessPartner={current}
                                          setBusinessPartner={setCurrent} bankData={bankData} t={t}
                                          zIndex={zIndex-5} disable={disable}/>
  const companyAccountForm =<CompanyAccountForm current={current} setCurrent={setCurrent} accData={accData}
                                                vatData={vatData} t={t} disable={disable}/>
  const generalForm = <CustomerGeneralForm collapse={collapse} current={current} setCurrent={setCurrent} t={t}
                                           ccyData={ccyData} contactData={contactData} disable={disable}  height={height}/>
  const tabContent = [
      { title: t('common.general'), id: 1, form: generalForm},
      { title: t('common.address'), id: 2, form: addressForm },
      { title: t('common.accounts'), id: 3, form: companyAccountForm},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form: bankAccountForm},
    ]
  return <IWSTabs
    //@ts-ignore
    tabList={tabContent} />
}
export {CompanyTabs}
