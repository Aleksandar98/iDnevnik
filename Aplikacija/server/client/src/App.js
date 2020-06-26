import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profesor from './components/profesor';
import Login from './components/login';
import Odeljenje from './components/odeljenje';
import Statistika from './components/statistika';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path='/Profesor' exact component={Profesor} />
        <Route path='/Odeljenje/:god/:ode' exact component={Odeljenje} />
        <Route path='/Statistika/:id' exact component={Statistika} />
    </Switch>
  </Router>
  )
}
export default App;
