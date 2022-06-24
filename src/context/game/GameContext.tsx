import { createContext, FC, useMemo, useReducer } from 'react';

import { isDraw, isGameOver } from './logic';

type Player = '❌' | '🟡';
type Winner = Player | 'Draw';
export type Board = Array<Array<string>>;

type GameState = {
  currentPlayer: Player;
  board: Board;
  winner?: Winner;
  play: (row: number, col: number) => void;
};

type Action = {
  type: 'PLAY';
  payload?: { row: number; col: number };
};

const INITIAL_GAME_STATE: GameState = {
  currentPlayer: '❌',
  winner: undefined,
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
} as GameState;

export const GameContext = createContext<GameState>(INITIAL_GAME_STATE);

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'PLAY': {
      state.board[action.payload!.row][action.payload!.col] =
        state.currentPlayer;

      const gameIsDraw = isDraw(state.board);
      const gameIsOver = isGameOver(state.board);
      const winner: Winner | undefined = gameIsDraw
        ? 'Draw'
        : gameIsOver
        ? state.currentPlayer
        : undefined;

      return {
        ...state,
        winner,
        currentPlayer: state.currentPlayer === '🟡' ? '❌' : '🟡',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

interface GameContextProviderProps {
  children: React.ReactNode;
}

export const GameContextProvider: FC<GameContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const play = (row: number, col: number) =>
    dispatch({ type: 'PLAY', payload: { row, col } });

  const value = useMemo(
    () => ({
      ...state,
      play,
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
