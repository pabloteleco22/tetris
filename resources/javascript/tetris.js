import {Board} from "./board.js";
import * as piece from "./pieces.js";

const COLUMNS = 11;
const ROWS = 16;

const MIDDLE_COLUMN = Math.floor(COLUMNS / 2);

let board = new Board(document.getElementById("board"), COLUMNS, ROWS, "#ffffff");

let currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);

function movePieceDown() {
    if (!currentPiece.moveDown()) {
        try {
            currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);
        } catch (e) {
            window.alert(e.message);
            board = new Board(document.getElementById("board"), COLUMNS, ROWS, "#ffffff");
            currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);
        }
    }
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowDown":
            movePieceDown();

            break;
        case "ArrowLeft":
            currentPiece.moveLeft();

            break;
        case "ArrowRight":
            currentPiece.moveRight();

            break;
        case "ArrowUp":
            currentPiece.rotate();

            break;
    }
});

setInterval(movePieceDown, 1000);