<script setup>
const props = defineProps({
  max: {
    type: Number,
    default: 1,
    required: false
  },
  value: {
    type: Number,
    default: 0.5,
    required: false
  },
  color: {
    type: String,
    default: 'blue',
    required: false
  }
})

const bgStyle = {
  height: '5px',
  backgroundColor: 'lightgrey',
  borderRadius: '2.5px',
  display: 'flex',
  justifyContent: 'flex-start'
}

const fillStyle = {
  height: '100%',
  backgroundColor: props.color,
  width: `${(props.value / props.max) * 100}%`,
  borderRadius: '2.5px'
}
</script>

<template>
  <div
    class="bg"
    :style="bgStyle"
  >
    <div
      class="fill"
      :style="fillStyle"
    />
  </div>
</template>

<style scoped>
</style>
