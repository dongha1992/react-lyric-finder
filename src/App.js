import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";
import "./App.scss";
import "./reset.scss";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index}></Route>
                <Route
                  exact
                  path="/lyrics/track/:id"
                  component={Lyrics}
                ></Route>
              </Switch>
            </div>
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
