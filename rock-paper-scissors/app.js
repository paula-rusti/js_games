const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");

let userChoice;
let computerChoice;
possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    computerChoice = generateComputerChoice();
    computerChoiceDisplay.innerHTML = computerChoice;
    console.log(computerChoice);
    findWinner(userChoice, computerChoice);
  })
);

function generateComputerChoice() {
  const randomNumber = getRandomInt(0, 3);
  const choicesArray = ["rock", "paper", "scissors"];
  return choicesArray[randomNumber];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  // The maximum is exclusive and the minimum is inclusive
}

function findWinner(userChoice, computerChoice) {
  let possibleCombinations = {
    c1: { combination: ["rock", "paper"], winner: 1 },
    c2: { combination: ["rock", "scissors"], winner: 0 },
    c3: { combination: ["paper", "scissors"], winner: 1 },
    c4: { combination: ["paper", "rock"], winner: 0 },
    c5: { combination: ["scissors", "rock"], winner: 1 },
    c6: { combination: ["scissors", "paper"], winner: 0 },
  };
  let currentCombination = [userChoice, computerChoice];
  console.log("current combination" + JSON.stringify(currentCombination));
  let variants = Object.values(possibleCombinations);
  let filtered_variants = variants.filter(
      (obj) => JSON.stringify(obj.combination) === JSON.stringify(currentCombination)
  );
  console.log(JSON.stringify(filtered_variants));
  (filtered_variants.length !== 0) ? ((filtered_variants[0].winner === 0) ?  resultDisplay.innerHTML = "Player Won" : resultDisplay.innerHTML = "Computer Won") : resultDisplay.innerHTML = "DRAW"

}
