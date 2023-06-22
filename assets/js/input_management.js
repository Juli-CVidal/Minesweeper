import { checkGameEnd } from "./game_management.js";
import { revealTiles } from "./field_management.js";

function addRightClickEvent(div) {
  if (div.classList.contains("actived")) return;
  const hasFlag = div.classList.contains("flag");
  if (hasFlag) {
    div.classList.remove("flag");
    div.innerHTML = "";
  } else {
    div.classList.add("flag");
    div.innerHTML = '<i class="ri-flag-line"></i>';
  }
}
function addClickEvent(tile) {
  revealTiles(tile);
  checkGameEnd();
}

export function addTileListeners(tile) {
  const div = tile.element;
  div.addEventListener("click", () => addClickEvent(tile));
  div.addEventListener("contextmenu", () => {
    addRightClickEvent(div);
  });
}

export function removeTileListeners(div) {
  div.removeEventListener("click", () => addClickEvent(div));
  div.removeEventListener("contextmenu", () => {
    addRightClickEvent();
  });
}
