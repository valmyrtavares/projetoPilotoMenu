import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !collectionName) {
      setStatus('Por favor, selecione um arquivo e digite o nome da coleção.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('collectionName', collectionName);

    try {
      const response = await axios.post(
        'http://localhost:3001/upload-excel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setStatus(
        `✅ ${response.data.message} (${response.data.count} registros enviados)`
      );
    } catch (error) {
      console.error(error);
      setStatus('❌ Erro ao enviar o arquivo.');
    }
  };

  return (
    <div
      style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'Arial' }}
    >
      <h2>Importar Excel para Firestore</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Arquivo .xlsx:</label>
          <br />
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome da coleção:</label>
          <br />
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Ex: pratos, clientes, parceiros"
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Enviar
        </button>
      </form>
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}
    </div>
  );
};

export default ExcelUploader;
