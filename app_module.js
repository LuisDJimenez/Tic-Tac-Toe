const TicTacToe = (() => {
  let fields;
  let board;
  let currentPlayer;
  let isGameActive;
  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";
  const announcer = document.querySelector(".announcer");
  const resetButton = document.querySelector("#reset");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameModule = () => {
    fields = document.querySelectorAll(".field");
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;

    fields.forEach((field, index) => {
      field.addEventListener("click", () => userAction(field, index));
    });
  };

  const isValid = (field) => {
    if (field.innerText === "X" || field.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (isGameActive) {
      announcer.innerHTML = `Player ${currentPlayer}'s turn`;
    }
  };

  const handleResult = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) {
      announce(TIE);
      isGameActive = false;
      return;
    }
  };

  const userAction = (field, index) => {
    if (isValid(field) && isGameActive) {
      field.innerText = currentPlayer;
      field.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResult();
      switchPlayer();
    }
  };

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    if (currentPlayer === "O") {
      switchPlayer();
    }

    fields.forEach((field) => {
      field.innerText = "";
      field.classList.remove("playerX");
      field.classList.remove("playerO");
    });
  };

  resetButton.addEventListener("click", resetBoard);

  return {
    gameModule,
  };
})();

TicTacToe.gameModule();
