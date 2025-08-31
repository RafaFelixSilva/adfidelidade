import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const fn =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    if (error) alert(error.message);
    else alert(mode === "login" ? "Logado!" : "Cadastro realizado!");
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">
        {mode === "login" ? "Entrar" : "Cadastrar"}
      </h1>
      <form onSubmit={submit} className="grid gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
        <button
          className="text-blue-600"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Cadastrar-se" : "Entrar"}
        </button>
      </p>
    </div>
  );
}
