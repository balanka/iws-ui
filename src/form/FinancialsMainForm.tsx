import { JSX, Dispatch, SetStateAction } from 'react'
import { CCol } from '@coreui/react'
import { BooleanField, FormMasterfileXComboBox, FormMasterfileComboBox2, FromTransactionComboBox } from './common'
import { DatePickerField, InputField, TextareaField, styles } from './FormsProps'
import CurrencyInput from 'react-currency-input-field'
import { IFinancials, IMasterfile, IAccount, IFmodule, ILineFinancials } from '../Models'
import { TFunction } from 'i18next'
import { initCc, initfModule, initAcc } from './Menu'
import { toOption } from '../utils/FormUtils'
import { sortById } from '../utils/Utils'
import ComboBox from './ComboBox'
import { FormRow } from './coreui/FormRow'

interface FinancialsMainFormProps {
  readonly collapse: boolean;
  readonly current: IFinancials;
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
  readonly currentLineFinancials: ILineFinancials;
  readonly setCurrentLineFinancials: Dispatch<SetStateAction<ILineFinancials>>;
  readonly height: number;
  readonly zIndex: number;
  readonly locale: string;
  readonly currency: string;
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

  const currentx: IFinancials = Array.isArray(current) ? current[0] : current;
  const modelid = currentx?.modelid ?? 0;
  const currentModule = modules.find((m: IFmodule) => m.id === BigInt(modelid)) ?? initfModule[0];
  const total = current?.lines?.reduce((prev, cur) => prev + (cur?.amount || 0), 0) ?? 0;

  const inputStyle = { height: height - 10, width: '100%', fontSize: '0.875rem' };
  const currencyStyle = { height: height - 3, padding: 5, textAlign: 'right' as const, width: '100%' };
  const Label = ({ children, width = 80, bold = false }: any) => (
    <div style={{ minWidth: width, fontWeight: bold ? 'bold' : 'normal', paddingLeft:10 }}>{children}</div>)

  //const totalStyle = { fontWeight: 'bold', height: height - 3, padding: 5, textAlign: 'right' as const, width: '100%' };

  // Row margin - adjust this value to increase/decrease space between rows
  const rowMargin = 8;  // Increased from default 8 to 12 for more spacing

