<template>
    <main class="singel">
        <default-header class="singel__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <img class="header__search" src="@/assets/images/notification.png" alt="notification" />
            <img class="header__search" src="@/assets/images/Ellipse s2.png" alt="admin" />
        </default-header>
        <default-article :="articleDetail" />
        <horizontal-card-container class="singel__horizontal-card-containe" label="از همین نویسنده" :cards="cards">
        </horizontal-card-container>
        <DefaultCommentContainer class="singel__comments" label="نظرات" :comments="comments" />
        <DefaultCommentForm @submitComment="submitComment($event)" label="نظر دادن" :articleId=$route.params.id />
        <EmptyModal v-model:show="showLoader">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultArticle from '@/components/articles/default-article.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import HorizontalCardContainer from '@/components/card-containers/horizontal-card-container.vue'
import DefaultCommentContainer from '@/components/comment-containers/default-comment-container.vue'
import DefaultCommentForm from '@/components/comment-form/default-comment-form.vue'
import EmptyModal from '../../components/modals/empty-modal.vue'
import Circle from '../../components/loading/circle.vue'
import { useToast } from "vue-toastification";
import getPersianDate from "@/mixins/date.js"
export default {
    name: "singel-page",
    components: {
        defaultArticle,
        defaultHeader,
        defaultFooter,
        HorizontalCardContainer,
        DefaultCommentContainer,
        DefaultCommentForm,
        EmptyModal,
        Circle
    },
    data() {
        return {
            toast: useToast(),
            showLoader: false,
            articleDetail: {},
            cards: [],
            comments: []

        }
    },
    methods: {
        async handelArticleAPI(token, id) {
            this.showLoader = true
            let resp = await fetch(`http://87.107.30.143:3003/articles?id=${id}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
            let article = await resp.json()
            if (resp.status < 300) {

                if (article.data) {
                    this.toast.success('مقاله لود شد')
                    this.showLoader = false
                } else {
                    this.toast.error('موردی برای نمایش نیست')
                }
                return article
            } else {
                this.toast.error(article.message)
            }

        },
        async handelAddCommentsAPI(token, body) {
            this.showLoader = true
            let resp = await fetch(`http://87.107.30.143:3003/comments`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body)
            })
            let comments = await resp.json()
            this.showLoader = false
            if (resp.status < 300) {
                this.toast.success('نظر شما ارسال شد')
                return comments
            } else {
                if (Array.isArray(comments.message)) {
                    comments.message.forEach(message => this.toast.error(message))
                } else {
                    this.toast.error(comments.message)
                }
                return false
            }


        },
        async submitComment(e) {

            let comment = await this.handelAddCommentsAPI(localStorage.getItem("accessToken"), e)
            if (comment) {
                await this.pageLoader()
            }
        },
        async pageLoader() {
            let article = await this.handelArticleAPI(localStorage.getItem("accessToken"), this.$route.params.id)
            let articleData = article.data
            console.log(articleData);
            this.articleDetail = {
                'title': articleData.title,
                'studyDuration': `${articleData.read_time_minutes} دقیقه مطالعه`,
                'tags': articleData.tags,
                'image_url': articleData.image_url.replace('192.168.53.150', '87.107.30.143'),
                'content': articleData.content,
                date: getPersianDate(articleData.created_at),
                authFigure: articleData.auther_profile_image.replace('192.168.53.150', '87.107.30.143'),
                authorName: `${articleData.author_first_name} ${articleData.author_last_name}`,
            }
            this.cards = articleData.fromThisUser.map((current) => {
                return {
                    "authFigure": articleData.auther_profile_image.replace('192.168.53.150', '87.107.30.143'),
                    "authorName": `${articleData.author_first_name} ${articleData.author_last_name}`,
                    "date": getPersianDate(current.created_at),
                    "title": current.title,
                    "summery": current.content,
                    "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                    "tags": current.tags,
                    "image": current.image_url.replace('192.168.53.150', '87.107.30.143'),
                    "link": { name: 'singel', params: { id: current.id } }
                }
            })
            this.comments = articleData.comments.map((current) => {
                return {
                    authorName: `${current.first_name} ${current.last_name}`,
                    date: getPersianDate(current.created_at),
                    comment: current.content
                }
            })
        }

    },
    async created() {
        await this.pageLoader()
    }
}
</script>
<style lang="scss" scoped>
.singel {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    margin-top: 97px;
    padding: 0 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }

    &__horizontal-card-container {
        margin: 4rem auto 0;
    }

    &__comments {
        margin: 8rem auto 0;
    }
}
</style>