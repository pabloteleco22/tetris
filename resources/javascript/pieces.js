class Piece {
    constructor(board, startColumn, startRow, color, shape) {
        this.board = board;
        this.startColumn = startColumn;
        this.startRow = startRow;
        this.color = color;
        this.shape = shape;
        
        let i = 0;
        while (i < this.shape.length && !this.board.collides(this.shape[i][0] + this.startColumn, this.shape[i][1] + this.startRow)) {
            ++i;
        }
        
        if (i < this.shape.length) {
            throw new Error("Game over");
        } else {
            this.board.drawPiece(this);
        }
    }
    
    moveDown() {
        for (let i = 0; i < this.shape.length; ++i) {
            if (this.board.collides(this.shape[i][0] + this.startColumn, this.shape[i][1] + this.startRow + 1)) {
                this.board.placePiece(this);
                return false;
            }
        }
        this.startRow++;
        
        this.board.drawPiece(this);
        
        return true;
    }

    moveLeft() {
        if (this.startColumn == 0) {
            return
        }
        
        for (let i = 0; i < this.shape.length; ++i) {
            if (this.board.collides(this.shape[i][0] + this.startColumn - 1, this.shape[i][1] + this.startRow)) {
                return;
            }
        }
        this.startColumn--;
        
        this.board.drawPiece(this);
    }

    moveRight() {
        if (this.startColumn >= this.board.columns - 1) {
            return;
        }

        for (let i = 0; i < this.shape.length; ++i) {
            if (this.board.collides(this.shape[i][0] + this.startColumn + 1, this.shape[i][1] + this.startRow)) {
                return;
            }
        }
        this.startColumn++;
        
        this.board.drawPiece(this);
    }
    
    rotate() {}
}

export class Bar extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#9cdf00",
            [[0, 0], [0, 1], [0, 2], [0, 3]]);
        this.vertical = true;
    }
    
    rotate() {
        let new_shape = [];

        if (this.vertical) {
            new_shape = [[0, 0], [1, 0], [2, 0], [3, 0]]
        } else {
            new_shape = [[0, 0], [0, 1], [0, 2], [0, 3]]
        }
        
        this.vertical = !this.vertical;
        
        for (let i = 0; i < new_shape.length; ++i) {
            if (this.board.collides(this.startColumn + new_shape[i][0], this.startRow + new_shape[i][1])) {
                return;
            }
        }
        
        this.shape = new_shape;

        this.board.drawPiece(this);
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
        this.state = 0;
    }
    
    rotate() {
        let new_shape = [];
        switch (this.state) {
            case 0:
                new_shape = [[0, 0], [0, 1], [1, 1], [0, 2]];

                break;
            case 1:
                new_shape = [[0, 0], [1, 1], [1, 0], [2, 0]];

                break;
            case 2:
                new_shape = [[1, 0], [0, 1], [1, 1], [1, 2]];

                break;
            case 3:
                new_shape = [[1, 0], [0, 1], [1, 1], [2, 1]];

                break;
        }

        for (let i = 0; i < new_shape.length; ++i) {
            if (this.board.collides(this.startColumn + new_shape[i][0], this.startRow + new_shape[i][1])) {
                return;
            }
        }
        
        this.shape = new_shape;
        
        this.state = (this.state + 1) % 4;

        this.board.drawPiece(this);
    }
}

export class Z extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#dfd151",
            [[0, 0], [1, 0], [1, 1], [2, 1]]);
        this.vertical = false;
    }
        
    rotate() {
        let new_shape = [];

        if (this.vertical) {
            new_shape = [[0, 0], [1, 0], [1, 1], [2, 1]];
        } else {
            new_shape = [[1, 0], [1, 1], [0, 1], [0, 2]];
        }

        for (let i = 0; i < new_shape.length; ++i) {
            if (this.board.collides(this.startColumn + new_shape[i][0], this.startRow + new_shape[i][1])) {
                return;
            }
        }
        
        this.shape = new_shape;

        this.vertical = !this.vertical;

        this.board.drawPiece(this);
    }
}

export class L extends Piece {
    constructor(board, startColumn, startRow) {
        super(board, startColumn, startRow, "#df51df",
            [[0, 0], [1, 0], [2, 0], [2, 1]]);
        this.state = 0;
    }
    
    rotate() {
        let new_shape = [];

        switch (this.state) {
            case 0:
                new_shape = [[1, 0], [1, 1], [1, 2], [0, 2]];

                break;
            case 1:
                new_shape = [[0, 0], [0, 1], [1, 1], [2, 1]];

                break;
            case 2:
                new_shape = [[0, 0], [0, 1], [0, 2], [1, 0]];

                break;
            case 3:
                new_shape = [[0, 0], [1, 0], [2, 0], [2, 1]];

                break;
        }

        for (let i = 0; i < new_shape.length; ++i) {
            if (this.board.collides(this.startColumn + new_shape[i][0], this.startRow + new_shape[i][1])) {
                return;
            }
        }
        
        this.shape = new_shape;
        
        this.state = (this.state + 1) % 4;

        this.board.drawPiece(this);
    }
}

export function pieceFactory(board, column) {
    switch (Math.floor(Math.random() * 5)) {
        case 0: return new Bar(board, column, 0);
        case 1: return new Square(board, column, 0);
        case 2: return new T(board, column, 0);        
        case 3: return new Z(board, column, 0);        
        case 4: return new L(board, column, 0);        
    }
}