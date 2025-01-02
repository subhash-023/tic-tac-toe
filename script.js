const GameBoard = (function () {
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

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                gameBoard[i][j].updateValue(0);
            }
        }
        return gameBoard
    };

    return {
        getBoard,
        addMarker,
        printBoard,
        resetBoard
    }
})()

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

const Game = (function GameController() {

    const players = [
        {
            name: "PlayerOne",
            marker: 1
        },
        {
            name: "PlayerTwo",
            marker: 2
        }
    ]

    // const boardInstance = GameBoard()

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

        const board = GameBoard.getBoard();
        if (board[row][column].getValue() !== 0) {
            console.log("Cell already occupied!");
            return;
        }

        GameBoard.addMarker(row, column, getActivePlayer().marker)

        switchActivePlayer()

        // if(checkWinner(GameBoard) !== null){
        //     resetActivePlayer()
        // }

        GameBoard.printBoard()

        // console.log(checkWinner(board))
    }

    const resetActivePlayer = () => {
        activePlayer = players[0]
    }

    return {
        getActivePlayer,
        checkWinner,
        playRound,
        resetActivePlayer
    }
})()

function displayController(board) {

    const grid_container = document.getElementById("grid-container")
    const turn_div = document.getElementById("turn")
    const resetBtn = document.getElementById("reset-btn")
    let emptyCellCount = 0
    
    grid_container.innerHTML = ""


    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {

            const gridSquare = document.createElement("button")
            gridSquare.classList.add("gridSquare")

            turn_div.innerHTML = `${Game.getActivePlayer().name}'s turn`

            if(cell.getValue() == 0){
                gridSquare.textContent = ""
                emptyCellCount++
            }
            if(cell.getValue() == 1){
                gridSquare.textContent = "X"
            }
            if(cell.getValue() == 2){
                gridSquare.textContent = "O"
            }

            grid_container.appendChild(gridSquare)
            if(Game.checkWinner(GameBoard.getBoard()) === null){
                gridSquare.addEventListener("click", () => {
                    handleClickEvent(rowIndex, colIndex)
                })
            }
            if(emptyCellCount === 0){
                turn_div.textContent = "Match Drawn"
            }
        })
    });

    function handleClickEvent(rowIndex, colIndex){
        Game.playRound(rowIndex, colIndex)
        displayController(GameBoard.getBoard())
        winner = Game.checkWinner(GameBoard.getBoard())
        if(winner != null) {
            if(winner.getValue() == 1){
                turn_div.textContent = 'PlayerOne won'
            }
            else{
                turn_div.textContent = 'PlayerTwo won'
            }
        }
    }

    resetBtn.addEventListener("click", () => {
        Game.resetActivePlayer()
        displayController(GameBoard.resetBoard())
    })
}

displayController(GameBoard.getBoard())