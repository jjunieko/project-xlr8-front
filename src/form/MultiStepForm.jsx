import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { NumericFormat } from 'react-number-format';
import FormTitle from '../components/Title';

const MultiStepForm = () => {
  const [formFields, setFormFields] = useState([
    {
      startDate: null,
      endDate: null,
      valueType: '',
      value: ''
    }
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  const handleAddRow = () => {
    setFormFields([...formFields, { startDate: null, endDate: null, valueType: '', value: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = formFields.every((field) => (
      field.startDate !== null && field.endDate !== null && field.valueType !== '' && field.value !== ''
    ));

    if (isFormValid) {
      // Aqui você pode implementar a lógica para salvar os dados
      // por exemplo, enviar os dados para um servidor usando uma API

      localStorage.setItem('formFields', JSON.stringify(formFields));
      setFormSubmitted(true);
      setValidationError('');

      if (isFormValid === formSubmitted) {
        alert('Parabéns! Você enviou o formulário.');
        window.location.reload();
      } else {
        setValidationError('Preencha todas as datas');
      }
    }
  };

  const formatValue = (value, valueType) => {
    if (valueType === 'fixed') {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else if (valueType === 'percentage') {
      return value.toLocaleString('pt-BR') + '%';
    }
    return value;
  };

  return (
    <div className="max-w-lg mx-auto">
      <FormTitle text="Formulário Dinâmico" />
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Intervalo de datas:</label>
            <div className="flex space-x-2 mb-2">
              <DatePicker
                selected={field.startDate}
                onChange={(date) => handleChange(index, 'startDate', date)}
                placeholderText="Data inicial"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
              <DatePicker
                selected={field.endDate}
                onChange={(date) => handleChange(index, 'endDate', date)}
                placeholderText="Data final"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <label className="block mb-2">Tipo de valor:</label>
            <select
              value={field.valueType}
              onChange={(e) => handleChange(index, 'valueType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">select</option>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percent</option>
            </select>

            <label className="block mb-2">Valor:</label>

            <NumericFormat
              value={field.value}
              displayType="input"
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              onValueChange={(values) => handleChange(index, 'value', values.floatValue || '')}
              placeholder="Valor"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
            />
            <span>{formatValue(field.value, field.valueType)}</span>


            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="mt-2 px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddRow}
          className="mb-4 mr-5 px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
        >
          Adicionar linha
        </button>

        {validationError && (
          <p className="text-red-500 mb-4">{validationError}</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Salvar
        </button>
      </form>

      {formSubmitted && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Resumo das seleções:</h2>
          {formFields.map((field, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>Intervalo de datas:</strong> {field.startDate.toLocaleDateString()} - {field.endDate.toLocaleDateString()}
              </p>
              <p>
                <strong>Tipo de valor:</strong> {field.valueType}
              </p>
              <p>
                <strong>Valor:</strong> {formatValue(field.value, field.valueType)}
              </p>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setFormSubmitted(false)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Voltar e editar
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="ml-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Concluir o envio do formulário
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
