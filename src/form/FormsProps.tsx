import {green} from '@mui/material/colors'
import '../../public/css/custom-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const styles = {
  outer0: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 4,
  },
  outer: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 5,
    //width: '100%',
    //height: 200,
    //padding: 50,
  },
  fuller: {
    borderRadius: 5,
    boxShadow: "0 1px 50px #BBE",
    padding: 1,
    height:30
  },
  fuller40H: {
    borderRadius: 5,
    boxShadow: "0 1px 50px #BBE",
    padding: 5,
    height:40
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  paddingLeft20: {
    paddingLeft: 20,
  },
  height40: {
    height: 40,
  },
}
export const STYLES = {
  outer0: {
    borderRadius: 5,
    boxShadow: "0 30px 40px #BBB",
    padding: 20,
  },
    outer: {
        borderRadius: 5,
        boxShadow: "0 10px 30px #BBB",
        padding: 10,
        // paddingRight: 50,
        // paddingTop: 10,
        // paddingBottom: 10,
    },
    outer50: {
      borderRadius: 5,
      boxShadow: "0 30px 40px #BBB",
      padding: 50,
    },
    inner: {
        borderRadius: 5,
        boxShadow: '0 20px 50px #BBF',
        padding: 10,
        //height: 350,
        paddingTop: 20,
    },
    innerX: {
        borderRadius: 5,
        boxShadow: '0 20px 30px #BBB',
        //boxShadow: '0 20px 50px #BBF',
        padding: 10,
        //height: 350,
        width: 900,
        display: 'flex',
        paddingTop: 20,
    },
    middle: {
        backgroundColor: green,
        borderRadius: 5,
        boxShadow: '0 10px 30px #BBB',
        padding: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    middleSmall: {
        borderRadius: 5,
        boxShadow: '0 10px 20px #BBB',
        padding: 10,
        paddingBottom: 5,
    },
    fullerX: {
        borderRadius: 1,
        boxShadow: "0 1px 50px #BBE",
        padding:0,
        height:30
    },
    fuller: {
        borderRadius: 5,
        boxShadow: "0 1px 50px #BBE",
        padding: 5,
        height:30
    },
    fuller40H: {
        borderRadius: 5,
        boxShadow: "0 1px 50px #BBE",
        padding: 5,
        height:60
    },
    header: {
        borderRadius: 5,
        //boxShadow: '0 10px 30px #BBB',
        padding: 1,
        height: 40,
        paddingTop: 1,
        paddingBottom: 1,
    }
};

//
// export const PayrollTaxForm = ({ current, setCurrent, disable, t, locale, currency, height }:
//                                { current:IPayrollTaxRange, setCurrent:(arg:IPayrollTaxRange)=>void,  t:TFunction<'translation', undefined>
//                                    , disable:boolean, locale:string, currency:string, height:number }) => {
//
//     return (
//         <>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.id')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="id"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.id}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right' }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('payroll.tax.range.from')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="fromAmount"
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={disable}
//                         value={Number(current.fromAmount ?? 0.0).toLocaleString(locale, {
//                             maximumFractionDigits: 2,
//                             minimumFractionDigits: 2,
//                             style: 'currency',
//                             currency: currency,
//                         })}
//                         style={{ height: 30, textAlign: 'right' }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 10, paddingTop: 2 }}>
//                     <FieldLabel title={t('payroll.tax.range.to')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="toAmount"
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={disable}
//                         value={Number(current.toAmount ?? 0.0).toLocaleString(locale, {
//                             maximumFractionDigits: 2,
//                             minimumFractionDigits: 2,
//                             style: 'currency',
//                             currency: currency,
//                         })}
//                         style={{ height: 30, textAlign: 'right' }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('payroll.tax.range.tax')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="tax"
//                         current={current}
//                         setCurrent={setCurrent}
//                         disabled={disable}
//                         value={Number(current.tax ?? 0.0).toLocaleString(locale, {
//                             maximumFractionDigits: 2,
//                             minimumFractionDigits: 2,
//                             style: 'currency',
//                             currency: currency,
//                         })}
//                         style={{ height: 30, textAlign: 'right' }}
//                     />
//                 </CCol>
//                 <CCol sm="2" style={{ height: height, paddingLeft: 10, paddingTop: 2 }}>
//                     <FieldLabel title={t('payroll.tax.range.class')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="taxClass"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.taxClass}
//                         disabled={disable}
//                         style={{ height: 30, textAlign: 'right' }}
//                     />
//                 </CCol>
//             </CInputGroup>
//             <CInputGroup  style={{ height: height }}>
//                 <CCol sm="2">
//                     <FieldLabel title={t('common.company')} />
//                 </CCol>
//                 <CCol sm="2">
//                     <InputField
//                         fieldName="company"
//                         current={current}
//                         setCurrent={setCurrent}
//                         value={current.company}
//                         disabled={true}
//                         style={{ height: 30, padding: 2, textAlign: 'right' }}
//                     />
//                 </CCol>
//             </CInputGroup>
//         </>
//     )
// }
