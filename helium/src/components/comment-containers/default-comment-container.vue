<template>
    <section class="comment-container">
        <h3 class="comment-container__title ">{{ label }}</h3>
        <hr class="comment-container__seperator">
        <div class="comment-container__card" v-for="(data, index) in comments" :key="`comment-${index}`">
            <div class="comment-container__card-detail">
                <p class="comment-container__card-author-name">{{ data.authorName }}</p>
                <p class="comment-container__card-date">{{ data.date }} </p>
            </div>
            <p class="comment-container__card-body">{{ data.comment }}</p>
        </div>

    </section>
</template>
<script>
export default {
    name: "default-comment-container",
    props: {
        'comments': Object,
        'label': String
    },
}
</script>
<style lang="scss">
.comment-container {
    @include flex-direction(column);
    max-width: 798px;
    width: 100%;

    &__title {
        font-weight: 700;
        font-size: 20px;
        border-bottom: 1.5px solid #208BEE;
        width: fit-content;
        justify-content: space-between;
        margin: 0;
    }

    &__seperator {
        border-top: 1px solid #208BEE;
        margin: 0;
    }

    &__card {
        border-bottom: 1px solid #208BEE;
    }

    &__card-detail {
        @include flex-direction();
        justify-content: space-between;
    }

    &__card-author-name {
        font-weight: 700;
        font-size: 16px;
    }

    &__card-date {
        font-weight: 600;
        font-size: 11px;
        line-height: 19px;
        color: #8593A6;
    }

}
</style>