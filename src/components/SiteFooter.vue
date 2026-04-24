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
      <div class="footer-left">{{ $t('footer.copyright') }}</div>
      <div class="footer-right">
        {{ $t('footer.privacyNotice') }} |
        <a
          :href="router.resolve('/info').href"
          @click.prevent="handleNavigate('/info')"
          >{{ $t('footer.legalInfo') }}</a
        >
      </div>
    </div>
  </footer>
</template>
