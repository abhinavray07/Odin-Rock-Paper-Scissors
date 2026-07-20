function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    return { winner: "tie", message: `It's a tie! Both chose ${computerChoice}` };
  }

  const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  if (beats[humanChoice] === computerChoice) {
    return { winner: "human", message: `You win! ${humanChoice} beats ${computerChoice}` };
  } else {
    return { winner: "computer", message: `You lose! ${computerChoice} beats ${humanChoice}` };
  }
}

const startForm = document.getElementById("start-form");
if (startForm) {
  startForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rounds = document.getElementById("rounds").value;

    localStorage.setItem("totalRounds", rounds);
    localStorage.setItem("currentRound", 0);
    localStorage.setItem("humanScore", 0);
    localStorage.setItem("computerScore", 0);

    window.location.href = "game.html";
  });
}

const rockBtn = document.getElementById("rock");
if (rockBtn) {
  const totalRounds = Number(localStorage.getItem("totalRounds"));
  let currentRound = Number(localStorage.getItem("currentRound"));
  let humanScore = Number(localStorage.getItem("humanScore"));
  let computerScore = Number(localStorage.getItem("computerScore"));

  document.getElementById("total-rounds").textContent = totalRounds;
  document.getElementById("current-round").textContent = currentRound;
  document.getElementById("human-score").textContent = humanScore;
  document.getElementById("computer-score").textContent = computerScore;

  const buttons = document.querySelectorAll("#rock, #paper, #scissors");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const humanChoice = button.id;
      const computerChoice = getComputerChoice();
      const result = playRound(humanChoice, computerChoice);

      if (result.winner === "human") humanScore++;
      if (result.winner === "computer") computerScore++;
      currentRound++;

      document.getElementById("message").textContent = result.message;
      document.getElementById("current-round").textContent = currentRound;
      document.getElementById("human-score").textContent = humanScore;
      document.getElementById("computer-score").textContent = computerScore;

      localStorage.setItem("currentRound", currentRound);
      localStorage.setItem("humanScore", humanScore);
      localStorage.setItem("computerScore", computerScore);

      if (currentRound >= totalRounds) {
        setTimeout(() => {
          window.location.href = "result.html";
        }, 1000);
      }
    });
  });
}

const playAgainBtn = document.getElementById("play-again");
if (playAgainBtn) {
  const humanScore = Number(localStorage.getItem("humanScore"));
  const computerScore = Number(localStorage.getItem("computerScore"));

  document.getElementById("final-human-score").textContent = humanScore;
  document.getElementById("final-computer-score").textContent = computerScore;

  const winnerEl = document.getElementById("winner");
  if (humanScore > computerScore) {
    winnerEl.textContent = "You win the game!";
  } else if (computerScore > humanScore) {
    winnerEl.textContent = "Computer wins the game!";
  } else {
    winnerEl.textContent = "The game is a tie!";
  }

  playAgainBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}