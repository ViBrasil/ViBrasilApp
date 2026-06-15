import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Bell, Menu } from 'lucide-react';
import './Grupos.css';

/**
 * Tela de Grupos — permite criar ou entrar em um grupo.
 *
 * Funcionalidade:
 * - "Criar um grupo" gera um código aleatório de 6 dígitos,
 *   insere na tabela `groups` do Supabase e vincula o usuário.
 * - "Entrar em um grupo" exibe um campo para digitar o código.
 *   Ao confirmar, busca o grupo pelo código e vincula o usuário.
 * - O usuário pode participar de apenas 1 grupo simultaneamente.
 *
 * Acessibilidade:
 * - Modais usam role="dialog" e aria-modal.
 * - Inputs possuem labels vinculados com htmlFor/id.
 * - Feedback de erro/sucesso é exibido com role="alert".
 */

type ModalType = null | 'create' | 'join';

export default function Grupos() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [joinCode, setJoinCode] = useState('');
  const [createdCode, setCreatedCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Gera um código aleatório de 6 caracteres (letras maiúsculas + números).
   * Usado para identificar o grupo de forma simples.
   */
  const generateCode = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem I/1/O/0 para evitar confusão
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateGroup = async () => {
    setIsLoading(true);
    setFeedback('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setFeedback('Você precisa estar logado.'); return; }

      const code = generateCode();

      // 1. Inserir o grupo na tabela groups
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert({ code, created_by: session.user.id })
        .select()
        .single();

      if (groupError) { setFeedback('Erro ao criar grupo: ' + groupError.message); return; }

      // 2. Vincular o usuário ao grupo (atualiza o perfil)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ group_id: group.id })
        .eq('id', session.user.id);

      if (profileError) { setFeedback('Grupo criado, mas erro ao vincular: ' + profileError.message); return; }

      setCreatedCode(code);
      setActiveModal('create');
    } catch {
      setFeedback('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    setIsLoading(true);
    setFeedback('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setFeedback('Você precisa estar logado.'); return; }

      // 1. Buscar o grupo pelo código
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('id')
        .eq('code', joinCode.toUpperCase().trim())
        .single();

      if (groupError || !group) { setFeedback('Código não encontrado. Verifique e tente novamente.'); return; }

      // 2. Vincular o usuário ao grupo
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ group_id: group.id })
        .eq('id', session.user.id);

      if (profileError) { setFeedback('Erro ao entrar no grupo: ' + profileError.message); return; }

      setFeedback('Você entrou no grupo com sucesso! 🎉');
      setActiveModal(null);
      setJoinCode('');
    } catch {
      setFeedback('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grupos-container" aria-labelledby="grupos-title">
      {/* Header reutiliza o mesmo estilo do Dashboard */}
      <header className="dash-header">
        <div className="user-profile">
          <div className="avatar-placeholder" aria-hidden="true"></div>
          <span className="username">mestredofrevo352</span>
        </div>
        <div className="header-actions" style={{ position: 'relative' }}>
          <button className="icon-btn" aria-label="Notificações">
            <Bell size={24} color="#c41e1e" />
          </button>
          <button
            className="icon-btn"
            aria-label="Menu principal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <Menu size={24} color="#c41e1e" />
          </button>
          {isMenuOpen && (
            <div className="hamburger-dropdown">
              <button onClick={() => navigate('/modulos')}>Módulos</button>
              <button onClick={() => navigate('/grupos')}>Grupos</button>
            </div>
          )}
        </div>
      </header>

      <main className="grupos-content">
        {/* Ícone central de grupo (SVG inline inspirado no design) */}
        <div className="grupos-icon-wrapper" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="grupos-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pessoa central */}
            <circle cx="100" cy="55" r="18" stroke="#c41e1e" strokeWidth="6" fill="none" />
            <path d="M100 73 C100 73 70 95 80 130 Q90 150 100 140 Q110 150 120 130 C130 95 100 73 100 73Z" stroke="#c41e1e" strokeWidth="6" fill="none" strokeLinejoin="round" />
            {/* Pessoa esquerda */}
            <circle cx="50" cy="85" r="14" stroke="#c41e1e" strokeWidth="5" fill="none" />
            <path d="M50 99 C50 99 28 115 36 140 Q44 155 50 148 Q56 155 64 140 C72 115 50 99 50 99Z" stroke="#c41e1e" strokeWidth="5" fill="none" strokeLinejoin="round" />
            {/* Pessoa direita */}
            <circle cx="150" cy="85" r="14" stroke="#c41e1e" strokeWidth="5" fill="none" />
            <path d="M150 99 C150 99 128 115 136 140 Q144 155 150 148 Q156 155 164 140 C172 115 150 99 150 99Z" stroke="#c41e1e" strokeWidth="5" fill="none" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Feedback messages */}
        {feedback && (
          <p className="grupos-feedback" role="alert">{feedback}</p>
        )}

        {/* Botões principais */}
        <div className="grupos-actions">
          <button
            className="btn-grupos-outlined"
            onClick={() => { setActiveModal('join'); setFeedback(''); }}
            disabled={isLoading}
          >
            Entrar em um grupo
          </button>
          <button
            className="btn-grupos-outlined"
            onClick={handleCreateGroup}
            disabled={isLoading}
          >
            {isLoading ? 'Criando...' : 'Criar um grupo'}
          </button>
        </div>
      </main>

      {/* Modal: Código gerado após criar grupo */}
      {activeModal === 'create' && createdCode && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-create-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-create-title">Grupo criado!</h2>
            <p>Compartilhe este código com seus amigos:</p>
            <div className="code-display" aria-label={`Código do grupo: ${createdCode}`}>
              {createdCode}
            </div>
            <button className="btn btn-modal-close" onClick={() => setActiveModal(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Digitar código para entrar em um grupo */}
      {activeModal === 'join' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-join-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-join-title">Entrar em um grupo</h2>
            <label htmlFor="join-code-input" className="modal-label">
              Digite o código do grupo:
            </label>
            <input
              id="join-code-input"
              type="text"
              className="input-field code-input"
              maxLength={6}
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="EX: A3B7K9"
              autoFocus
            />
            {feedback && <p className="grupos-feedback modal-feedback" role="alert">{feedback}</p>}
            <div className="modal-buttons">
              <button className="btn btn-modal-cancel" onClick={() => { setActiveModal(null); setFeedback(''); }}>
                Cancelar
              </button>
              <button
                className="btn btn-modal-confirm"
                onClick={handleJoinGroup}
                disabled={joinCode.length < 6 || isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
