<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})

const navigateWithTransition = inject('navigateWithTransition')
const router = useRouter()

const isInternalRoute = computed(() => {
  const target = props.route.meta.heroLinkTarget ?? '/'
  return typeof target === 'string' && target.startsWith('/')
})

const heroTitleLines = computed(() => String(props.route.meta.heroTitle ?? '').split('\n'))
const internalHref = computed(() => router.resolve(props.route.meta.heroLinkTarget ?? '/').href)

const handleNavigate = async (to) => {
  if (navigateWithTransition) {
    await navigateWithTransition(to)
  }
}
</script>

<template>
  <video
    ref="heroVideo"
    class="hero-video"
    autoplay
    muted
    loop
    playsinline
    poster="../../hero-fallback.jpg"
  >
    <source src="../../1730805_River_Stream_1920x1080.mp4" type="video/mp4">
    Prehliadač nepodporuje video tag.
  </video>

  <div class="video-overlay"></div>
  <div class="sky-filter"></div>
  <img src="../../Valor - Hero (5).png" alt="Hero Layer" class="hero-layer">
  <div class="city-bottom-fade"></div>

  <div class="pop-layer-wrapper">
    <div class="pop-gradient"></div>
  </div>

  <div class="hero-content">
    <h1>
      <template v-for="(line, index) in heroTitleLines" :key="`${line}-${index}`">
        {{ line }}
        <br v-if="index < heroTitleLines.length - 1">
      </template>
    </h1>

    <a
      v-if="isInternalRoute"
      :href="internalHref"
      class="discover-link"
      @click.prevent="handleNavigate(route.meta.heroLinkTarget)"
    >
      <span class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
      {{ route.meta.heroLinkLabel }}
    </a>

    <a
      v-else
      :href="route.meta.heroLinkTarget"
      class="discover-link"
    >
      <span class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
      {{ route.meta.heroLinkLabel }}
    </a>
  </div>
</template>
