import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function VolunteerPage() {
  const [eventId, setEventId] = useState("");
  const [role, setRole] = useState("");

  async function submit(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return alert("Faça login para se inscrever.");
    const { error } = await supabase.from("volunteer_signups").insert({
      event_id: eventId,
      user_email: user.email,
      role_requested: role,
    });
    if (error) alert(error.message);
    else alert("Inscrição enviada! Obrigado por se voluntariar.");
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg grid gap-3"
    >
      <h1 className="text-xl font-bold">Seja um Voluntário</h1>
      <input
        className="p-2 border rounded"
        placeholder="ID do evento"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        required
      />
      <input
        className="p-2 border rounded"
        placeholder="Função desejada"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Enviar
      </button>
    </form>
  );
}
