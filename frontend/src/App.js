import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import * as sessionActions from "./store/session";
import * as subActions from "./store/subscriptions";
import Navigation from "./components/Navigation";

function App() {
  const pathname = window.location.pathname //returns the current url minus the domain name
  console.log(pathname)
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const id = sessionUser ? sessionUser.id : 1
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(subActions.getPageNames());
    dispatch(subActions.getUserSubscriptions({id}));
  }, [dispatch, id]);

  const home = ''
  const problems = 'problem'
  const solutions = 'solution'
  const leaders = 'leader'
  const regions = 'region'
  const topics = 'topic'

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage type={home} />
          </Route>
          <Route path="/problems/:id">
            <LandingPage type={problems} />
          </Route>
          <Route path="/solutions/:id">
            <LandingPage type={solutions} />
          </Route>
          <Route path="/leaders/:id">
            <LandingPage type={leaders} />
          </Route>
          <Route path="/regions/:id">
            <LandingPage type={regions} />
          </Route>
          <Route path="/topics/:id">
            <LandingPage type={topics} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
