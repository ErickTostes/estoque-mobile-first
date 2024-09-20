import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useSwipeGestures } from './Gestures'; 
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDrag = (state) => {
    console.log('Arrastando:', state.offset);
  };

  const bind = useSwipeGestures(handleDrag);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="home" {...bind()}>
      <button className="logout-button" onClick={handleLogout}>Sair</button>
      <h1>Catálogo de Produtos</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Preço: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
