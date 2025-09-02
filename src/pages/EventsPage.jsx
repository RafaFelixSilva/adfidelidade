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
      <h1 className="text-2xl font-bold mb-4">Eventos</h1>
      {events.length === 0 ? (
        <p className="text-gray-500">Nenhum evento disponível.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((ev) => (
            <li key={ev.id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">{ev.title}</h2>
              <p>{new Date(ev.starts_at).toLocaleString()}</p>
              <p>{ev.location}</p>
              <p>{ev.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Igreja Ad Fidelidade. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">YouTube</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </footer>
    
}
