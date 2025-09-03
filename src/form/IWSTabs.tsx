import React, {useState} from 'react'

import {CTab, CTabContent, CTabPanel, CTabs, CTabList} from "@coreui/react";
import {isArrayAndNotEmpty} from "../utils/Utils.ts";
export interface TabItem {title: string, id: number, form:React.JSX.Element}
export interface  Props { tabList:TabItem[], zIndex?:number}
export const IWSTabs= ({ tabList, zIndex}:Props):React.JSX.Element => {
    const activeTabIndex= isArrayAndNotEmpty(tabList)?tabList[0]?.id:0
    const [activeTab, setActiveTab] = useState<number | string>(activeTabIndex)
    const index= zIndex?zIndex:99997

    const getTabList=  (item:TabItem)=> <CTab itemKey={item.id} style={{zIndex:index-1}}>{item.title} </CTab>
    const getTabContent = (item:TabItem) => <CTabPanel  itemKey={item.id} style={{zIndex:index-1}}> {item.form} </CTabPanel>
    //  'pills', 'tabs', 'underline', 'underline-border'
    return (
        <CTabs activeItemKey={activeTab} onChange={setActiveTab} >
            <CTabList  variant='pills' style={{backgroundColor:"#d7d0f2", fontSize:'small', zIndex:index-1}} >
                {tabList.map((item) => getTabList(item))}
            </CTabList>
            <CTabContent style={{backgroundColor:"#d7d0f2", fontSize:'small', zIndex:index-1}}>
                {tabList.map((item) => getTabContent(item))}
            </CTabContent>
        </CTabs>
    )
}

export default IWSTabs