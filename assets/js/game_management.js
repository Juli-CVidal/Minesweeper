import { initBoard, activateMineTiles } from "./field_management.js";

let field;
const RETRY_BTN = document.getElementById("retry");
const MESSAGE = document.getElementById("message");

function addRetryButton() {
  const FIELD_CONTAINER = field.parentNode;

  FIELD_CONTAINER.insertAdjacentHTML(
    "beforeend",
    '<a id="retry" href="javascript:location.reload()">Retry</a>'
  );
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

function showEndMessage(message) {
  MESSAGE.textContent = message;
  field.addEventListener(
    "click",
    (event) => {
      stopProp(event);
    },
    { capture: true }
  );
  field.addEventListener(
    "contextmenu",
    (event) => {
      stopProp(event);
    },
    { capture: true }
  );
  setTimeout(() => MESSAGE.classList.add("shown"), 500);
  setTimeout(() => addRetryButton(), 1000);
}

function checkWin() {
  const safeTiles = document.querySelectorAll(".tile.safe");
  const activeSafeTiles = document.querySelectorAll(".tile.safe.actived");
  return safeTiles.length === activeSafeTiles.length;
}

function checkLose() {
  return document.querySelectorAll(".tile.mine.actived").length !== 0;
}

export function checkGameEnd() {
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

export function initGame(FIELD, FIELD_SIZE, NUMBER_OF_MINES) {
  field = FIELD;
  initBoard(FIELD, FIELD_SIZE, NUMBER_OF_MINES);
}
