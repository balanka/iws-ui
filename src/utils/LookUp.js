import React from 'react'
import AccountForm from "../views/Base/Components/AccountForm";
import CostCenterForm from "../views/Base/Components/CostCenterForm";
import CustomerForm from "../views/Base/Components/CustomerForm";
import VatForm from "../views/Base/Components/VatForm";
import GenericMasterfileForm from "../views/Base/Components/GenericMasterfileForm";

 const LookUp=(props)=> {
  const registry = {
    accountForm    : (<AccountForm/>),
    costCenterForm : (<CostCenterForm/>),
    customerForm   : (<CustomerForm/>),
    supplierForm   : (<CustomerForm/>),
    vatForm        : (<VatForm/>),
    masterfileForm : (<GenericMasterfileForm/>)
  };
  return(registry[props.name]);
};
export default LookUp

