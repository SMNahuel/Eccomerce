import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ProductCard from './components/product card/ProductCard';
import FormCategories from './component/formCategories';
import Catalog from './components/catalog/Catalog';

function App() {
  return (
    <div className="App">
      <Route path="/" render={() => <ProductCard/>}/>
      <Route path="/home" render={() => <h1>Home</h1>} />
      <Route path="/category" render={() => <Catalog/>} />
      <Route path="/category/products/id" render={() => <h1>Detalles de los Productos segun id</h1>} />
      {/* Falta añadir Rutas de Log In y Sign In */}
      {/* y crear sus componentes */}
    </div>
  );
}

export default App;
