import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// Components
import HeaderMain from './components/header/HeaderMain';
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import SingleView from "./pages/SingleView/SingleView";
import CreateProperty from "./pages/CreateProperty/CreateProperty";

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
    console.log(this.props.location.pathname)
    return (
      <Router>
        <div className="App">
          {this.props.location.pathname !== "/" && <HeaderMain handleTravelInfoChange={this.onTravelInfoChange} />}

          <Switch>
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route path="/search" component={props => <Search {...props} />} />
            <Route
              path="/createproperty"
              component={props => <CreateProperty {...props} />}
            />
            <Route
              path="/property"
              component={props => <SingleView {...props} />}
            />
            <Route path="/login" component={props => <Login {...props} />} />
            <Route path="/signup" component={props => <Signup {...props} />} />
            <Route
              path="/profile"
              component={props => <Profile {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
