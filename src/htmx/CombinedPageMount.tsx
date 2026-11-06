import { useEffect, useRef, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'

interface CombinedPageMountProps {
  /** Route prefix used to derive the mount id and the fragment URL.
   *  e.g. "account" → mount id "account-combined-htmx-mount",
   *                   fragment URL "/html/account-combined/:company" */
  prefix: string
  /** Display title for the CoreUI card header. Falls back to
   *  a `<span>` that the fragment (via HtmxTitleUpdates) can replace. */
  title: string
  /** Optional route param names to read from useParams. The order
   *  determines the URL segment order. Defaults to ['id'] which
   *  matches the `:id` route placeholder used by the React routes. */
  routeParams?: string[]
  /** Optional loading spinner label */
  loadingLabel?: string
  /** Optional extra content rendered inside the card body (before the mount) */
  children?: ReactNode
}

const CombinedPageMount = ({
                             prefix,
                             title,
                             routeParams = ['id'],
                             loadingLabel = 'Loading…',
                             children,
                           }: CombinedPageMountProps) => {
  const params = useParams<Record<string, string>>()
  const ref = useRef<HTMLDivElement>(null)

  // Build the URL from the route params, in order.
  // Example: prefix "masterfile", routeParams ['modelid','company'] →
  //   /html/masterfile-combined/1300/1000
  // Example: prefix "account", routeParams ['id'] →
  //   /html/account-combined/1000
  const segments = routeParams.map((name) => params[name] ?? '').filter(Boolean)
  const baseSegment = routeParams.length > 1 ? routeParams[0] : 'id'
  const firstValue = params[baseSegment] ?? params.id ?? params.company ?? '1000'
  const url = `/html/${prefix}-combined/${segments.length > 1 ? segments.join('/') : firstValue}`

  // Mount id — derived from prefix, matches the pattern used by
  // HtmxTitleUpdates.fmoduleTitleUpdate(cardId = s"${prefix}-card-title")
  const mountId = `${prefix}-combined-htmx-mount`
  const cardTitleId = `${prefix}-card-title`

  // Re-process HTMX when the route param changes (user navigates
  // from /1000 to /2000 in the same SPA session).
  useEffect(() => {
    if (!window.htmx || !ref.current) return
    window.htmx.process(ref.current)
  }, [url])

  return (
    <CCard>
      <CCardHeader>
        <strong id={cardTitleId}>{title}</strong>
      </CCardHeader>
      <CCardBody className="p-1">
        <div className="htmx-daisy">
          {children}
          <div
            key={url}
            ref={ref}
            id={mountId}
            hx-get={url}
            hx-trigger="load"
            hx-swap="innerHTML"
            hx-target="this"
          >
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <div className="mt-2 text-body-secondary">{loadingLabel}</div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default CombinedPageMount
