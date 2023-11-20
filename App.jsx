import { useState } from 'react';
import './App.css';

function App() {
  const [originalLink, setOriginalLink] = useState('');

  return (
    <>
      <h1>LinkHop</h1>
      <div className="input-container">
        <div className="flex-container">
          <input
            type="text"
            id="originalLink"
            placeholder="Enter your link here"
            value={originalLink}
            onChange={(e) => setOriginalLink(e.target.value)}
            className="input-box"
          />
          <button
            onClick={() => alert(`Link entered: ${originalLink}`)}
            className="shorten-button"
          >
            Shorten
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
