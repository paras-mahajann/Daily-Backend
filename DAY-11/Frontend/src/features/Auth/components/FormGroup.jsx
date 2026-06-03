import React from 'react'

const FormGroup = ({ label, placeholder, name, type = "text", value, onChange }) => {
  const inputName = name || label.toLowerCase();
  const inputType = type || (label.toLowerCase().includes("password") ? "password" : label.toLowerCase().includes("email") ? "email" : "text");

  return (
    <div className="form-group">
      <label htmlFor={inputName}>{label}</label>
      <input
        type={inputType}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormGroup
