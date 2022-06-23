import { createContext, FC, useMemo, useReducer } from 'react';

export type User = 'X' | 'O';
export type Board = Array<Array<string>>;

type GameState = {
  currentUser: User;
  board: Board;
  winner?: User | 'Draw';
  setCurrentUser: (user: User) => void;
  play: () => void;
};

type Action = {
  type: 'PLAY';
};

const INITIAL_GAME_STATE: GameState = {
  currentUser: 'X',
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
      return {
        ...state,
        currentUser: state.currentUser === 'O' ? 'X' : 'O',
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
  const play = () => dispatch({ type: 'PLAY' });

  const value = useMemo(
    () => ({
      ...state,
      play,
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
