import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './Navbar';
import Home from '../home/Home';
import Results from '../results/Results';
import Details from '../details/Details';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:searchTerm" exact component={Results} />
        <Route path="/search/result/:id" exact component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
