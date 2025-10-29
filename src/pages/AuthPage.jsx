import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Redireciona automaticamente se já estiver logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/"); // 👉 Vai para Home quando logar
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  // 🔹 Função de login/cadastro
  async function submit(e) {
    e.preventDefault();

    try {
      let result;
      if (mode === "login") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) {
        alert(result.error.message);
      } else {
        alert(mode === "login" ? "Logado com sucesso!" : "Cadastro realizado com sucesso!");
        navigate("/"); // 👉 Redireciona pra Home após sucesso
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-xl font-bold mb-4 text-center text-blue-700">
        {mode === "login" ? "Entrar na Conta" : "Criar Nova Conta"}
      </h1>

      <form onSubmit={submit} className="grid gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="p-2 border rounded"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
        <button
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Cadastrar-se" : "Entrar"}
        </button>
      </p>
    </div>
  );
}
