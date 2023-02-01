import React from 'react'
import GuessInput from '../GuessInput'
import { range, sample } from '../../utils'
import { WORDS } from '../../data'
import GuessResults from '../GuessResults'
import { useState } from "react"
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'

// Pick a random word on every pageload.
let answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info({ answer })

function Game() {

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
        alert('You got the right guess')
        resetGame()
        return
      }

      if (nextRow >= NUM_OF_GUESSES_ALLOWED-1) {
        alert('No more guesses, sorry')
        resetGame()
        return
      }

      setNextRow(nextRow+1)
    })
  }

  function resetGame() {
    setGuesses(defaultGuesses)
    setNextRow(0)
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
    </>
  )
}

export default Game
