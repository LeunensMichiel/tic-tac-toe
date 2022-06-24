import { createContext, FC, useMemo, useReducer } from 'react';

export type Player = 'X' | 'O';
export type Board = Array<Array<string>>;

type GameState = {
  currentPlayer: Player;
  setCurrentPlayer: (player: Player) => void;
  board: Board;
  winner?: Player | 'Draw';
  play: (row: number, col: number) => void;
};

type Action = {
  type: 'PLAY';
  payload?: { row: number; col: number };
};

const INITIAL_GAME_STATE: GameState = {
  currentPlayer: 'X',
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
        state.currentPlayer === 'X' ? '❌' : '🟡';
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'O' ? 'X' : 'O',
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
