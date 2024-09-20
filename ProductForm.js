import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchProductById } from './productApi';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const product = await fetchProductById(id);
          setName(product.name);
          setQuantity(product.quantity);
          setPrice(product.price);
        } catch (error) {
          setError('Erro ao carregar detalhes do produto.');
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, name, quantity, price);
      } else {
        await addProduct(name, quantity, price);
      }
      setSuccessMessage('Produto salvo com sucesso!');
      setError('');
      setTimeout(() => navigate('/product-list'), 2000);
    } catch (error) {
      setError('Erro ao salvar produto.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="product-form-container">
      <h2>{id ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default ProductForm;
