import { defineStore } from 'pinia'
// import api from '@/api'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuId: null,
      items: [],
      headerImage: null,
      isMenuOpen: null
    }
  },
  getters: {
    getItems: state => state.items,
    getHasItems () {
      return this.getItems.length > 0
    },
    getSlugs () {
      return this.getItems.map(item => item.slug)
    },
    getHeaderImage: state => state.headerImage,
    getHasHeaderImage () {
      return !!this.getHeaderImage
    },
    getIsMenuOpen: state => state.isMenuOpen
  },
  actions: {
    async fetchMenu ({ apiBase, apiKey }) {
      if (this.items.length === 0) {
        const fetchedMenu = await useApi(`${apiBase}menus?slug=home&_fields=id`, apiKey)
        if (fetchedMenu && Array.isArray(fetchedMenu) && fetchedMenu.length > 0) {
          // console.log(fetchedMenu)
          this.menuId = fetchedMenu[0].id
          const fetchedItems = await useApi(`${apiBase}menu-items?menus=${fetchedMenu[0].id}&_embed=1&_fields=id,url,title,object_id,_links.wp:menu-item-object`,  apiKey)
          if (fetchedItems) {
            this.items = fetchedItems.map(item => ({
              id: item.id,
              url: item.url,
              title: item.title?.rendered || '',
              slug: item._embedded?.['wp:menu-item-object']?.[0]?.slug || ''
            }))
          }
        } else {
          console.log('menu items not found')
        }
      }
    },
    async fetchHeaderImage ({ apiBase }) {
      if (!this.headerImage) {
        const fetchedImage = await useApi(`${apiBase}media?slug=header-image&_fields=source_url,media_details`)
        // console.log(fetchedImage)
        if (fetchedImage && Array.isArray(fetchedImage) && fetchedImage.length > 0) {
          this.headerImage = {
            url: fetchedImage[0].source_url,
            srcset: Object.entries(fetchedImage[0].media_details.sizes)
              .filter(size => size[0] !== 'thumbnail')
              .map(size => `${size[1].source_url} ${size[1].width}w`)
              .join()
          }
        } else {
          console.log('menu items not found')
        }
      }
    },
    openMenu () {
      this.isMenuOpen = true
    },
    closeMenu () {
      this.isMenuOpen = false
    }
  }
})
