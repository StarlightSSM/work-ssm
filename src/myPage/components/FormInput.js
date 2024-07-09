import React from 'react';

const FormInput = ({ type, name, value, onChange, required }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default FormInput;
