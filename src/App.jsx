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
import DonatePage from './pages/DonatePage.jsx';
import StockControlPage from './pages/StockControlPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminVolunteersPage from './pages/AdminVolunteersPage.jsx';

import { useTranslation } from 'react-i18next';

function Protected({ children }) {
  const stored = localStorage.getItem('sb-session');
  if (!stored) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  const { t, i18n } = useTranslation();

  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function setLang(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* MAIN WRAPPER */}
      <div className="flex-1 max-w-5xl mx-auto p-4 w-full">
        {/* HEADER */}
        <header className="bg-white shadow p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            {/* LOGO */}
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="/logoAdFidelidade.jpg"
                alt="Ad Fidelidade Logo"
                className="h-10 w-auto hover:opacity-90 transition"
              />
            </Link>

            {/* MOBILE BURGER */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <Link className="hover:text-blue-600 transition-colors" to="/">
                {t('nav.home')}
              </Link>
              <Link className="hover:text-blue-600 transition-colors" to="/events">
                {t('nav.events')}
              </Link>
              <Link className="hover:text-blue-600 transition-colors" to="/volunteer">
                {t('nav.volunteer')}
              </Link>
              <Link className="hover:text-blue-600 transition-colors" to="/live">
                {t('nav.live')}
              </Link>
              <Link className="hover:text-blue-600 transition-colors" to="/donate">
                {t('nav.donate')}
              </Link>
              <Link className="hover:text-blue-600 transition-colors" to="/about">
                {t('nav.about')}
              </Link>

              {/* DROPDOWN LOUVOR */}
              <div className="relative group">
                <button className="hover:text-blue-600 flex items-center gap-1 transition-colors">
                  {t('nav.worship')} ▾
                </button>

                <div className="absolute left-0 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-lg p-2 mt-2 w-44 z-50">
                  <Link
                    to="/rehearsals"
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition"
                  >
                    {t('nav.rehearsals')}
                  </Link>

                  {session && (
                    <Link
                      to="/admin/rehearsals"
                      className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition"
                    >
                      {t('nav.adminWorship')}
                    </Link>
                  )}
                </div>
              </div>

              {/* LANGUAGE SWITCH */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang('pt')}
                  className={`px-2 py-1 rounded text-sm ${
                    i18n.language?.startsWith('pt')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded text-sm ${
                    i18n.language?.startsWith('en')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* USER AREA */}
              {session ? (
                <>
                  <Link className="hover:text-blue-600 transition-colors" to="/admin">
                    {t('nav.panel')}
                  </Link>
                  <Link className="hover:text-blue-600 transition-colors" to="/admin/estoque">
                    {t('nav.stock')}
                  </Link>
                  <Link className="hover:text-blue-600 transition-colors" to="/admin/voluntarios">
                    {t('nav.volunteers')}
                  </Link>

                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      localStorage.removeItem('sb-session');
                      window.location.href = '/auth';
                    }}
                    className="ml-2 text-red-600 font-semibold hover:text-red-700 transition"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                  to="/auth"
                >
                  {t('nav.login')}
                </Link>
              )}
            </nav>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <nav className="flex flex-col gap-3 mt-4 md:hidden bg-white rounded p-4 shadow">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.home')}
              </Link>
              <Link to="/events" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.events')}
              </Link>
              <Link to="/volunteer" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.volunteer')}
              </Link>
              <Link to="/live" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.live')}
              </Link>
              <Link to="/donate" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.donate')}
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {t('nav.about')}
              </Link>

              <details>
                <summary className="cursor-pointer hover:text-blue-600">{t('nav.worship')} ▾</summary>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link to="/rehearsals" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                    {t('nav.rehearsals')}
                  </Link>
                </div>
              </details>

              {/* LANGUAGE SWITCH (MOBILE) */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setLang('pt')}
                  className={`px-3 py-2 rounded text-sm ${
                    i18n.language?.startsWith('pt')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-2 rounded text-sm ${
                    i18n.language?.startsWith('en')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
              </div>

              {session ? (
                <>
                  <Link to="/admin/rehearsals" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                    {t('nav.adminWorship')}
                  </Link>
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                    {t('nav.panel')}
                  </Link>
                  <Link to="/admin/estoque" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                    {t('nav.stock')}
                  </Link>
                  <Link to="/admin/voluntarios" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                    {t('nav.volunteers')}
                  </Link>

                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                      setMenuOpen(false);
                    }}
                    className="text-red-600 font-medium text-left"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-center"
                >
                  {t('nav.login')}
                </Link>
              )}
            </nav>
          )}
        </header>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/rehearsals" element={<RehearsalsPage />} />
          <Route path="/admin/rehearsals" element={<Protected><AdminRehearsalsPage /></Protected>} />
          <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
          <Route
            path="/live"
            element={
              <iframe
                title="YouTube Live"
                width="100%"
                height="480"
                src="https://www.youtube.com/embed/VrpsnKlyThg?si=DuI_5oD9wqYNhIQX"
                allowFullScreen
              />
            }
          />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin/estoque" element={<Protected><StockControlPage /></Protected>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/voluntarios" element={<Protected><AdminVolunteersPage /></Protected>} />
        </Routes>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-auto w-full">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex gap-4">
            <a href="https://www.youtube.com/@ADFidelidadeLondres" target="_blank" className="hover:text-white">
              YouTube
            </a>
            <a href="https://www.instagram.com/adfidelidadelondres" target="_blank" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
