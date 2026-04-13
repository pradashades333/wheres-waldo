import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/images')
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Where's Waldo</h1>
      
      <div className="level-grid">
        {images.map((image) => (
          <Link to={`/game/${image.id}`} key={image.id} className="level-card">
            <div className="level-image-wrapper">
              <img src={image.url} alt={image.name} className="level-image" />
            </div>
            <div className="level-info">
              <h2 className="level-name">{image.name}</h2>
              <span className="play-button">Play Level</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;