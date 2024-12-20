function GameBoard() {
    const gameBoard = []
    const rows = 3
    const columns = 3

    for (i = 0; i < rows; i++){
        gameBoard[i] = []
        for(j = 0; j < columns; j++){
            gameBoard[i].push(Cell())
        }
    }

    const getBoard = () => gameBoard

    const addMarker = (row, column, player) => {
        gameBoard[row][column].updateValue(player)
    }

    const printBoard = () => {
        const boardWithCellValues = gameBoard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return {
        getBoard,
        addMarker,
        printBoard
    }
}

function Cell() {
    let value = 0;

    const updateValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        updateValue,
        getValue
    }
}