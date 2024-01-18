import React, { useState } from 'react';

import './Form.css';

const Form = () => {
  const formHandler = (e) => {
    e.preventDefault();
    console.log('test');
  }

  return (
    <div className="invoiceForm">
      <form
        onSubmit={formHandler}
        type="submit"
      >
        <input
          required
          placeholder="Номер накладной"
        />
        <button
          type="submit"
        >
          Получить информацию
        </button>
      </form>
      <div className="formErrors">
        dsfsdfsdfs
      </div>
    </div>
  )
};

export default Form;