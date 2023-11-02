<template>
    <section class="vertical-card-container">
        <template v-for="(data, index) in cards" :key="`card-{index}`">
            <card2 v-bind="data"></card2>
        </template>
    </section>
</template>
<script setup lang="ts">
import card2 from '../cards/card-2.vue'
import type { card } from '@/types/types'

type propsShape = {
    cards:card[]
}

defineProps<propsShape>()

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