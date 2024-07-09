import React from 'react';

const FormSelect = ({ name, value, onChange, options, required }) => {
  return (
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="">선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
