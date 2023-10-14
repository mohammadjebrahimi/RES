<template>
  <!-- Tab links -->
  <div class="tabbar">
    <defaultTabHeader v-model:selectedTabIndex="selectedTabIndex" :tabs="tabs" />
    <div class="tab-body">
      <div class="tab-body__content">

        <component v-if="tabs[selectedTabIndex]?.body?.props?.length" v-bind:is="tabs[selectedTabIndex].body.component"
          :props="tabs[selectedTabIndex].body.props">
        </component>
        <div v-else>موردی یافت نشد!</div>

      </div>
    </div>
  </div>
</template>
<script setup>
import defaultTabHeader from '@/components/tab-header/default-tab-header.vue';


 defineProps( {
    tabs: Object,
    selectedTabIndex: {
      type: Number,
      default: 0
    }
  })


</script>
<style lang="scss">
.tabbar {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  max-width: 450px;
}

.tab-body {
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 600px;
  padding: 0 5%;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }

  &__content {
    max-width: 100%;
    padding: 1rem;
  }

  &__seperator {
    max-width: 100%;
    border-top: 1px solid #0000001f;
  }
}
</style>