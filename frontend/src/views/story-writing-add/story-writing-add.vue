<template>
    <main class="story-writing-add-page">
       
        <default-header class="story-writing-add-page__header" />
        <CreateNewArticle class="story-writing-add-page__create-new-article"></CreateNewArticle>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import CreateNewArticle from './components/create-new-article.vue'
export default {
    name: "single-page",
    components: {
        defaultHeader,
        defaultFooter,
        CreateNewArticle,
 
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.story-writing-add-page {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    margin-top: 97px;
    padding: 0 1em;

    &__create-new-article {
        & .create-new-article__article-image-editor {
            background-image: none;
            background-color: #738c9830;
        }
    }

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>