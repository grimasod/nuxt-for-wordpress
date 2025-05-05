<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
    class="w-8 h-8"
  >
    <path
      :d=definitions[props.icon]
      fill="currentColor"
    />
  </svg>
</template>

<!--
  Icons sourced from:
  https://fonts.google.com/icons?icon.platform=web&icon.set=Material+Symbols
  
  Licensing
  "We have made these icons available for you to incorporate them into your products under the Apache License Version 2.0.
  Feel free to remix and re-share these icons and documentation in your products.
  We'd love attribution in your app's about screen, but it's not required."
-->

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})


const definitions = {
  close: 'M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z',
  menu: 'M110.391-224.173v-79.218h739.218v79.218H110.391Zm0-216.218v-79.218h739.218v79.218H110.391Zm0-216.218v-79.783h739.218v79.783H110.391Z',
}
</script>
