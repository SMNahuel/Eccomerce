import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import SignIn from './components/register/sign in/SignIn';
import LogIn from './components/register/log in/LogIn';
import CRUDCategory from './components/Admin/CRUDCategory/CRUDCategory';
import CRUDProducts from './components/Admin/CRUDProducts/CRUDProducts'
import TableOrders from './components/Admin/TableOrders/TableOrders';
import Orders from './components/Orders/Orders';
import UserProfile from './components/UserProfile/UserProfile';
import CRUDUsers from './components/Admin/CRUDUsers/CRUDUsers';
import AuthSuccess from './components/AuthSuccess/AuthSuccess';
import ForgotenPassword from './components/ForgotenPassword/ForgotenPassword';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={SignIn}/>
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/AuthSuccess" component={AuthSuccess}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/password/:key" render={({match}) => <ForgotenPassword passKey={match.params.key}/>}/>
        <Route path="/" render={()=>(
          <>
            <Header/>
            <Switch>
              <Route exact path="/userprofile" component={UserProfile}/>
              <Route exact path="/orders" component={Orders}/>
              <Route exact path="/admin/categories" component={CRUDCategory}/>
              <Route exact path="/admin/products" component={CRUDProducts}/>
              <Route exact path="/admin/orders" component={TableOrders}/>
              <Route exact path="/admin/users" component={CRUDUsers}/>
              <Route render={() => <div> 404 </div>}/>
            </Switch>
          </>
        )}/>
      </Switch>
    </div>
  );
}

export default App;
