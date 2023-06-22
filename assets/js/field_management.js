import { addTileListeners, removeTileListeners } from "./input_management.js";
import { getMinePositions } from "./mine_management.js";

let field_size,
  NUMBER_OF_MINES = 10;

let board, MINE_POSITIONS;

function isMine(mine, x, y) {
  return mine.row === x && mine.column === y;
}

function createBoard(FIELD_SIZE, MINE_POSITIONS) {
  return Array.from({ length: FIELD_SIZE }, (_, x) =>
    Array.from({ length: FIELD_SIZE }, (_, y) => {
      const element = document.createElement("div");
      element.classList.add("tile");
      element.classList.add(
        MINE_POSITIONS.some((mine) => isMine(mine, x, y)) ? "mine" : "safe"
      );

      const tile = { element, x, y };
      addTileListeners(tile);
      return tile;
    })
  );
}

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

export function activateMineTiles() {
  const mineTiles = document.querySelectorAll(".tile.mine");
  mineTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("actived");
    }, (index + 1) * 25);
  });
}

export function revealTiles(tile) {
  const div = tile.element;
  if (div.classList.contains("actived") || div.classList.contains("flag"))
    return;
  div.classList.add("actived");
  removeTileListeners(div);

  if (div.classList.contains("mine")) return;

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
    div.textContent = mineTiles.length;
  }
}

export function initBoard(FIELD, FIELD_SIZE, NUMBER_OF_MINES) {
  field_size = FIELD_SIZE;
  MINE_POSITIONS = getMinePositions(FIELD_SIZE, NUMBER_OF_MINES);
  board = createBoard(field_size, MINE_POSITIONS);
  board.forEach((row) => row.forEach((tile) => FIELD.append(tile.element)));
}
