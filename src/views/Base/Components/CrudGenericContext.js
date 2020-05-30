import React, {useState, createContext, useEffect} from 'react'
import AccountForm from "./AccountForm";
import CustomerForm from "./CustomerForm";
import CostCenterForm from "./CostCenterForm";
import BankStatementForm from "./BankStatementForm";
import VatForm from "./VatForm";
import PACBForm from "./PACBForm";
import JournalForm from "./JournalForm";
import FinancialsForm from "./FinancialsForm";
import GenericMasterfileForm from "./GenericMasterfileForm";
export const crudGenericContext = createContext();
export  const CrudGenericContext = props => {
  console.log(' initialState', props );

    return (
          <crudGenericContext.Provider value=''>
            {props.children}
         </crudGenericContext.Provider>
    );
}
