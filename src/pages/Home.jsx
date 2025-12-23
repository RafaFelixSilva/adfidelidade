import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const [nextEvent, setNextEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchNext() {
      const today = new Date().toISOString();

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("starts_at", today)
        .order("starts_at", { ascending: true })
        .limit(1);

      if (!error && data && data.length > 0) setNextEvent(data[0]);
    }
    fetchNext();
  }, []);

  // Seus 3 eventos fixos (mantidos)
  const eventos = [
    {
      id: 1,
      title: "Culto da Palavra",
      date: "Quinta-feira, 20h",
      desc: "Venha adorar conosco e aprender a palavra de Deus.",
      local: "Igreja Ad Fidelidade - Auditório Principal",
      image: "/cultoDaPalavra.png",
    },
    {
      id: 2,
      title: "Culto da Família",
      date: "Sábado, 18h",
      desc: "Venha cultuar a Deus junto com a sua família e sentir a presença de Deus!",
      local: "Igreja Ad Fidelidade - Auditório Principal",
      image: "/cultoDaFamilia.png",
    },
    {
      id: 3,
      title: "Círculo de Oração",
      date: "Quarta-feira, 18h",
      desc: "Oração Online para todos os irmãos e irmãs!",
      local: "Google Meet",
      image: "/circuloOracao.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HERO */}
      <section
        className="relative text-white text-center py-20 bg-center bg-cover"
        style={{ backgroundImage: "url('/adFidelidadeLogoPreta.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 px-4">
          <h2 className="text-4xl font-bold mb-4">{t("home.welcome")}</h2>

          <p className="text-lg max-w-2xl mx-auto">{t("home.subtitle")}</p>

          {/* Estado: sem evento futuro */}
          {!nextEvent && (
            <p className="mt-6 text-gray-300 text-sm">{t("home.noNextEvent")}</p>
          )}

          {/* Botão abre modal (quando existe evento futuro) */}
          {nextEvent && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              {t("home.learnMore")}
            </button>
          )}
        </div>
      </section>

      {/* LISTA DE EVENTOS FIXOS */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("home.upcoming")}
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {eventos.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              {/* Imagem do card (cada uma diferente) */}
              <img
                src={ev.image || "/placeholderImage.png"}
                alt={ev.title}
                className="w-full h-48 md:h-56 object-cover rounded-lg shadow-sm mb-4"
              />

              <h4 className="text-xl font-semibold text-blue-700">{ev.title}</h4>
              <p className="text-gray-600 text-sm">
                {ev.date} • {ev.local}
              </p>

              <p className="mt-2 text-gray-700">{ev.desc}</p>

              <Link
                to="/events"
                className="inline-block mt-6 bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
              >
                {t("home.learnMore")}
              </Link>
            </div>
          ))}
        </div>

        {/* MODAL DO PRÓXIMO EVENTO (Supabase) */}
        {showModal && nextEvent && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
              {/* Imagem do evento vindo do Supabase */}
              <img
                src={nextEvent.image_url || "/placeholderImage.png"}
                className="w-full h-52 object-cover rounded-lg mb-4 shadow-md"
                alt="Imagem do Evento"
              />

              <h2 className="text-2xl font-bold mb-2">{nextEvent.title}</h2>

              <p className="text-gray-600 mb-1">
                📅 {new Date(nextEvent.starts_at).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mb-2">
                🕒{" "}
                {new Date(nextEvent.starts_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className="text-gray-700 mb-2">📍 {nextEvent.location}</p>

              <p className="text-gray-600 mb-4">
                {nextEvent.description || t("home.noEventDescription")}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  {t("common.close")}
                </button>

                <Link
                  to="/events"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setShowModal(false)}
                >
                  {t("home.viewAllEvents")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
