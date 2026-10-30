import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'

const TransactionsCombinedPage = () => {
  const { id } = useParams<{ id: string }>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.htmx && ref.current) window.htmx.process(ref.current)
  }, [id])

  return (
    <CCard>
      <CCardHeader><strong>Transaction (combined)</strong></CCardHeader>
      <CCardBody>
        {/* THIS className is what @scope (.htmx-daisy) targets */}
        <div className="htmx-daisy">
          <div
            key={id}
            ref={ref}
            id="transaction-combined-htmx-mount"
            hx-get={`/html/transaction-combined/${id ?? '1000'}`}
            hx-trigger="load"
            hx-swap="innerHTML"
            hx-target="this"
          >
            <div className="text-center py-5"><CSpinner color="primary" /></div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default TransactionsCombinedPage
