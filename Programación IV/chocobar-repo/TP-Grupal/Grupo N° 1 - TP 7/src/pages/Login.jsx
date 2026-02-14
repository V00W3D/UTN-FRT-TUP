import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('admin@gym.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      setError('Credenciales inválidas');
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Ingresar</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        </div>
        <button type="submit" className="btn">Entrar</button>
      </form>
    </div>
  );
}
