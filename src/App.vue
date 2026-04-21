<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import HeroSection from './components/HeroSection.vue'
import IntroOverlay from './components/IntroOverlay.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const router = useRouter()
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
  document.title = route.meta.title ?? 'VALOR FORTIS'
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

onMounted(() => {
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
