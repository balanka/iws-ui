import React from 'react'
import { CRow, CCol, CContainer } from '@coreui/react-pro'
import ComboBox from './ComboBox'
import { InputField, TextareaField, DatePickerField } from './common'
import {ILineTransaction, IArticle, ITransaction, IVat} from '../Models'
import { sortById } from '../utils/Utils'
import { toOption } from '../utils/FormUtils'
import { initArticle, initVat } from './Menu'
import { formEnum } from '../utils/FormEnum'
import { TransactionDetailsFormProps } from "../Props.ts"
//import CurrencyInput from "react-currency-input-field";
import {AmountField} from "./common/AmountField.tsx";

const styles = { minHeight: 25, height: 25, width: '100%', color: '#6b7280', fontSize: 12 }
const FormRow = ({ children }: any) => <CRow className="g-2 align-items-center mb-2">{children}</CRow>
const Label = ({ children, w = 80 }: any) => <div style={{ minWidth: w }}>{children}</div>

const setTransactionR = (
  transaction: ITransaction,
  setTransaction: (arg: ITransaction) => void,
  line: ILineTransaction,
  setCurrent: (arg: ILineTransaction) => void
) => {
  const idx = transaction?.lines?.findIndex((obj) => obj.id === line.id );
  if (idx === -1) {
    transaction.lines.push({...line})
  } else {
    transaction.lines[idx] = {...line, transid:line.id >BigInt(0)?BigInt(-1):line.transid}
  }
  setCurrent({...line})
  setTransaction({ ...transaction })
}
const getPrice = (transaction:ITransaction, article: IArticle) => {
  return (transaction.modelid === formEnum.SALES_ORDER ||
    transaction.modelid === formEnum.CUSTOMER_INVOICE_LOGISTIC ||
    transaction.modelid === formEnum.DELIVERY)
    ? article.sprice
    : (transaction.modelid === formEnum.PURCHASE_ORDER ||
      transaction.modelid === formEnum.SUPPLIER_INVOICE ||
      transaction.modelid === formEnum.GOODRECEIVING)
      ? article.pprice
      :(transaction.modelid === formEnum.STOCK_TRANSFER ||
        transaction.modelid === formEnum.CONSUMPTION||formEnum.STOCK_TAKE)
        ? article.avgPrice
        :0.0
}

const getVat2 = (line: ILineTransaction
                 , value:string, vatData: IVat []): [string, number] => {

  const vat = vatData?.find((vat: { id: any }) => vat.id === value) ?? initVat
  console.log(' vat ', vat)
  const percent = vat?.percent ?? 0.0
  const vatAmount_  = percent * line.quantity * line.price
  const vatCode_ = `${vat?.id}` || '-1'
  console.log(' percent ', percent)
  console.log(' vatAmount_ ', vatAmount_)
  const [vatCode, vatAmount] =(line.modelid === formEnum.SALES_ORDER ||
    line.modelid === formEnum.CUSTOMER_INVOICE_LOGISTIC ||
    line.modelid === formEnum.DELIVERY||
    line.modelid === formEnum.PURCHASE_ORDER ||
    line.modelid === formEnum.SUPPLIER_INVOICE ||
    line.modelid === formEnum.GOODRECEIVING)
    ? [vatCode_, vatAmount_]: [vatCode_, 0.0]
  return [vatCode, vatAmount]

}

