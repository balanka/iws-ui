import { IJournalProps } from '../Props.ts'
import { TFunction } from "i18next";
import { IArticle, IStore } from '../Models.ts'
import {CRow, CCol, CInputGroup, CInputGroupText} from '@coreui/react';
import ComboBox from './ComboBox.tsx'
import { initArticle, initStore } from './Menu.tsx'
import { sortById } from '../utils/Utils.ts'
import { toOption } from '../utils/FormUtils.tsx'
import { FromPeriod } from './FormsProps.tsx'


export const InventoryJournalMainForm = ({
                                           current, setCurrent, t, artData, storeData, height
                                         }: {
  current: IJournalProps, setCurrent: (arg: IJournalProps) => void,
  t: TFunction<'transalation', undefined>, artData: IArticle[], storeData: IStore[], height: number
}) => {
  const currentArticle = artData?.find(a => a.id === current.article)
  const currentStore = storeData?.find(s => s.id === current.store)


  return (
    <CRow className="g-1 align-items-center">
      <CCol xs={12} sm={6}>
        <CInputGroup className="align-items-center" style={{ height: 30 }}>
          <CInputGroupText className="bg-transparent border-0 p-0 pe-2" style={{ width: 80 }}>
            <small>{t('article.title')}</small>
          </CInputGroupText>
          <ComboBox
            style={{ height: 25, width: '100%', fontSize: 12 }}
            value={{ value: currentArticle?.id || '', label: currentArticle ? `${currentArticle.id} ${currentArticle.name}` : '' }}
            onChange={(value) => setCurrent({ ...current, article: value })}
            // @ts-ignore
            values={[...artData, initArticle].sort(sortById).map(toOption)}
          />
        </CInputGroup>
      </CCol>

      <CCol xs={12} sm={6}>
        <CInputGroup className="align-items-center" style={{ height: 30 }}>
          <CInputGroupText className="bg-transparent border-0 p-0 pe-2" style={{ width: 80 }}>
            <small>{t('store.title')}</small>
          </CInputGroupText>
          <ComboBox
            style={{ height: 25, width: '100%', fontSize: 12 }}
            value={{ value: currentStore?.id || '', label: currentStore ? `${currentStore.id} ${currentStore.name}` : '' }}
            onChange={(value) => setCurrent({ ...current, store: value })}
            // @ts-ignore
            values={[...storeData, initStore].sort(sortById).map(toOption)}
          />
        </CInputGroup>
      </CCol>

      <CCol xs={6} sm={3}>
        <FromPeriod
          name="fromPeriod" label="common.from"
          current={current} value={current.fromPeriod} setCurrent={setCurrent} t={t}
          style={{ height, width: '100%' }}
        />
      </CCol>

      <CCol xs={6} sm={3}>
        <FromPeriod
          name="toPeriod" label="common.to"
          current={current} value={current.toPeriod} setCurrent={setCurrent} t={t}
          style={{height, width: '100%'}}/>
      </CCol>
    </CRow>
  )
}
