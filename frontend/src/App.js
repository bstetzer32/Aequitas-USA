import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const home = ''
  const problems = 'Problem '
  const solutions = 'Solution '
  const leaders = 'Leader '
  const regions = 'Region '
  const topics = 'Topic '

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage type={home} />
          </Route>
          <Route path="/problems">
            <LandingPage type={problems} />
          </Route>
          <Route path="/solutions">
            <LandingPage type={solutions} />
          </Route>
          <Route path="/leaders">
            <LandingPage type={leaders} />
          </Route>
          <Route path="/regions">
            <LandingPage type={regions} />
          </Route>
          <Route path="/topics">
            <LandingPage type={topics} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
