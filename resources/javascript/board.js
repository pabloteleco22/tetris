export class Board {
    constructor(board, columns, rows, bg_color) {
        this.board = board;
        this.columns = columns;
        this.rows = rows;
        this.board.height = this.board.clientHeight;
        this.box_side = this.board.clientHeight / rows;
        this.board.width = columns * this.box_side;
        this.context = board.getContext("2d");
        this.bg_color = bg_color;
        this.shapes = Array.from(Array(rows), _ => Array(columns).fill(bg_color));
    }
    
    drawBox(column, row, color) {
        this.context.fillStyle = color;
        this.context.fillRect(column * this.box_side, row * this.box_side, this.box_side, this.box_side);
    }
    
    drawPiece(piece) {
        this.draw();
        
        for (let i = 0; i < piece.shape.length; ++i) {
            this.drawBox(piece.startColumn + piece.shape[i][0], piece.startRow + piece.shape[i][1], piece.color);
        }
    }
    
    checkRows() {
        for (let row = 0; row < this.shapes.length; ++row) {
            let column = 0;
            while (column < this.shapes[row].length && this.shapes[row][column] !== this.bg_color) {
                ++column;
            }
            
            if (column == this.shapes[row].length) {
                console.log(this.shapes);
                this.shapes.splice(row, 1);
                console.log(this.shapes);
                this.shapes.unshift(Array(this.columns).fill(this.bg_color));
                console.log(this.shapes);
            }
        }
    }
    
    placePiece(piece) {
        for (let i = 0; i < piece.shape.length; ++i) {
            this.shapes[piece.startRow + piece.shape[i][1]][piece.startColumn + piece.shape[i][0]] = piece.color;
        }
        
        this.checkRows();
    }
    
    collides(column, row) {
        return row >= this.rows || this.shapes[row][column] !== this.bg_color;
    }
    
    draw() {
        this.context.clearRect(0, 0, this.board.width, this.board.height);
        
        for (let row = 0; row < this.shapes.length; ++row) {
            for (let column = 0; column < this.shapes[row].length; ++column) {
                this.drawBox(column, row, this.shapes[row][column]);
            }
        }
    }
}