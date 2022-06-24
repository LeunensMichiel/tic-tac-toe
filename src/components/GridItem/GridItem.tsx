import { useCallback } from 'react';
import { FC } from 'react';
import cn from 'classnames';

import { useGameContext } from '../../context/game/useGameContext';

import styles from './GridItem.module.scss';

const GRID_WIDTH = 3;
type GridItemProps = {
  index: number;
};

export const GridItem: FC<GridItemProps> = ({ index }) => {
  const { play, board, winner } = useGameContext();
  const row = Math.floor(index / GRID_WIDTH);
  const col = index % GRID_WIDTH;
  const boardCell = board[row][col];

  const handleClick = useCallback(() => {
    if (boardCell || winner) {
      return;
    }
    play(row, col);
  }, [boardCell, col, play, row, winner]);

  return (
    <button
      className={cn(styles.root, {
        [styles.isPicked]: !!boardCell || winner,
      })}
      onClick={handleClick}
    >
      {boardCell}
    </button>
  );
};
