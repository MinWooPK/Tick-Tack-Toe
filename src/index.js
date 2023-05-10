function getTiles() {
  return document.getElementsByClassName("tile");
}
const tiles = getTiles();

function getPlayers() {
  return document.getElementsByClassName("player");
}
const players = getPlayers();

function checkWin() {
  const patterns = [
    [0, 1, 2],
    [1, 2, 3],
    [4, 5, 6],
    [5, 6, 7],
    [8, 9, 10],
    [9, 10, 11],
    [12, 13, 14],
    [13, 14, 15],
    [0, 4, 8],
    [4, 8, 12],
    [1, 5, 9],
    [5, 9, 13],
    [2, 6, 10],
    [6, 10, 14],
    [3, 7, 11],
    [7, 11, 15],
    [0, 5, 10],
    [5, 10, 15],
    [3, 6, 9],
    [6, 9, 12],
  ];

  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i];
    if (
      tiles[a].innerText &&
      tiles[a].innerText === tiles[b].innerText &&
      tiles[b].innerText === tiles[c].innerText
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].innerText === "") {
      return false;
    }
  }
  return true;
}

let currentPlayer = 0;
let gameOver = false;
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

function takeTurn() {
  if (!this.innerText && !gameOver) {
    this.innerText = currentPlayer === 0 ? "X" : "O";

    if (currentPlayer === 0) {
      this.classList.add("x");
    } else {
      this.classList.add("o");
    }

    if (checkWin()) {
      status.innerText = `${players[currentPlayer].innerText} wins!`;
      gameOver = true;
      restartBtn.style.display = "block";
    } else if (checkDraw()) {
      status.innerText = "Draw!";
      gameOver = true;
      restartBtn.style.display = "block";
    } else {
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      players[0].classList.toggle("active");
      players[1].classList.toggle("active");
    }
  }
}

function restartGame() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerText = "";
  }
  currentPlayer = 0;
  players[0].classList.add("active");
  players[1].classList.remove("active");
  status.innerText = "Tic Tac Toe";
  gameOver = false;
  restartBtn.style.display = "none";
}

restartBtn.addEventListener("click", restartGame);

for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", takeTurn);
}

restartGame();
