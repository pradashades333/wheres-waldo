import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Game() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/images/${id}/characters`)
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }, [id]);

  const handleImageClick = (e) => {
    // Calculate click relative to the image dimensions
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
        } else {
          alert('Keep looking!');
        }
        setShowDropdown(false);
      });
  };

  if (!gameData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Find the Characters</h1>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img 
          src={gameData.url} 
          alt="Game Level" 
          onClick={handleImageClick} 
          style={{ cursor: 'crosshair' }}
        />

        {showDropdown && (
          <div style={{ 
            position: 'absolute', 
            top: coords.y, 
            left: coords.x, 
            backgroundColor: 'white', 
            border: '1px solid black' 
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '5px' }}>
              {gameData.characters.map((char) => (
                <li 
                  key={char.id} 
                  onClick={() => handleCharacterSelect(char.id)}
                  style={{ cursor: 'pointer', padding: '5px' }}
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