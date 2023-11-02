<template>
  <!-- Tab links -->
  <div class="tabbar">
    <defaultTabHeader v-model:selectedTabIndex="selectedTabIndexRef" :tabs="tabs" />
    <div class="tab-body">
      <div class="tab-body__content">

        <component v-if="tabs[selectedTabIndexRef]?.body?.props?.length"
          v-bind:is="tabs[selectedTabIndexRef].body.component" :props="tabs[selectedTabIndexRef].body.props">
        </component>
        <div v-else>موردی یافت نشد!</div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import defaultTabHeader from '@/components/tab-header/default-tab-header.vue';
import type { tab } from '@/types/types';
import { ref, toRefs, watch } from 'vue';

type propShape = {
  tabs: tab[]
  selectedTabIndex: number
}
const props = withDefaults(defineProps<propShape>(), {
  selectedTabIndex: 0,
})
const { selectedTabIndex } = toRefs(props)
const selectedTabIndexRef = ref(selectedTabIndex.value)


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