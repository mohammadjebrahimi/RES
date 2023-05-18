<template>
    <RouterLink :to="link"  target="_blank" class="card">
        <SimpelCard :title="authorName" :description="date" :image="authFigure"/>
        <figure class="card__inner-image" v-if="image">
            <img :src="image" alt="inner-image">
        </figure>
        <div class="card__title ">{{ title }}</div>
        <div class="card__summery ">{{ summery }}</div>
        <div class="card__footer">
            <div class="card__study-duration">{{ studyDuration }} </div>
            .
            <span v-for="(tag, index) in tags" :key="`tag-${index}`" class="card__tag">{{ tag?.name }}</span>
        </div>
    </RouterLink>
</template>
<script>
import { RouterLink } from 'vue-router'
import SimpelCard from './simpel-card.vue';
export default {
    name: "default-card",
    props: {
        'authFigure': String,
        'authorName': String,
        'date': String,
        'title': String,
        'summery': String,
        'studyDuration': String,
        'tags': Array,
        'image': String,
        'link': {
            default: "/#"
        }
    },
    components: { RouterLink, SimpelCard },

}
</script>
<style lang="scss">
.card {
    padding: 2em;
    @include flex-direction(column);
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    backdrop-filter: none;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: none;




    &__inner-image {
        height: 250px;
        width: 100%;
        margin: 0;
        @include flex-direction();
        justify-content: center;
        position: relative;

        &:before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background-color: #208bee40;
            transform-origin: 0 bottom 0;
            transform: scaleY(0);
            transition: .4s ease-out;
        }

        &>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:hover &__inner-image:before {
        transform: scaleY(1);
    }



    &__title {
        width: 100%;
        font-weight: 600;
        font-size: 18px;
        color: #243447;
        overflow-wrap: break-word;
    }



    &__summery {
        overflow-wrap: break-word;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        color: #445161;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-box-orient: vertical;
        box-orient: vertical;
        -webkit-line-clamp: 5;
        -moz-line-clamp: 5;
        -ms-line-clamp: 5;
        line-clamp: 5;
        overflow: hidden;
    }


    &__footer {
        @include flex-direction();
        color: #8593A6;
        width: 100%;
        align-items: baseline;
        gap: 10px;
        flex-wrap: wrap;
    }


    &__study-duration {
        color: #8593A6;
        font-weight: 600;
        font-size: 11px;
    }

    &__tag {
        @include tag()
    }


}
</style>