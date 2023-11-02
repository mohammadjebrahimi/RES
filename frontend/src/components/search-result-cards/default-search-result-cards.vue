<template>
  <div class="search-result-cards">
    <template v-for="(prop, index) in props">
      <simpleCard :title="prop.title" :description="prop.title" :image="prop.icon" />

      <hr v-if="index + 1 < props.length" class="search-result-cards__seperator" />
    </template>


  </div>
</template>
<script setup lang="ts">
import simpleCard from '../cards/simple-card.vue';
type propShape ={
  props: {
    title: string
    icon: string
  }[]
}
defineProps<propShape>()
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