<template>
    <header class="header">
        <div class="header__container">
            <default-brand />
            <div class="header__left">
                <slot></slot>
            </div>
        </div>
    </header>
</template>
<script>
import DefaultBrand from "../brands/default-brand.vue";
export default {
    name: "default-header",
    components: {
        DefaultBrand,
    }
}
</script>
<style lang="scss" >
.header {
   @include flex-direction();
    background-color: $headColor;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 1920px;
    height: 65px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

    &__container {
        @include flex-direction();
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        padding: 0 1em;
    }

    &__left {
        @include flex-direction();
        gap: 10px;
        align-items: center;
    }

    &__search {
        height: fit-content;
    }

    &__button {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: $primaryColor;
        border: 1px solid rgba(36, 52, 71, 0.15);
        border-radius: 4px;
        padding: 8px 24px;
    }
}
</style>