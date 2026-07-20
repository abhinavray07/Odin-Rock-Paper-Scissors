// =======================
// START PAGE
// =======================

const startForm = document.querySelector("#start-form");

if (startForm) {

    startForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const rounds = Number(document.querySelector("#rounds").value);

        localStorage.setItem("totalRounds", rounds);
        localStorage.setItem("currentRound", 0);
        localStorage.setItem("humanScore", 0);
        localStorage.setItem("computerScore", 0);

        window.location.href = "game.html";
    });
}


// =======================
// GAME PAGE
// =======================

const rockButton = document.querySelector("#rock");

if (rockButton) {

    const paperButton = document.querySelector("#paper");
    const scissorsButton = document.querySelector("#scissors");

    const currentRoundText = document.querySelector("#current-round");
    const totalRoundsText = document.querySelector("#total-rounds");

    const humanScoreText = document.querySelector("#human-score");
    const computerScoreText = document.querySelector("#computer-score");

    const message = document.querySelector("#message");


    let totalRounds = Number(localStorage.getItem("totalRounds"));
    let currentRound = Number(localStorage.getItem("currentRound"));
    let humanScore = Number(localStorage.getItem("humanScore"));
    let computerScore = Number(localStorage.getItem("computerScore"));


    totalRoundsText.textContent = totalRounds;
    currentRoundText.textContent = currentRound;
    humanScoreText.textContent = humanScore;
    computerScoreText.textContent = computerScore;


    function getComputerChoice() {

        const random = Math.floor(Math.random() * 3);

        if (random === 0) {
            return "rock";
        }

        if (random === 1) {
            return "paper";
        }

        return "scissors";
    }


    function playRound(humanChoice) {

        const computerChoice = getComputerChoice();

        currentRound++;


        if (humanChoice === computerChoice) {

            message.textContent =
                `Tie! Both chose ${humanChoice}`;

        }

        else if (

            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")

        ) {

            humanScore++;

            message.textContent =
                `You win! ${humanChoice} beats ${computerChoice}`;

        }

        else {

            computerScore++;

            message.textContent =
                `You lose! ${computerChoice} beats ${humanChoice}`;

        }


        localStorage.setItem("currentRound", currentRound);
        localStorage.setItem("humanScore", humanScore);
        localStorage.setItem("computerScore", computerScore);


        currentRoundText.textContent = currentRound;
        humanScoreText.textContent = humanScore;
        computerScoreText.textContent = computerScore;


        if (currentRound >= totalRounds) {

            window.location.href = "result.html";

        }

    }


    rockButton.addEventListener("click", function() {
        playRound("rock");
    });


    paperButton.addEventListener("click", function() {
        playRound("paper");
    });


    scissorsButton.addEventListener("click", function() {
        playRound("scissors");
    });

}


// =======================
// RESULT PAGE
// =======================

const winnerText = document.querySelector("#winner");

if (winnerText) {

    const humanScore =
        Number(localStorage.getItem("humanScore"));

    const computerScore =
        Number(localStorage.getItem("computerScore"));


    document.querySelector("#final-human-score").textContent =
        humanScore;


    document.querySelector("#final-computer-score").textContent =
        computerScore;


    if (humanScore > computerScore) {

        winnerText.textContent = "🎉 You Won!";

    }

    else if (computerScore > humanScore) {

        winnerText.textContent = "💻 Computer Won!";

    }

    else {

        winnerText.textContent = "🤝 It's a Tie!";

    }


    document
    .querySelector("#play-again")
    .addEventListener("click", function() {

        localStorage.clear();

        window.location.href = "index.html";

    });

}