import React from 'react';
import './App.css';
import s from './App.module.css'
import { Route } from 'react-router-dom';

import Home from './components/home/Home';
import CrudCategory from './components/crud categorias/CrudCategory';
import CRUDProducts from './components/CRUDProducts/CRUDProducts'
import SignIn from './components/register/sign in/SignIn';
import LogIn from './components/register/log in/LogIn';
import SideBar from './components/sideBar/SideBar';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/categories" component={CrudCategory}/>
      <Route exact path="/products" component={CRUDProducts}/>
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
    </div>
  );
}

export default App;
