import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Leaderboard() {
  const { imageId } = useParams();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/scores/${imageId}`)
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, [imageId]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.playerName}</td>
              <td>{score.time}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;