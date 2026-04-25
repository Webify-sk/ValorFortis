<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import publicImageUrl from "../../public/assets/images/documents/public.png";

const { t } = useI18n();
const publicOpen = ref(false);
const activeSection = ref(null);

const sections = computed(() => [
  {
    id: "messages",
    label: t("documents.sectionMessages"),
    links: [{ href: "#", label: t("documents.placeholderDocument") }],
  },
]);

const activeContent = computed(() => {
  return sections.value.find((section) => section.id === activeSection.value) ?? null;
});

const togglePublic = () => {
  publicOpen.value = !publicOpen.value;
  if (!publicOpen.value) {
    activeSection.value = null;
  }
};
</script>

<template>
  <section id="obsah" class="content-section">
    <div class="content-container text-container">
      <h1>{{ $t('documents.title') }}</h1>
      <hr class="contact-divider" />

      <div class="documents-layout documents-layout-three">
        <nav class="documents-column documents-column-root documents-nav" :aria-label="$t('documents.navAriaLabel')">
          <ul>
            <li>
              <button
                type="button"
                class="documents-nav-link"
                :class="{ selected: publicOpen }"
                @click="togglePublic"
              >
                {{ $t('documents.mandatoryDisclosure') }}
              </button>

              <transition name="expand">
                <img
                  v-if="publicOpen"
                  :src="publicImageUrl"
                  :alt="$t('documents.mandatoryDisclosureAlt')"
                  class="documents-nav-image"
                />
              </transition>
            </li>
          </ul>
        </nav>

        <transition name="expand">
          <div v-if="publicOpen" class="documents-column documents-column-branch documents-nav-sub">
            <ul>
              <li v-for="section in sections" :key="section.id">
                <button
                  type="button"
                  class="documents-sub-link"
                  :class="{ selected: activeSection === section.id }"
                  @click="activeSection = section.id"
                >
                  {{ section.label }}
                </button>
              </li>
            </ul>
          </div>
        </transition>

        <transition name="expand">
          <section
            v-if="activeContent"
            class="documents-column documents-column-content documents-panel"
            aria-live="polite"
          >
            <div class="documents-links documents-links-single">
              <a
                v-for="item in activeContent.links"
                :key="item.label"
                :href="item.href"
                class="documents-link"
              >
                {{ item.label }}
              </a>
            </div>
          </section>
        </transition>
      </div>
    </div>
  </section>
</template>
