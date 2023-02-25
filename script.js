const FIELD = document.querySelector(".field");
FIELD.addEventListener("contextmenu", (event)=> event.preventDefault());
setTimeout(() => {
  FIELD.classList.add("shown");
}, 1000);
const NUMBER_OF_MINES = 10;
const FIELD_SIZE = 8;

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

const MINE_POSITIONS = getMinePositions(NUMBER_OF_MINES);
const board = createBoard(FIELD_SIZE);

FIELD.style.setProperty("--size", FIELD_SIZE);
board.forEach((row) => row.forEach((tile) => FIELD.append(tile.element)));

function addClickEvent(event) {
  const tile = event.target;
  tile.classList.add("actived");
  tile.removeEventListener("click", addClickEvent);
  tile.removeEventListener("contextmenu", addRightClickEvent);
}

function addRightClickEvent(event) {
  const tile = event.target;
  tile.classList.add("flag");
}

const tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => {
  tile.addEventListener("click", addClickEvent);
  tile.addEventListener("contextmenu", addRightClickEvent);
});
