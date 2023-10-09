import {Board} from "./board.js";
import {MOVEMENT, BOARD_SIZE, INITIAL_INTERVAL_TIME,
    INTERVAL_TIME_LIMIT, INTERVAL_STEP} from "./constants.js";
import * as piece from "./pieces.js";

const MIDDLE_COLUMN = Math.floor(BOARD_SIZE.COLUMNS / 2);

const HTML_SCORE = document.getElementById("score");

let board = new Board(
    document.getElementById("board"),
    HTML_SCORE,
    BOARD_SIZE.COLUMNS,
    BOARD_SIZE.ROWS,
    "#ffffff");

let currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);

let intervalTime = INITIAL_INTERVAL_TIME;

let interval = setInterval(movePieceDown, intervalTime);


function movePieceDown() {
    if (!currentPiece.moveDown()) {
        try {
            currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);
            if (intervalTime - INTERVAL_STEP >= INTERVAL_TIME_LIMIT) {
                intervalTime -= INTERVAL_STEP;
            }
            clearInterval(interval);
            interval = setInterval(movePieceDown, intervalTime);
        } catch (e) {
            clearInterval(interval);
            window.alert(e.message);
            HTML_SCORE.innerText = 0;
            intervalTime = INITIAL_INTERVAL_TIME;
            interval = setInterval(movePieceDown, intervalTime);
            board = new Board(
                document.getElementById("board"),
                HTML_SCORE,
                BOARD_SIZE.COLUMNS, BOARD_SIZE.ROWS,
                "#ffffff");
            currentPiece = piece.pieceFactory(board, MIDDLE_COLUMN);
        }
    }
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case MOVEMENT.DOWN:
            movePieceDown();

            break;
        case MOVEMENT.LEFT:
            currentPiece.moveLeft();

            break;
        case MOVEMENT.RIGHT:
            currentPiece.moveRight();

            break;
        case MOVEMENT.ROTATE:
            currentPiece.rotate();

            break;
    }
});