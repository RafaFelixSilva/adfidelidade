export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        Sobre Nós
      </h1>

      <section className="text-gray-700 leading-relaxed mb-10">
        <p className="mb-4">
          A Igreja Ad Fidelidade é uma comunidade cristã dedicada à adoração,
          ao ensino da Palavra de Deus e à comunhão entre irmãos. Nosso objetivo
          é levar o Evangelho de forma prática, promovendo fé, amor e esperança
          a todos que buscam um relacionamento mais profundo com Cristo.
        </p>
        <p>
          Além dos cultos e eventos regulares, atuamos com projetos sociais e
          atividades comunitárias, buscando ser uma presença transformadora em
          nossa cidade. Venha nos visitar e faça parte desta família de fé!
        </p>
      </section>

      <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
        Nossa Localização
      </h2>

      {/* Google Maps Embed */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Localização Igreja Ad Fidelidade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.0304567572466!2d-0.12338435!3d51.47595525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604f67e5600cb%3A0xffaf09ef6ca7b955!2sS%20Lambeth%20Rd%2C%20London%20SW8%201UJ!5e0!3m2!1spt-BR!2suk!4v1762093260757!5m2!1spt-BR!2suk"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="border-0 w-full h-96"
        ></iframe>
      </div>

      <div className="text-center mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Endereço:
        </h3>
        <p className="text-gray-600">
          📍276 South Lambeth Road, SW8 1UJ
        </p>
      </div>
    </main>
  );
}
