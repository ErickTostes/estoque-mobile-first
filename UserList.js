import React, { useState, useEffect } from 'react';
import { listenToUsers, removeUser } from './userApi'; // Atualize a importação

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Configura a escuta em tempo real dos usuários
    const unsubscribe = listenToUsers((usersList) => {
      setUsers(usersList || []);
    });

    // Limpeza do efeito para cancelar a escuta quando o componente desmonta
    return () => unsubscribe();
  }, []);

  const handleRemove = async (userId) => {
    try {
      await removeUser(userId);
      // A lista de usuários será atualizada automaticamente pela escuta em tempo real
    } catch (error) {
      setError('Erro ao remover usuário.');
    }
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              {user.displayName} ({user.email})
              <button onClick={() => handleRemove(user.id)}>Remover</button>
            </li>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
