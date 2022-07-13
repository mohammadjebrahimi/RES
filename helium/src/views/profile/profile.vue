<template>
    <main class="profile">
        <default-header class="profile__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <img class="header__search" src="@/assets/images/notification.png" alt="notification" />
            <img class="header__search" src="@/assets/images/Ellipse s2.png" alt="admin" />
        </default-header>
        <UserDetail @btnClick="showSpecification()" :="userDetail" />
        <HorizontalCardContainer @btnClick="showMore()" class="profile__horizontal-card-container" label="مقالات"
            :cards='cards' buttonText="مشاهده بیشتر" />


        <DefaultModal :outLineBtn="true" buttonText="بستن" :showClose="false" v-model:show="showModal">
            <VisitCard :="person" />
        </DefaultModal>
        <EmptyModal v-model:show="showLoader">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script>
import UserDetail from './components/user-detail.vue';
import HorizontalCardContainer from '@/components/card-containers/horizontal-card-container.vue';
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import DefaultModal from '@/components/modals/default-modal.vue'
import VisitCard from './components/visit-card.vue';
import EmptyModal from '../../components/modals/empty-modal.vue';
import Circle from '../../components/loading/circle.vue';
import { useToast } from "vue-toastification";
import getPersianDate from "@/mixins/date.js"
export default {
    data() {
        return {
            authorId: 0,
            articlePage: 0,
            toast: useToast(),
            showLoader: false,
            cards: [],
            userDetail: {},
            person: {},
            showModal: false
        }

    },
    components: {
        DefaultModal,
        defaultHeader,
        defaultFooter,
        UserDetail,
        HorizontalCardContainer,
        VisitCard,
        EmptyModal,
        Circle
    },
    methods: {
        showSpecification() {
            this.showModal = !this.showModal
        },
        async handelUserAPI(token) {
            this.showLoader = true
            let resp = await fetch('http://87.107.30.143:3003/user', {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
            let user = await resp.json()
            if (resp.status < 300) {
                return user
            } else {
                this.toast.error(user.message)
            }

        },
        async handelArticlesAPI(token, id, page) {
            this.showLoader = true
            let resp = await fetch(`http://87.107.30.143:3003/articles?author_id=${id}&page=${page}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
            let articles = await resp.json()
            if (resp.status < 300) {
                this.showLoader = false
                if (articles.data.length > 0) {
                    this.toast.success('مقالات لود شدند')

                } else {
                    this.toast.error('موردی برای نمایش نیست')
                }
                return articles
            } else {
                this.toast.error(articles.message)
            }

        },
        async showMore() {
            this.articlePage++
            let articles = await this.handelArticlesAPI(localStorage.getItem("accessToken"), this.authorId, this.articlePage)

            let cards = articles.data.map((current) => {
                return {
                    "authFigure": "/src/assets/images/Ellipse 1.png",
                    "authorName": this?.userDetail?.name,
                    "date": getPersianDate(current.created_at),
                    "title": current.title,
                    "summery": current.content,
                    "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                    "tags": current.tags,
                    "image": "/src/assets/images/Rectangle%207.png",
                    "href": `/singel/${current.id}`
                }
            })
            this.cards.push(...cards)
        }
    },
    async created() {
        let { created_at, email, first_name, id, image_url, last_name, phone_number, username, } = await this.handelUserAPI(localStorage.getItem("accessToken"))

        this.userDetail = {
            name: `${first_name} ${last_name}`,
            Image: '/src/assets/images/23.png',
            socialId: username,
            buttonText: 'اطلاعات کامل ارتباطی'
        }
        this.person = {
            name: `${first_name} ${last_name}`,
            image: '/src/assets/images/23.png',
            specifications: [
                {
                    image: '/src/assets/images/user-square.png',
                    value: username,
                    big: true
                },
                {
                    image: '/src/assets/images/sms.png',
                    value: email,
                    big: false
                },
                {
                    image: '/src/assets/images/mobile.png',
                    value: phone_number,
                    big: false,
                    number: true
                }
            ]
        }
        this.articlePage = 1
        this.authorId = id
        let articles = await this.handelArticlesAPI(localStorage.getItem("accessToken"), id, this.articlePage)

        this.cards = articles.data.map((current) => {
            return {
                "authFigure": "/src/assets/images/Ellipse 1.png",
                "authorName": `${first_name} ${last_name}`,
                "date": getPersianDate(current.created_at),
                "title": current.title,
                "summery": current.content,
                "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                "tags": current.tags,
                "image": "/src/assets/images/Rectangle%207.png",
                "link": { name: 'singel', params: { id: current.id }}
            }
        })


    }
}
</script>
<style lang="scss">
.profile {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    padding: 1em;
    margin-top: 63px;
    flex-grow: 1;


    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }

    & &__horizontal-card-container {
        margin: 30px 0 140px;

        .horizontal-card-container__seperator {
            border: 1px solid #24344740;
        }

        .horizontal-card-container__title {
            border: 1.5px solid #24344740;
        }
    }
}
</style>