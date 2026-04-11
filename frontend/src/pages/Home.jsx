import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/images')
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div>
      <h1>Wheres Waldo</h1>
      {images.map((image) => (
        <div key={image.id}>
          <Link to={`/game/${image.id}`}>
            <img src={image.url} alt={image.name} />
            <h2>{image.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;