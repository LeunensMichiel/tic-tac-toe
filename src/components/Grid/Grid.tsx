import { GridItem } from '..';

import styles from './Grid.module.scss';

const amountOfItems = Array.from(Array(9).keys());

export const Grid = () => {
  return (
    <div className={styles.root}>
      {amountOfItems.map((index) => (
        <GridItem key={index} index={index} />
      ))}
    </div>
  );
};
