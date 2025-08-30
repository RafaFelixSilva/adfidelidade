import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        const fn = mode === 'login'
        ? supabase.auth.signInWithPassword({email, password})
        : supabase.auth.signUp({email, password});
        const {error} = await fn;
        if (error) alert(error.message);
        else alert(mode === 'login' ? 'Logado!' : 'Cadastro ok. Verifique seu email (se exigido).');
    }

    return (
        <form onSubmit={submit} className="max-w-sm space-y-3">
            <h1>{mode === 'login' ? 'Entrar' : 'Cadastrar'}</h1>
            <input placeholder="email" value={email} onChange={e=> setEmail(e.target.value)} required />
            <input placeholder="senha" type="password" value={password} onChange={e=> setPassword(e.target.value)} required />
            <button type="button">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</button>
            <p>
                {mode === 'login' ? 'Sem conta?' : 'Já tem conta?'}{' '}
                <button type="button" onClick={()=> setMode(mode ==='login' ? 'signup' : 'login')}>
                    {mode === 'login' ? 'Cadastrar' : 'Entrar'}
                </button>
            </p>
        </form>
    );
}