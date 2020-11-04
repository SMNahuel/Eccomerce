import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBar from './components/search bar/SearchBar';
import ProductCard from './components/product card/ProductCard';
import FormCategories from './components/form category/FormCategories'
import Catalog from './components/catalog/Catalog';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => (

        <div className="container_path_home">
          <SearchBar />
          <Catalog/>
          <ProductCard />
        </div>

      )}
      />
      <Route path="/category" render={() => <Catalog/>} />
      <Route path="/category/products/id" render={() => <h1>Detalles de los Productos segun id</h1>} />
      {/* Falta añadir Rutas de Log In y Sign In */}
      {/* y crear sus componentes */}
      
      
    </div>
  );
}

export default App;
