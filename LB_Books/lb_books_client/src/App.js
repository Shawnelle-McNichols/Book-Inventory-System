import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Admin from './pages/Admin';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App () {

  return (
    <div>
      <NavBar/>
    <div className="container">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
