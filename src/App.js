import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Root from './pages/Root';

function App() {
  return (
    <Router>
      <div className="content select-none font-sans">
        <Routes>
          <Route path="/" element={<Root />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
