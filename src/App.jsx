import { useState } from 'react';
import GameSelection from './pages/GameSelection';
import GamePlayer from './pages/GamePlayer';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [playerName, setPlayerName] = useState('GUEST_PLAYER');

  // Simple routing based on state
  return (
    <div className="app-container">
      {selectedGame ? (
        <GamePlayer 
          game={selectedGame} 
          playerName={playerName}
          onBack={() => setSelectedGame(null)} 
        />
      ) : (
        <GameSelection 
          onSelectGame={(game, name) => {
            setSelectedGame(game);
            setPlayerName(name || 'GUEST_PLAYER');
          }} 
        />
      )}
    </div>
  );
}

export default App;
