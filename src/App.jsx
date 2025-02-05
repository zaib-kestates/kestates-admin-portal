import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './components/AppRoutes';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
