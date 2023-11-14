import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home.component';
import ErrorMessage from './components/error-message.component';
import Success from './components/success.component';
import About from './components/about.component';
import Redirect from './components/redirect.component';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/success' element={<Success />} />
                    <Route path='/error' element={<ErrorMessage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/:shortUrl' element={<Redirect />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;