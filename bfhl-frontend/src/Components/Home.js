import axios from 'axios';
import React, { useState } from 'react';
import './frontend.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const parsedData = JSON.parse(jsonInput);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON input. The JSON must contain a key "data" with an array value.');
      }

      const result = await axios.post('https://bajajfinserv-1.onrender.com/bfhl', parsedData);
      setResponse(result.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter(option => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    return (
      <div className="output-container">
        {selectedOptions.includes('Numbers') && (
          <div className="output-section">
            <h3>Numbers:</h3>
            <ul>{numbers.map((num, idx) => <li key={idx}>{num}</li>)}</ul>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div className="output-section">
            <h3>Alphabets:</h3>
            <ul>{alphabets.map((char, idx) => <li key={idx}>{char}</li>)}</ul>
          </div>
        )}
        {selectedOptions.includes('Highest alphabet') && (
          <div className="output-section">
            <h3>Highest Alphabet:</h3>
            <ul>{highest_alphabet.map((char, idx) => <li key={idx}>{char}</li>)}</ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>FILL AND CHECK</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON input"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest alphabet"
            onChange={handleOptionChange}
          />
          Highest Alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
