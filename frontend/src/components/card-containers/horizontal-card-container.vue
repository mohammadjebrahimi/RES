<template>
    <section class="horizontal-card-container">
        <span v-if="label" class="horizontal-card-container__title">{{label}}</span>
        <hr v-if="label" class="horizontal-card-container__seperator">
        <div class="horizontal-card-container__cards">
            <template v-for="(data, index) in cards" :key="`card-{index}`">
                <default-card class="horizontal-card-container__card" v-bind="data" />
            </template>
        </div>
        <button @click="btnClick()" v-if="buttonText" class="horizontal-card-container__see-more">{{buttonText}}</button>
    </section>
</template>
<script>
import defaultCard from '@/components/cards/default-card.vue'
export default {
    name: "horizontal-card-container",
    components: { defaultCard },
    props: {
        'cards': Array,
        'label':String,
        'buttonText':String,
    },
    methods:{
        btnClick(){
            this.$emit('btnClick')
        }
    }

}
</script>
<style lang="scss">
.horizontal-card-container {
    @include flex-direction(column);
    width: 100%;
    max-width: 1200px;

    &__cards {
        @include flex-direction();
        justify-content: center;
        align-items: flex-start;
        gap: 2em;
        flex-wrap: wrap;

        @include breakpoint_max(small) {
            @include flex-direction(column);
            align-items: center;
        }
    }

    &__see-more {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: $primaryColor;
        border: 1px solid rgba(36, 52, 71, 0.15);
        border-radius: 4px;
        padding: 8px 24px;
        max-width: 374px;
        width: 100%;
        margin: 60px auto 0;
    }

    &__title {
        font-weight: 700;
        font-size: 20px;
        border-bottom: 1.5px solid #208BEE;
        width: fit-content;
    }

    &__seperator {
        border-top: 1px solid #208BEE;
        margin: 0;
    }

    &__card {
        max-width: 378px;
        width: 100%;
        box-shadow: none;
        background: transparent;
        padding: 0;
        backdrop-filter: none
    }



}
</style>