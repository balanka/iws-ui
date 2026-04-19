import React from 'react'
import { CRow, CCol, CContainer } from '@coreui/react'
import ComboBox from './ComboBox'
import { InputField, TextareaField, DatePickerField } from './FormsProps'
import { ILineTransaction, IArticle } from '../Models'
import { sortById } from '../utils/Utils'
import { toOption } from '../utils/FormUtils'
import { initArticle, initVat } from './Menu'
import {formEnum} from '../utils/FormEnum'


const styles = { minHeight: 25, height: 25, width: '100%', color: '#6b7280', fontSize: 12 }
const FormRow = ({ children }: any) => <CRow className="g-2 align-items-center mb-2">{children}</CRow>
const Label = ({ children, w = 80 }: any) => <div style={{ minWidth: w }}>{children}</div>

const updateTransaction = (transaction: any, setTransaction: any, line: any, setLine: any) => {
  const lines = [...(transaction.lines || [])]
  const idx = lines.findIndex((l: any) => l.id === line.id)
  idx === -1 ? lines.push(line) : (lines[idx] = line)
  setTransaction({ ...transaction, lines })
  setLine(line)
}

export const TransactionDetailsForm = ({
                                         transaction, setTransaction, currentLineTransaction, setCurrentLineTransaction,
                                         articleData, vatData, t, disable, height
                                       }: any): React.JSX.Element => {

  const current = currentLineTransaction
  const setCurrent = setCurrentLineTransaction
  const article = articleData?.find((a: any) => a.id === current.article) ?? initArticle[0]
  const vat = vatData?.find((v: any) => v.id === current.vatCode) ?? initVat[0]

  const getPrice = (a: IArticle) => {
    const mid = transaction.modelid
    return (mid === formEnum.SALES_ORDER || mid === formEnum.CUSTOMER_INVOICE || mid === formEnum.DELIVERY) ? a.sprice :
      (mid === formEnum.PURCHASE_ORDER || mid === formEnum.SUPPLIER_INVOICE || mid === formEnum.GOODRECEIVING) ? a.pprice : 0
  }

  const handleChange = (updates: Partial<ILineTransaction>) => {
    const updated = { ...current, ...updates, company: `-${transaction.company}` }
    updateTransaction(transaction, setTransaction, updated, setCurrent)
  }

  const handleArticleChange = (value: string) => {
    const a = articleData?.find((a: any) => a.id === value) ?? initArticle[0]
    const v = vatData?.find((v: any) => v.id === a?.vatCode)
    handleChange({
      article: value, articleName: a?.name || '', unit: a?.quantityUnit || '',
      price: getPrice(a), vatCode: v?.id || '', vat: (v?.percent ?? 0) * current.quantity * getPrice(a),
      currency: a?.currency || ''
    })
  }

  const handleVatChange = (value: string) => {
    const v = vatData?.find((v: any) => v.id === value)
    handleChange({ vatCode: value, vat: (v?.percent ?? 0) * current.quantity * current.price })
  }

  const handleQuantityChange = (val: number) => {
    handleChange({ quantity: val, vat: (vat?.percent ?? 0) * val * current.price })
  }

  const handlePriceChange = (val: number) => {
    handleChange({ price: val, vat: (vat?.percent ?? 0) * current.quantity * val })
  }

  return (
    <CContainer fluid className="p-0">
      {/* Row 1: Article & Quantity */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('transaction.line.article')}</Label>
          <ComboBox style={styles} disable={disable} value={{ value: article?.id || '', label: article ? `${article.id} ${article.name}` : '' }} onChange={handleArticleChange} values={articleData?.slice().sort(sortById).map(toOption)} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('transaction.line.quantity')}</Label>
          <InputField fieldName="quantity" current={current} setCurrent={setCurrent} value={Number(current.quantity)} onChange={(e: any) => handleQuantityChange(e.target.value)} disabled={disable} style={{ height, width: 100, textAlign: 'right' }} />
          <InputField fieldName="unit" current={current} setCurrent={setCurrent} value={current.unit} disabled style={{ height, width: 80 }} />
        </CCol>
      </FormRow>

      {/* Row 2: VAT & Price */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('common.vatCode')}</Label>
          <ComboBox style={styles} disable={disable} value={{ value: vat?.id || '', label: vat ? `${vat.id} ${vat.name}` : '' }} onChange={handleVatChange} values={vatData?.slice().sort(sortById).map(toOption)} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('transaction.line.price')}</Label>
          <InputField fieldName="price" current={current} setCurrent={setCurrent} value={Number(current.price)} onChange={(e: any) => handlePriceChange(e.target.value)} disabled={disable} style={{ height, width: 100, textAlign: 'right' }} />
          <InputField fieldName="currency" current={current} setCurrent={setCurrent} value={current.currency} disabled style={{ height, width: 80 }} />
        </CCol>
      </FormRow>

      {/* Row 3: Text & Due Date */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('transaction.line.text')}</Label>
          <TextareaField fieldName="text" placeholder={t('transaction.line.text')} disabled={disable} value={current.text} current={current} setCurrent={setCurrent} onChange={(e: any) => handleChange({ text: e.target.value })} style={{ width: '100%' }} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label w={70}>{t('transaction.line.duedate')}</Label>
          <DatePickerField fieldName="duedate" label={t('transaction.line.duedate')} selected={current.duedate} current={current} setCurrent={setCurrent} onChange={(date: any) => handleChange({ duedate: date })} disabled={disable} />
        </CCol>
      </FormRow>
    </CContainer>
  )
}

export default TransactionDetailsForm
