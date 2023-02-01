import React from 'react'
import GuessInput from '../GuessInput'
import { range, sample } from '../../utils'
import { WORDS } from '../../data'
import GuessResults from '../GuessResults'
import { useState } from "react"
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
import Banner from '../Banner'

// Pick a random word on every pageload.
let answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info({ answer })

function ResetGameButton({resetGame}) {
  const style={
    borderRadius: 4,
    padding: "3px 15px",
    marginLeft: 15,
    border: '1px solid #fff'
  }
  return <button style={style} onClick={resetGame}>Reset Game</button>
}

function Game() {

  const [gameStatus, setGameStatus] = useState('running');
  const answerArr = answer.split("")

  const defaultGuesses = range(NUM_OF_GUESSES_ALLOWED).map(rowIndex => {
    const chars = range(5).map(colIndex => {
      return {
        char: '',
        status: '',
        id: crypto.randomUUID(),
      }
    })
    return {chars, id: crypto.randomUUID()}
  })

  const [guesses, setGuesses] = useState(defaultGuesses)
  const [nextRow, setNextRow] = useState(0)

  function commitGuess (guess) {

    const nextGuesses = [...guesses]

    let rightChars = 0

    nextGuesses[nextRow].chars = nextGuesses[nextRow].chars.map((oldCharData, index) => {
      const char = guess.split("")[index]

      let status = "incorrect"
      if (answerArr[index] === char) {
        status = 'correct'
        rightChars++
      } else if (answerArr.includes(char)) {
        status = 'missplaced'
      }

      return {
        char,
        status,
        id: oldCharData.id
      }
    })
    
    setGuesses(nextGuesses)

    // validation
    setTimeout(() => {
      if (rightChars === 5) {
        setGameStatus('won')
        return
      }

      if (nextRow >= NUM_OF_GUESSES_ALLOWED-1) {
        setGameStatus('lost')
        return
      }

      setNextRow(nextRow+1)
    })
  }

  function resetGame() {
    setGuesses(defaultGuesses)
    setNextRow(0)
    setGameStatus('running')
    answer = sample(WORDS)
    console.info({ answer })
  }

  return (
    <>
      <GuessResults 
        guesses={guesses}
      />

      <GuessInput 
        commitGuess={commitGuess}
      />

      <Banner variant="happy" isVisible={gameStatus ==='won'}>
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong>{nextRow === 0 ? ` 1 guess`: ` ${nextRow+1} guesses`}</strong>.
          <ResetGameButton resetGame={resetGame} />
        </p>
      </Banner>

      <Banner variant="sad" isVisible={gameStatus ==='lost'}>
        <p>Sorry, the correct answer is <strong>{answer}</strong>.
          <ResetGameButton resetGame={resetGame} /></p>
      </Banner>
    </>
  )
}

export default Game
