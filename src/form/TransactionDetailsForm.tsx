import React from 'react'
import { CCol, CContainer } from '@coreui/react-pro'
import ComboBox from './ComboBox'
import { InputField, TextareaField, DatePickerField } from './common'
import {ILineTransaction, IArticle, ITransaction, IVat} from '../Models'
import { sortById } from '../utils/Utils'
import { FormRow, Label, toOption } from '../utils/FormUtils'
import { initArticle, initVat } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { TransactionDetailsFormProps } from "../Props.ts"
import {AmountField} from "./common/AmountField.tsx";

const styles = { minHeight: 25, height: 30, width: '100%', color: '#6b7280', fontSize: 12 }

const setTransactionR = (
  transaction: ITransaction,
  setTransaction: (arg: ITransaction) => void,
  line: ILineTransaction,
  setCurrent: (arg: ILineTransaction) => void
) => {
  const dx: ITransaction = { ...transaction }
  const lines: ILineTransaction[] = Object.prototype.hasOwnProperty.call(dx, 'lines')
    ? [...(dx.lines ?? [])]
    : []

  const idx = lines.findIndex((obj) => obj.id === line.id)

  const lineWithModel: ILineTransaction = {
    ...line,
    transid: line.id > BigInt(0) ? BigInt(-1) : line.transid,
    modelid: transaction.modelid,
  }

  if (idx === -1) {// new line — append
    lines.push(lineWithModel)
  } else { // existing line — replace in place
    lines[idx] = lineWithModel
  }

  dx.lines = lines

  setCurrent({ ...line })
  setTransaction(dx)
}

type PriceKey = 'sprice' | 'pprice' | 'avgPrice'

const PRICE_FIELD_BY_MODEL: Record<number, PriceKey> = {
  [formEnum.SALES_ORDER]: 'sprice',
  [formEnum.CUSTOMER_INVOICE_LOGISTIC]: 'sprice',
  [formEnum.DELIVERY]: 'sprice',
  [formEnum.PURCHASE_ORDER]: 'pprice',
  [formEnum.SUPPLIER_INVOICE]: 'pprice',
  [formEnum.GOODRECEIVING]: 'pprice',
  [formEnum.STOCK_TRANSFER]: 'avgPrice',
  [formEnum.CONSUMPTION]: 'avgPrice',
  [formEnum.STOCK_TAKE]: 'avgPrice',
}

const getPrice = (transaction: ITransaction, article: IArticle): number => {
    const field = PRICE_FIELD_BY_MODEL[transaction.modelid]
    return field ? (article[field] ?? 0.0) : 0.0
}

const VAT_MODEL_IDS = new Set<number>([
      formEnum.SALES_ORDER,
      formEnum.CUSTOMER_INVOICE_LOGISTIC,
      formEnum.DELIVERY,
      formEnum.PURCHASE_ORDER,
      formEnum.SUPPLIER_INVOICE,
      formEnum.GOODRECEIVING,
      ])

const getVat2 = (line: ILineTransaction, value: string, vatData: IVat[]): [string, number] => {
      const vat = vatData?.find((v) => v.id === value) ?? initVat
      console.log('vatZZZZZZ line', line)
      console.log('vatZZZZZZ', vat)
      const vatCode = `${vat?.id ?? ''}`
      const hasVat = VAT_MODEL_IDS.has(line.modelid)
      const vatAmount = hasVat ? (vat?.percent ?? 0) * line.quantity * line.price : 0.0
       console.log('vatZZZZZZXXXX', vatCode, vatAmount)
      return [vatCode, vatAmount]
    }

