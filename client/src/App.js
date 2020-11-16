import React from 'react';
import './App.css';
import s from './App.module.css'
import { Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import SignIn from './components/register/sign in/SignIn';
import LogIn from './components/register/log in/LogIn';
import SideBar from './components/sideBar/SideBar';
import CRUDCategory from './components/Admin/CRUDCategory/CRUDCategory';
import CRUDProducts from './components/Admin/CRUDProducts/CRUDProducts'
import TableOrders from './components/Admin/TableOrders/TableOrders';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/orders" component={Orders}/>
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
        <Route exact path="/admin/categories" component={CRUDCategory}/>
        <Route exact path="/admin/products" component={CRUDProducts}/>
        <Route exact path="/admin/orders" component={TableOrders}/>
        <Route render={() => <div> 404 </div>}/>
      </Switch>
    </div>
  );
}

export default App;
