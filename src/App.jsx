import { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home.jsx';
import AuthPage from './pages/AuthPage.jsx';
import VolunteerPage from './pages/VolunteerPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function Protected({ children }) {
  const stored = localStorage.getItem('sb-session');
  if (!stored) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) localStorage.setItem('sb-session', '1');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) localStorage.setItem('sb-session', '1'); else localStorage.removeItem('sb-session');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex gap-4 items-center mb-6">
        <Link to="/">Ad Fidelidade</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/volunteer">Inscrição de Voluntários</Link>
        <Link to="/live">Ao Vivo</Link>
        <Link to="/donate">Doações</Link>
        {session ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={() => supabase.auth.signOut()}>Sair</button>
          </>
        ) : <Link to="/auth">Entrar</Link>}
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
        <Route path="/live" element={<iframe title="YouTube Live" width="100%" height="480" src="https://www.youtube.com/embed/VrpsnKlyThg?si=DuI_5oD9wqYNhIQX" allowFullScreen />} />
        <Route path="/donate" element={<a href="https://www.paypal.com/donate" target="_blank">Ir para doações</a>} />
      </Routes>
    </div>
  );
}
