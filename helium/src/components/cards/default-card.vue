<template>
    <a :href="href" class="card">
        <div class="card__header">
            <figure class="card__auth-figure">
                <img :src="authFigure" :alt="authorName">
            </figure>
            <div class="card__header-right">
                <div class="card__author-name ">{{ authorName }}</div>
                <div class="card__date "> {{ date }}</div>
            </div>
        </div>
        <figure class="card__inner-image" v-if="image">
            <img :src="image" alt="inner-image">
        </figure>
        <div class="card__title ">{{ title }}</div>
        <div class="card__summery ">{{ summery }}</div>
        <div class="card__footer">
            <div class="card__study-duration">{{ studyDuration }} </div>
            .
            <span class="card__tag">{{ tag }}</span>
        </div>
    </a>
</template>
<script>
export default {
    name: "default-card",
    props: {
        'authFigure': String,
        'authorName': String,
        'date': String,
        'title': String,
        'summery': String,
        'studyDuration': String,
        'tag': String,
        'image': String,
        'href': {
            type: String,
            default: "#"
        }
    },

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

    &__header {
        @include flex-direction();
        align-items: center;
        width: 100%
    }

    &__auth-figure {
        margin: 0 0 0 12px;
    }

    &__header-right {
        @include flex-direction(column);
    }

    &__author-name {
        font-size: 14px;
        color: #28394F;
    }

    &__inner-image {
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
            height: auto;
        }
    }

    &:hover &__inner-image:before {
        transform: scaleY(1);
    }

    &__date {
        font-size: 11px;
        color: #8593A6;

    }


    &__title {
        width: 100%;
        font-weight: 600;
        font-size: 18px;
        color: #243447;
    }



    &__summery {
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        color: #445161;
    }


    &__footer {
        @include flex-direction();
        color: #8593A6;
        width: 100%;
        align-items: baseline;
        gap: 10px;
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