import { Activity, useState } from 'react'

const CIWSTab =() => {
  const [activeTab, ] = useState('profile')

  return (
    <div>
      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <div/> {/* Pauses when hidden, resumes when visible */}
      </Activity>

      <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
        <div /> {/* State preserved, effects paused */}
      </Activity>

      <Activity mode={activeTab === 'billing' ? 'visible' : 'hidden'}>
        <div /> {/* Doesn't compete with visible tab */}
      </Activity>
    </div>
  )
}
export default CIWSTab
