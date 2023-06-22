// export function getMinePositions(fieldSize, numberOfMines) {
//   let mines = [];
//   if (numberOfMines === 0) {
//     return mines;
//   }

//   while (mines.length < numberOfMines) {
//     const mine = generateRandomMine(fieldSize);
//     if (!isAdjacentToExistingMines(mine, mines)) {
//       mines.push(mine);
//     }
//   }

//   return mines;
// }

// function generateRandomMine(fieldSize) {
//   const row = Math.floor(Math.random() * fieldSize);
//   const column = Math.floor(Math.random() * fieldSize);
//   return { row, column };
// }

// function isAdjacentToExistingMines(mine, mines) {
//   for (let i = 0; i < mines.length; i++) {
//     const existingMine = mines[i];
//     if (isAdjacent(mine, existingMine)) {
//       return true;
//     }
//   }
//   return false;
// }

// function isAdjacent(mine1, mine2) {
//   const distanceRow = Math.abs(mine1.row - mine2.row);
//   const distanceColumn = Math.abs(mine1.column - mine2.column);
//   return distanceRow <= 1 && distanceColumn <= 1;
// }

export function getMinePositions(field_size, number_of_mines) {
  let mines = [];
  if (number_of_mines === 0) {
    return mines;
  }

  const row = Math.floor(Math.random() * field_size);
  const column = Math.floor(Math.random() * field_size);

  if (mines.some((mine) => mine.row === row && mine.column === column)) {
    return getMinePositions(field_size, number_of_mines);
  }

  mines.push({ row, column });

  return number_of_mines === 1
    ? mines
    : mines.concat(getMinePositions(field_size, number_of_mines - 1));
}
