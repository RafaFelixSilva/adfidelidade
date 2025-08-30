import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {supabase} from '../supabaseClient';

export default function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        supabase.from('events')
        .select('*').order('starts_at', { ascending: true})
        .then(({ data, error }) => {
            if (error) alert(error.message); else setEvents(data ?? []);
        });
    }, []);

    return (
        <div>
            <h1>Próximos eventos</h1>
            <ul>
                {events.map(ev => (
                    <li key={ev.id}>
                        <strong>{ev.title}</strong> - {dayjs(ev.starts_at).format('DD/MM/YYYY HH:mm')} @ {ev.location || '-'}
                        <div>{ev.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}