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
  <div className='min-h-screen bg-gray-50'>  
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
        <h1 className='text-xl font-bold text-blue-700'>Ad Fidelidade</h1>
        <nav className='flex gap-4'>
        <Link className='hover:text-blue-600' to="/">Home</Link>
        <Link className='hover:text-blue-600' to="/events">Eventos</Link>
        <Link className='hover:text-blue-600' to="/volunteer">Inscrição de Voluntários</Link>
        <Link className='hover:text-blue-600' to="/live">Ao Vivo</Link>
        <Link className='hover:text-blue-600' to="/donate">Doações</Link>

        <div className="relative group">
    <button className="hover:text-blue-600">Louvor ▾</button>
    <div className="absolute hidden group-hover:block bg-white shadow rounded p-2 mt-1">
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
            <button onClick={() => supabase.auth.signOut()} className='text-red-600 font-medium'>Sair</button>
          </>
        ) : <Link className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700' to="/auth">Entrar</Link>}
        </nav>
      </header>

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
