<script setup>
import SwipeItem from './SwipeItem.vue'
import { ref } from 'vue'
const props = defineProps({
  plants: {
    type: Array,
    required: true
  }
})
const contract = ref(false)
</script>

<template>
  <div class="container">
    <SwipeItem
      v-for="(item, index) in props.plants"
      :key="index"
      :plant="item"
      :contract="contract"
    />
    <!-- <button @click="contract = !contract" /> -->
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 75vw;
  position: relative;
}

.container SwipeItem:deep(.section){
  border: 1px solid black;
}
</style>
