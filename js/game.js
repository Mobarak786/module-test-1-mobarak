export default class GameObject {
  constructor() {
    this.active = false;
    this.myScore = 0;
    this.computerScore = 0;
  }
  getActiveStatus() {
    return this.active;
  }

  startGame() {
    this.active = true;
  }

  endGame() {
    this.active = false;
  }

  getMyScore() {
    return this.myScore;
  }

  setMyScore(number) {
    this.myScore = number;
  }

  getComputerScore() {
    return this.computerScore;
  }

  setComputerScore(number) {
    this.computerScore = number;
  }

  meWins() {
    this.myScore += 1;
  }

  computerWins() {
    this.computerScore += 1;
  }
}
