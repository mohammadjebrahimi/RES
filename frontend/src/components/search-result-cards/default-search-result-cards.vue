<template>
  <div class="search-result-cards">
    <template v-for="(prop, index) in props">
      <div class="search-result-card">
        <figure v-show="prop.icon" class="search-result-card__img"><img :src="prop.icon" :alt="prop.title"></figure>
        <div class="search-result-card__description">
          <div class="search-result-card__description-title">{{ prop.title }}</div>
          <div class="search-result-card__description-aditional"> {{ prop.description }}</div>
        </div>
      </div>
      <hr v-if="index + 1 < props.length" class="tab-body__seperator" />
    </template>


  </div>
</template>
<script>

export default {
  name: "defaultTabBody",
  props: {
    props: Array,
  },



}
</script>
<style scoped lang="scss">
.search-result-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  &__img {
    height: 36px;
    width: 36px;
    margin: 0 0 0 12px;

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
  }

  &__description-title {
    font-size: 14px;
    color: #28394F;
  }

  &__description-aditional {
    font-size: 11px;
    color: #8593A6;
  }
}
</style>