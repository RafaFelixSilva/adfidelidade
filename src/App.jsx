import { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home.jsx';
import AuthPage from './pages/AuthPage.jsx';
import VolunteerPage from './pages/VolunteerPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import RehearsalsPage from './pages/RehearsalsPage.jsx';
import AdminRehearsalsPage from './pages/AdminRehearsalsPage.jsx';

function Protected({ children }) {
  const stored = localStorage.getItem('sb-session');
  if (!stored) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ estado do menu mobile

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) localStorage.setItem('sb-session', '1');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) localStorage.setItem('sb-session', '1');
      else localStorage.removeItem('sb-session');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>  
      <div className="max-w-5xl mx-auto p-4">
        
        {/* HEADER */}
        <header className='bg-white shadow p-4 rounded-lg mb-6'>
          <div className='flex justify-between items-center max-w-6xl mx-auto'>
            
            {/* Logo */}
            <h1 className='text-xl font-bold text-blue-700'>Ad Fidelidade</h1>
            
            {/* Botão hamburguer */}
            <button
              className='md:hidden p-2 rounded hover:bg-gray-100'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                // X (fechar)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // 3 linhas (abrir)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Menu Desktop */}
            <nav className='hidden md:flex gap-6 items-center text-gray-700 font-medium'>
              <Link className='hover:text-blue-600' to="/">Home</Link>
              <Link className='hover:text-blue-600' to="/events">Eventos</Link>
              <Link className='hover:text-blue-600' to="/volunteer">Inscrição de Voluntários</Link>
              <Link className='hover:text-blue-600' to="/live">Ao Vivo</Link>
              <Link className='hover:text-blue-600' to="/donate">Doações</Link>

              {/* Dropdown Louvor (desktop hover) */}
              <div className="relative group">
                <button className="hover:text-blue-600 flex items-center">Louvor ▾</button>
                <div className="absolute left-0 hidden group-hover:block bg-white border shadow-lg rounded p-2 mt-1 min-w-[160px] z-50">
                  <Link to="/rehearsals" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Ensaios
                  </Link>
                  <Link to="/admin/rehearsals" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Admin Louvor
                  </Link>
                </div>
              </div>

              {session ? (
                <>
                  <Link className='hover:text-blue-600' to="/admin">Admin</Link>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className='text-red-600 font-medium'
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700' to="/auth">
                  Entrar
                </Link>
              )}
            </nav>
          </div>

          {/* Menu Mobile */}
          {menuOpen && (
            <nav className="flex flex-col gap-3 mt-4 md:hidden bg-white rounded p-4 shadow">
              <Link className="hover:text-blue-600" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link className="hover:text-blue-600" to="/events" onClick={() => setMenuOpen(false)}>Eventos</Link>
              <Link className="hover:text-blue-600" to="/volunteer" onClick={() => setMenuOpen(false)}>Inscrição de Voluntários</Link>
              <Link className="hover:text-blue-600" to="/live" onClick={() => setMenuOpen(false)}>Ao Vivo</Link>
              <Link className="hover:text-blue-600" to="/donate" onClick={() => setMenuOpen(false)}>Doações</Link>

              {/* Dropdown Louvor no mobile */}
              <details>
                <summary className="cursor-pointer hover:text-blue-600">Louvor ▾</summary>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link to="/rehearsals" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Ensaios</Link>
                  <Link to="/admin/rehearsals" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Admin Louvor</Link>
                </div>
              </details>

              {session ? (
                <>
                  <Link className="hover:text-blue-600" to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
                  <button
                    onClick={() => { supabase.auth.signOut(); setMenuOpen(false); }}
                    className="text-red-600 font-medium"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </nav>
          )}
        </header>

        {/* ROTAS */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/rehearsals" element={<RehearsalsPage />} />
          <Route path="/admin/rehearsals" element={<Protected><AdminRehearsalsPage /></Protected>} />
          <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
          <Route path="/live" element={<iframe title="YouTube Live" width="100%" height="480" src="https://www.youtube.com/embed/VrpsnKlyThg?si=DuI_5oD9wqYNhIQX" allowFullScreen />} />
          <Route path="/donate" element={<a href="https://www.paypal.com/donate" target="_blank">Ir para doações</a>} />
        </Routes>
      </div>
    </div>  
  );
}
