import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setEvents(data ?? []);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Eventos</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">Nenhum evento disponível.</p>
      ) : (
        <ul className="space-y-6">
          {events.map((ev) => {
            // Formatando data
            const dateObj = new Date(ev.starts_at);
            const dataFormatada = dateObj.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            const horaFormatada = dateObj.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li
                key={ev.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col gap-3"
              >
                {/* ⭐ IMAGEM DO EVENTO - NOVO */}
                <img
                  src={ev.image_url || "/placeholderImage.png"}
                  alt={ev.title}
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />

                {/* Título */}
                <h2 className="text-xl font-bold text-blue-800">
                  {ev.title}
                </h2>

                {/* Data e hora */}
                <p className="text-gray-700 text-sm">
                  📅 {dataFormatada} — 🕒 {horaFormatada}
                </p>

                {/* Local */}
                <p className="text-gray-600 text-sm">
                  📍 {ev.location}
                </p>

                {/* Descrição */}
                {ev.description && (
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {ev.description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
