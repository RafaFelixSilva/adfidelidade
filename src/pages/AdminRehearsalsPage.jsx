import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminRehearsalsPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [list, setList] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [selectedRehearsal, setSelectedRehearsal] = useState(null);

  async function load() {
    const { data, error } = await supabase
      .from("rehearsals")
      .select("id, title, rehearsal_date, notes, songs(id,title,artist)")
      .order("rehearsal_date");
    if (error) console.error(error);
    else setList(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createRehearsal(e) {
    e.preventDefault();
    const { error } = await supabase.from("rehearsals").insert({
      title,
      rehearsal_date: new Date(date).toISOString(),
      notes,
    });
    if (error) alert(error.message);
    else {
      setTitle("");
      setDate("");
      setNotes("");
      load();
    }
  }

  async function addSong(e) {
    e.preventDefault();
    if (!selectedRehearsal) return alert("Selecione um ensaio.");
    const { error } = await supabase.from("songs").insert({
      rehearsal_id: selectedRehearsal,
      title: songTitle,
      artist: songArtist,
    });
    if (error) alert(error.message);
    else {
      setSongTitle("");
      setSongArtist("");
      load();
    }
  }

  return (
    <div className="grid gap-6">
      <section>
        <h2 className="text-xl font-bold mb-2">Novo Ensaio</h2>
        <form onSubmit={createRehearsal} className="grid gap-2 max-w-md">
          <input
            className="p-2 border rounded"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            className="p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            className="p-2 border rounded"
            placeholder="Notas"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button className="bg-green-600 text-white p-2 rounded">
            Criar Ensaio
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Ensaios Existentes</h2>
        <ul className="space-y-3">
          {list.map((r) => (
            <li
              key={r.id}
              className="p-3 bg-gray-100 rounded cursor-pointer"
              onClick={() => setSelectedRehearsal(r.id)}
            >
              <strong>{r.title}</strong> —{" "}
              {new Date(r.rehearsal_date).toLocaleDateString()} <br />
              {r.notes && <em>Notas: {r.notes}</em>}
              <ul className="list-disc list-inside ml-4">
                {r.songs?.map((s) => (
                  <li key={s.id}>
                    {s.title} {s.artist && `- ${s.artist}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Adicionar Música ao Ensaio</h2>
        <form onSubmit={addSong} className="grid gap-2 max-w-md">
          <input
            className="p-2 border rounded"
            placeholder="Título da Música"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <input
            className="p-2 border rounded"
            placeholder="Artista (opcional)"
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />
          <button className="bg-blue-600 text-white p-2 rounded">
            Adicionar Música
          </button>
        </form>
      </section>
    </div>
  );
}
