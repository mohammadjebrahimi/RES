<template>
    <section class="carousel">
        <div class="carousel__images">

            <figure class="carousel__figure" v-for="(data, index) in carouselDatas" :key="`carousel__figure-{index}`">
                <img class="carousel__image" :src="data.carouselImage" alt="scroll" />
                <default-card class="carousel__card" v-bind="data.cardData" />
            </figure>


        </div>
        <div class="carousel__content">
            <button class="carousel__arrow-left"></button>
            <div class="carousel__main">


                <div class="carousel__navigation">
                    <span class="carousel__nav-dot"></span>
                    <span class="carousel__nav-dot"></span>
                    <span class="carousel__nav-dot"></span>
                    <span class="carousel__nav-dot carousel__nav-dot--activate"></span>
                    <span class="carousel__nav-dot"></span>
                    <span class="carousel__nav-dot"></span>
                    <span class="carousel__nav-dot"></span>
                </div>
            </div>
            <button class="carousel__arrow-right"></button>
        </div>
    </section>
</template>
<script>
import DefaultCard from '../cards/default-card.vue'
export default {
    name: "default-carousel",
    components: {
        DefaultCard
    },
    props: ['carouselDatas'],
    components: { DefaultCard },
}
</script>
<style lang="scss">
.carousel {
    @include flex-direction(column);
    overflow: hidden;
    position: relative;

    &__images {
        @include flex-direction();
        overflow: hidden;
        width: fit-content;
    }

    &__figure {
        margin: 0px;
        min-width: 100%;
        @include flex-direction();
        justify-content: center;
        position: relative;
    }

    &__image {
        width: 100%;
    }

    &__content {
        position: absolute;
        @include flex-direction();
        height: 100%;
        justify-content: space-between;
        width: 100%;
        align-items: center;

    }

    @include breakpoint_max(medium) {
        & .card {
            display: none;
        }
    }

    &__arrow-left {
        @include scroll-bar-arrow(180deg);
        margin: 25px;
    }

    &__main {
        @include flex-direction(column);
        height: 100%;
        align-items: center;
        justify-content: end;

    }

    &__navigation {
        @include flex-direction();
        padding: 32px 0;
        gap: 12px;
    }

    &__nav-dot {
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }

    &__nav-dot--activate {
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
    }

    &__arrow-right {
        @include scroll-bar-arrow();
        margin: 25px;
    }

    &__card {
        z-index: 1;
        position: absolute;
        bottom: 70px;
        margin: 0 75px;
        backdrop-filter: blur(50px);
        background: rgba(0, 0, 0, 0.2);
        box-shadow: 4px 10px 35px rgba(0, 0, 0, 0.3);

        & .card__author-name {
            color: #FFFF;
        }

        & .card__date {
            color: #CCCC;
        }

        & .card__title {
            color: #FFFF;
        }

        & .card__summery {
            color: #CCCCCC;
        }

        & .card__footer {
            color: white;
        }

        & .card__study-duration {
            color: #CCCCCC;
        }
    }
}
</style>