const columns = 10;
const rows = 15;

let board = document.getElementById("board");

board.width = board.clientWidth;

const box_side = board.clientWidth / columns;

board.height = rows * box_side;

console.log("box_side: " + box_side);
console.log("width: " + board.width);
console.log("height: " + board.height);

let context = board.getContext("2d");

for (let i = 0; i < rows - 1; ++i) {
    setBox(0, i)
}

for (let i = 0; i < columns - 1; ++i) {
    setBox(i, 0)
}

function setBox(x, y) {
    context.fillRect(x * box_side, y * box_side, box_side, box_side);
}