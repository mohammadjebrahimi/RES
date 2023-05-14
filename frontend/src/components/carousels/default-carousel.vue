<template>
    <section class="carousel">
        <div class="carousel__images">


            <template v-for="(data, index) in carouselDatas" :key="`carousel__figure-{index}`">
                <transition name="slide-fade">
                    <figure v-if="index + 1 == active" :id="`carousel__figure-{index}`" class="carousel__figure">
                        <img class="carousel__image" :src="data.carouselImage" alt="scroll" />
                        <default-card class="carousel__card" v-bind="data.cardData" />
                    </figure>
                </transition>
            </template>




        </div>
        <div class="carousel__content">
            <button ref="left" @click="move(-1)" class="carousel__arrow-left"></button>
            <div class="carousel__main">


                <div class="carousel__navigation">
                    <span v-for="(dot, index) in carouselDatas"
                        :class="{ 'carousel__nav-dot--activate': ++index === active }" @click="jump(index)"
                        class="carousel__nav-dot"></span>
                </div>
            </div>
            <button ref="right" @click="move(1)" class="carousel__arrow-right"></button>
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
    data() {
        return {
            active: 1,
        }
    },
    methods: {
        move(amount) {
            let newActive
            const newIndex = this.active + amount
            if (newIndex > this.carouselDatas.length) newActive = 1
            if (newIndex === 0) newActive = this.carouselDatas.length
            this.active = newActive || newIndex
        },
        jump(index) {
            this.active = index
        },
    }

}
</script>
<style lang="scss">
.carousel {
    @include flex-direction(column);
    overflow: hidden;
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;

    &__images {
        @include flex-direction();
        overflow: hidden;
        width: 100%;
        height: 744px;

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
        height: 100%;
        object-fit: cover;
        filter: brightness(0.5);
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
        cursor: pointer;

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
        cursor: pointer;

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
        cursor: pointer;

    }

    &__card {
        @include z-index-group(1);
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

.slide-fade-enter-active {
    animation: slide-in 0.75s;
}

.slide-fade-leave-active {
    animation: slide-in 0.75s reverse;
}

@keyframes slide-in {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>