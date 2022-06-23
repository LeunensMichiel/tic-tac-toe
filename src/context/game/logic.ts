import { Board } from '..';

export const rowIsCrossed = (board: Board): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ''
    )
      return true;
  }
  return false;
};

export const columnIsCrossed = (board: Board): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ''
    )
      return true;
  }
  return false;
};

export const diagonalIsCrossed = (board: Board): boolean => {
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ''
  )
    return true;

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ''
  )
    return true;

  return false;
};

export const isDraw = (board: Board): boolean => {
  if (!board.flatMap((board) => board).some((item) => item === '')) {
    return true;
  }
  return false;
};

export const isGameOver = (board: Board): boolean => {
  if (
    columnIsCrossed(board) ||
    rowIsCrossed(board) ||
    diagonalIsCrossed(board)
  ) {
    return true;
  }
  return false;
};
