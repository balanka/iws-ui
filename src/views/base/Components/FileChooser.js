import React, { useRef } from 'react'
export const FileChooser = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleFileChange = (event) => {
    const files = event.target.files
    const fileObj = files && files[0]
    if (!fileObj) {
      return
    }
    event.target.value = null
  }

  return (
    <div>
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
      <button onClick={handleClick}>Open file upload box</button>
    </div>
  )
}
