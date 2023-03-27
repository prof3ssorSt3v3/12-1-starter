import './App.css';
import { Routes, Route } from 'react-router-dom';
import { USERS } from './data/userdata.js';
import { useState } from 'react';
import Home from './Home.jsx';
import Users from './Users.jsx';
import Other from './Other.jsx';
import Dunno from './Dunno.jsx';
import NavBar from './NavBar.jsx';
import UserDetails from './UserDetails';

function App() {
  const [users, setUsers] = useState(USERS);

  return (
    <div className="app">
      <header>
        <h1>Routing Demo App</h1>
      </header>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/*" element={<Users userState={[users, setUsers]} />}>
          <Route path=":uid" element={<UserDetails />} />
        </Route>
        <Route path="/other" element={<Other />} />
        <Route path="*" element={<Dunno />} />
      </Routes>
    </div>
  );
}

export default App;
