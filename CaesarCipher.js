const playerInput = process.argv[2];
const shift = Number(process.argv[3]);

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const inputLetters = playerInput.split("");
const newLetters = [];

inputLetters.forEach(letter => {
  const index = letters.indexOf(letter);
  const newIndex = index + shift;
  const shiftedLetter = letters[newIndex];

  newLetters.push(shiftedLetter);
});

console.log(newLetters.join(""));