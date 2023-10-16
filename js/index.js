import GameObject from "./game.js";
const Game = new GameObject();

const initApp = () => {
  initAllData();
  updateScore();
  listenPlayerChoice();
  listenPlayAgain();
};

document.addEventListener("DOMContentLoaded", initApp);

const initAllData = () => {
  Game.setMyScore(parseInt(localStorage.getItem("myScore")) || 0);
  Game.setComputerScore(parseInt(localStorage.getItem("computerScore")) || 0);
};

const updateScore = () => {
  const cpScore = document.getElementById("computer-score");
  cpScore.textContent = Game.getComputerScore();

  const myScore = document.getElementById("your-score");
  myScore.textContent = Game.getMyScore();
};

const listenPlayerChoice = () => {
  const playerChoiceImg = document.querySelectorAll(
    ".game-select .circle div img"
  );
  playerChoiceImg.forEach((img) => {
    img.addEventListener("click", (e) => {
      if (Game.getActiveStatus()) return;
      Game.startGame();
      const playerChoice = e.target.parentElement.id;
      playerChoiceImg.forEach((img) => {
        if (img === e.target) {
          const btnClicked = e.target.parentElement;
          btnClicked.firstElementChild.remove();
          btnClicked.classList.add("selected");
          setTimeout(() => {
            document.querySelector(".game-select").classList.add("hidden");
            document
              .querySelector(".game-play")
              .classList.add("game-play-show");
          }, 1500);
        }
      });
      finishGameFlow(playerChoice);
    });
  });
};

const finishGameFlow = (playerChoice) => {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);
  const message = buildMessage(computerChoice, winner);
  updateChoicePicked(computerChoice, playerChoice);
  updateWinnerMessage(message);
  showAnimation(winner);
  showNextBtn(message);
  showReplayOption(winner);
  updateScoreState(winner);
  updateInLocalStorage(winner);
};
const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  const Arr = ["rock", "paper", "scissors"];
  return Arr[randomNumber];
};

const determineWinner = (computer, player) => {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "paper") ||
    (player === "paper" && computer === "scissors") ||
    (player === "scissors" && computer === "rock")
  )
    return "computer";

  return "player";
};

const updateChoicePicked = (computer, player) => {
  // changing the rock, paper ,scissors images
  document.getElementById("img1").src = `../assets/${player}.png`;
  document.getElementById("img2").src = `../assets/${computer}.png`;

  // changing their bg color
  changeCircleBg(computer, player);
};

const changeCircleBg = (computer, player) => {
  const c1 = document.getElementById("gameplay-circle1");
  const c2 = document.getElementById("gameplay-circle2");
  player === "rock"
    ? (c1.style.backgroundColor = "rgba(0, 116, 182, 1)")
    : player === "scissors"
    ? (c1.style.backgroundColor = " rgba(189, 0, 255, 1)")
    : (c1.style.backgroundColor = "rgba(255, 169, 67, 1)");

  computer === "rock"
    ? (c2.style.backgroundColor = "rgba(0, 116, 182, 1)")
    : computer === "paper"
    ? (c2.style.backgroundColor = "rgba(255, 169, 67, 1)")
    : (c2.style.backgroundColor = "rgba(189, 0, 255, 1)");
};

const buildMessage = (computer, winner) => {
  if (winner === "tie") return "TIE UP";
  if (winner === "computer") {
    return "YOU LOST";
  } else {
    return "YOU WIN";
  }
};

const updateWinnerMessage = (message) => {
  if (message === "TIE UP") {
    document.querySelector(".win-template p").remove();
  }
  document.querySelector(".win-template h1").textContent = message;
};

const showAnimation = (winner) => {
  const circle1 = document.getElementById("animate1");
  const circle2 = document.getElementById("animate2");

  if (winner === "player") {
    circle2.style.display = "none";
  } else if (winner === "computer") {
    circle1.style.display = "none";
  } else {
    circle1.style.display = "none";
    circle2.style.display = "none";
  }
};

const showNextBtn = (message) => {
  if (message === "YOU WIN") {
    setTimeout(() => {
      document.getElementById("btn2").style.display = "block";
    }, 1500);
  }
};

const showReplayOption = (winner) => {
  const playAgainBtn = document.getElementById("play-again");
  if (winner === "tie") {
    playAgainBtn.textContent = "REPLAY";
  }
};
const updateScoreState = (winner) => {
  if (winner === "tie") return;
  winner === "player" ? Game.meWins() : Game.computerWins();
};

const updateInLocalStorage = (winner) => {
  const store = winner === "computer" ? "computerScore" : "myScore";
  const score =
    winner === "computer" ? Game.getComputerScore() : Game.getMyScore();
  localStorage.setItem(store, score);
};
// onclick play again button
const listenPlayAgain = (winner) => {
  const playAgain = document.getElementById("play-again");
  if (winner === "tie") {
    playAgain.textContent = "REPLAY";
  }
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
};
