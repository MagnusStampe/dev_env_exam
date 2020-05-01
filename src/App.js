import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Components
import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"
            component={props => <Home {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