const getVat = (
      line: ILineTransaction,
      value: string,
      articleData: IArticle[],
      vatData: IVat[]): [string, number] => {
      console.log('value/line', value, line)
        const article = articleData?.find((a) => a.id === value) ?? initArticle
        const vat = vatData?.find((v) => v.id === article?.vatCode) ?? initVat
        console.log('article/Vat', article, vat, value)
        const vatCode = `${vat?.id ?? ''}`
        const vatAmount = VAT_MODEL_IDS.has(line.modelid)
                          ? (vat?.percent ?? 0) * line.quantity * line.price : 0.0
      console.log('vatZZZZZZXXXX', vatCode, vatAmount)

  return [vatCode, vatAmount]
}
export const TransactionDetailsForm = ({
                                         transaction,
                                         setTransaction,
                                         currentLineTransaction,
                                         setCurrentLineTransaction,
                                         articleData,
                                         vatData,
                                         t,
                                         disable,
                                         height,
                                         locale,
                                         currency
                                       }: TransactionDetailsFormProps<ITransaction, ILineTransaction>): React.JSX.Element => {
  // Find current article and vat
  var currentArticle = articleData?.find((acc: { id: any }) => acc.id === currentLineTransaction.article) ?? initArticle
  const currentVat = vatData?.find((vat: { id: any }) => vat.id === currentLineTransaction.vatCode) ?? initVat
  const netAmount = currentLineTransaction.quantity * currentLineTransaction.price
  const numberStyle = { height: (height??30) - 3,  fontSize: '0.875rem', textAlign: 'right' as const, padding: 10 };
  var currentLine = currentLineTransaction


  return (
    <CContainer fluid className="p-0">
      {/* Row 1: Article & Quantity */}
      <FormRow height={height}>
        <CCol sm={6} className="d-flex gap-2">
          <Label with={30} paddingLeft={20}>{t('transaction.line.article')}</Label>
          <ComboBox
            style={{...styles, width: '80%'}}
            disable={disable}
            key={`article-${currentLine?.article || 'empty'}`}
            onChange={(value: any) => {
              const [vatCode, vatAmount] = getVat(currentLine, value, articleData, vatData)
              console.log('VAT Code/vatAmount', vatCode, vatAmount)
              const article = articleData?.find((acc: { id: any }) => acc.id === value) ?? initArticle
              currentArticle = article
              const currentx: ILineTransaction = {
                ...currentLine,
                article: value,
                articleName: article?.name || '',
                unit: article?.quantityUnit || '',
                price: getPrice(transaction, article),
                vatCode: vatCode.toString(),
                vat: vatAmount,
                currency: article?.currency || '',
                company: transaction.company
              }
              setCurrentLineTransaction(currentx)
              currentLine = currentx
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            value={{ value: currentArticle?.id || '', label: currentArticle ? `${currentArticle.id} ${currentArticle.name}` : '' }}
            values={articleData.length>0?articleData?.slice().sort(sortById).map(toOption):[toOption(initArticle)]}
          />
        </CCol>
        <CCol sm={3} className="d-flex gap-1">
          <Label width={10} paddingLeft={5}>{t('transaction.line.quantity')}</Label>
          <AmountField
            id="transaction.line.quantity"
            amount={Number(currentLineTransaction.quantity) || 0}
            locale={locale}
            decimals={2}
            disabled={disable}
            style={{ ...numberStyle, width: '60%', paddingLeft:5 }}
            onCommit={(value) => {
              const [, vatAmount] = getVat(
                currentLine,
                currentLine.article,
                articleData,
                vatData
              )
              const netAmount = value * currentLineTransaction.price
              const currentx = {
                ...currentLineTransaction,
                quantity: value,
                vat: vatAmount,
                net: netAmount,
                total: netAmount + vatAmount,
                company: transaction.company,
              }
              currentLine = currentx
              setCurrentLineTransaction(currentx)
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
          />
        </CCol>
       <CCol sm={3} className="d-flex gap-1">
          <InputField
            fieldName="unit"
            current={currentLineTransaction}
            setCurrent={setCurrentLineTransaction}
            value={currentLineTransaction.unit}
            disabled={true}
            style={{ height: height, width:'20%', textAlign: 'left', paddingLeft:1 }}
          />
        </CCol>
      </FormRow>

      {/* Row 2: VAT & Price */}
      <FormRow height={height}>
        <CCol sm={6} className="d-flex gap-2">
          <Label with={30} paddingLeft={20}>{t('common.vatCode')}</Label>
          <ComboBox
            style={{...styles, width: '80%'}}
            disable={disable}
            key = 'vatCode'
            value={{ value: currentVat?.id || '', label: currentVat ? `${currentVat.id} ${currentVat.name}` : '' }}
            onChange={(value: any) => {
              const [vatCode, vatAmount] = getVat2(currentLine, value, vatData)
              console.log('VAT Code/vatAmount', vatCode, vatAmount)
              const netAmount =  currentLine.quantity * currentLine.price
              const currentx = { ...currentLine, vatCode: vatCode, vat: vatAmount, net:netAmount
                , total:netAmount+vatAmount, company:transaction.company }
              console.log('currentx', currentx)
              setCurrentLineTransaction(currentx)
              currentLine = currentx
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            values={vatData.length>0?vatData?.slice().sort(sortById).map(toOption):[toOption(initVat)]}
          />
        </CCol>
        <CCol sm={3} className="d-flex gap-1">
          <Label with={10} paddingLeft={2}>{t('transaction.line.price')}</Label>
          <AmountField
            id="transaction.line.price"
            amount={currentLineTransaction.price ?? 0}
            locale={locale}
            currency={currency}
            disabled={transaction.posted}
            style={{ ...numberStyle, width: '60%', paddingLeft:5 }}
            onCommit={(value) => {
              const finalValue = value || 0
              const [, vatAmount] = getVat(
                currentLine,
                currentLine.article,
                articleData,
                vatData
              )
              const netAmount = currentLine.quantity * finalValue
              const next = {
                ...currentLine,
                price: finalValue,
                vat: vatAmount,
                net: netAmount,
                total: netAmount + vatAmount,
                company: transaction.company,
              }

              setCurrentLineTransaction(next)
              setTransactionR(transaction, setTransaction, next, setCurrentLineTransaction)
            }}
          />
        </CCol>
        <CCol sm={3} className="d-flex gap-1">
            <Label with={5} paddingLeft={1} >{t('common.vat')}</Label>
            <AmountField
              id="common.vat"
              amount={currentLineTransaction.vat ?? 0}
              locale={locale}
              currency={currency}
              disabled
              style={{ ...numberStyle, width: '60%', paddingLeft:5 }}
            />
        </CCol>
      </FormRow>

      {/* Row 3: Text & Due Date */}
      <FormRow height={height}>
        <CCol sm={6} className="d-flex gap-2">
          <Label with={10} paddingLeft={10}>{t('transaction.line.text')}</Label>
          <TextareaField
            fieldName="text"
            placeholder={t('transaction.line.text')}
            disabled={disable}
            value={currentLineTransaction.text}
            current={currentLineTransaction}
            setCurrent={setCurrentLineTransaction}
            onChange={(event: any) => {
              const currentx = { ...currentLineTransaction, text: event.target.value}
              setCurrentLineTransaction(currentx)
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            style={{ width: '80%' }}
          />
        </CCol>
        <CCol sm={3} className="d-flex gap-1">
          <Label with={10} paddingLeft={2}>{t('transaction.line.duedate')}</Label>
          <DatePickerField
            fieldName="duedate"
            label={t('transaction.line.duedate')}
            selected={currentLineTransaction.duedate}
            current={currentLineTransaction}
            setCurrent={setCurrentLineTransaction}
            onChange={(date: any) => {
              const currentx = { ...currentLineTransaction, duedate: date }
              setCurrentLineTransaction(currentx)
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            disabled={disable}
            style={{...numberStyle, width: '65%', paddingLeft:5, zIndex: 9999 }}
          />
        </CCol>
        <CCol sm={3} className="d-flex gap-1">
            <Label with={5} paddingLeft={1}>{t('common.total')}</Label>
            <AmountField
              id="common.total"
              amount={netAmount + currentLineTransaction.vat}
              locale={locale}
              currency={currency}
              disabled
              style={{...numberStyle,  width: '60%', paddingLeft:5 }}
            />
        </CCol>
      </FormRow>
    </CContainer>
  )
}

export default TransactionDetailsForm
