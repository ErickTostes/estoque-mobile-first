import React, { useState } from 'react';
import { updateStock, getStockHistory } from './productApi';
import { useNavigate } from 'react-router-dom';

const StockUpdateForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateStock(productId, quantity);
      const historyList = await getStockHistory(productId);
      setHistory(historyList || []);
      navigate('/success');
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      setError('Erro ao atualizar estoque.');
    }
  };

  return (
    <div className="stock-update-container">
      <h2>Atualizar Estoque</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdateStock}>
        <div>
          <label>ID do Produto</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
        <button type="submit">Atualizar</button>
      </form>
      <h3>Histórico de Alterações</h3>
      <ul>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <li key={index}>{`Data: ${entry.date}, Quantidade: ${entry.quantity}`}</li>
          ))
        ) : (
          <li>Nenhuma alteração encontrada.</li>
        )}
      </ul>
    </div>
  );
};

export default StockUpdateForm;
