import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

  // Carrega voluntários
  async function loadVolunteers() {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setVolunteers(data ?? []);
  }

  useEffect(() => {
    loadVolunteers();
  }, []);

  // Excluir voluntário
  async function removeVolunteer(id) {
    if (!confirm("Tem certeza que deseja excluir este voluntário?")) return;

    const { error } = await supabase
      .from("volunteers")
      .delete()
      .eq("id", id);

    if (error) alert(error.message);
    else loadVolunteers();
  }

  // Filtragem simples
  const filtered = volunteers.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Administração de Voluntários
      </h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome ou contato..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded mb-6 shadow-sm"
      />

      {/* Tabela */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Contato</th>
              <th className="p-3 text-left">Área</th>
              <th className="p-3 text-left">Mensagem</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Nenhum voluntário encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.contact}</td>
                  <td className="p-3">{v.area || "-"}</td>
                  <td className="p-3 text-gray-600 text-sm">
                    {v.message || "-"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeVolunteer(v.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
