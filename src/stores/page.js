import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => {
    return {
      pages: [],
      currentSlug: null
    }
  },
  getters: {
    getPages: state => state.pages,
    getCurrentSlug: state => state.currentSlug,
    getCurrentPage () {
      return this.getPages.find(page => page.slug === this.getCurrentSlug) || null
    },
    getCurrentPageIsFetched () {
      return !!this.getCurrentPage
    },
    getCurrentPageIsNotFound () {
      return this.getCurrentPage?.isNotFound
    },
    getIsHomePage () {
      return this.getCurrentSlug === 'home'
    },
    getIsMapPage () {
      return !this.getIsHomePage && this.getCurrentSlug === 'virtual-nazca-earth-map'
    },
    getIsSimPage () {
      return !this.getIsHomePage && !this.getIsMapPage && this.getCurrentSlug === 'simulation-experiment'
    },
    getIsNotPreRendered () {
      return !this.getIsHomePage && !this.getIsMapPage && !this.getIsSimPage && this.getCurrentSlug === 'virtual-nazca-earth'
    }
    // ,
    // getIsSpecialPage () {
    //   return this.getIsMapPage || this.getIsSimPage
    // }
  },
  actions: {
    async fetchPage ({ apiBase, slug }) {
      console.log('fetchPage slug', slug)
      const fetchedPage = await useApi(`${apiBase}pages?slug=${slug}&_fields=slug,title,content`)
      console.log('fetchedPage.length', fetchedPage.length)
      if (fetchedPage && Array.isArray(fetchedPage)) {
        this.pages = [
          ...this.getPages,
          ...fetchedPage.length > 0
            ? fetchedPage
            : [{
                slug,
                isNotFound: true
              }]
        ]
      }
    },
    async fetchAllPagees ({ apiBase }) {
      const menuStore = useMenuStore()
      const slugs = menuStore.getSlugs
      console.log('fetchPage slugs', slugs)
      for (const slug of slugs) {
        const fetchedPage = await useApi(`${apiBase}pages?slug=${slug}&_fields=slug,title,content`)
        console.log('fetchedPage.length', slug, fetchedPage.length)
        if (fetchedPage && Array.isArray(fetchedPage)) {
          this.pages = [
            ...this.getPages,
            ...fetchedPage.length > 0
              ? fetchedPage
              : [{
                  slug,
                  isNotFound: true
                }]
          ]
        }
      }
      
    },
    async setCurrentSlug ({ slug }) {
      this.currentSlug = slug
    }
  }
})
