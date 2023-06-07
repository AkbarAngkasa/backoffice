import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Root from './pages/Root';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="content font-sans">
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/change-password" element={<Dashboard />}/>
          <Route path="/transactions" element={<Dashboard />}/>
          <Route path="/users" element={<Dashboard />}/>
          <Route path="/users/create" element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