const getVat = (line: ILineTransaction, value:string, articleData: IArticle []
                , vatData: IVat []): [string, number] => {
  const article = articleData?.find((acc: { id: any }) => acc.id === value) ?? initArticle
  const vat = vatData?.find((vat: { id: any }) => vat.id === article?.vatCode) ?? initVat
  console.log(' vat ', vat)
  const percent = vat?.percent ?? 0.0
  const vatAmount_  = percent * line.quantity * line.price
  const vatCode_ = `${vat?.id}` || '-1'
  console.log(' percent ', percent)
  console.log(' vatAmount_ ', vatAmount_)
  const [vatCode, vatAmount] =(line.modelid === formEnum.SALES_ORDER ||
    line.modelid === formEnum.CUSTOMER_INVOICE_LOGISTIC ||
    line.modelid === formEnum.DELIVERY||
    line.modelid === formEnum.PURCHASE_ORDER ||
    line.modelid === formEnum.SUPPLIER_INVOICE ||
    line.modelid === formEnum.GOODRECEIVING)
    ? [vatCode_, vatAmount_]: [vatCode_, 0.0]
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
  const currentArticle = articleData?.find((acc: { id: any }) => acc.id === currentLineTransaction.article) ?? initArticle
  const currentVat = vatData?.find((vat: { id: any }) => vat.id === currentLineTransaction.vatCode) ?? initVat

  return (
    <CContainer fluid className="p-0">
      {/* Row 1: Article & Quantity */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('transaction.line.article')}</Label>
          <ComboBox
            style={styles}
            disable={disable}
            key={`article-${currentLineTransaction?.article || 'empty'}`}
            value={{ value: currentArticle?.id || '', label: currentArticle ? `${currentArticle.id} ${currentArticle.name}` : '' }}
            onChange={(value: any) => {
              const [vatCode, vatAmount] = getVat(currentLineTransaction, value, articleData, vatData)
              const article = articleData?.find((acc: { id: any }) => acc.id === value) ?? initArticle
              const currentx: ILineTransaction = {
                ...currentLineTransaction,
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
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            values={articleData.length>0?articleData?.slice().sort(sortById).map(toOption):[toOption(initArticle)]}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('transaction.line.quantity')}</Label>
          <AmountField
            amount={Number(currentLineTransaction.quantity) || 0}
            locale={locale}
            // no `currency` prop → rendered as a plain number
            decimals={3}
            disabled={disable}
            style={{ height: height, textAlign: 'right' }}
            onCommit={(value) => {
              const [, vatAmount] = getVat(
                currentLineTransaction,
                currentLineTransaction.article,
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
              setCurrentLineTransaction(currentx)
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
          />
          <InputField
            fieldName="unit"
            current={currentLineTransaction}
            setCurrent={setCurrentLineTransaction}
            value={currentLineTransaction.unit}
            disabled={true}
            style={{ height: height, textAlign: 'left' }}
          />
        </CCol>
      </FormRow>

      {/* Row 2: VAT & Price */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('common.vatCode')}</Label>
          <ComboBox
            style={styles}
            disable={disable}
            key = 'vatCode'
            //key={`vat-${currentLineTransaction?.vatCode || 'empty'}`}
            value={{ value: currentVat?.id || '', label: currentVat ? `${currentVat.id} ${currentVat.name}` : '' }}
            onChange={(value: any) => {
              const [vatCode, vatAmount] = getVat2(currentLineTransaction, value, vatData)
              console.log(' value ', value)
              console.log(' vatCode ', vatCode)
              console.log(' vatAmount ', vatAmount)
              const netAmount =  currentLineTransaction.quantity * currentLineTransaction.price
              const currentx = { ...currentLineTransaction, vatCode: vatCode, vat: vatAmount, net:netAmount
                , total:netAmount+vatAmount, company:transaction.company }
              console.log(' currentx', currentx)
              setCurrentLineTransaction(currentx)
              setTransactionR(transaction, setTransaction, currentx, setCurrentLineTransaction)
            }}
            values={vatData.length>0?vatData?.slice().sort(sortById).map(toOption):[toOption(initVat)]}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('transaction.line.price')}</Label>
          <AmountField
            amount={currentLineTransaction.price ?? 0}
            locale={locale}
            currency={currency}
            disabled={transaction.posted}
            style={{ height: height??32-20, textAlign: 'right' }}
            //style={{ ...currencyStyle, fontSize: 12, fontWeight: 'bold', width: '65%' }}
            onCommit={(value) => {
              const finalValue = value || 0

              const [, vatAmount] = getVat(
                currentLineTransaction,
                currentLineTransaction.article,
                articleData,
                vatData
              )
              const netAmount = currentLineTransaction.quantity * finalValue
              const next = {
                ...currentLineTransaction,
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
      </FormRow>

      {/* Row 3: Text & Due Date */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2">
          <Label>{t('transaction.line.text')}</Label>
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
            style={{ width: '100%' }}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label w={70}>{t('transaction.line.duedate')}</Label>
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
          />
        </CCol>
      </FormRow>
    </CContainer>
  )
}

export default TransactionDetailsForm
