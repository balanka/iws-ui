import React from 'react';
import { CRow, CCol, CFormLabel } from '@coreui/react'
import { TFunction } from 'i18next'
import ComboBox from './ComboBox.tsx'
import { FromPeriod } from './common'
import { JournalProps } from '../Props'
import { IAccount } from "../Models.ts"
import { sortById } from '../utils/Utils.ts'
import { toOption } from '../utils/FormUtils.tsx'

export const JournalMainForm = ({
                                  current, setCurrent, t, accData, height, ids
                                }: {
  current: JournalProps;
  setCurrent: (arg: JournalProps) => void;
  t: TFunction<'translation', undefined>;
  accData: IAccount[];
  height: number;
  ids: string[];
}): React.JSX.Element => {

  const accounts = current?.isMulti ? accData.filter(acc => ids.includes(acc.account)) : accData;
  const currentAccount = accounts?.find(acc => acc.id === current.account);

  return (
    // <CInputGroup className="p-1 bg-light" style={{ borderBottom: '1px solid #ddd', minHeight: 28, height:400 }}>
      <CRow className="g-1 align-items-center">
      {/*<CRow className="w-100 align-items-center g-2">*/}
        {/* Account Selection - 6 columns on large screens */}
        <CCol xs={8} md={6} lg={5}>
          <div className="d-flex align-items-center gap-2">
            <CFormLabel className="m-0" style={{ minWidth: 60 }}>{t('common.account')}</CFormLabel>
            <ComboBox
              style={{ height: height-5, width: '100%', fontSize: 12 }}
              value={{ value: currentAccount?.id || '', label: currentAccount ? `${currentAccount.id} ${currentAccount.name}` : '' }}
              onChange={(value:any) => setCurrent({ ...current, account: value })}
              values={accounts?.slice().sort(sortById).map(toOption)}
              height ={height}
            />
          </div>
        </CCol>

        {/* From Period - 3 columns */}
        <CCol xs={6} md={3} lg={3}>
          <FromPeriod
            name="fromPeriod"
            label="common.from"
            current={current}
            value={current.fromPeriod}
            setCurrent={setCurrent}
            height ={height}
            t={t}
            style={{height, width: '90%', textAlign:'center'}} labelStyle={{ minWidth: 80 }}/>
        </CCol>

        {/* To Period - 3 columns */}
        <CCol xs={6} md={3} lg={3}>
          <FromPeriod
            name="toPeriod"
            label="common.to"
            current={current}
            value={current.toPeriod}
            setCurrent={setCurrent}
            height ={height}
            t={t}
            style={{height:height, width: '90%', textAlign:'center'}} labelStyle={{ minWidth: 80 }} />
        </CCol>
      </CRow>
  )
}

export default JournalMainForm
