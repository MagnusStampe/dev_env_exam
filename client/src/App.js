import React, { Component } from "react";
import "./App.css";
import HeaderMain from "./components/header/HeaderMain";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

class App extends Component {
  state = {
    searchQueries: {
      destination: "Copenhagen",
      checkIn: null,
      checkOut: null,
      guests: null
    }
  };

  onTravelInfoChange = searchQueries => {
    this.setState({ searchQueries });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <HeaderMain handleTravelInfoChange={this.onTravelInfoChange} />
          <Switch>
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route path="/search" component={props => <Search {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
