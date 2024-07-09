import React from 'react';

const FormSelect = ({ label, name, value, onChange, options, required }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;