import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import dayjs from "dayjs";

export default function Home() {
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
      <h1 className="text-2xl font-bold mb-4">Próximos Eventos</h1>
      {events.length === 0 ? (
        <p className="text-gray-500">Nenhum evento cadastrado.</p>
      ) : (
        <div className="grid gap-4">
          {events.map((ev) => (
            <div key={ev.id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold">{ev.title}</h2>
              <p>{dayjs(ev.starts_at).format("DD/MM/YYYY HH:mm")}</p>
              <p>{ev.location}</p>
              <p className="text-gray-600">{ev.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

