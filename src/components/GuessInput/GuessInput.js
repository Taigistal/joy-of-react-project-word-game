    /**
     * Im gegen satz zur Lösung habe ich das Problem, dass minLength und MaxLength nicht funktioniern,wenn man den guess mit toUpercase umwandelt, Ich habe darum mit CSS Uppercase und Upperacse beim submit gearbeitet, damit ich die native Form Validation behalten kann.
     * Auch die Beta Doku sagt, dass das so wie in der Lösung nicht geht: 
     * https://beta.reactjs.org/reference/react-dom/components/input#my-input-caret-jumps-to-the-beginning-on-every-keystroke
     */

import { useState } from "react";

function GuessInput({commitGuess}) {

  const [inputValue, setInputValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.length !== 5) {
      alert('Please enter exactly 5 characters');
      return;
    }

    commitGuess(inputValue.toUpperCase())
    setInputValue('');
  }

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (      
  <form 
    className="guess-input-wrapper"
    onSubmit={handleSubmit}
  >
    <label htmlFor="guess-input">Enter guess:</label>
    <input 
      style={{textTransform: 'uppercase'}}
      id="guess-input" 
      type="text" 
      value={inputValue}
      onChange={ handleChange }
      required
      minLength={5}
      maxLength={5}
    />
  </form>
  );
}

export default GuessInput;
