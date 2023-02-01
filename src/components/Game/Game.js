import React from 'react';
import GuessInput from '../GuessInput';
import { range, sample } from '../../utils';
import { WORDS } from '../../data';
import GuessResults from '../GuessResults/GuessResults';
import { useState } from "react";
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
const answerArr = answer.split("");
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {

  const defaultResults = range(NUM_OF_GUESSES_ALLOWED).map(rowIndex => {
    const chars = range(5).map(colIndex => {
      return {
        char: '',
        status: '',
        id: crypto.randomUUID(),
      }
    });
    return {chars, id: crypto.randomUUID()}
  });

  const [results, setResults] = useState(defaultResults);
  const [nextRow, setNextRow] = useState(0);

  function commitGuess (guess) {

    const nextResults = [...results]

    let rightChars = 0;

    nextResults[nextRow].chars = nextResults[nextRow].chars.map((oldCharData, index) => {
      const char = guess.split("")[index];

      let status = "incorrect";
      if (answerArr[index] === char) {
        status = 'correct';
        rightChars++;
      } else if (answerArr.includes(char)) {
        status = 'missplaced';
      }

      return {
        char,
        status,
        id: oldCharData.id
      }
    })
    
    setResults(nextResults);

    // validation
    setTimeout(() => {
      if (rightChars == 5) {
        alert('You got the right guess')
        return;
      }

      if (nextRow >= NUM_OF_GUESSES_ALLOWED-1) {
        alert('No more guesses, sorry');
        return;
      }

      setNextRow(nextRow+1)
    })
  }

  

  return (
    <>
      <GuessResults 
        results={results}
      />

      <GuessInput 
        commitGuess={commitGuess}
      />
    </>
  );
}

export default Game;
