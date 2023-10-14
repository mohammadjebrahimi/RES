<template>
  <div class="search-result-cards">
    <template v-for="(prop, index) in props">
      <SimpelCard :title="prop.title" :description="prop.description" :image="prop.icon"/>

      <hr v-if="index + 1 < props.length" class="search-result-cards__seperator" />
    </template>


  </div>
</template>
<script setup>
import SimpelCard from '../cards/simpel-card.vue';
defineProps({props: Array})
</script>
<style scoped lang="scss">
.search-result-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  
  &__seperator {
    max-width: 100%;
    border-top: 1px solid #0000001f;
  }
}
</style>