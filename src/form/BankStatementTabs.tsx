import { IWSTabs } from './IWSTabs.tsx'
import { BankStatementMainForm } from './BankStatementMainForm'
import { FileSystemForm } from './FileSystemForm'
import {BankStatementProps} from '../Props'

const BankStatementTabs = ({ collapse, current, setCurrent,  locale,  t,  currency, height }:BankStatementProps) => {
  const GetTabContent = () => {
    return [
      { title: t('common.general'), id: 1,
        form:<BankStatementMainForm collapse={collapse} current={current} setCurrent={setCurrent} t={t}
               locale={locale} currency={currency} height={height}/>  },
      { title: t('bankstatement.parameter'), id: 2
        , form: <FileSystemForm current={current} setCurrent={setCurrent} t={t} height={height} disable={current.posted}/> },
    ]
  }

  return <IWSTabs tabList={GetTabContent()} />
}
export default BankStatementTabs
