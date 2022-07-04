const COMBINATIONS_TO_WIN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isCircleTurn = true;

const boardCells = document.querySelectorAll('[data-board-cell]');
const resultElement = document.querySelector('[data-result-container]');
const winnerElement = document.querySelector('[data-winner]');
const playAgainButton = document.querySelector('[data-play-again-button]');

startGame();
playAgainButton.addEventListener('click', startGame);

function startGame() {
  boardCells.forEach((cell) => {
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    isCircleTurn = true;
    cell.classList.remove('circle');
    cell.classList.remove('cross');
    resultElement.classList.remove('visible');
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'circle' : 'cross';
  cell.classList.add(currentClass);
  if (checkWinner(currentClass)) {
    let winner = currentClass.charAt(0).toUpperCase() + currentClass.slice(1);
    resultElement.classList.add('visible');
    winnerElement.innerText = `${winner} won !!`;
  } else if (isDraw()) {
    resultElement.classList.add('visible');
    winnerElement.innerText = `Draw !!`;
  } else {
    swapTurns();
  }
  console.info(isDraw());
}

function isDraw() {
  return [...boardCells].every((cell) => {
    return (
      cell.classList.contains('circle') || cell.classList.contains('cross')
    );
  });
}

function checkWinner(currentClass) {
  return COMBINATIONS_TO_WIN.some((combination) => {
    return combination.every((index) => {
      return boardCells[index].classList.contains(currentClass);
    });
  });
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}
