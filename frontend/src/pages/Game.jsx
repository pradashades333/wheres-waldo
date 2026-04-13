import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css';

function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [startTime] = useState(Date.now);

  useEffect(() => {
    fetch(`http://localhost:3000/images/${id}/characters`)
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }, [id]);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    setShowDropdown(!showDropdown);
  };

  const handleCharacterSelect = (characterId) => {
      fetch(`http://localhost:3000/images/${id}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          x: coords.x,
          y: coords.y,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.correct) {
            alert('You found them!');
            setFoundCharacters(prev => [...prev, characterId]);

            if (foundCharacters.length + 1 === gameData.characters.length) {
              const time = (Date.now() - startTime) / 1000;
              const playerName = prompt('Enter your name for the leaderboard!');
              fetch(`http://localhost:3000/scores/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerName, time }),
              }).then(() => navigate(`/leaderboard/${id}`));
            }
          } else {
            alert('Keep looking!');
          }
          setShowDropdown(false);
        });
    };

  if (!gameData) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="game-page">
      <h1 className="game-title">Find the Characters</h1>
      
      <div className="image-container">
        <img 
          src={gameData.url} 
          alt="Game Level" 
          onClick={handleImageClick} 
          className="game-image"
        />

        {showDropdown && (
          <div className="character-dropdown" style={{ 
            top: coords.y, 
            left: coords.x,
          }}>
            <ul className="character-list">
              {gameData.characters.map((char) => (
                <li 
                  key={char.id} 
                  onClick={() => handleCharacterSelect(char.id)}
                  className="character-item"
                >
                  {char.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;