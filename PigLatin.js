let playerInput = process.argv[2]
const vowels = ["a", "e", "i", "o", "u"];
const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];


const firstLetter = playerInput[0]
const secondLetter = playerInput[1]

if (consonants.includes(firstLetter.toLowerCase()) && vowels.includes(secondLetter.toLowerCase())) {
    playerInput = playerInput.slice(1) + firstLetter + "ay"
} else if (consonants.includes(firstLetter.toLowerCase()) && consonants.includes(secondLetter.toLowerCase())) {
    playerInput = playerInput.slice(2) + firstLetter + secondLetter + "ay"
} else if (vowels.includes(firstLetter.toLowerCase())) {
    playerInput = playerInput + "way"
}

console.log(playerInput)