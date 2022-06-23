import { useCallback, useState } from 'react';
import { FC } from 'react';
import cn from 'classnames';

import { useGameContext } from '../../context/game/useGameContext';

import styles from './GridItem.module.scss';

type GridItemProps = {
  index: number;
};
export const GridItem: FC<GridItemProps> = ({ index }) => {
  const { currentUser, play } = useGameContext();
  const [currentUserString, setCurrentUserString] = useState('');
  const handleClick = useCallback(() => {
    if (currentUserString) {
      return;
    }
    setCurrentUserString(currentUser === 'X' ? '❌' : '🟡');
    play();
  }, [currentUser, currentUserString, play]);

  return (
    <button
      className={cn(styles.root, {
        [styles.isPicked]: !!currentUserString,
      })}
      onClick={handleClick}
    >
      {currentUserString}
    </button>
  );
};
