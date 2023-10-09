export class Board {
    constructor(board, score, columns, rows, bg_color) {
        this.board = board;
        this.scoreLabel = score;
        this.columns = columns;
        this.rows = rows;
        this.board.height = this.board.clientHeight;
        this.box_side = this.board.clientHeight / rows;
        this.board.width = columns * this.box_side;
        this.context = board.getContext("2d");
        this.context.scale(this.box_side, this.box_side);
        this.bg_color = bg_color;
        this.shapes = Array.from(Array(rows), _ => Array(columns).fill(bg_color));
        this.score = 0;
        this.gold_score = 100;
        this.gold_condition = () => {return this.score >= this.gold_score};
        this.gold_color = "#ffd000";
    }
    
    drawBox(column, row, color) {
        this.context.fillStyle = color;
        this.context.fillRect(column, row, 1, 1);
    }
    
    drawPiece(piece) {
        this.draw();
        
        for (let i = 0; i < piece.shape.length; ++i) {
            this.drawBox(piece.startColumn + piece.shape[i][0], piece.startRow + piece.shape[i][1], piece.color);
        }
    }
    
    checkRows() {
        let deletedRows = 0;

        for (let row = 0; row < this.shapes.length; ++row) {
            let column = 0;
            while (column < this.shapes[row].length && this.shapes[row][column] !== this.bg_color) {
                ++column;
            }
            
            if (column == this.shapes[row].length) {
                deletedRows++;
                this.score += deletedRows * 10;
                if (this.gold_condition(this.score)) {
                    this.shapes.forEach((r) => {
                        for (let i = 0; i < r.length; ++i) {
                            if (r[i] !== this.bg_color) {
                                r[i] = this.gold_color;
                            }
                        }
                    });
                    
                    console.log(this.shapes);
                }
                this.shapes.splice(row, 1);
                this.shapes.unshift(Array(this.columns).fill(this.bg_color));
            }
        }
        
        this.scoreLabel.innerText = this.score;
    }
    
    placePiece(piece) {
        if (this.gold_condition())
            piece.color = this.gold_color;

        for (let i = 0; i < piece.shape.length; ++i) {
            this.shapes[piece.startRow + piece.shape[i][1]][piece.startColumn + piece.shape[i][0]] = piece.color;
        }
        
        this.checkRows();
    }
    
    collides(column, row) {
        return row >= this.shapes.length || this.shapes[row][column] !== this.bg_color;
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