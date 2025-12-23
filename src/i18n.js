import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      nav: {
        home: "Home",
        events: "Eventos",
        volunteer: "Voluntariado",
        live: "Ao Vivo",
        donate: "Doações",
        about: "Sobre Nós",
        worship: "Louvor",
        rehearsals: "Ensaios",
        adminWorship: "Admin Louvor",
        panel: "Painel",
        stock: "Estoque",
        volunteers: "Voluntários",
        login: "Entrar",
        logout: "Sair",
      },
      home: {
        welcome: "Bem-vindo à Igreja Ad Fidelidade",
        subtitle:
          "Uma comunidade acolhedora onde você e sua família podem crescer na fé, servir e compartilhar o amor de Cristo.",
        learnMore: "Saiba mais",
        noNextEvent: "Nenhum próximo evento marcado no momento.",
        upcoming: "Próximos Eventos",
      },
      events: { title: "Eventos" },
      volunteer: { title: "Inscrição de Voluntários" },
      adminVolunteers: { title: "Administração de Voluntários" },
      footer: {
        rights: "Igreja Ad Fidelidade. Todos os direitos reservados.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        events: "Events",
        volunteer: "Volunteering",
        live: "Live",
        donate: "Donations",
        about: "About Us",
        worship: "Worship",
        rehearsals: "Rehearsals",
        adminWorship: "Worship Admin",
        panel: "Dashboard",
        stock: "Stock",
        volunteers: "Volunteers",
        login: "Sign in",
        logout: "Sign out",
      },
      home: {
        welcome: "Welcome to Ad Fidelidade Church",
        subtitle:
          "A welcoming community where you and your family can grow in faith, serve, and share Christ’s love.",
        learnMore: "Learn more",
        noNextEvent: "No upcoming event scheduled at the moment.",
        upcoming: "Upcoming Events",
      },
      events: { title: "Events" },
      volunteer: { title: "Volunteer Sign-up" },
      adminVolunteers: { title: "Volunteer Admin" },
      footer: {
        rights: "Ad Fidelidade Church. All rights reserved.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "pt",
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export default i18n;
