import { StockGrid } from "../IWSGrid.tsx"
import { styles } from './BasicTreeTableProps.jsx'
import {stockColumnDefs} from '../ColumnsDefs.ts'
import { CustomerAccountMainForm } from './CustomerAccountMainForm'
import { MasterfileFormWithout} from './MasterfileFormWithout'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import IWSTabs from "./IWSTabs.tsx";
import {CustomerAccountMainFormProps, StoreGeneralFormProps, StoreProps} from '../Props'
import {initStore} from "./Menu.tsx";

export  const StoreTabs =(
    { collapse, current, setCurrent, ccData, accData, locale,  t,  disable, height, zIndex, minMaxHieght }:StoreProps) => {
    const  props:CustomerAccountMainFormProps = {current, setCurrent, ccData, accData, vatData:[],  t,  disable, height, zIndex}
    const  props2:StoreGeneralFormProps = {collapse, current, setCurrent, accData, locale,  t,  disable, height }

  const geform  =({collapse, current, setCurrent, accData,   t,  disable, height }:StoreGeneralFormProps) =>{
    return (
      <div
      //@ts-ignore
        style={{...styles.outer, paddingBottom:10, display: !collapse?'none':''}} >
        <MasterfileFormWithout collapse={collapse} current={current} setCurrent={setCurrent} accData={accData} t={t}
                               disable={disable} height={height} propertyName={'account'} fieldName={'common.account'}/>
      </div>

    )
  }
  const getTable = () =>
      <div  style={{...styles.outer0, paddingTop:15, height:minMaxHieght,  minWidth:"100%"}}>
          <StockGrid
              // @ts-ignore
              theme="legacy" columnDefs ={stockColumnDefs(t)}
                       onRowSelected={()=>{}} rowData ={current?.stocks??initStore[0].stocks} />
      </div>

    const tabContent =
     [{ title: t('common.general'), id: 1, form: geform (props2) },
      { title: t('common.accounts'), id: 2, form: CustomerAccountMainForm(props)},
      { title: t('stock.title'), id: 4, form: getTable() },
    ]

  return <IWSTabs tabList={ tabContent} />
}

