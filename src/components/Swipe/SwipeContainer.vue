<script setup>
import SwipeItem from './SwipeItem.vue'
import { reactive } from 'vue'
const props = defineProps({
  plants: {
    type: Array,
    required: true
  }
})
const plants = reactive(props.plants)
plants.unshift(plants.pop())
</script>

<template>
  <div class="container">
    <TransitionGroup
      move-class="trans-all"
    >
      <SwipeItem
        v-for="(item, index) in props.plants"
        :key="item"
        :plant="item"
        :contract="index !== 1"
        :style="`z-index: ${index === 1 ? 1 : -index}`"
      />
    </TransitionGroup>
    <button
      class="neg-shift button"
      :disabled="plants.length === 1"
      @click="plants.push(plants.shift())"
    >
      &lt;
    </button>
    <button
      class="pos-shift button"
      :disabled="plants.length === 1"
      @click="plants.unshift(plants.pop())"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 75vw;
  position: relative;
}

.trans-all {
  transition: 1s all ease;
}

.button {
  position: absolute;
  border-style: none;
  text-align: center;
  font-size: 24px;
  color: grey;
  height: 6vmax;
  width: 3vmax;
  border-radius: 15%;
  background: rgba(255, 255, 255, 0);
  transition: 0.5s all ease;
  box-shadow: none;
}

.button:hover {
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.14) , 0px 1px 10px 0px rgba(0,0,0,0.12) , 0px 2px 4px -1px rgba(0,0,0,0.2);
}

.pos-shift {
  right: -5vw;
  top: 18vh;
}

.neg-shift {
  left: -5vw;
  top: 18vh;
}
</style>
