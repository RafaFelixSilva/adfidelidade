import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Volunteer() {
  const [eventId, setEventId] = useState('');
  const [role, setRole] = useState('');

  async function submit(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return alert('Faça login para enviar.');
    const { error } = await supabase.from('volunteer_signups').insert({
      event_id: eventId, user_email: user.email, role_requested: role
    });
    if (error) alert(error.message); else alert('Enviado! Obrigado por se voluntariar.');
  }
  return (
    <form onSubmit={submit} className="grid gap-2 max-w-md">
      <input placeholder="ID do evento" value={eventId} onChange={e=>setEventId(e.target.value)} required />
      <input placeholder="Função desejada" value={role} onChange={e=>setRole(e.target.value)} required />
      <button type="submit">Inscrever</button>
    </form>
  );
}
