import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modulesConfig } from '../../modelConfig.ts';
import style from '../../assets/styles/MainLogin.module.scss';

const MainLogin = ({ setClose }) => {
  const [mainPassword, setMainPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMainPassword(e.target.value);
    if (error) setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mainPassword === modulesConfig.MainAdmin) {
      navigate('/admin/signup');
    } else {
      setError(true);
    }
  };

  return (
    <div className={style.mainLoginContainer}>
      <div className={style.closeButton}>
        <button onClick={() => setClose(false)}>X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="main-password">Senha Principal</label>
        <input
          id="main-password"
          type="password"
          value={mainPassword}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit">Enviar</button>
        {error && (
          <div className="error-message" style={{ color: 'red', marginTop: 8 }}>
            Senha incorreta.
          </div>
        )}
      </form>
    </div>
  );
};

export default MainLogin;
