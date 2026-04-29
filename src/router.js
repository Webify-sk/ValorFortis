import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import DocumentsView from "./views/DocumentsView.vue";
import CareerView from "./views/CareerView.vue";
import ContactView from "./views/ContactView.vue";
import InfoView from "./views/InfoView.vue";
import LegalDisclaimerView from "./views/LegalDisclaimerView.vue";

const routes = [
  {
    path: "/",
    alias: ["/index.html"],
    name: "home",
    component: HomeView,
    meta: {
      bodyClass: "home-page",
      titleKey: "routes.home.title",
      heroTitleKey: "routes.home.heroTitle",
      heroLinkLabelKey: "routes.home.heroLinkLabel",
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
      titleKey: "routes.documents.title",
      heroTitleKey: "routes.documents.heroTitle",
      heroLinkLabelKey: "routes.documents.heroLinkLabel",
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
      titleKey: "routes.career.title",
      heroTitleKey: "routes.career.heroTitle",
      heroLinkLabelKey: "routes.career.heroLinkLabel",
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
      titleKey: "routes.contact.title",
      heroTitleKey: "routes.contact.heroTitle",
      heroLinkLabelKey: "routes.contact.heroLinkLabel",
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
      titleKey: "routes.info.title",
      heroTitleKey: "routes.info.heroTitle",
      heroLinkLabelKey: "routes.info.heroLinkLabel",
      heroLinkTarget: "#obsah",
    },
  },
  {
    path: "/ld",
    alias: ["/ld.html"],
    name: "legal-disclaimer",
    component: LegalDisclaimerView,
    meta: {
      bodyClass: "ld-page",
      titleKey: "routes.legalDisclaimer.title",
      heroTitleKey: "routes.legalDisclaimer.heroTitle",
      heroLinkLabelKey: "routes.legalDisclaimer.heroLinkLabel",
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
