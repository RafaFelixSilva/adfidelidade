import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [list, setList] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  async function load() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at");
    if (error) console.error(error);
    else setList(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createEvent(e) {
    e.preventDefault();
    
    let imageUrl = null;

    // 1️⃣ Se o usuário escolheu uma imagem, fazer upload
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `event-${Date.now()}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
      .from("event-images")
      .upload(fileName, imageFile);

      if (uploadError) {
        alert("Erro ao fazer upload da imagem.");
        console.log(uploadError);
      } else {
        imageUrl = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName).data.publicUrl;
      }
    }

      // 2️⃣ Salvar evento no banco (com ou sem imagem)
      const {error } = await supabase.from("events").insert({
        title,
        description: desc,
        starts_at: new Date(startsAt).toISOString(),
        location,
        image_url: imageUrl, // pode ser null :)
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Evento criado com sucesso!!");
        setTitle(""),
        setDesc(""),
        setLocation(""),
        setStartsAt(""),
        setImageFile(null),
        load();
      }
  }

  async function remove(id) {
    if (!confirm("Apagar evento?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) alert(error.message);
    else load();
  }

  return (
    <div className="grid gap-6">
      <section>
        <h2 className="text-xl font-bold mb-3">Novo evento</h2>
        <form onSubmit={createEvent} className="grid gap-2 max-w-md">
          <input
            className="p-2 border rounded"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            className="p-2 border rounded"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
          />
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <input
            className="p-2 border rounded"
            placeholder="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            className="p-2 border rounded"
            placeholder="Descrição"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Salvar
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Eventos cadastrados</h2>
        <ul className="space-y-2">
          {list.map((ev) => (
            <li
              key={ev.id}
              className="p-3 bg-gray-100 rounded flex justify-between items-center"
            >
              <span>
                {ev.title} — {new Date(ev.starts_at).toLocaleString()} @{" "}
                {ev.location}
              </span>
              <button
                onClick={() => remove(ev.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
