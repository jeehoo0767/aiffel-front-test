import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/views/Login/Login';
import Forum from './components/views/Forum/Forum';
import ForumDetailPage from './components/views/Forum/Section/ForumDetailPage';
import Header from './components/views/Header/Header';
import Profile from './components/views/Profile/Profile';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/:id" component={ForumDetailPage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
