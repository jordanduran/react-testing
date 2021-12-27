import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  const handleIncrement = () => {
    if (error) setError(false);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 0) {
      setError(true);
      return;
    }
    setCount(count - 1);
  };

  return (
    <div data-test='component-app'>
      <h1 data-test='counter-display'>
        Counter is currently: <span data-test='count'>{count}</span>
      </h1>
      {error && (
        <p data-test='error-message' style={{ color: 'red' }}>
          The counter cannot go below zero.
        </p>
      )}
      <button data-test='increment-button' onClick={handleIncrement}>
        Increment
      </button>
      <button data-test='decrement-button' onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
}

export default App;
