import React, { Component } from "react";
import "./App.css";
import HeaderMain from "./components/header/HeaderMain";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// Components
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

  // componentDidMount() {
  //   console.log(this.props.history.location, "yeet");
  // }
  onTravelInfoChange = searchQueries => {
    this.setState({ searchQueries });
  };
  render() {
    console.log("working", this.state.searchQueries);
    return (
      <Router>
        <div className="App">
          {/* {this.props.history.location.pathname === "/"
            ? <div>hehe</div>
            : <HeaderMain handleTravelInfoChange={this.onTravelInfoChange} />} */}

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
