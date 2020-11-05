import React from 'react';
import './App.css';
import s from './App.module.css'
import { Route } from 'react-router-dom';

import Home from './components/home/Home';
import FormCategories from './components/form category/FormCategories'
import SignIn from './components/register/sign in/SignIn';
import LogIn from './components/register/log in/LogIn';
import SideBar from './components/sideBar/SideBar';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" render={() => 
        <div className={s.container_register}>
          <SignIn/>
        </div>
      }/>
      <Route exact path="/login" render={() =>
        <div className={s.container_register}>
          <LogIn/>
        </div>
      }/>
      <Route path="/products/id" render={() => <SideBar/>} />
      <Route exact path="/addCategory" render={() => (
        <>
          <SideBar />
          <FormCategories />
        </>
      )}/>
    </div>
  );
}

export default App;
