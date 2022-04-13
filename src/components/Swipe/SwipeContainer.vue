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
        :class="{focus: index === 1}"
        :plant="item"
        :contract="index !== 1"
      />
    </TransitionGroup>
    <button
      class="neg-shift"
      :disabled="plants.length === 1"
      @click="plants.push(plants.shift())"
    >
      &lt;
    </button>
    <button
      class="pos-shift"
      :disabled="plants.length === 1"
      @click="plants.unshift(plants.pop())"
    >
      &gt;
    </button>
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

.focus {
  z-index: 10;
}

.trans-all {
  transition: 1s all ease;
}

.pos-shift {
  position: absolute;
  right: -5vw;
  top: 18vh;
  border-style: none;
  text-align: center;
  font-size: 18px;
  color: white;
  height: 3vmax;
  width: 3vmax;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}

.neg-shift {
  position: absolute;
  left: -5vw;
  top: 18vh;
  border-style: none;
  text-align: center;
  font-size: 18px;
  color: white;
  height: 3vmax;
  width: 3vmax;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
