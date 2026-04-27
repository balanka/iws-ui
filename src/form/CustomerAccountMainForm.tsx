import { JSX } from 'react';
import { initAcc, initVat, initCc } from './Menu';
import {FormRow1Col } from './common';
import {FormMasterfileXComboBox} from "./common";
import {styles} from "./FormsProps.tsx";
import { CInputGroup } from "@coreui/react";
import {CustomerAccountMainFormProps} from "../Props.ts";



export const CustomerAccountMainForm = ({
                                          current, setCurrent, ccData, accData, vatData, t, disable, height
                                        }: CustomerAccountMainFormProps): JSX.Element => {
  const s = { height: height - 3, width: '100%', fontSize: '0.875rem' };
  const s2 = { height: 25, width: '100%', fontSize: '0.875rem' };
  const cw = { labelWidth: '20%', fieldWidth: '80%' };

  const hasVat = current?.hasOwnProperty('vatCode') || current?.hasOwnProperty('vatcode');
  const hasCostCenter = current?.hasOwnProperty('costcenter');

  return (
    <CInputGroup  style={{...styles.outer}} >
      <FormRow1Col label={t('common.account')} field={<FormMasterfileXComboBox fieldName="account" current={current} setCurrent={setCurrent} data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable} styles={s} fontSize={12} />} {...cw} rowHeight="32px" gap="4px" />
      <FormRow1Col label={t('common.oaccount')} field={<FormMasterfileXComboBox fieldName="oaccount" current={current} setCurrent={setCurrent} data={accData} defaultValue={initAcc[0]} zIndex={11} disable={disable} styles={s} fontSize={12} />} {...cw} rowHeight="32px" gap="4px" />
      {hasVat && <FormRow1Col label={t('common.vatCode')} field={<FormMasterfileXComboBox fieldName="vatCode" current={current} setCurrent={setCurrent} data={vatData} defaultValue={initVat[0]} zIndex={11} disable={disable} styles={s2} fontSize={12} />} {...cw} rowHeight="32px" gap="4px" />}
      {hasCostCenter && !hasVat && <FormRow1Col label={t('costcenter.title')} field={<FormMasterfileXComboBox fieldName="costcenter" current={current} setCurrent={setCurrent} data={ccData ?? []} defaultValue={initCc[0]} zIndex={11} disable={disable} styles={s2} fontSize={12} />} {...cw} rowHeight="32px" gap="4px" />}
    </CInputGroup>
  );
};
