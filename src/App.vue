<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import HeroSection from './components/HeroSection.vue'
import IntroOverlay from './components/IntroOverlay.vue'
import SiteFooter from './components/SiteFooter.vue'

const LOCALE_STORAGE_KEY = 'vf-locale'
const SUPPORTED_LOCALES = ['cs', 'en']

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const menuOpen = ref(false)
const introVisible = ref(false)
const currentBodyClass = ref(route.meta.bodyClass ?? 'home-page')
const isLeaving = ref(false)
const navDirection = ref('')
const isNavigating = ref(false)

const bodyClasses = computed(() => [
  currentBodyClass.value,
  isLeaving.value ? 'page-leaving' : 'page-loaded',
  navDirection.value,
  menuOpen.value ? 'header-nav-active' : ''
].filter(Boolean))

const showIntro = computed(() => route.name === 'home' && introVisible.value)

const syncDocumentState = async () => {
  document.title = t(route.meta.titleKey ?? 'routes.home.title')
  document.body.className = bodyClasses.value.join(' ')
  await nextTick()
}

const wait = (ms) => new Promise(resolve => window.setTimeout(resolve, ms))

const finishNavigationState = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isLeaving.value = false
      navDirection.value = ''
      syncDocumentState()
    })
  })
}

const navigateWithTransition = async (to) => {
  const resolved = router.resolve(to)
  if (!resolved.matched.length) {
    return router.push(to)
  }

  if (isNavigating.value || resolved.fullPath === route.fullPath) {
    return
  }

  const targetBodyClass = resolved.meta.bodyClass ?? currentBodyClass.value
  const targetIsHome = targetBodyClass === 'home-page'
  const currentIsHome = currentBodyClass.value === 'home-page'
  const waitTime = (!targetIsHome && !currentIsHome) ? 400 : 2200

  menuOpen.value = false
  isNavigating.value = true
  isLeaving.value = true
  navDirection.value = targetIsHome ? 'nav-to-home' : 'nav-to-subpage'
  await syncDocumentState()

  await wait(waitTime)
  await router.push(to)
  currentBodyClass.value = targetBodyClass
  await syncDocumentState()
  finishNavigationState()
  isNavigating.value = false
}

provide('navigateWithTransition', navigateWithTransition)

watch(
  () => route.fullPath,
  async () => {
    if (!isLeaving.value) {
      currentBodyClass.value = route.meta.bodyClass ?? currentBodyClass.value
    }
    menuOpen.value = false
    await syncDocumentState()
  },
  { immediate: true }
)

watch(menuOpen, () => {
  document.body.className = bodyClasses.value.join(' ')
})

watch(locale, async () => {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale.value)
  await syncDocumentState()
})

onMounted(() => {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    locale.value = storedLocale
  }

  introVisible.value = !sessionStorage.getItem('introPlayed')
  const videoElement = document.querySelector('.hero-video')
  if (videoElement instanceof HTMLVideoElement) {
    videoElement.playbackRate = 0.8
  }
})

onBeforeUnmount(() => {
  document.body.className = ''
})
</script>

<template>
  <IntroOverlay v-if="showIntro" @hidden="introVisible = false" />

  <section class="hero-container">
    <HeaderNav v-model:menu-open="menuOpen" />
    <HeroSection :route="route" />
  </section>

  <RouterView />
  <SiteFooter />
</template>
