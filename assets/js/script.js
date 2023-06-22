import { initGame } from "./game_management.js";

const FIELD_SIZE = 15,
  NUMBER_OF_MINES = Math.floor(FIELD_SIZE * FIELD_SIZE * 0.25);

console.log(NUMBER_OF_MINES);

const FIELD = document.querySelector(".field");
FIELD.addEventListener("contextmenu", (event) => event.preventDefault());
FIELD.style.setProperty("--size", FIELD_SIZE);

initGame(FIELD, FIELD_SIZE, NUMBER_OF_MINES);
