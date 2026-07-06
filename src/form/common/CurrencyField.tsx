// CurrencyField.tsx
import CurrencyInput from 'react-currency-input-field';
import '../../../public/css/CurrencyInput.css';  // Import the CSS

export const CurrencyField = ({
                                value,
                                onValueChange,
                                disabled,
                               // intlConfig,
                                groupSeparator='.',
                                decimalSeparator=',',
                                locale = 'de-Fr',
                                currency ='EUR',
                                style = {},
                                ...props
                              }: {
  value?: number;
  //intlConfig?:{locale:string, currency:string}
  groupSeparator?: "."
  decimalSeparator?:","
  decimalsLimit?:undefined
  decimalScale?:undefined
  onValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
  locale: string;
  currency: string;
  style?: React.CSSProperties;
}) => {
  return (
    <CurrencyInput
      value={value}
      intlConfig={{ locale, currency }}
      groupSeparator="."
      decimalSeparator=","
      decimalsLimit={undefined}
      decimalScale={undefined}
      onValueChange={onValueChange}
      disabled={disabled}
      className="react-currency-input-field"  //  Add this class
      style={{ width: '100%', ...style }}
      {...props}
    />
  )
}
