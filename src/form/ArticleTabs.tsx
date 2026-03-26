import React from 'react'
import {IWSTabs, TabItem} from './IWSTabs.tsx'
import { StockGrid } from "../IWSGrid.tsx"
import { styles } from './BasicTreeTableProps'
import {stockColumnDefs} from '../ColumnsDefs.ts'
import {ArticleAccountForm, ArticleGeneralForm, ArticleQRForm} from './FormsProps'
// @ts-ignore
import type {RowSelectedEvent} from 'ag-grid-community/dist/types/src/events'
import {IStock} from "../Models.ts";
import {ArticleProps} from "../Props.ts";
import {initArticle} from "./Menu.tsx";

export  const ArticleTabs = (
    {collapse, current, setCurrent,  accData, vatData, quantityUnitData, groupData, ccyData,  t,  disable, height}:ArticleProps) => {
  //const  props:ArticleProps = {collapse, current, setCurrent, data, accData, vatData, quantityUnitData, groupData, ccyData, locale, currency, t,  disable, height, zIndex }

  const onRowSelected = (event: RowSelectedEvent<IStock[],any>) =>
                                              setCurrent((event.data instanceof Array)?event.data[0]:event.data)
  const getTable = () =>
    // <Grid container
    //     // @ts-ignore
    //       style={{...styles.outer, /*width:'100%',*/ height:180,  paddingTop: 10,}} maximize direction="row">
      <div
        // @ts-ignore
        style={{...styles.outer, height:180, display: !collapse?'none':''}} >
      <StockGrid
          // @ts-ignore
          theme="legacy" columnDefs ={stockColumnDefs(t)}
                       onRowSelected={onRowSelected} rowData ={current?.stocks?current?.stocks:initArticle[0].stocks}/>
      </div>
// current, setCurrent, accData, vatData, t,  disable, height
  const tabContent:TabItem[] = [
      { title: t('common.general'), id: 1, form: <ArticleGeneralForm collapse={collapse}  current={current??initArticle[0]} setCurrent={setCurrent}
               t={t}  quantityUnitData={quantityUnitData} groupData={groupData}  ccyData={ccyData} disable={disable} height={height}/>},
      { title: t('common.accounts'), id: 2, form: ArticleAccountForm({ current:current, setCurrent:setCurrent
          ,  accData:accData, vatData:vatData, t:t,  disable:disable, height:height})},
      { title: t('stock.title'), id: 4, form: getTable() },
      { title: t('common.image_QR_code'), id: 5, form: <ArticleQRForm  current={current} t={t}/> },
    ]

  return <IWSTabs tabList={tabContent} />
}

