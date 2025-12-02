import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("volunteers").insert({
      name,
      contact,
      area,
      message,
    });

    if (error) {
      alert("Erro ao enviar inscrição");
      console.log(error);
    } else {
      alert("Inscrição enviada com sucesso!");
      setName("");
      setContact("");
      setArea("");
      setMessage("");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Inscrição de Voluntários
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        
        <input
          className="p-2 border rounded w-full"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="p-2 border rounded w-full"
          placeholder="Contato (WhatsApp, Telefone ou Email)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <select
          className="p-2 border rounded w-full"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">Selecione a área onde deseja ajudar (opcional)</option>
          <option value="Louvor">Louvor</option>
          <option value="Recepção">Recepção</option>
          <option value="Midia">Mídia / Som</option>
          <option value="Intercessão">Intercessão</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Cozinha">Cozinha</option>
          <option value="Escola Bíblica">Escola Bíblica</option>
        </select>

        <textarea
          className="p-2 border rounded w-full"
          placeholder="Mensagem (opcional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Enviar Inscrição
        </button>
      </form>
    </div>
  );
}
