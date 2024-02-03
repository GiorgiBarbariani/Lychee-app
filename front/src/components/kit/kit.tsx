import React, { useState } from 'react'
import "./kit.css"

const Kit = () => {

  const [kitName, setKitName] = useState("My brand kit");

  const changeKitName = (event: any) => {
    setKitName(event.target.value)
  }

  return (
    <div className='kit-container'>
      <p className='kit-name'>Brand kit name</p>
      <input value={kitName} onChange={e => changeKitName(e)} className='kit-input' />
    </div>
  )
}

export default Kit