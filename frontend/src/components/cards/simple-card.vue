<template>
    <div class="simple-card">
        <figure class="simple-card__figure">
            <img :src="image" :alt="title">
        </figure>
        <div class="simple-card__header-right">
            <div class="simple-card__title ">{{ title }}</div>
            <div class="simple-card__description "> {{ description }}</div>
        </div>
    </div>
</template>
<script setup>

defineProps({
    'image': String,
    'title': String,
    'description': String,
})

</script>
<style scoped lang="scss">
.simple-card {
    @include flex-direction();
    align-items: center;
    width: 100%;

    &__figure {
        height: 36px;
        margin: 0 0 0 12px;
        min-width: 36px;
        width: 36px;

        & img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    &__header-right {
        @include flex-direction(column);
    }

    &__title {
        font-size: 14px;
        color: #28394F;
    }

    &__description {
        font-size: 11px;
        color: #8593A6;
        max-width: 100%;
        line-break: anywhere;
    }
}
</style>