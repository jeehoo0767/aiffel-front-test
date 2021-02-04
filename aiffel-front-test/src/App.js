import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
