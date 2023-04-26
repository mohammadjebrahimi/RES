<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  
</template>

<style lang="scss">

@include kalameh-font-face();
@include kalameh-farsi-number-font-face();

.flex-body {
  width: 100%;
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  margin: auto;
}

* {
  font-family: 'Kalameh';
  font-style: normal;
}
</style>
