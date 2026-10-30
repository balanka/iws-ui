import { useEffect, useState } from 'react'
import { CFormInput } from '@coreui/react-pro'

type AmountFieldProps = {
  amount: number
  locale: string
  currency?: string
  decimals?: number
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
  const safeDecimals = Math.max(0, Math.min(20, decimals ?? 2))
  const resolvedLocale = locale || 'de-DE'

  // Build a formatter once per (locale, currency, decimals) change
  const formatter = currency
    ? new Intl.NumberFormat(resolvedLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    })
    : new Intl.NumberFormat(resolvedLocale, {
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    })

  // For parsing user input we need the decimal + group separators of the locale
  const parts = new Intl.NumberFormat(resolvedLocale).formatToParts(1234.5)
  const groupSep = parts.find((p) => p.type === 'group')?.value ?? '.'
  const decimalSep = parts.find((p) => p.type === 'decimal')?.value ?? ','

  const formatValue = (n: number) => formatter.format(n)

  const [amountText, setAmountText] = useState(() =>
    String(amount).replace('.', decimalSep),
  )
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!editing) setAmountText(formatValue(amount))
  }, [amount, editing]) // formatValue is derived; safe to omit

  const commit = () => {
    const raw = (amountText || '0').trim()
    // Remove group separators, then normalize decimal separator to '.'
    const normalized = raw
      .split(groupSep).join('')
      .replace(decimalSep, '.')
    const n = parseFloat(normalized)
    const finalValue = Number.isFinite(n) ? n : 0

    // Round to `safeDecimals` before committing so display and state agree
    const rounded = Number(finalValue.toFixed(safeDecimals))

    onCommit(rounded)
    setAmountText(formatValue(rounded))
  }

  return (
    <CFormInput
      id="amountFieldId"
      className="input-sm text-end"
      disabled={disabled}
      style={style}
      value={editing ? amountText : formatValue(amount)}
      onFocus={(e) => {
        if (disabled) return
        setEditing(true)
        // Put raw editable text (no grouping) into the field
        setAmountText(String(amount).replace('.', decimalSep))
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
          setAmountText(String(amount).replace('.', decimalSep))
          setEditing(false)
          ;(e.target as HTMLInputElement).blur()
        }
      }}
    />
  )
}
