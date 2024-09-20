import React, { useState, useEffect } from 'react';
import { listProducts, removeProduct } from './productApi';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsList = await listProducts();
        setProducts(productsList || []);
      } catch (error) {
        setError('Erro ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRemove = async (productId) => {
    if (window.confirm('Tem certeza de que deseja remover este produto?')) {
      try {
        await removeProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        setError('Erro ao remover produto.');
      }
    }
  };

  return (
    <div className="product-list-container">
      <h2>Lista de Produtos</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Carregando produtos, por favor aguarde...</p> // Mensagem de carregamento
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - Quantidade: {product.quantity} - Preço: ${product.price}
              <button onClick={() => handleRemove(product.id)}>Remover</button>
              <button onClick={() => navigate(`/product-form/${product.id}`)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/product-form')}>Adicionar Produto</button>
    </div>
  );
};

export default ProductList;
