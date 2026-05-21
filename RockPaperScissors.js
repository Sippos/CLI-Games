// Rock Paper Scissors

// How to play:

//   node RockPaperScissors rock 
//   # Output: You chose rock. Computer chose scissors. You win!

const playerInput = process.argv[2]?.toLowerCase()
const moves = ["rock", "paper", "scissors"]
const computerOutput = moves[Math.floor(Math.random() * moves.length)]

if (!moves.includes(playerInput)) {
  console.log("Please choose rock, paper, or scissors.");
  process.exit()
}

console.log(`You chose ${playerInput}.`)
console.log(`Computer chose ${computerOutput}.`)

if(playerInput === computerOutput) {
    console.log(`It is a draw!`)
} else if (
    (playerInput === "rock" && computerOutput === `scissors`) ||
    (playerInput === "paper" && computerOutput === `rock`) ||
    (playerInput === "scissors" && computerOutput === `paper`)
) {
    console.log(`You win!`)
} else {
    console.log(`You lose.`)
}