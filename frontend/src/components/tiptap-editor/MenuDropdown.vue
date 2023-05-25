<template>
  <VDropdown :distance="0" class="menu-dropdown">
    <!-- This will be the popover reference (for the events and position) -->
    <button class="menu-dropdown__icon" :title="title">
      <svg class="remix">
        <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
      </svg>
    </button>

    <!-- This will be the content of the popover -->
    <template #popper>

      <div class="menu-dropdown__items">
        <MenuItem v-for="(item, index) in items" :key="index" v-bind="item" />
      </div>



    </template>
  </VDropdown>
</template>
<script>
import {
  Dropdown,
} from 'floating-vue'
import MenuItem from './MenuItem.vue';
;
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
export default {
  name: "profile",
  components: {
    Dropdown,
    MenuItem,
  },
  props: {
    title:String,
    icon:String,
    items: Array
  },
  data() {
    return {
      remixiconUrl
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="scss">
.menu-dropdown {
  align-items: center;
  display: flex;
  cursor: pointer;



  &__icon {
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

  &__items {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }
}
</style>