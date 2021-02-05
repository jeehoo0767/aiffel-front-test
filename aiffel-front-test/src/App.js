import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/views/Login/Login';
import Forum from './components/views/Forum/Forum';
import ForumDetail from './components/views/Forum/Forum';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/:id" component={ForumDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
