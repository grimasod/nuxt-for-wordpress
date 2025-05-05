<template>
  <nav>
    <template v-for="item in menuStore.getItems" :key="item.id">
      <NuxtLink
        v-if="item.slug"
        :to="`/${item.slug === 'home' ? '' : item.slug}`"
        class="px-2 py-1 hover:underline hover:decoration-sky-400"
      >
        {{ `${item.slug === 'home' ? 'Home' : item.title}` }}
      </NuxtLink>
    </template>
    </nav>
</template>

<script setup>
const menuStore = useMenuStore()
</script>

