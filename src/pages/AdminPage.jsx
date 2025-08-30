import { useEffect, useState } from "react";
import { supabase } from '../supabaseClient';

export default function AdminPage() {
    const [title, setTitle] = useState('');
    const [startsAt, setStartsAt ] = useState('');
    const [location, setLocation] = useState('');
    const [desc, setDesc] = useState('');
    const [list, setList] = useState([]);

    async function load() {
        const { data, error } = await supabase.from('events').select('*').order('starts_at');
        if (error) alert(error.message); else setList(data ?? []);
    }

    useEffect(() => { load();}, []);

    async function createEvent(e) {
        e.preventDefault();
        const { error } = await supabase.from('events').insert({
            title, descripition: desc, starts_at: new Date(startsAt).toISOString(), location
        });
        if (error) return alert(error.message);
        setTitle(''); setDesc(''); setLocation(''); setStartsAt(''); load();
    }

    async function remove(id) {
        if (!confirm('Apagar evento?')) return;
        const {error} = await supabase.from('events').delete().eq('id', id);
        if (error) alert(error.message); else load();
    }

    return (
        <div className="grid gap-6">
            <section>
                <h2>Novo Evento</h2>
                <form>
                    <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} required/>
                    <input type="datetime-local" value={startsAt} onChange={e=>setStartsAt(e.target.value)} required/>
                    <input placeholder="Local" value={location} onChange={e=>setLocation(e.target.value)} />
                    <textarea placeholder="Descrição" value={desc} onChange={e=>setDesc(e.target.value)}/>
                    <button type="submit">Salvar</button>
                </form>
            </section>

            <section>
                <h2>Eventos Cadastrados</h2>
                <ul>
                    {list.map(ev => (
                        <li key={ev.id}>
                            {ev.title} - {new Date(ev.starts_at).toLocaleString()} @ {ev.location}
                            <button onClick={() =>remove(ev.id)} style={{ marginLeft: 8 }}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}