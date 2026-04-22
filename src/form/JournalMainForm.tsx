import React from 'react';
import { CRow, CCol, CInputGroup, CFormLabel } from '@coreui/react'
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
    <CInputGroup className="p-1 bg-light" style={{ borderBottom: '1px solid #ddd', minHeight: 28 }}>
      <CRow className="w-100 align-items-center g-1">
        {/* Account Selection - 6 columns on large screens */}
        <CCol xs={12} md={6} lg={5}>
          <div className="d-flex align-items-center gap-1">
            <CFormLabel className="m-0" style={{ minWidth: 60 }}>{t('common.account')}</CFormLabel>
            <ComboBox
              style={{ height: 25, width: '100%', fontSize: 12 }}
              value={{ value: currentAccount?.id || '', label: currentAccount ? `${currentAccount.id} ${currentAccount.name}` : '' }}
              onChange={(value) => setCurrent({ ...current, account: value })}
              values={accounts?.slice().sort(sortById).map(toOption)}
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
            t={t}
            style={{height, width: '100%'}} labelStyle={undefined}          />
        </CCol>

        {/* To Period - 3 columns */}
        <CCol xs={6} md={3} lg={3}>
          <FromPeriod
            name="toPeriod"
            label="common.to"
            current={current}
            value={current.toPeriod}
            setCurrent={setCurrent}
            t={t}
            style={{height, width: '100%'}} labelStyle={undefined}          />
        </CCol>
      </CRow>
    </CInputGroup>
  )
}

export default JournalMainForm
