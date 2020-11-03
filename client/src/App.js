import React from 'react';
import './App.css';
import ProductCard from './components/product card/ProductCard';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route 
      path="/"
      render={() => <ProductCard/>}
      />
      <Route
      path="/home"
      render={() => <h1>Home</h1>}
      />
      <Route
      path="/catalog"
      render={() => <h1>catalogo</h1>}
      />
      <Route
      path="/catalog/product/id"
      render={() => <h1>Detalles de los Productos segun id</h1>}
      />
      {/* Falta añadir Rutas de Log In y Sign In */}
      {/* y crear sus componentes */}
    </div>
  );
}

export default App;
