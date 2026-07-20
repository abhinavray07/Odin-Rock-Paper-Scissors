// Step 2
function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);

    if (random === 0) {
        return "rock";
    } else if (random === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Step 3
function getHumanChoice() {
    return prompt("Enter Rock, Paper, or Scissors:");
}

// Step 6
function playGame() {

    // Step 4
    let humanScore = 0;
    let computerScore = 0;

    // Step 5
    function playRound(humanChoice, computerChoice) {

        humanChoice = humanChoice.toLowerCase();

        if (humanChoice === computerChoice) {
            console.log(`It's a tie! Both chose ${humanChoice}.`);
            return;
        }

        if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            humanScore++;
            console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
        } else {
            computerScore++;
            console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
        }

        console.log(`Score -> You: ${humanScore} | Computer: ${computerScore}`);
    }

    // Play 5 rounds
    for (let i = 1; i <= 5; i++) {
        console.log(`----- Round ${i} -----`);

        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }

    // Final winner
    console.log("===== Final Result =====");

    if (humanScore > computerScore) {
        console.log(`🎉 You won the game! Final Score: ${humanScore}-${computerScore}`);
    } else if (computerScore > humanScore) {
        console.log(`💻 Computer won the game! Final Score: ${computerScore}-${humanScore}`);
    } else {
        console.log(`🤝 It's a tie! Final Score: ${humanScore}-${computerScore}`);
    }
}

// Start the game
playGame();