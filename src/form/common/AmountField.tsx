import {useEffect, useState} from 'react'
import { CFormInput } from '@coreui/react-pro'


type AmountFieldProps = {
  amount: number
  locale: string
  currency?: string           // undefined → plain decimal (no symbol)
  decimals?: number           // default 2
  disabled?: boolean
  style?: React.CSSProperties
  onCommit: (amount: number) => void
}

export function AmountField({
                              amount,
                              locale,
                              currency,
                              decimals = 2,
                              disabled = false,
                              style,
                              onCommit,
                            }: AmountFieldProps) {
  const [amountText, setAmountText] = useState(String(amount).replace('.', ','))
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!editing) setAmountText(String(amount).replace('.', ','))
  }, [amount, editing])

  const commit = () => {
    const clean = (amountText || '0').replace(/\./g, '').replace(/,/g, '.')
    const n = parseFloat(clean)
    const finalValue = isNaN(n) ? 0 : n
    onCommit(finalValue)
    setAmountText(String(finalValue).replace('.', ','))
  }

  const formatted = currency
    ? new Intl.NumberFormat(locale || 'de-DE', { style: 'currency', currency }).format(amount)
    : new Intl.NumberFormat(locale || 'de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(amount)

  return (
    <CFormInput
      id="amountFieldId"
      className="input-sm text-end"
      disabled={disabled}
      style={style}
      value={editing ? amountText : formatted}
      onFocus={(e) => {
        if (disabled) return
        setEditing(true)
        requestAnimationFrame(() => (e.target as HTMLInputElement).select())
      }}
      onChange={(e) => setAmountText(e.target.value)}
      onBlur={() => {
        if (!editing) return
        commit()
        setEditing(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          commit()
          setEditing(false)
          ;(e.target as HTMLInputElement).blur()
        }
        if (e.key === 'Escape') {
          setAmountText(String(amount).replace('.', ','))
          setEditing(false)
          ;(e.target as HTMLInputElement).blur()
        }
      }}
    />
  )
}

// type AmountFieldProps = {
//   amount: number
//   locale: string
//   currency: string
//   disabled?: boolean
//   style?: React.CSSProperties
//   onCommit: (amount: number) => void
// }
//
// export function AmountField({
//                               amount,
//                               locale,
//                               currency,
//                               disabled = false,
//                               style,
//                               onCommit,
//                             }: AmountFieldProps) {
//   const [amountText, setAmountText] = useState(String(amount).replace('.', ','))
//   const [editing, setEditing] = useState(false)
//
//   const commit = () => {
//     const clean = (amountText || '0').replace(/\./g, '').replace(/,/g, '.')
//     const n = parseFloat(clean)
//     const finalValue = isNaN(n) ? 0 : n
//     onCommit(finalValue)
//     setAmountText(String(finalValue).replace('.', ','))
//   }
//
//   const formatted = new Intl.NumberFormat(locale || 'de-DE', {
//     style: 'currency',
//     currency: currency || 'EUR',
//   }).format(amount)
//
//   return (
//     <CFormInput
//       id="amountFieldId"
//       className="input-sm text-end"
//       disabled={disabled}
//       style={style}
//       value={editing ? amountText : formatted}
//       onFocus={(e) => {
//         if (disabled) return
//         setEditing(true)
//         // select existing text so typing replaces it
//         requestAnimationFrame(() => e.target.select())
//       }}
//       onChange={(e) => setAmountText(e.target.value)}
//       onBlur={() => {
//         if (!editing) return
//         commit()
//         setEditing(false)
//       }}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter') {
//           e.preventDefault()
//           commit()
//           setEditing(false)
//           ;(e.target as HTMLInputElement).blur()
//         }
//         if (e.key === 'Escape') {
//           setAmountText(String(amount).replace('.', ','))
//           setEditing(false)
//           ;(e.target as HTMLInputElement).blur()
//         }
//       }}
//     />
//   )
// }
