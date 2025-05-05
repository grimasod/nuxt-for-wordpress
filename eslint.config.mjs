// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).override('nuxt/typescript', {
  files: ['layouts/*.vue', 'pages/**/*.vue'],
  rules: { 'vue/multi-word-component-names': 'off' }
})
