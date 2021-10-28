import logo from './logo.svg';
import './App.css';
import Card from './Dashboard/Cards.js';
import BootstrapNavbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return  (
    <Router>
      <BootstrapNavbar />
      <Switch>
        <Route path='/' exact component={Card} />
      </Switch>
    </Router>
  );
}

export default App;
