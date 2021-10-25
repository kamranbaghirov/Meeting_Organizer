import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './Navbar'
import Meetings from './Meetings'
import MeetingCreate from './MeetingCreate'
import MeetingUpdate from './MeetingUpdate'

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Meetings} />
          <Route exact path='/create' component={MeetingCreate} />
          <Route exact path='/update/:id' component={MeetingUpdate} />
        </Switch>
      </div>
    </Router>
  );
}