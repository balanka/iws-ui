import  {JSX, Dispatch, SetStateAction} from 'react'
import { CCol, CRow } from '@coreui/react'
import {
  BooleanField, DatePickerField, InputField, TextareaField,
  FormMasterfileXComboBox,
  FromTransactionComboBox, FormMasterfileComboBox2,
  //MasterfileComboBox
} from './common'
import {  styles } from './FormsProps'
import CurrencyInput from 'react-currency-input-field'
import {IFinancials, IMasterfile, IAccount, IFmodule, ILineFinancials } from '../Models'
import { TFunction } from 'i18next'
import {initCc, initfModule } from './Menu'
import {toOption} from '../utils/FormUtils'
import { sortById } from '../utils/Utils'
import ComboBox from './ComboBox'


interface FinancialsMainFormProps {
  readonly collapse: boolean;
   current: IFinancials;
  readonly setCurrent: (arg: IFinancials) => void;
  readonly t: TFunction<'translation', undefined>;
  readonly storeData: IMasterfile[];
  readonly accData: IAccount[];
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
const setTransactionF = (transaction: IFinancials, setTransaction: (arg: IFinancials) => void, line: ILineFinancials, setCurrent: (arg: ILineFinancials) => void) => {
  const idx = transaction?.lines?.findIndex((obj) => (obj.id === line.id));
  if (idx !== undefined && idx !== -1) {
    const updatedLines = [...transaction.lines];
    updatedLines[idx] = { ...line };
    console.log('updatedLines', updatedLines)
    setTransaction({ ...transaction, lines: updatedLines });
  } else {
    // Add new line
    setTransaction({
      ...transaction,
      lines: [...(transaction.lines || []), { ...line, transid: transaction.id }]
    });
  }

  setCurrent(line);
}

export const FinancialsMainForm = ({
                                     collapse,
                                     current,
                                     setCurrent,
                                     t,
                                     storeData,
                                     accData,
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
  console.log('storeData', storeData)
  console.log('AccData', accData)
  const currentx: IFinancials = Array.isArray(current) ? current[0] : current;
  const modelid = currentx?.modelid ?? 0;
  const currentModule = modules.find((m: IFmodule) => m.id === BigInt(modelid)) ?? initfModule[0];
  const total = current?.lines?.reduce((prev, cur) => prev + (cur?.amount || 0), 0) ?? 0;
  const inputStyle = { height: height - 10, width: '100%', fontSize: '0.875rem' };
  const currencyStyle = { height: height - 3, padding:4, textAlign: 'right' as const, width: '100%' };

  // FormRow component (same pattern as TransactionMainForm)
  const FormRow = ({ children }: any) =>
    <CRow className="g-2 align-items-center mb-2" style={{ height: height - 4 }}>{children}</CRow>

  const Label = ({ children, width = 80, bold = false }: any) =>
    <div style={{ minWidth: width, fontWeight: bold ? 'bold' : 'normal', paddingLeft: 10 }}>{children}</div>


  return (
    <div style={{ ...styles.outer, paddingBottom: 10,  height:250, display: !collapse ? 'none' : '' }}>
      {/* Row 1: Module + ID + OID */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height}}>
          <Label>{t('common.id')}</Label>
          <InputField fieldName="id" current={current} setCurrent={setCurrent} value={current.id} disabled={current.posted} style={{ ...inputStyle, width: '50%', textAlign: 'right' }} />
          <Label>{t('fmodule.title')}</Label>
          <ComboBox style={inputStyle} value={{ value: BigInt(currentModule?.id ?? 0), label: `${BigInt(currentModule?.id ?? 0)} ${currentModule?.name ?? ''}` }} onChange={handleModuleChange} values={modules.slice().sort(sortById).map(toOption)} zIndex={99999} />
        </CCol>
      </FormRow>
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height, paddingTop:2}}>
          <Label>{t('transaction.oid')}</Label>
          <InputField fieldName="oid" current={current} setCurrent={setCurrent} value={current.oid} disabled={current.posted} style={{...inputStyle, width:'50%', textAlign: 'right' }} />
          <Label>{t('common.copyFrom')}</Label>
          <FromTransactionComboBox
            current={current}
            transactions={copyFromTransaction}
            currentModule={currentModule}
            onChange={submitCopy}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.transdate')}</Label>
          <DatePickerField fieldName="transdate" label={t('financials.transdate')} selected={current.transdate} current={current} setCurrent={setCurrent} disabled={current.posted}
                                 onChange={(event: any) => {
                                   const date = new Date(event);
                                   const month_ = date.getMonth() + 1;
                                   const month = month_ < 10 ? `0${month_}` : `${month_}`;
                                   const period = Number(`${date.getFullYear()}${month}`);
                                   setCurrent({...current, transdate: date, period});}}/>
        </CCol>
      </FormRow>
      {/* Row 3: Cost Center + Due Date */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center" style={{height: height,   paddingTop:2}}>
          <Label>{t('financials.costcenter')}</Label>
          <FormMasterfileXComboBox
            fieldName="costcenter" current={current} setCurrent={setCurrent} data={storeData} defaultValue={initCc[0]} zIndex={zIndex}
            disable={current.posted} styles={inputStyle} fontSize={12}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('financials.line.duedate')}</Label>
          <DatePickerField fieldName="duedate" label={t('financials.duedate')} selected={currentLineFinancials.duedate} current={current} setCurrent={setCurrentLineFinancials}
                           onChange={(event: any) => {
                             const date = new Date(event);
                             console.log('date', date);
                             const line = {...currentLineFinancials, transid:BigInt(-1), duedate: date};
                             console.log('date line', line);
                             setCurrentLineFinancials(line);
                             setTransactionF(current, setCurrent, line, setCurrentLineFinancials)}}
                           disabled={current.posted} />
        </CCol>
      </FormRow>
      {/* Row 4: Account + Period/Posted */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-md-center" style={{height: height, paddingTop:2}}>
          <Label>{t('financials.line.account')}</Label>
          <FormMasterfileComboBox2 current={current} setCurrent={setCurrent} currentLine={currentLineFinancials} setCurrentLine={setCurrentLineFinancials}
              data={accData} id="account" name="accountName"  accFilter={accountFilter}
              //zIndex={zIndex}
                                   styles={inputStyle} fontSize={12} setTransaction ={setTransactionF}/>
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('transaction.period')}</Label>
          <InputField
            fieldName="period"
            current={current}
            setCurrent={setCurrent}
            value={current.period}
            disabled={true}
            style={{ height: height - 3, paddingLeft: 3, width: 90, textAlign: 'right' }}
          />
          <BooleanField
            fieldName="posted"
            current={current}
            setCurrent={setCurrent}
            label=""
            disabled={true}
            checked={current.posted}
            style={{ height: 20, paddingLeft: 0, align: 'right' }}
          />
        </CCol>
      </FormRow>

