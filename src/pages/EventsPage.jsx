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
    <ul className="space-y-4">
      {events.map((ev) => {
        // ✅ Converte e formata a data/hora
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
          <li key={ev.id} className="p-4 bg-white shadow rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-blue-800 mb-1">{ev.title}</h2>
            <p className="text-gray-700">
              📅 {dataFormatada} — 🕒 {horaFormatada}
            </p>
            <p className="text-gray-600 mt-1">📍 {ev.location}</p>
            {ev.description && (
              <p className="text-gray-500 mt-2 leading-relaxed">{ev.description}</p>
            )}
          </li>
        );
      })}
    </ul>
  )}
</div>
  );
}
