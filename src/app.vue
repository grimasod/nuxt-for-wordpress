<template>
  <div>
    <NuxtRouteAnnouncer />
      <div
        class="bg-fixed bg-no-repeat bg-cover bg-center w-full min-h-screen flex flex-col items-center"
        :style="`${ menuStore.getHeaderImage?.url ? `background-image: url(${menuStore.getHeaderImage.url})` : ''}`"
      >
          <div
            class="w-full max-w-container grow flex flex-col p-3 sm:px-4 sm:py-6 transition-opacity duration-[1500ms]"
          >
            <PageHeader />
            <main class="grow bg-white rounded px-2 py-4 mt-4 sm:p-6 sm:mt-6 ">
              <NuxtPage />
            </main>
          </div>
          <div class="bg-white/60 flex items-center justify-center w-full h-10 text-xs xs:text-sm">
            All content © nazcasolution.com / the Nazca Group
          </div>
      </div>
  </div>
</template>

<script setup>
const menuStore = useMenuStore()
const config = useRuntimeConfig()
const pageStore = usePageStore()
const route = useRoute()

useHead({
  title: 'The Nazca Solution',
  link: [
    { rel:'apple-touch-icon', sizes:'180x180', href:'/apple-touch-icon.png' },
    { rel:'icon', type:'image/png', sizes:'32x32', href:'/favicon-32x32.png' },
    { rel:'icon', type:'image/png', sizes:'16x16', href:'/favicon-16x16.png' },
    { rel:'manifest', href:'/site.webmanifest' }
  ],
  // Google tag (gtag.js)
  ...!import.meta.dev && {
    script: [
      { async: true, src: `https://www.googletagmanager.com/gtag/js?id=G-7QJL6Z3Y9T${config.gtagConfig}` },
      { 
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.gtagConfig}');
        `
      }
    ]
  }
})

const setupPage = async (slug) => {
  if (slug !== undefined) {
    await pageStore.setCurrentSlug({ apiBase: config.public.apiBase, slug: slug[0] || 'home'})
  }
  useHead({
    title: `${!pageStore.getCurrentPageIsFetched || pageStore.getIsHomePage || pageStore.getCurrentPageIsNotFound ? '' : `${pageStore.getCurrentPage.title?.rendered} - `}The Nazca Solution`
  })
}

if (route.params.slug !== undefined) {
  await setupPage(route.params.slug)
}

if (import.meta.server) {
  await menuStore.fetchMenu({ apiBase: config.public.apiBase, apiKey: config.apiKey})
  await menuStore.fetchHeaderImage({ apiBase: config.public.apiBase })
  if (!import.meta.dev) {
    // prefetch all pages for SSG
    await pageStore.fetchAllPages({ apiBase: config.public.apiBase })
  }
}

watch(
  () => route.params.slug,
  async (toSlug) => {
    menuStore.closeMenu()
    setupPage(toSlug)
  },
);

</script>

