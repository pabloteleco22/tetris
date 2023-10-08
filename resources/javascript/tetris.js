import {Board} from "./board.js";
import * as piece from "./pieces.js";

const columns = 10;
const rows = 15;

let board = new Board(document.getElementById("board"), columns, rows);

let square = new piece.Square(board, 0, 0);
let bar = new piece.Bar(board, 5, 2);
let t = new piece.T(board, 6, 5);

board.placePiece(square);
board.placePiece(bar);
board.placePiece(t);