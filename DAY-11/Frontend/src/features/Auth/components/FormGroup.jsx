import React from 'react'

const FormGroup = ({label,placeholder}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input type={label} id={label} name={label} required />
    </div>
  )
}

export default FormGroup
