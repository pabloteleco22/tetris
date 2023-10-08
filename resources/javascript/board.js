export class Board {
    constructor(board, columns, rows) {
        this.board = board;

        this.board.height = this.board.clientHeight;
        
        this.box_side = this.board.clientHeight / rows;

        this.board.width = columns * this.box_side;
        
        this.context = board.getContext("2d");
    }
    
    placeBox(column, row) {
        this.context.fillRect(column * this.box_side, row * this.box_side, this.box_side, this.box_side);
    }
    
    placePiece(piece) {
        this.context.fillStyle = piece.color;

        for (let i = 0; i < piece.shape.length; ++i) {
            this.placeBox(piece.startColumn + piece.shape[i][0],
                piece.startRow + piece.shape[i][1]);
        }
    }
}