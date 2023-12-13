import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://kabasoft.com" target="_blank" rel="noopener noreferrer">
          IWS
        </a>
        <span className="ms-1">&copy; 2023 KABA Soft GmbH.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://kabasoft.com/iws" target="_blank" rel="noopener noreferrer">
          IWS
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
