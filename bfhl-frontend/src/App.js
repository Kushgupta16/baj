import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://bajajfinserv-1.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <p>{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>BFHL Project</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;