import { useGameContext } from './context/game/useGameContext';
import { Grid } from './components';

import './styles/App.scss';

function App() {
  const { winner } = useGameContext();
  const winnerText =
    winner === 'Draw' ? `Draw! No winners...` : `And the winner is: ${winner}!`;
  return (
    <div className="app">
      <div className="app__inner">
        <h1>Tic Tac Toe</h1>
        <Grid />
        {winner && <span className="winner">{winnerText}</span>}
        {winner && <button className="replay-button">Replay</button>}
      </div>
    </div>
  );
}

export default App;
