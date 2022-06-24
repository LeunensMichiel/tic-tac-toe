import { useCallback, useMemo } from 'react';
import { FC } from 'react';
import cn from 'classnames';

import { useGameContext } from '../../context/game/useGameContext';

import styles from './GridItem.module.scss';

const GRID_WIDTH = 3;
type GridItemProps = {
  index: number;
};

export const GridItem: FC<GridItemProps> = ({ index }) => {
  const { play, board } = useGameContext();
  const row = useMemo(() => Math.floor(index / GRID_WIDTH), [index]);
  const col = useMemo(() => index % GRID_WIDTH, [index]);
  const boardCell = board[row][col];

  const handleClick = useCallback(() => {
    if (boardCell) {
      return;
    }
    play(row, col);
  }, [boardCell, col, play, row]);

  return (
    <button
      className={cn(styles.root, {
        [styles.isPicked]: !!boardCell,
      })}
      onClick={handleClick}
    >
      {boardCell}
    </button>
  );
};
