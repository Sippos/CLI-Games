// Rock Paper Scissors

// Example:

//   node rockPaperScissors.js rock 
//   # Output: You chose rock. Computer chose scissors. You win!

const playerInput = process.argv[2].toLowerCase()
const moves = ["rock", "paper", "scissor"]
const computerOutput = moves[Math.floor(Math.random() * moves.length)]


console.log(`You chose ${playerInput}.`)
console.log(`Computer chose ${computerOutput}.`)

if(playerInput === computerOutput) {
    console.log(`It is a draw!`)
} else if (
    (playerInput === "rock" && computerOutput === `scissor`) ||
    (playerInput === "paper" && computerOutput === `rock`) ||
    (playerInput === "scissor" && computerOutput === `paper`)
) {
    console.log(`You win!`)
} else {
    console.log(`You lose.`)
}