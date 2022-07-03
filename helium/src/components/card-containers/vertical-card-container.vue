<template>
    <section class="vertical-card-container">
        <template v-for="(data, index) in cards" :key="`card-{index}`">
            <card2 v-bind="data"></card2>
        </template>
    </section>
</template>
<script>
import card2 from '../cards/card-2.vue'
export default {
    name: "horizontal-card-container",
    components: { card2 },
    props: {
        'cards': Object,
    },

}
</script>
<style lang="scss">
.vertical-card-container {
  @include flex-direction(column);
  justify-content: center;
  gap: 20px;
  padding: 40px 0;
  width: 100%;
  max-width: 1200px;

}
</style>