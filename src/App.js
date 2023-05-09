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
          <Route path="/dashboard/eod-batch" element={<Dashboard />}/>
          <Route path="/dashboard/mtp-balance-top-up" element={<Dashboard />}/>
          <Route path="/dashboard/mtp-inter-banks-funds-transfer" element={<Dashboard />}/>
          <Route path="/dashboard/mtp-p2p-funds-transfer" element={<Dashboard />}/>
          <Route path="/dashboard/mtp-membership-fee" element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
