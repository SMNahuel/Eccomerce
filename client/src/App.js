import React from 'react';
import './App.css';
import s from './App.module.css'
import { Route } from 'react-router-dom';

import Home from './components/home/Home';
import FormCategories from './components/form category/FormCategories'
import SideBar from './components/sideBar/SideBar'
import SignIn from './components/register/sign in/SignIn';
import LogIn from './components/register/log in/LogIn';

function App() {
  return (
    <div className="App">
      <SideBar />
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
      <Route path="/products/id" render={() => <h1>Detalles de los Productos segun id</h1>} />
      <Route exact path="/addCategory" render={() => <FormCategories/>}/>
    </div>
  );
}

export default App;
