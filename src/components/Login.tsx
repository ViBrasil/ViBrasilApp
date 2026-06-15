import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Assuming user uses email to login, even if UI says "Apelido" we'll use email for Supabase Auth,
    // Or we could authenticate with a custom function if it's strictly "Apelido".
    // For simplicity and security, let's treat "Apelido" as email in the input if we just use standard auth,
    // or we'll assume the user typed an email. 
    // Since the prototype image says "Apelido Ex: mestredofrevo352", it implies username.
    // Supabase standard auth uses email. We will need to query the email by username or just ask for email here too.
    // Let's implement standard email login but label it as "Email ou Apelido" for now to make it work smoothly.
    
    // For now we just login with the given email/password.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const { data: { session } } = await supabase.auth.getSession();

const loggedUsername =
  session?.user?.user_metadata?.username || email;

localStorage.removeItem('vibrasil_guest');
localStorage.setItem('vibrasil_username', loggedUsername);
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <section className="screen-container auth-screen" aria-labelledby="login-title">
      <div className="auth-illustration">
        {/* Placeholder for the red running character */}
        <div className="character-placeholder red-character" aria-hidden="true"></div>
      </div>
      
      <div className="auth-form-container">
        <h2 id="login-title" className="auth-title">Para continuar,<br/>entre na sua conta</h2>
        
        {error && <p className="error-message" role="alert">{error}</p>}
        
        <form onSubmit={handleLogin} noValidate>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Apelido ou Email</label>
            <input 
              id="email"
              type="text" 
              className="input-field" 
              placeholder="Ex: mestredofrevo352" 
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
            aria-label={loading ? "Entrando..." : "Entrar na sua conta"}
          >
            {loading ? 'Entrando...' : 'Entrar'}
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
