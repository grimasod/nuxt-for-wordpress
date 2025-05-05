<template>
  <h2 class="text-lg font-bold uppercase pb-4 w-full text-center">
    {{ pageStore.getCurrentPage?.title?.rendered }}
  </h2>
  <div v-if="pageStore.getCurrentPage?.isNotFound" class="flex flex-col items-center gap-4">
    <span class="text-4xl">404</span>
    <span>Page not found</span>
  </div>
  <div v-else-if="pageContent" v-html="pageContent" />
</template>

<script setup>
const pageContent = ref('')
const pageStore = usePageStore()

// load an external script async
const loadExternalScript = async (src) => {
  return new Promise(function(resolve, reject){
    const externalScript = document.createElement('script')
    externalScript.setAttribute('src', src)
    externalScript.setAttribute('type', 'text/javascript')
    document.head.appendChild(externalScript)

    externalScript.onload = () => {
      resolve()
    }
    externalScript.onerror = () => {
      reject()
    }
  })
}

// split scripts by external and inline
const splitScriptsByType = (scripts) => {
  const split = {
    external: [],
    inline: []
  }
  for (const s of scripts) {
    if (s.src) {
      split.external.push(s.src)
    } else if (s.innerHTML) {
      split.inline.push(s.innerHTML)
    }
  }
  return split
}

const setupPage = async () => {
  // initialize the store with the url page slug
  // console.log('pageStore.getCurrentPageIsFetched', pageStore.getCurrentPageIsFetched)
  // console.log('pageStore.getCurrentPage?.content?.rendered', pageStore.getCurrentPage?.content?.rendered)
  if (pageStore.getCurrentPage && !pageStore.getCurrentPageIsNotFound) {

    // document.title = `${pageStore.getIsHomePage || pageStore.getCurrentPageIsNotFound ? '' : `${pageStore.getCurrentPage.title?.rendered} - `}The Nazca Solution`

    const object2vrConfigs = []

    // extract any <script> tags in the fetched content
    const tempDoc = new DOMParser().parseFromString(pageStore.getCurrentPage.content?.rendered, 'text/html')
    const newScripts = [...tempDoc.getElementsByTagName('script')]

    if (newScripts.length > 0) {
      // split by external and inline
      const newSplit = splitScriptsByType(newScripts)
      // console.log('newScripts', newSplit)

      // extract existing scripts in document, to compare and not add again
      const exisitingSplit = splitScriptsByType([...document.getElementsByTagName('script')])
      // console.log('exisitingSplit', exisitingSplit)

      // Filter external scripts that are not already added and are for object2vr
      const toAddExternal = newSplit.external.filter(newScript => newScript.toLowerCase().includes('object2vr') && !exisitingSplit.external.includes(newScript) )
      // console.log('toAddExternal', toAddExternal)

      // wait for all new external scripts to be loaded
      await Promise.all(toAddExternal.map(src => loadExternalScript(src)))
      // console.log('loaded external')

      // Filter inline scripts that are for object2vr
      const inlineScripts = newSplit.inline.filter(newScript => newScript.toLowerCase().includes('object2vr'))
      // console.log('inlineScripts', inlineScripts)
      
      if (inlineScripts.length > 0) {
        // extract details from inline scripts, see example at bottom
        const urlRegEx = /new (?<player>.+?_object2vrPlayer)\('(?<name>.+?)'\)[\s\S]+?readConfigUrl\('(?<url>.+?\/object\.xml)'\)/
        object2vrConfigs.push(
          ...inlineScripts
            .map(s => {
              const extracts = urlRegEx.exec(s)
              // console.log('extracts', extracts)
              return extracts?.groups || null
            })
            .filter(config => config)
        )
        // console.log('object2vrConfigs', object2vrConfigs)
      }
    }

    // remve all (external and inline) scripts from page content - they don't belong there
    for (const toRemove of newScripts) {
      toRemove.parentNode.removeChild(toRemove)
    }
    
    // set the page content (withouth any scripts)
    pageContent.value = tempDoc.body.innerHTML

    // wait for the content to be rendered
    await nextTick()

    // add any object2vr items
    for (const config of object2vrConfigs) {
      // console.log('config', config)
      const object2vrPlayer = typeof window[config.player] !== 'undefined'
          ? window[config.player]
          : typeof window.object2vrPlayer !== 'undefined'
            ? window.object2vrPlayer
            : null
      if (object2vrPlayer) {
        const object2vrContainer = document.getElementById(config.name)
        if (object2vrContainer) {
          const wrapper = document.createElement('div');
          object2vrContainer.parentNode.insertBefore(wrapper, object2vrContainer)
          wrapper.appendChild(object2vrContainer)
          wrapper.classList.add('object2vr')
          object2vrContainer.removeAttribute('style')

          const obj = new object2vrPlayer(config.name)
          obj.readConfigUrl(config.url)
        }
      }
    }
  }

}

onMounted(() => {
  if (!pageContent.value) {
    setupPage()
  }
})

await pageStore.setCurrentSlug({ slug: 'virtual-nazca-earth' })

// example inline script for Object2VR, need to extract:
// - object (Cyclopean_ObjVR1_object2vrPlayer) and name (ggpkg_container_0_917) in: Cyclopean_ObjVR1_object2vrPlayer('ggpkg_container_0_917')
// - url (https://nazcasolution.com/wp-content/uploads/2023/04/Cyclopean_ObjVR1/object.xml) in: readConfigUrl('https://nazcasolution.com/wp-content/uploads/2023/04/Cyclopean_ObjVR1/object.xml')
// 
// window.addEventListener('load',function() {
//   if  (typeof Cyclopean_ObjVR1_object2vrPlayer != 'undefined') {
//     obj_0_917=new Cyclopean_ObjVR1_object2vrPlayer('ggpkg_container_0_917');
//   } else {
//     obj_0_917=new object2vrPlayer('ggpkg_container_0_917');
//   }
//   obj_0_917.readConfigUrl('https://nazcasolution.com/wp-content/uploads/2023/04/Cyclopean_ObjVR1/object.xml');
//   var contentOverflow = document.getElementById('content') ? document.getElementById('content').style.overflow : '';
//   obj_0_917.addListener('fullscreenenter', function() {
//     if (document.getElementById('content')) {
//       document.getElementById('content').style.overflow = 'visible';
//     }
//   });
//   obj_0_917.addListener('fullscreenexit', function() {
//     if (document.getElementById('content')) {
//       document.getElementById('content').style.overflow = contentOverflow;
//     }
//   });
// });
</script>

