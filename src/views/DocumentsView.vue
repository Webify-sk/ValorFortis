<script setup>
import { computed, ref } from "vue";
import publicImageUrl from "../../public/assets/images/documents/public.png";

const publicOpen = ref(false);
const activeSection = ref(null);

const sections = [
  {
    id: "messages",
    label: "Oznámenia",
    links: [
      { href: "#", label: "Placeholder dokumentu" },
    ],
  },
];

const activeContent = computed(() => {
  return sections.find((section) => section.id === activeSection.value) ?? null;
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
      <h1>Dokumenty</h1>
      <hr class="contact-divider" />

      <div class="documents-layout documents-layout-three">
        <nav class="documents-column documents-column-root documents-nav" aria-label="Dokumenty">
          <ul>
            <li>
              <button
                type="button"
                class="documents-nav-link"
                :class="{ selected: publicOpen }"
                @click="togglePublic"
              >
                Povinné zverejňovanie
              </button>

              <transition name="expand">
                <img
                  v-if="publicOpen"
                  :src="publicImageUrl"
                  alt="Povinné zverejňovanie"
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
