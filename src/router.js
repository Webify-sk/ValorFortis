import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import DocumentsView from "./views/DocumentsView.vue";
import CareerView from "./views/CareerView.vue";
import ContactView from "./views/ContactView.vue";
import InfoView from "./views/InfoView.vue";

const routes = [
  {
    path: "/",
    alias: ["/index.html"],
    name: "home",
    component: HomeView,
    meta: {
      bodyClass: "home-page",
      title: "VALOR FORTIS",
      heroTitle: "Profesionální správa\nfinančního majetku",
      heroLinkLabel: "Objevit více",
      heroLinkTarget: "/kontakt",
    },
  },
  {
    path: "/dokumenty.html",
    alias: ["/dokumenty"],
    name: "documents",
    component: DocumentsView,
    meta: {
      bodyClass: "dokumenty-page",
      title: "Dokumenty | VALOR FORTIS",
      heroTitle: "Dokumenty",
      heroLinkLabel: "Číst více",
      heroLinkTarget: "#obsah",
    },
  },
  {
    path: "/kariera.html",
    alias: ["/kariera"],
    name: "career",
    component: CareerView,
    meta: {
      bodyClass: "kariera-page",
      title: "Kariéra | VALOR FORTIS",
      heroTitle: "Kariéra",
      heroLinkLabel: "Číst více",
      heroLinkTarget: "#obsah",
    },
  },
  {
    path: "/kontakt.html",
    alias: ["/kontakt"],
    name: "contact",
    component: ContactView,
    meta: {
      bodyClass: "kontakt-page",
      title: "Kontakt | VALOR FORTIS",
      heroTitle: "Sme tu pre vás",
      heroLinkLabel: "Kontaktujte nás",
      heroLinkTarget: "#kontakt",
    },
  },
  {
    path: "/info.html",
    alias: ["/info"],
    name: "info",
    component: InfoView,
    meta: {
      bodyClass: "info-page",
      title: "Právní informace | VALOR FORTIS",
      heroTitle: "Právní informace",
      heroLinkLabel: "Číst více",
      heroLinkTarget: "#obsah",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
