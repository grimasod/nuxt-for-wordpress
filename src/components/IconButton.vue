<template>
  <button class="px-2 py-1 b-0 bg-none text-zinc-800">
    <SvgIcon :icon="props.icon" />
  </button>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>
