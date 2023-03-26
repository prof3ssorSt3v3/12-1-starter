import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Users } from './data/userdata.js';

function App() {
  const [users, setUsers] = useState(Users);

  return <div className="app"></div>;
}

export default App;