  return (
    <div style={{ ...styles.outer, paddingBottom: 10, display: !collapse ? 'none' : '' }}>
      {/* Row 1: Module + ID + OID */}
      <FormRow height={height} marginBottom={rowMargin}>
        <CCol sm="2"> <Label>{t('fmodule.title')}</Label></CCol>
        <CCol sm="5"  style={{height: height, paddingTop:2}}>
          <ComboBox<{ value: bigint | string; label: string }>
            style={{ ...inputStyle, minWidth: 100, fontSize: 12}}
            disable={false}
            value={{
              value: BigInt(currentModule?.id ?? 0),
              label: `${BigInt(currentModule?.id ?? 0)} ${currentModule?.name ?? ''}`
            }}
            fontSize={12}
            onChange={handleModuleChange}
            values={modules.slice().sort(sortById).map(toOption)}
            zIndex={99999}
          />
        </CCol>
        <CCol sm="1" style={{ paddingLeft: 5 }}><Label>{t('common.id')}</Label></CCol>
          {/*<FieldLabel title={t('common.id')} /></CCol>*/}
        <CCol sm="2">
          <InputField
            fieldName="id"
            current={current}
            setCurrent={setCurrent}
            value={current.id}
            disabled={true}
            style={inputStyle}
          />
        </CCol>
        <CCol sm="1" style={{ paddingLeft: 5 }}><Label>{t('transaction.oid')}</Label></CCol>
        <CCol sm="1">
          <InputField
            fieldName="oid"
            current={current}
            setCurrent={setCurrent}
            value={current.oid}
            disabled={current.posted}
            style={inputStyle}
          />
        </CCol>
      </FormRow>

      {/* Row 2: Copy From + Trans Date */}
      <FormRow height={height} marginBottom={rowMargin}>
        <CCol sm="2" style={{height: height }}><Label>{t('common.copyFrom')}</Label></CCol>
        <CCol sm="5" style={{height: height, paddingTop:2}}>
          <FromTransactionComboBox
            current={current}
            transactions={copyFromTransaction}
            currentModule={currentModule}
            onChange={submitCopy}
          />
        </CCol>
        <CCol sm="3" style={{ paddingLeft: 10 }}><Label>{t('transaction.transdate')}</Label></CCol>
        <CCol sm={2} className="d-flex gap-2 align-items-center">
          <DatePickerField
            fieldName="transdate"
            label={t('transaction.transdate')}
            selected={current.transdate}
            current={current}
            onChange={(event: any) => {
              const date = new Date(event);
              const month_ = date.getMonth() + 1;
              const month = month_ < 10 ? `0${month_}` : `${month_}`;
              const period = Number(`${date.getFullYear()}${month}`);
              setCurrent({ ...current, transdate: date, period });
            }}
            setCurrent={setCurrent}
            disabled={current.posted}
          />
        </CCol>
      </FormRow>

      {/* Row 3: Cost Center + Due Date */}
      <FormRow height={height} marginBottom={rowMargin}>
        <CCol sm="2"><Label>{t('financials.costcenter')}</Label></CCol>
        <CCol sm="5">
          <FormMasterfileXComboBox
            fieldName="costcenter"
            current={current}
            setCurrent={setCurrent}
            data={storeData}
            defaultValue={initCc[0]}
            zIndex={zIndex}
            disable={current.posted}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="3" style={{ paddingLeft: 10 }}><Label>{t('financials.line.duedate')}</Label></CCol>
        <CCol sm={2} className="d-flex gap-2 align-items-center">
          <DatePickerField
            fieldName="duedate"
            label={t('financials.line.duedate')}
            selected={currentLineFinancials.duedate}
            current={currentLineFinancials}
            onChange={(event: any) => {
              const date = new Date(event);
              setCurrentLineFinancials({ ...currentLineFinancials, duedate: date, company: `-${current.company}` });
            }}
            setCurrent={setCurrent}
            disabled={current.posted}
          />
        </CCol>
      </FormRow>

      {/* Row 4: Account + Period/Posted */}
      <FormRow height={height} marginBottom={rowMargin}>
        <CCol sm="2"><Label>{t('financials.line.account')}</Label></CCol>
        <CCol sm="5">
          <FormMasterfileComboBox2
            current={current}
            setCurrent={setCurrent}
            currentLine={currentLineFinancials}
            setCurrentLine={setCurrentLineFinancials}
            data={accData}
            id="account"
            name="accountName"
            defaultValue={initAcc[0]}
            accFilter={accountFilter}
            zIndex={zIndex}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm="3" style={{ paddingLeft: 10 }}><Label>{t('transaction.period')}</Label></CCol>
        <CCol sm="1">
          <InputField
            fieldName="period"
            current={current}
            setCurrent={setCurrent}
            value={current.period}
            disabled={true}
            style={{ height: height - 3,  paddingLeft:3, width: '100%', textAlign: 'right' }}
          />
        </CCol>
        <CCol sm="1">
          <BooleanField
            fieldName="posted"
            current={current}
            setCurrent={setCurrent}
            label=""
            disabled={true}
            checked={current.posted}
            style={{ height: 20, paddingLeft:0, align:'right' }}
          />
        </CCol>
      </FormRow>

      {/* Row 5: OAccount + Amount */}
      <FormRow height={height} marginBottom={rowMargin}>
        <CCol sm="2"><Label>{t('financials.line.oaccount')}</Label></CCol>
        <CCol sm="5">
          <FormMasterfileComboBox2
            current={current}
            setCurrent={setCurrent}
            currentLine={currentLineFinancials}
            setCurrentLine={setCurrentLineFinancials}
            data={accData}
            id="oaccount"
            name="oaccountName"
            defaultValue={initAcc[0]}
            accFilter={oaccountFilter}
            zIndex={zIndex}
            styles={inputStyle}
            fontSize={12}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label>{t('financials.line.amount')}</Label>
        {/*<CCol sm="1" style={{ paddingLeft: 10 }}><FieldLabel title={t('financials.line.amount')} /></CCol>*/}
        {/*<CCol sm="2">*/}
          <CurrencyInput
            value={currentLineFinancials?.amount}
            intlConfig={{ locale, currency }}
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            decimalScale={2}
            onValueChange={(value) => {
              setCurrentLineFinancials({
                ...currentLineFinancials,
                amount: Number(value ?? '0.0'),
                company: `-${current.company}`
              });
            }}
            disabled={current.posted}
            style={{...currencyStyle, fontSize:12}}
          />
        </CCol>
      </FormRow>

      {/* Row 6: Text + Total - autoHeight for textarea */}
      <FormRow autoHeight height={height} marginBottom={0}  >
        <CCol md="2"><Label>{t('transaction.text')}</Label></CCol>
        <CCol sm="5" >
          <TextareaField
            fieldName="text"
            placeholder={t('transaction.text')}
            disabled={current.posted}
            value={currentLineFinancials?.text}
            onChange={(event: any) => {
              event.preventDefault();
              setCurrentLineFinancials({
                ...currentLineFinancials,
                text: event.target.value,
                company: `-${current.company}`
              });
            }}
            current={currentLineFinancials}
            setCurrent={setCurrentLineFinancials}
            style={{ width: '100%', minHeight: 60, fontSize: '0.875rem' }}
          />
        </CCol>
        <CCol sm={4} className="d-flex gap-2 align-items-center">
          <Label bold>{t('common.total')}</Label>
        {/*<CCol sm="2">*/}
          <CurrencyInput
            value={total}
            intlConfig={{ locale, currency }}
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            decimalScale={2}
            disabled={true}
            style={{...currencyStyle, fontSize:14, fontWeight:'bold'}}
          />
        </CCol>
      </FormRow>
    </div>
  )
}
