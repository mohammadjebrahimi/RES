<template>
  <img @click="showSearchModal" class="search__icon" src="@/assets/images/search-normal.png" alt="search" />
  <DefaultModal :outLineBtn="false" :showOk="false" :showClose="true" v-model:show="showModal">
    <DefaultSearchbar />
  </DefaultModal>
</template>
<script setup lang="ts">

import DefaultModal from '@/components/modals/default-modal.vue'
import DefaultSearchbar from '../searchbar/default-searchbar.vue';
import { ref } from 'vue';


const showModal = ref<boolean>(false)
const showSearchModal = ():void => {
  showModal.value = true
}


</script>
<style lang="scss">
.search {
  height: 42px;
  width: 42px;
  cursor: pointer;

  &__icon {
    width: 24px;
    height: 24px;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>