//Initial Data
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let player = "";
let warning = "";
let playing = false;

reset();

//Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

//Functions
function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset() {
  warning = "";
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  for (let index in square) {
    square[index] = "";
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let index in square) {
    let item = document.querySelector(`div[data-item=${index}]`);
    item.innerHTML = square[index];
  }
  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
  player = player === "x" ? "o" : "x";
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("x")) {
    warning = `O "x" venceu`;
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = `O "o" venceu`;
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let iterator in pos) {
    let pArray = pos[iterator].split(","); // Recortando a1 a2 a3
    let hasWon = pArray.every((option) => square[option] === player);
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let key in square) {
    if (square[key] === "") {
      return false;
    }
  }
  return true;
}
