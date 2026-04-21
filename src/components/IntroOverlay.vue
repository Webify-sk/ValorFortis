<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'

const emit = defineEmits(['hidden'])

let fallbackTimeout
let removeTimeout
const isHidden = ref(false)

const clearState = () => {
  document.body.style.overflow = ''
  window.clearTimeout(fallbackTimeout)
  window.clearTimeout(removeTimeout)
}

const hideIntro = () => {
  if (isHidden.value) {
    return
  }

  isHidden.value = true
  document.body.style.overflow = ''
  sessionStorage.setItem('introPlayed', 'true')
  window.clearTimeout(fallbackTimeout)
  removeTimeout = window.setTimeout(() => {
    emit('hidden')
  }, 1000)
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  fallbackTimeout = window.setTimeout(hideIntro, 12000)
})

onBeforeUnmount(() => {
  clearState()
})
</script>

<template>
  <div
    id="intro-video-container"
    class="intro-video-container"
    :class="{ hidden: isHidden }"
  >
    <video
      id="intro-video"
      autoplay
      muted
      playsinline
      @timeupdate="($event) => {
        const video = $event.target
        if (video.duration && video.currentTime >= video.duration - 0.5) {
          hideIntro()
        }
      }"
      @ended="hideIntro"
      @error="hideIntro"
    >
      <source src="../../VALOR FORTIS_animacia_3200x1800.mp4" type="video/mp4">
    </video>
  </div>
</template>
