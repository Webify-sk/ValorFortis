<script setup>
import { computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const LOCALE_STORAGE_KEY = "vf-locale";
const SUPPORTED_LOCALES = ["cs", "en"];

const menuOpen = defineModel("menuOpen", { type: Boolean, default: false });
const navigateWithTransition = inject("navigateWithTransition");
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const handleNavigate = async (to) => {
  if (navigateWithTransition) {
    await navigateWithTransition(to);
  }
};

const hrefFor = (to) => router.resolve(to).href;

const nextLocale = computed(() => (locale.value === "cs" ? "en" : "cs"));
const inactiveLanguageLabel = computed(() => nextLocale.value.toUpperCase());

const switchLocale = () => {
  if (!SUPPORTED_LOCALES.includes(nextLocale.value)) {
    return;
  }

  locale.value = nextLocale.value;
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale.value);
};
</script>

<template>
  <header>
    <a :href="hrefFor('/')" class="logo" @click.prevent="handleNavigate('/')">
      <img src="../../VF_white.png" :alt="$t('nav.logoAlt')" />
      <span class="reg-mark">&reg;</span>
    </a>

    <button
      id="burgerToggle"
      class="burger-menu"
      type="button"
      :aria-label="$t('nav.menuAriaLabel')"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav>
      <ul>
        <li>
          <a
            :href="hrefFor('/')"
            :class="{ active: route.path === '/' }"
            @click.prevent="handleNavigate('/')"
            >{{ $t('nav.home') }}</a
          >
        </li>
        <li>
          <a
            :href="hrefFor('/dokumenty')"
            :class="{
              active:
                route.path === '/dokumenty' ||
                route.path === '/dokumenty.html',
            }"
            @click.prevent="handleNavigate('/dokumenty')"
            >{{ $t('nav.documents') }}</a
          >
        </li>
        <li>
          <a
            :href="hrefFor('/kariera')"
            :class="{
              active:
                route.path === '/kariera' || route.path === '/kariera.html',
            }"
            @click.prevent="handleNavigate('/kariera')"
            >{{ $t('nav.career') }}</a
          >
        </li>
        <li>
          <a
            :href="hrefFor('/kontakt')"
            :class="{
              active:
                route.path === '/kontakt' || route.path === '/kontakt.html',
            }"
            @click.prevent="handleNavigate('/kontakt')"
            >{{ $t('nav.contact') }}</a
          >
        </li>
        <li class="language-switch-item">
          <button
            type="button"
            class="nav-lang-toggle"
            @click="switchLocale"
          >
            | {{ inactiveLanguageLabel }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
