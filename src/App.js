import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import Details from './pages/Details/Details';

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
