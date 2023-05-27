<template>
  <div class="tab-header">
    <div class="tab-header__tablinks">
      <button v-for="(tab, index) in tabs" class="tab-header__tablink"
        :class="{ 'tab-header__tablink--selected': index == selestedTabIndex }" @click="emitSlectedTab(index)">
        <figure v-if="tab.header.icon" class="tab-header__tablink-icon"><img :src="tab.header.icon"
            :alt="tab.header.name"></figure>
        {{ tab.header.name }}
        <div v-if="tab.header.count" class="tab-header__tablink-count">{{ tab.header.count }}</div>
      </button>
    </div>
    <hr class="tab-header__seperator" />
  </div>
</template>
<script>

export default {
  name: "defaultTabHeader",
  props: {
    tabs: Array,
    selestedTabIndex: Number
  },
  methods: {
    emitSlectedTab(e) {
      this.$emit('update:selestedTabIndex', e)

    }
  }


}
</script>
<style scoped lang="scss">
.tab-header {
  display: flex;
  flex-direction: column;
  width: 100%;




  &__seperator {
    max-width: 100%;
    margin: 0 1rem;
    border-top: 2px solid #00000026;
    position: relative;
    bottom: 2px;
  }

  &__tablinks {

    display: flex;
    flex-direction: row;
    max-width: 100%;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem;
    overflow-x: auto;
    overflow-y: hidden;



    &::-webkit-scrollbar {
      height: 8px;
      background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: black;
    }

  }

  &__tablink {
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;

    &--selected {
      border-bottom: 2px solid;
    }
  }

  &__tablink-count {
    width: 1rem;
    height: 1rem;
    background-color: #a9a9a959;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25%;
  }

  &__tablink-icon {
    margin: 0;
    width: 1rem;
    height: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>