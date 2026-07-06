import  {JSX, Dispatch, SetStateAction} from 'react'
import {CCol, CContainer, CInputGroup} from '@coreui/react-pro'
import { BooleanField, InputField, DatePickerField, TextareaField, FormMasterfileXComboBox, CurrencyField,
  FromTransactionComboBox, FormMasterfileComboBox2,
} from './common'
import {  styles } from './FormsProps'
import {IFinancials, IMasterfile, IAccount, IFmodule, ILineFinancials } from '../Models'
import { TFunction } from 'i18next'
import {initCc, initContact, initfModule} from './Menu'
import {FormRow, Label, toOption} from '../utils/FormUtils'
import {isArrayAndNotEmpty, sortById} from '../utils/Utils'
import ComboBox from './ComboBox'

interface FinancialsMainFormProps {
  readonly collapse: boolean;
  current: IFinancials;
  readonly setCurrent: (arg: IFinancials) => void;
  readonly t: TFunction<'translation', undefined>;
  readonly storeData: IMasterfile[];
  readonly accData: IAccount[];
  readonly contactData?: IMasterfile[];
  readonly modules: IFmodule[];
  readonly copyFromTransaction: IFinancials[];
  readonly handleModuleChange: (value: any) => void;
  readonly submitCopy: (id: bigint, modelid: number) => void;
  readonly accountFilter: string[];
  readonly oaccountFilter: string[];
  currentLineFinancials: ILineFinancials;
  readonly setCurrentLineFinancials: Dispatch<SetStateAction<ILineFinancials>>;
  readonly height: number;
  readonly zIndex: number;
  readonly locale: string;
  readonly currency: string;
}
const setTransactionF = (transaction: IFinancials
                         , setTransaction: (arg: IFinancials) => void
                         , line: ILineFinancials, setCurrent: (arg: ILineFinancials) => void) => {
  const idx = transaction?.lines?.findIndex((obj) => (obj.id === line.id))
  if (idx !== undefined && idx !== -1) {
    const updatedLines = [...transaction.lines]
    updatedLines[idx] = { ...line, transid:line.id >BigInt(0)?BigInt(-1):line.transid }
    setTransaction({ ...transaction, lines: updatedLines })
  } else {
    // Add new line
    setTransaction({...transaction, lines: [...(transaction.lines || []), { ...line, transid: transaction.id }]})
  }
  setCurrent({...line})
}

