<template>
  <div class="z-modal fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" @click="close" />
    <div class="z-10 bg-white opacity-100 h-[calc(100%-4rem)] w-[calc(100%-4rem)] max-w-screen-xl flex flex-col rounded border-2 border-sky-500">
      <div class="flex justify-end">
        <IconButton icon="close" @click="close" class="rounded text-sky-600 hover:bg-sky-50 hover:text-sky-900" />
      </div>
      <div class="grow pt-2 pb-4 xl:pb-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconButton from '@/components/IconButton.vue'
const emit = defineEmits(['closeModal'])

const close = () => emit('closeModal')
</script>