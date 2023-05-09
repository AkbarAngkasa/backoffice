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
          <Route path="/dashboard/customer/find-customer" element={<Dashboard />}/>
          <Route path="/dashboard/customer/pending-kyc" element={<Dashboard />}/>
          <Route path="/dashboard/community/find-community" element={<Dashboard />}/>
          <Route path="/dashboard/backoffice-user/find-user" element={<Dashboard />}/>
          <Route path="/dashboard/backoffice-user/role-and-permissions" element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
