import React from 'react';
import './App.css';
import ProductCard from './components/product card/ProductCard';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/"
      render={() => <ProductCard/>}
      />
      <Route
      path="/catalogo"
      render={() => <h1>catalogo</h1>}
      />
      <Route
      path="/product/id"
      render={() => <h1>Detalles de los Productos segun id</h1>}
      />
      {/* Utilizar Route para nuevas rutas */}
    </div>
  );
}

export default App;
