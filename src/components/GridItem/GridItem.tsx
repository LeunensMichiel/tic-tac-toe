import { useCallback, useState } from 'react';
import { FC } from 'react';
import cn from 'classnames';

import styles from './GridItem.module.scss';

type GridItemProps = {
  index: number;
};
export const GridItem: FC<GridItemProps> = ({ index }) => {
  const [isPickedBy, setIsPickedBy] = useState('');
  const handleClick = useCallback(() => {
    if (isPickedBy) {
      return;
    }
    setIsPickedBy('❌');
    console.log(`Picked ${index}`);
    // TODO: logic for picking which is who
    // setIsPickedBy('🟡');
  }, [index, isPickedBy]);

  return (
    <button
      className={cn(styles.root, {
        [styles.isPicked]: !!isPickedBy,
      })}
      onClick={handleClick}
    >
      {isPickedBy}
    </button>
  );
};
