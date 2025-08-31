import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function RehearsalsPage() {
  const [rehearsals, setRehearsals] = useState([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("rehearsals")
        .select("id, title, rehearsal_date, notes, songs(id,title,artist)")
        .order("rehearsal_date", { ascending: true });
      if (error) console.error(error);
      else setRehearsals(data ?? []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ensaios de Louvor</h1>
      {rehearsals.length === 0 ? (
        <p className="text-gray-500">Nenhum ensaio agendado.</p>
      ) : (
        <div className="space-y-4">
          {rehearsals.map((r) => (
            <div key={r.id} className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold">{r.title}</h2>
              <p>
                Data:{" "}
                {new Date(r.rehearsal_date).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              {r.notes && <p className="italic">Notas: {r.notes}</p>}
              <h3 className="mt-2 font-semibold">Músicas:</h3>
              <ul className="list-disc list-inside">
                {r.songs?.map((s) => (
                  <li key={s.id}>
                    {s.title} {s.artist && `- ${s.artist}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
