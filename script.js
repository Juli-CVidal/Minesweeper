const FIELD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const FIELD = document.querySelector(".field");
const MESSAGE = document.getElementById("message");
const RETRY_BTN = document.getElementById("retry");

/*===== CREATING THE BOARD =====*/
function createBoard(fieldSize) {
  return Array.from({ length: fieldSize }, (_, x) =>
    Array.from({ length: fieldSize }, (_, y) => {
      const element = document.createElement("div");
      element.classList.add("tile");
      element.classList.add(
        MINE_POSITIONS.some((mine) => mine.row === x && mine.column === y)
          ? "mine"
          : "safe"
      );

      const tile = { element, x, y };
      tile.element.addEventListener("click", () => addClickEvent(tile));
      tile.element.addEventListener("contextmenu", addRightClickEvent);
      return tile;
    })
  );
}

function getMinePositions(numberOfMines) {
  let mines = [];
  if (numberOfMines == 0) return mines;

  const row = Math.floor(Math.random() * FIELD_SIZE);
  const column = Math.floor(Math.random() * FIELD_SIZE);

  if (mines.some((mine) => mine.row === row && mine.column === column)) {
    return getMinePositions(numberOfMines);
  }

  mines.push({ row, column });

  return numberOfMines === 1
    ? mines
    : mines.concat(getMinePositions(numberOfMines - 1));
}

/*===== REVEALING TILES (left click) =====*/
function getAdjacentTiles(tile) {
  const { x, y } = tile;
  const tiles = [];
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}

function revealTiles(tile) {
  const element = tile.element;
  if (
    element.classList.contains("actived") ||
    element.classList.contains("flag")
  )
    return;
  element.classList.add("actived");
  element.removeEventListener("click", () => addClickEvent(tile));
  element.removeEventListener("contextmenu", addRightClickEvent);

  if (element.classList.contains("mine")) return;

  const adjacentTiles = getAdjacentTiles(tile);
  const mineTiles = adjacentTiles.filter(({ element }) =>
    element.classList.contains("mine")
  );
  if (mineTiles.length === 0) {
    adjacentTiles.forEach((adjacentTile, index) => {
      setTimeout(() => {
        revealTiles(adjacentTile);
      }, (index + 1) * 25);
    });
  } else {
    element.textContent = mineTiles.length;
  }
}

/*===== CHECKING GAME CONDITIONS =====*/
function checkWin() {
  const safeTiles = document.querySelectorAll(".tile.safe");
  const activeSafeTiles = document.querySelectorAll(".tile.safe.actived");
  return safeTiles.length === activeSafeTiles.length;
}

function checkLose() {
  return document.querySelectorAll(".tile.mine.actived").length !== 0;
}
function activateMineTiles() {
  const mineTiles = document.querySelectorAll(".tile.mine");
  mineTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("actived");
    }, (index + 1) * 25);
  });
}

function addRetryButton() {
  const FIELD_CONTAINER = FIELD.parentNode;

  FIELD_CONTAINER.insertAdjacentHTML(
    "beforeend",
    '<a id="retry" href="javascript:location.reload()">Retry</a>'
  );
}

function showEndMessage(message) {
  MESSAGE.textContent = message;
  FIELD.addEventListener("click", stopProp, { capture: true });
  FIELD.addEventListener("contextmenu", stopProp, { capture: true });
  setTimeout(() => MESSAGE.classList.add("shown"), 500);
  setTimeout(() => addRetryButton(), 1000);
}

function checkGameEnd() {
  const lose = checkLose();
  const win = checkWin();

  if (lose) {
    activateMineTiles();
    showEndMessage("You Lose");
  } else if (win) {
    showEndMessage("YOU WIN!");
    setTimeout(() => RETRY_BTN.classList.add("shown"), 1000);
  }
}

/*===== ADDING EVENT LISTENERS =====*/
function addClickEvent(tile) {
  revealTiles(tile);
  checkGameEnd();
}

function addRightClickEvent(event) {
  const tile = event.currentTarget;
  const hasFlag = tile.classList.contains("flag");
  if (hasFlag) {
    tile.classList.remove("flag");
    tile.innerHTML = "";
    return;
  }
  tile.classList.add("flag");
  tile.innerHTML = '<i class="ri-flag-line"></i>';
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

FIELD.addEventListener("contextmenu", (event) => event.preventDefault());
const MINE_POSITIONS = getMinePositions(NUMBER_OF_MINES);
const board = createBoard(FIELD_SIZE);
console.log(board);

FIELD.style.setProperty("--size", FIELD_SIZE);
board.forEach((row) => row.forEach((tile) => FIELD.append(tile.element)));
