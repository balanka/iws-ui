import {AddressForm} from './AddressForm'
import {CustomerAccountMainForm} from './CustomerAccountMainForm'
import {CustomerGeneralForm} from './CustomerGeneralForm'
import { BankAccountGrid } from '../IWSGrid'
import {bankAccountColumnDefs} from '../ColumnsDefs'
import IWSTabs from './IWSTabs.tsx'
import {BankAccountForm} from './BankAccountForm.tsx'
import {CustomerTabProps, } from '../Props'
// @ts-expect-error -- legacy, see TODO
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {initBankAccount} from './Menu.tsx'
import {styles} from "./BasicTreeTableProps.tsx";
import {ICustomer, IEmployee, ISupplier} from "../Models.ts";

const CustomerTabs  = ({ collapse, current, setCurrent
                           , currentBankAccount, setCurrentBankAccount, t, accData, bankData, vatData
                           , ccyData, contactData, height, disable, zIndex, onGridReady}: CustomerTabProps) => {

    const onRowSelected = (event: RowSelectedEvent) => setCurrentBankAccount(event.data)

    const defaultColDef = {resizable: true, editable: false, filter: "agTextColumnFilter",}

  const table =
    <div
      style={{...styles.outer, height:180, padding:5, paddingTop: 20 }} >
            <BankAccountGrid
                // @ts-expect-error -- legacy, see TODO
                theme="legacy" columnDefs ={bankAccountColumnDefs(t)}  defaultColDef={defaultColDef} onGridReady={onGridReady}
                rowData ={current?.bankaccounts??[initBankAccount]} onRowSelected ={onRowSelected}/>
    </div>

  const addressForm = <AddressForm current={current} setCurrent={setCurrent} t={t} disable={disable} height={height}/>
  const bankAccountForm =<BankAccountForm currentBankAccount={currentBankAccount}
                                          setCurrentBankAccount={setCurrentBankAccount} businessPartner={current}
                                          setBusinessPartner={setCurrent} bankData={bankData} t={t}
                                          zIndex={zIndex-1} disable={disable}/>
  const customerAccountForm = <CustomerAccountMainForm current={current} setCurrent={setCurrent}
                                       accData={accData} vatData={vatData} t={t} disable={disable} height={height}
                                                       zIndex={zIndex}/>
  const generalForm = <CustomerGeneralForm<ICustomer | ISupplier | IEmployee> collapse={collapse} current={current} setCurrent={setCurrent} t={t}
                                           ccyData={ccyData} contactData={contactData} disable={disable}  height={height}/>
  const tabContent = [
      { title: t('common.general'), id: 1, form: generalForm},
      { title: t('common.address'), id: 2, form: addressForm },
      { title: t('common.accounts'), id: 3, form:customerAccountForm},
      { title: t('common.bankaccounts'), id: 4, form: table },
      { title: t('common.edited.bankaccount'), id: 5, form:bankAccountForm}
      //{ title: t('TEST2'), id: 6, form: FileInput()},
      //{ title: t('TEST3'), id: 7, form: FileOutput()},
    ]
  return <IWSTabs tabList={tabContent}/>
}
export {CustomerTabs}
