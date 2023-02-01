import React from "react";

function GuessResults({results}) {
  return (
    <div className="guess-results">
      {results.map(({chars, id}) => (
        <p key={id} className="guess">
          {chars.map(({char, id, status}) => (
            <span key={id} className={`cell ${status}`}>{char}</span>
          ))}
        </p>
      ))}
  </div>
  );
}

export default GuessResults;
