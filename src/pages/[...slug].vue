<template>
  <h2 class="text-lg font-bold uppercase pb-4 w-full text-center">
    {{ pageStore.getCurrentPage?.title?.rendered }}
  </h2>
  <div v-if="pageStore.getCurrentPage?.isNotFound" class="flex flex-col items-center gap-4">
    <span class="text-4xl">404</span>
    <span>Page not found</span>
  </div>
  <div v-else-if="pageStore.getCurrentPage?.content" v-html="pageStore.getCurrentPage.content?.rendered" />
  <CustomContentMap v-if="pageStore.getIsMapPage" />
  <CustomContentSim v-else-if="pageStore.getIsSimPage" />
</template>

<script setup>
import { onBeforeMount } from 'vue'

const pageStore = usePageStore()
const route = useRoute()
const config = useRuntimeConfig()

if (!import.meta.server && import.meta.dev && !pageStore.getCurrentPage) {
  // In Dev mode, fetch each page when visited
  await pageStore.fetchCurrentPage({ apiBase: config.public.apiBase })
}
</script>

