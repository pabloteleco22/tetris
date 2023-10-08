import {Board} from "./board.js";
import * as piece from "./pieces.js";

const columns = 10;
const rows = 15;

let board = new Board(document.getElementById("board"), columns, rows, "#ffffff");

let currentPiece = piece.pieceFactory(board);

function movePieceDown() {
    if (!currentPiece.moveDown()) {
        try {
            currentPiece = piece.pieceFactory(board);
        } catch (e) {
            window.alert(e.message);
            board = new Board(document.getElementById("board"), columns, rows, "#ffffff");
            currentPiece = piece.pieceFactory(board);
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