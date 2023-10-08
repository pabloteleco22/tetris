class Piece {
    constructor(board, startColumn, startRow, color, shape) {
        this.startColumn = startColumn;
        this.startRow = startRow;
        this.color = color;
        this.shape = shape;
    }
    
    moveDown() {
        for (let i = 0; i < this.shape.length; ++i) {
            ++(this.shape[i][1]);
        }
    }

    moveLeft() {
        for (let i = 0; i < this.shape.length; ++i) {
            --(this.shape[i][0]);
        }
    }

    moveRight() {
        for (let i = 0; i < this.shape.length; ++i) {
            ++(this.shape[i][0]);
        }
    }
}

export class Bar extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#9cdf00",
            [[0, 0], [0, 1], [0, 2], [0, 3]]);
    }
}

export class Square extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#af1818",
            [[0, 0], [0, 1], [1, 0], [1, 1]]);
    }
}

export class T extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#5166df",
            [[1, 0], [0, 1], [1, 1], [2, 1]]);
    }
}