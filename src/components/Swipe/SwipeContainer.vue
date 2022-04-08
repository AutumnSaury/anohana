<script setup>
import SwipeItem from './SwipeItem.vue'
const props = defineProps({
  plants: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="container">
    <SwipeItem
      v-for="(item, index) in props.plants"
      :key="index"
      :plant="item"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 75vw;
}

.container SwipeItem {
  display: inline-block;
}
</style>
