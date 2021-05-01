import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from './Home';
import EntranceClass from './modules/views/EntranceClass';
import EntranceInstructor from './modules/views/EntranceInstructor';
import SectionClass from './modules/components/classes/SectionClass'
import SectionClassForInst from './modules/components/classes/SectionClassForInst';
import SectionError from './modules/components/classes/SectionError';
import ResultProcess from './modules/components/classes/ResultProcess';

//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/jchecker" component={Index} />
        <Route exact path="/jchecker/classes" component={EntranceClass} />
        <Route exact path="/jchecker/classes/:token" component={SectionClass} />
        <Route exact path="/jchecker/classes/:token/success" component={ResultProcess} />
        <Route exact path="/jchecker/instructors" component={EntranceInstructor} />
        <Route exact path="/jchecker/instructors/:token" component={SectionClassForInst} />
        <Route exact path="/jchecker/error" component={SectionError} />
        <Redirect path="*" to="/jchecker" />
      </Switch>
    </Router>
  );
}

export default App;
