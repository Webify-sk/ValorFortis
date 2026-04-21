<script setup>
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menuOpen = defineModel('menuOpen', { type: Boolean, default: false })
const navigateWithTransition = inject('navigateWithTransition')
const route = useRoute()
const router = useRouter()

const handleNavigate = async (to) => {
  if (navigateWithTransition) {
    await navigateWithTransition(to)
  }
}

const hrefFor = (to) => router.resolve(to).href
</script>

<template>
  <header>
    <a :href="hrefFor('/')" class="logo" @click.prevent="handleNavigate('/')">
      <img src="../../VF_white.png" alt="Valor Fortis logo">
      <span class="reg-mark">&reg;</span>
    </a>

    <button
      id="burgerToggle"
      class="burger-menu"
      type="button"
      aria-label="Menu"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav>
      <ul>
        <li>
          <a :href="hrefFor('/')" :class="{ active: route.path === '/' }" @click.prevent="handleNavigate('/')">Domov</a>
        </li>
        <li>
          <a :href="hrefFor('/kontakt')" :class="{ active: route.path === '/kontakt' || route.path === '/kontakt.html' }" @click.prevent="handleNavigate('/kontakt')">Kontakt</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
