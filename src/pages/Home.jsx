import { Link } from "react-router-dom";

export default function Home() {
  const eventos = [
    {
      id: 1,
      title: "Culto da Palavra",
      date: "Quinta-feira, 20h",
      desc: "Venha adorar conosco e aprender a palavra de Deus.",
      local: "Igreja Ad Fidelidade - Auditório Principal",
    },
    {
      id: 2,
      title: "Culto da Família",
      date: "Sábado, 18h",
      desc: "Venha cultuar a Deus junto com a sua família e presenciar a presenca de Deus!",
      local: "Igreja Ad Fidelidade - Auditório Principal",
    },
    {
      id: 3,
      title: "Circulo de Oracao",
      date: "Quarta-feira, 18h",
      desc: "Oracao Online para todos os irmaos e irmas!",
      local: "Google Meet",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}

      {/* Hero Section */}
      <section className="relative text-white text-center py-20 bg-center bg-cover" style={{backgroundImage:"url('/src/images/adFidelidadeLogoPreta.jpg"}}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Bem-vindo à Igreja Ad Fidelidade</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Uma comunidade acolhedora onde você e sua família podem crescer na fé, servir e compartilhar o amor de Cristo.
        </p>
      </div>  
      </section>

      {/* Eventos */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Próximos Eventos</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {eventos.map(ev => (
            <div key={ev.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-blue-700">{ev.title}</h4>
              <p className="text-gray-600 text-sm">{ev.date} • {ev.local}</p>
              <p className="mt-2 text-gray-700">{ev.desc}</p>
              <Link to="/events" className="inline-block mt-6 bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">Saiba mais</Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Igreja Ad Fidelidade. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">YouTube</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
