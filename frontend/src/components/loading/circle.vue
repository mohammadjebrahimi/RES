<template>
  <svg v-bind:style="styles" class="spinner spinner--circle" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
type propsShape = {
  size: string
}

const props = withDefaults(defineProps<propsShape>(), {
  size: '40px'
})

const { size } = toRefs(props)
const styles = computed<{
  width: string,
  height: string
}>(() => {
  return {
    width: size.value,
    height: size.value
  }
})
</script>
<style lang="scss" scoped>
$offset: 187;
$duration: 1.4s;

.spinner {
  animation: circle-rotator $duration linear infinite;

  * {
    line-height: 0;
    box-sizing: border-box;
  }
}

@keyframes circle-rotator {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    circle-dash $duration ease-in-out infinite,
    circle-colors ($duration*4) ease-in-out infinite;
}

@keyframes circle-colors {
  0% {
    stroke: #35495e;
  }

  25% {
    stroke: #DE3E35;
  }

  50% {
    stroke: #F7C223;
  }

  75% {
    stroke: #41b883;
  }

  100% {
    stroke: #35495e;
  }
}

@keyframes circle-dash {
  0% {
    stroke-dashoffset: $offset;
  }

  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>