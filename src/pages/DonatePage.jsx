export default function DonatePage() {
  return (
    <main className="max-w-3xl mx-auto text-center p-8 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Seja um Apoiador da Obra</h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Sua contribuição ajuda a manter os projetos, ações sociais, transmissões ao vivo
        e tudo aquilo que nos permite alcançar ainda mais vidas para Cristo.
      </p>

      <div className="border border-blue-200 rounded-lg p-6 bg-blue-50 mb-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">Doação Online</h3>
        <p className="text-gray-700 mb-4">Clique no botão abaixo para doar pelo PayPal:</p>

        <a
          href="https://www.paypal.com/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Doar Agora
        </a>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Doação via QR Code (opcional)</h4>
        <img
          src="/qr-code.png"
          alt="QR Code para doação"
          className="mx-auto w-44 h-44 rounded-lg shadow-lg"
        />
        <p className="text-sm text-gray-600 mt-2">
          Aponte a câmera do seu celular para o QR Code
        </p>
      </div>

      <p className="mt-10 text-gray-600 text-sm">
        “Cada um contribua segundo propôs no coração…” — 2 Coríntios 9:7
      </p>
    </main>
  );
}