export const FinancialsMainForm = ({
                                     collapse,
                                     current,
                                     setCurrent,
                                     t,
                                     storeData,
                                     accData,
                                     contactData,
                                     modules,
                                     copyFromTransaction,
                                     handleModuleChange,
                                     submitCopy,
                                     accountFilter,
                                     oaccountFilter,
                                     currentLineFinancials,
                                     setCurrentLineFinancials,
                                     height = 28,
                                     zIndex,
                                     locale,
                                     currency
                                   }: FinancialsMainFormProps): JSX.Element | null => {
  if (!collapse) return null;
  //console.log('storeData', storeData)
  //console.log('AccData', accData)
  console.log('contactData', contactData)
  console.log('currentLineFinancials', currentLineFinancials)
  const currentx: IFinancials =   current
  let currentLine = isArrayAndNotEmpty(currentx?.lines)? currentx?.lines[0]:currentLineFinancials
  currentLine = (currentx?.lines?.length===1)?currentLine:currentLineFinancials
  console.log('currentLine', currentLine)
  const modelid = currentx?.modelid ?? 0;
  const currentModule = modules.find((m: IFmodule) => m.id === BigInt(modelid)) ?? initfModule;
  const total = currentx?.lines?.reduce((prev, cur) => prev + (cur?.amount || 0), 0) ?? 0;
  const inputStyle = { height: height - 5, width: '100%', fontSize: '0.875rem' };
  const currencyStyle = { height: height - 5, padding:4, textAlign: 'right' as const, width: '100%' };

  return (
  <div style={{ ...styles.outer, height:200, display: !collapse ? 'none' : '' }}>
    <CContainer fluid className="p-0">
      {/* Row 1: Module + ID + OID */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2" style={{height: height}}>
          <Label>{t('common.id')}</Label>
          <InputField fieldName="id" current={currentx} setCurrent={setCurrent} value={currentx.id} disabled={currentx.posted} style={{ ...inputStyle, width: '50%', textAlign: 'right' }} />
          <Label>{t('fmodule.title')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(currentModule?.id ?? 0), label: `${BigInt(currentModule?.id ?? 0)}
           ${currentModule?.name ?? ''}` }} onChange={handleModuleChange} values={modules.slice().sort(sortById).map(toOption)}
                    key="moduleComboBox" height ={height-5}
                    zIndex={99999} />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 ">
          <Label>{t('common.contact')}</Label>
          <FormMasterfileXComboBox key="contactComboBox"
                                   fieldName="contact"
                                   current={currentx}
                                   setCurrent={setCurrent}
                                   data={contactData??[]}
                                   defaultValue={initContact}
                                   zIndex={zIndex}
                                   disable={currentx.posted} styles={inputStyle} fontSize={10} height ={height-10}/>
        </CCol>
      </FormRow>
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2" style={{height: height, paddingTop:2}}>
          <Label>{t('transaction.oid')}</Label>
          <InputField fieldName="oid" current={currentx} setCurrent={setCurrent} value={current.oid} disabled={current.posted} style={{...inputStyle, width:'50%', textAlign: 'right' }} />
          <Label>{t('common.copyFrom')}</Label>
          <FromTransactionComboBox   key="copyFromComboBox"
            current={currentx}
            transactions={copyFromTransaction}
            currentModule={currentModule}
            onChange={submitCopy}
            height ={height-10}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 ">
          <Label>{t('transaction.transdate')}</Label>
          <DatePickerField fieldName="transdate" label={t('financials.transdate')}
                           selected={currentx.transdate|| null}
                           current={currentx}
                           setCurrent={setCurrent}
                           disabled={current.posted}
                           onChange={(event: any) => {
                             const date = new Date(event);
                             const month_ = date.getMonth() + 1;
                             const month = month_ < 10 ? `0${month_}` : `${month_}`;
                             const period = Number(`${date.getFullYear()}${month}`);
                             setCurrent({...currentx, transdate: date, period})
                           }}
                           zIndex={zIndex-10}
                           height={height}/>
        </CCol>
      </FormRow>
      {/* Row 3: Cost Center + Due Date */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2" style={{height: height,   paddingTop:2}}>
          <Label>{t('financials.costcenter')}</Label>
          <FormMasterfileXComboBox key="costcenterComboBox"
            fieldName="costcenter"
            current={currentx}
            setCurrent={setCurrent}
            data={storeData}
            defaultValue={initCc}
            zIndex={zIndex}
            disable={currentx.posted} styles={inputStyle} fontSize={10} height ={height-10}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('financials.line.duedate')}</Label>
            <DatePickerField fieldName="duedate" label={t('financials.duedate')}
                           selected={currentLine.duedate|| null}
                           current={current}
                           setCurrent={setCurrentLineFinancials}
                           onChange={(event: any) => {
                             const date = new Date(event)
                             currentLine = {...currentLine, transid:BigInt(-1), duedate: date}
                             setCurrentLineFinancials({...currentLine})
                             setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)}}
                             disabled={current.posted}  height={height} zIndex={zIndex-10}/>
        </CCol>
      </FormRow>
      {/* Row 4: Account + Period/Posted */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2" style={{height: height, paddingTop:2}}>
          <Label>{t('financials.line.account')}</Label>
          <FormMasterfileComboBox2 key="line.financials.accountComboBox" current={currentx}
                                   setCurrent={setCurrent}
                                   currentLine={currentLine}
                                   setCurrentLine={setCurrentLineFinancials}
                                   data={accData}
                                   id="account" name="accountName"
                                   accFilter={accountFilter}
                                   height={height-10}
                                   styles={inputStyle} fontSize={12} setTransaction ={setTransactionF}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('transaction.period')}</Label>
            <CInputGroup>
              <InputField
                fieldName="period"
                current={currentx}
                setCurrent={setCurrent}
                value={currentx.period}
                disabled={true}
                style={{ height: height - 7, paddingLeft: 3, width: '50%', textAlign: 'right' }}
              />
              <BooleanField
                fieldName="posted"
                current={currentx}
                setCurrent={setCurrent}
                label=""
                disabled={true}
                checked={currentx.posted}
                style={{ height: 20, paddingLeft: 5, align: 'right' }}
              />
            </CInputGroup>
        </CCol>
      </FormRow>

      {/* Row 5: OAccount + Amount */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2"  style={{ height: height, paddingTop:2}}>
          <Label>{t('financials.line.oaccount')}</Label>
          <FormMasterfileComboBox2 key="line.financials.oaccountComboBox"
            current={currentx}
            setCurrent={setCurrent}
            currentLine={currentLine}
            setCurrentLine={setCurrentLineFinancials}
            data={accData}
            id="oaccount"
            name="oaccountName"
            accFilter={oaccountFilter}
            height={height-10}
            //zIndex={zIndex}
            styles={inputStyle}
            fontSize={12}
            setTransaction ={setTransactionF}
          />

        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label>{t('financials.line.amount')}</Label>
          <CurrencyField
            value={currentLine?.amount}
            locale={locale}
            currency={currency}
            onValueChange={(value) => {
              let cleanValue = value || '0'
              cleanValue = cleanValue.replace(/\./g, '') // Remove thousands separators
              cleanValue = cleanValue.replace(/,/g, '.') // Convert decimal comma to dot
              const numberValue = parseFloat(cleanValue)
              const finalValue = isNaN(numberValue) ? 0 : numberValue
              currentLine = {...currentLine, amount: finalValue, company: current?.company}
              setCurrentLineFinancials({...currentLine})
              setTransactionF(currentx, setCurrent, currentLine, setCurrentLineFinancials)
            }}
            disabled={currentx.posted}
            style={{...currencyStyle, paddingLeft:5, fontSize: 12, fontWeight: 'bold', width: '65%'}}/>
        </CCol>
      </FormRow>

      {/* Row 6: Text + Total */}
      <FormRow height={height}>
        <CCol sm={8} className="d-flex gap-2" style={{ height: height, paddingTop: 4 }}>
          <Label>{t('transaction.text')}</Label>
          <TextareaField
            fieldName="text"
            placeholder={t('transaction.text')}
            disabled={currentx.posted}
            value={currentLine?.text}
            onChange={(event: any) => {
              event.preventDefault();
              console.log('event.target.value', event.target.value)
              currentLine = {...currentLine, text: event.target.value}
              setCurrentLineFinancials({...currentLine})
              setTransactionF(currentx, setCurrent, currentLine, setCurrentLineFinancials)
            }}
            current={currentLine}
            setCurrent={setCurrentLineFinancials}
            style={{ width: '100%',  fontSize: '0.875rem' }}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2">
          <Label bold>{t('common.total')}</Label>
          <CurrencyField
            value={total}
            locale={locale}
            currency={currency}
            disabled={true}
            style={{...currencyStyle, paddingLeft:5, fontSize: 12, fontWeight: 'bold', width: '65%'}}/>
        </CCol>
      </FormRow>
     </CContainer>
    </div>
  )
}

export default FinancialsMainForm;
