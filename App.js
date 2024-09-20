import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import CreateUserForm from './CreateUserForm';
import UserList from './UserList';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import StockUpdateForm from './StockUpdateForm';
import StockOutForm from './StockOutForm';
import ReportGenerator from './ReportGenerator';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/user-list">Usuários</Link></li>
            <li><Link to="/create-user">Criar Usuário</Link></li>
            <li><Link to="/product-list">Produtos</Link></li>
            <li><Link to="/product-form">Adicionar Produtos</Link></li>
            <li><Link to="/stockUpdateForm">Atualizar Estoque</Link></li>
            <li><Link to="/stockOutForm">Registrar Saída</Link></li>
            <li><Link to="/report-generator">Gerar Relatório</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-form" element={<ProductForm />} />
          <Route path="/product-form/:id" element={<ProductForm />} />
          <Route path="/stockUpdateForm" element={<StockUpdateForm />} />
          <Route path="/stockOutForm" element={<StockOutForm />} />
          <Route path="/report-generator" element={<ReportGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
