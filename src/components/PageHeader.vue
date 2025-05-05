<template>
  <header class="bg-white rounded-t p-2 lg:rounded">
    <div class="flex flex-col w-full items-center sm:py-4">
      <NuxtLink to="/">
        <h1 class="font-bold text-2xl uppercase xs:text-3xl sm:text-4xl">
          The Nazca Solution
        </h1>
      </NuxtLink>
      <span class="text-xs text-zinc-600 font-serif xs:text-sm">
        The solution to what the Nazca Lines represent 
      </span>
    </div>
    <SiteMenu class="gap-1 rounded-b bg-zinc-100 border-t py-1 min-h-[100px] hidden lg:flex flex-row flex-wrap" />
  </header>
  <div class="flex flex-col bg-zinc-100 sticky top-0 z-menu rounded-b lg:hidden" >
    <div class="flex items-center text-sm">
      <IconButton icon="menu" @click="menuStore.openMenu" />
      <ol class="flex gap-2 text-zinc-600 items-center">
        <li>
          <NuxtLink to="/" class="hover:underline decoration-sky-400">
            Home
          </NuxtLink>
        </li>
        <li
          v-if="pageStore.getCurrentPage && pageStore.getCurrentPage.slug !== 'home'"
          class="flex items-center gap-2 capitalize"
        >
          <span>
            >
          </span>
          <span class="text-sky-700">
            {{ pageStore.getCurrentPage?.slug.replaceAll('-', ' ') }}
          </span>
        </li>
      </ol>
    </div>
    <div
      v-if="menuStore.getIsMenuOpen"
      class="fixed inset-0 overflow-y-auto overscroll-y-none lg:hidden"
    >
      <div class="relative bg-white min-h-[calc(100%+1px)] w-full">
        <div class="flex items-center sticky top-0 bg-white border-b">
          <IconButton icon="close" @click="menuStore.closeMenu" />
          <span class="font-bold uppercase">
            The Nazca Solution
          </span>
        </div>
        <SiteMenu class="gap-1 border-b divide-y py-1 flex flex-col bg-zinc-100" />
      </div>
    </div>
  </div>
</template>

<script setup>
const menuStore = useMenuStore()
const pageStore = usePageStore()
</script>

