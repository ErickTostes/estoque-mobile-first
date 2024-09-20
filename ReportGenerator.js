import React, { useState } from 'react';
import { listProducts, generateReport } from './productApi';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('currentStock');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const data = await generateReport(reportType);
      setReportData(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, `${reportType}-report.pdf`);
      setError('');
    } catch (error) {
      setError('Erro ao gerar relatório.');
    }
  };

  return (
    <div className="report-generator-container">
      <h2>Gerar Relatório</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>Tipo de Relatório</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="currentStock">Status Atual do Estoque</option>
          <option value="topProducts">Produtos Mais Vendidos</option>
          <option value="stockOutHistory">Histórico de Saídas</option>
        </select>
      </div>
      <button onClick={handleGenerateReport}>Gerar Relatório</button>
      <div>
        {reportData.length > 0 && (
          <ul>
            {reportData.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
