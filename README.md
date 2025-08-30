# 🌐 Projeto Site Igreja Ad Fidelidade

Este projeto faz parte das **Atividades Extensionistas** do curso de **Análise e Desenvolvimento de Sistemas**.  
O objetivo é desenvolver um **site completo e responsivo** para a Igreja Ad Fidelidade, oferecendo recursos que facilitem a organização, o engajamento e a participação dos membros da congregação.

---

## 🎯 Objetivo do Projeto
Criar uma plataforma centralizada para a igreja, com:
- 📅 **Calendário de eventos** e agenda de cultos/serviços
- 👥 **Cadastro de usuários** com autenticação segura
- 🎶 **Gerenciamento de louvores**
- 📺 **Transmissão ao vivo** (embed de YouTube Live)
- 📰 **Blog e notícias**
- 🙋 **Gestão de voluntários**
- 💳 **Doações online**
- 📸 **Galeria de fotos**
- 📍 **Contato e localização**

---

## 🛠️ Tecnologias Utilizadas
- [React](https://react.dev/) (frontend SPA)
- [Vite](https://vitejs.dev/) (bundler rápido)
- [Supabase](https://supabase.com/) (backend: banco PostgreSQL + autenticação + policies RLS)
- [TailwindCSS](https://tailwindcss.com/) (estilização rápida e responsiva)
- [Vercel](https://vercel.com/) (deploy gratuito e automático)

---

## ⚙️ Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/adfidelidade.git
cd adfidelidade

🚀 Deploy

O projeto está em produção no link:
👉 https://adfidelidade.vercel.app
O deploy é feito automaticamente pela Vercel a cada push no repositório GitHub.

🔒 Segurança

Uso de Row Level Security (RLS) no Supabase para proteger dados sensíveis.
Apenas administradores podem criar/editar eventos e posts.
Usuários comuns podem se cadastrar, visualizar eventos e se inscrever como voluntários.

👨‍💻 Acadêmico Responsável

Nome: Rafael Felix da Silva
Curso: Análise e Desenvolvimento de Sistemas
Atividade Extensionista – Projeto: Site Igreja Ad Fidelidade
