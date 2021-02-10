import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/views/Login/Login';
import Forum from './components/views/Forum/Forum';
import ForumDetailPage from './components/views/Forum/Section/ForumDetailPage';
import Header from './components/views/Header/Header';
import Profile from './components/views/Profile/Profile';
function App() {
  const [LoginCheckState, setLoginCheckState] = useState();
  const childSettingHeader = () => {
    setLoginCheckState(sessionStorage.getItem('username'));
  };
  return (
    <BrowserRouter>
      <div>
        {LoginCheckState && <Header />}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/forum"
            component={() => <Forum childSettingHeader={childSettingHeader} />} //자식 컴포넌트에서 부모컴포넌트의 상태를 변경 시키기 위해 메소드 전달
          />
          <Route exact path="/forum/:id" component={ForumDetailPage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
