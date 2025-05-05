<template>
  <button @click="toggleSim" class="underline decoration-sky-200 hover:decoration-sky-400">The Simulation Experiment</button>
  <ModalPopup v-show="isOpen" @close-modal="toggleSim">
    <iframe
      src="https://sim.nazcasolution.com/"
      title="Simulation Experiment"
      width="400"
      height="300"
      class="w-full h-full"
    />
  </ModalPopup>
</template>

<script setup>
import { ref } from 'vue'
import ModalPopup from '@/components/ModalPopup.vue'

const isOpen = ref(false)
const toggleSim = () => isOpen.value = !isOpen.value
</script>