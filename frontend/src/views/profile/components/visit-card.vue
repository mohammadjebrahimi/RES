<template>
    <div class="visit-card">
        <figure class="visit-card__avatar-img">
            <img :src="image" :alt="name">
        </figure>
        <div class="visit-card__body">
            <h1 class="visit-card__name">
                {{ name }}
            </h1>
            <figure v-for="(specification, index) in specifications" :key="`specification-${index}`"
                class="visit-card__specification-section">
                <img class="visit-card__specification-img" :src="specification.image" alt="">
                <figcaption class="visit-card__specification"
                    :class="{ 'visit-card__specification--big': specification.big, 'visit-card__specification--number': specification.number }">
                    {{
                        specification.value
                    }}
                </figcaption>
            </figure>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        specifications: Array,
        name: String,
        image: String,
    }
}
</script>
<style lang="scss">
.visit-card {
    @include flex-direction();
    justify-content: space-between;
    gap: 20px;

    &__avatar-img {
        width: 100px;
        height: 100px;
        margin: 0;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    &__body {
        @include flex-direction(column);
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
    }

    &__name {
        margin: 0;
    }

    &__specification-section {
        @include flex-direction();
        justify-content: center;
        margin: 0;
        gap: 10px;
    }

    &__specification-img {
        width: 20px;
        height: fit-content;
    }

    &__specification {


        &--big {
            font-weight: 600;
            font-size: 18px;
            color: #445161;
        }

        &--number {
            font-family: 'KalamehFarsiNumber';
        }
    }
}
</style>