function GameBoard() {
    const gameBoard = []
    const rows = 3
    const columns = 3

    for (i = 0; i < rows; i++) {        //creates 3x3 grid 
        gameBoard[i] = []
        for (j = 0; j < columns; j++) {
            gameBoard[i].push(Cell())
        }
    }

    const getBoard = () => gameBoard

    const addMarker = (row, column, player_marker) => {
        gameBoard[row][column].updateValue(player_marker)
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

    const updateValue = (player_marker) => {
        value = player_marker;
    }

    const getValue = () => value;

    return {
        updateValue,
        getValue
    }
}

function GameController() {

    const players = [
        {
            name: "playerOne",
            marker: 1
        },
        {
            name: "playerTwo",
            marker: 2
        }
    ]

    const boardInstance = GameBoard()

    let activePlayer = players[0]

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const checkWinner = (board) => {

        //check rows

        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() !== 0 && board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue())

                return board[i][0]
        }

        //check columns

        for (let i = 0; i < 3; i++) {
            if (board[0][i].getValue() !== 0 && board[0][i].getValue() == board[1][i].getValue() && board[1][i].getValue() == board[2][i].getValue())
                return board[0][i]
        }

        //check primary diagonal

        if (board[0][0].getValue() !== 0 && board[0][0].getValue() ==  board[1][1].getValue() && board[1][1].getValue() == board[2][2].getValue()){
            return board[0][0]
        }

        //check secondary diagonal

        if (board[0][2].getValue() !== 0 && board[0][2].getValue() == board[1][1].getValue() && board[1][1].getValue() == board[2][0].getValue()){
            return board[0][2]
        }

        return null
    }

    const playRound = (row, column) => {

        const board = boardInstance.getBoard();
        if (board[row][column].getValue() !== 0) {
            console.log("Cell already occupied!");
            return;
        }

        boardInstance.addMarker(row, column, getActivePlayer().marker)

        switchActivePlayer()

        boardInstance.printBoard()

        console.log(checkWinner(board))
    }

    return {
        getActivePlayer,
        checkWinner,
        playRound
    }
}

// test = GameController()
// test.playRound(1, 0)

// test.playRound(0, 1)

// test.playRound(1, 1)

// test.playRound(0, 2)

// test.playRound(1, 2)


