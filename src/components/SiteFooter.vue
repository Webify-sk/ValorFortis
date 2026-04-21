<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const navigateWithTransition = inject("navigateWithTransition");
const router = useRouter();

const handleNavigate = async (to) => {
  if (navigateWithTransition) {
    await navigateWithTransition(to);
  }
};
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-left">&copy; 2026 VALOR FORTIS a.s.</div>
      <div class="footer-right">
        Nesbíráme o Vás žádné osobní údaje a cookies. |
        <a
          :href="router.resolve('/info').href"
          @click.prevent="handleNavigate('/info')"
          >Právní informace</a
        >
      </div>
    </div>
  </footer>
</template>
