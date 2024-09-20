import React, { useState, useEffect } from 'react';
import { updateStock, getStockHistory } from './productApi';
import { useNavigate } from 'react-router-dom';

const StockOutForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleStockOut = async (e) => {
    e.preventDefault();
    try {
      await updateStock(productId, -quantity);
      setSuccessMessage('Saída registrada com sucesso!');
      setError('');
      const historyList = await getStockHistory(productId);
      setHistory(historyList || []);
    } catch (error) {
      setError('Erro ao registrar saída.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="stock-out-container">
      <h2>Registrar Saída de Produto</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleStockOut}>
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
        <button type="submit">Registrar Saída</button>
      </form>
      <h3>Histórico de Saídas</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{`Data: ${entry.date}, Quantidade: ${entry.quantity}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockOutForm;
