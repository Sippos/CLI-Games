// Rock Paper Scissors

// Description: Implement a basic Rock Paper Scissors game.

// Requirements:

// The program should take the player's move as an input from process.argv.
// The program should randomly generate a move for the computer.
// Determine the winner based on the rules of Rock Paper Scissors.
// Output the result (win, lose, or draw) to the console.
// Example:

//   node rockPaperScissors.js rock
//   # Output: You chose rock. Computer chose scissors. You win!

const playerInput = process.argv[2].toLowerCase()
const playerMoves = ["rock", "paper", "scissor"]
const computerMoves = playerMoves[Math.floor(Math.random() * playerMoves.length)]


console.log(`You chose ${playerInput}.`)
console.log(`Computer chose ${computerMoves}.`)

if(playerInput === computerMoves) {
    console.log(`It is a draw!`)
} else if (playerInput === "rock" & computerMoves === `scissor`) {
    console.log(`You win.`)
} else if (playerInput === "rock" & computerMoves === `paper`) {
    console.log(`You loose.`)
} else if (playerInput === "paper" & computerMoves === `scissor`) {
    console.log(`Computer wins.`)
} else if (playerInput === "paper" & computerMoves === `rock`) {
    console.log(`You win.`)
} else if (playerInput === "scissor" & computerMoves === `rock`) {
    console.log(`Computer wins.`)
} else if (playerInput === "scissor" & computerMoves === `paper`) {
    console.log(`You win.`)
}