<template>
  <button class="menu-item" :class="{ 'is-active': isActive ? isActive() : null }" @click="action" :title="title">
    <svg class="remix">
      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { tiptapEditorMenuItem } from '@/types/types';
import { ref } from 'vue';
const remixiconUrl =ref<string>('/node_modules/remixicon/fonts/remixicon.symbol.svg')



defineProps<tiptapEditorMenuItem>()

</script>

<style lang="scss">
.menu-item {
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  color: #fff;
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active,
  &:hover {
    background-color: #303030;
  }
}
</style>
