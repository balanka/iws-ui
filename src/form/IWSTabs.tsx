import React, { useState } from 'react'
import { CTab, CTabContent, CTabPanel, CTabs, CTabList } from "@coreui/react";
import { isArrayAndNotEmpty } from "../utils/Utils.ts";

export interface TabItem {
  title: string;
  id: number;
  form: React.JSX.Element;
}

export interface Props {
  tabList: TabItem[];
  zIndex?: number;
}


export const IWSTabs = ({ tabList, zIndex }: Props): React.JSX.Element => {
  const activeTabIndex = isArrayAndNotEmpty(tabList) ? tabList[0]?.id : 0;
  const [activeTab, setActiveTab] = useState<number | string>(activeTabIndex);
  const index = zIndex ? zIndex : 99997;

  return (
    <div style={{ width: '100%' }}>
      <CTabs
        activeItemKey={activeTab}
        onChange={setActiveTab}
      >
        <CTabList variant='pills' style={{ fontSize: 'small', zIndex: index - 1 }}>
          {tabList.map((item) => (
            <CTab key={item.id} itemKey={item.id}>
              {item.title}
            </CTab>
          ))}
        </CTabList>

        <CTabContent style={{ fontSize: 'small', paddingTop: 15, zIndex: index - 1 }}>
          {tabList.map((item) => (
            <CTabPanel key={item.id} itemKey={item.id}>
              <div style={{ width: '100%' }}>
                {item.form}
              </div>
            </CTabPanel>
          ))}
        </CTabContent>
      </CTabs>
    </div>
  )
}

export default IWSTabs;
