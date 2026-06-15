import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // Assuming we want to login automatically or go to dashboard
      // Note: If email confirmation is required, this might not log them in immediately.
      if (data.session) {
        localStorage.removeItem('vibrasil_guest');
        localStorage.setItem('vibrasil_username', username);
        navigate('/dashboard');
      } else {
        setError('Cadastro realizado! Verifique seu email ou tente fazer login.');
        setTimeout(() => navigate('/login'), 3000);
      }
    }
    setLoading(false);
  };

  return (
    <section className="screen-container auth-screen" aria-labelledby="register-title">
      <div className="auth-illustration">
        {/* Placeholder for the blue balancing character */}
        <div className="character-placeholder blue-character" aria-hidden="true"></div>
      </div>
      
      <div className="auth-form-container">
        <h2 id="register-title" className="auth-title">Para começar,<br/>preencha seus dados</h2>
        
        {error && <p className="error-message" role="alert">{error}</p>}
        
        <form onSubmit={handleRegister} noValidate>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Apelido</label>
            <input 
              id="username"
              type="text" 
              className="input-field" 
              placeholder="Ex: mestredofrevo352" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input 
              id="email"
              type="email" 
              className="input-field" 
              placeholder="joaodasilva@seuemail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password" className="input-label">Senha</label>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              placeholder="••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-outline auth-btn" 
            disabled={loading}
            aria-label={loading ? "Criando conta..." : "Criar sua conta"}
          >
            {loading ? 'Criando...' : 'Entrar'} {/* Botão no print de cadastro diz Entrar */}
          </button>
        </form>
        
        <button 
          className="btn-ghost back-btn" 
          onClick={() => navigate('/')}
          aria-label="Voltar para a tela inicial"
        >
          voltar
        </button>
      </div>
    </section>
  );
}
