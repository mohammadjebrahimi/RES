<template>
  <img @click="showSearchModal" class="search__icon" src="@/assets/images/search-normal.png" alt="search" />
 <DefaultModal :outLineBtn="false" :showOk="false" :showClose="true" v-model:show="showModal">
    <DefaultSearchbar />
  </DefaultModal>
</template>
<script>

import DefaultModal from '@/components/modals/default-modal.vue'
import DefaultSearchbar from '../searchbar/default-searchbar.vue';
export default {
  name: "search",
  components: {
    DefaultSearchbar,
    DefaultModal
  },
  props: {
  },
  data(){return{
    showModal:false
  }},
  methods: {
    showSearchModal(){
      this.showModal=true
    }
  }

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