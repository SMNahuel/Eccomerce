import React from 'react';
import './App.css';
import s from './App.module.css'
import { Route } from 'react-router-dom';
import SearchBar from './components/search bar/SearchBar';
import ProductCard from './components/product card/ProductCard';
import FormCategories from './components/form category/FormCategories'
import Catalog from './components/categories/Categories';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <h1>ir a /home</h1>}/>
      <Route exact path="/home" render={() => (

        <div className={s.container_path_home}>
          <SearchBar />
          <Catalog/>
          <div className={s.container_productCard}>
            <>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </>
            {/* modo de prueba. */}
          </div>
        </div>
      )}
      />
      <Route path="/products/id" render={() => <h1>Detalles de los Productos segun id</h1>} />
      <Route exact path="/addCategory" render={() => <FormCategories/>}/>
      {/* Falta añadir Rutas de Log In y Sign In */}
      {/* y crear sus componentes */}
      
      
    </div>
  );
}

export default App;