      {/* Row 5: OAccount + Amount */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-center"  style={{ height: height, paddingTop:2}}>
          <Label>{t('financials.line.account')}</Label>
        <FormMasterfileComboBox2
          current={current}
          setCurrent={setCurrent}
          currentLine={currentLineFinancials}
          setCurrentLine={setCurrentLineFinancials}
          data={accData}
          id="oaccount"
          name="oaccountName"
          accFilter={oaccountFilter}
          //zIndex={zIndex}
          styles={inputStyle}
          fontSize={12}
          setTransaction ={setTransactionF}
        />

        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('financials.line.amount')}</Label>
          <CurrencyInput
            value={currentLineFinancials?.amount}
            intlConfig={{ locale, currency }}
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            decimalScale={2}
            onValueChange={(value) => {
              let cleanValue = value || '0';
              cleanValue = cleanValue.replace(/\./g, ''); // Remove thousands separators
              cleanValue = cleanValue.replace(/,/g, '.'); // Convert decimal comma to dot
              const numberValue = parseFloat(cleanValue);
              const finalValue = isNaN(numberValue) ? 0 : numberValue;
              const currentLine = {...currentLineFinancials, transid:BigInt(-1), amount: finalValue, company: current?.company}
              console.log('currentLine', currentLine)
              setCurrentLineFinancials(currentLine)
              setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)
            }
          }
            disabled={current.posted}
            style={{ ...currencyStyle, fontSize: 12, width: '170px' }}
          />
        </CCol>
      </FormRow>

      {/* Row 6: Text + Total */}
      <FormRow>
        <CCol sm={8} className="d-flex gap-2 align-items-start" style={{ height: height, paddingTop: 4 }}>
          <Label>{t('transaction.text')}</Label>
          <TextareaField
            fieldName="text"
            placeholder={t('transaction.text')}
            disabled={current.posted}
            value={currentLineFinancials?.text}
            onChange={(event: any) => {
              event.preventDefault();
              console.log('event.target.value', event.target.value)
              const currentLine = {...currentLineFinancials, transid:BigInt(-1), text: event.target.value}
              setCurrentLineFinancials(currentLine)
              setTransactionF(current, setCurrent, currentLine, setCurrentLineFinancials)
            }}
            current={currentLineFinancials}
            setCurrent={setCurrentLineFinancials}
            style={{ width: '100%', minHeight: 60, fontSize: '0.875rem' }}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label bold>{t('common.total')}</Label>
          <CurrencyInput
            value={total}
            intlConfig={{ locale, currency }}
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            decimalScale={2}
            disabled={true}
            style={{ ...currencyStyle, fontSize: 12, fontWeight: 'bold', width: '170px' }}
          />
        </CCol>
      </FormRow>
    </div>
  )
}

export default FinancialsMainForm;
