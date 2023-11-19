import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import HomeComponent from './components/HomeComponent';
import RedirectComponent from './components/RedirectComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/:shortLink" element={<RedirectComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
