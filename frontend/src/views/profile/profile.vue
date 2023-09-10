<template>
    <main class="profile">
        <default-header class="profile__header"/>
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
        Circle,
    },
    methods: {
        showSpecification() {
            this.showModal = !this.showModal
        },
        async handelUserAPI(token) {
            this.showLoader = true
            let resp = await fetch('http://localhost:4000', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `query{
  getUserByToken{
    email, first_name,id , image_url, last_name, phone_number, username
  }
}`
                }),
            })
            let respData = await resp.json()
            if (resp.status < 300) {
                if (resp.status <= 300) {
                    if (respData.errors) {
                        this.toast.error(respData.error[0].message)

                    }
                }
                return respData.data.getUserByToken
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }

        },
        async handelArticlesAPI(token, id, page) {
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `query($authorId:Int,$page:Int){
  articles(page:$page,authorId:$authorId){
    created_at,id,image_url,tags {
        name
        id
    },read_time_minutes,summery,content,title 
  }
}`,
                    variables: {
                        page, authorId: id
                    }
                }),
            })
            let respData = await resp.json()
            if (resp.status < 300) {
                this.showLoader = false
                if(respData.errors){
                    this.toast.error(respData.errors[0].message)
                }
               else if (respData.data.articles.length > 0) {
                    // this.toast.success('مقالات لود شدند')

                } else {
                    this.toast.error('موردی برای نمایش نیست')
                }
                return respData.data.articles
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }

        },
        async showMore() {
            this.articlePage++
            let articles = await this.handelArticlesAPI(localStorage.getItem("accessToken"), this.authorId, this.articlePage)

            let cards = articles.map((current) => {
                return {
                    "authFigure": this.userDetail.Image,
                    "authorName": this?.userDetail?.name,
                    "date": getPersianDate(current.created_at),
                    "title": current.title,
                    "summery": current.summery,
                    "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                    "tags": current.tags,
                    "image": current.image_url.replace('192.168.53.150', '87.107.30.143'),
                    "href": `/single/${current.id}`
                }
            })
            this.cards.push(...cards)
        }
    },
    async created() {
        let { created_at, email, first_name, id, image_url, last_name, phone_number, username } = await this.handelUserAPI(localStorage.getItem("accessToken"))

        this.userDetail = {
            name: `${first_name} ${last_name}`,
            Image: image_url.replace('192.168.53.150', '87.107.30.143'),
            socialId: username,
            buttonText: 'اطلاعات کامل ارتباطی'
        }
        this.person = {
            name: `${first_name} ${last_name}`,
            image: image_url.replace('192.168.53.150', '87.107.30.143'),
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

        this.cards = articles.map((current) => {
            return {
                "authFigure": image_url.replace('192.168.53.150', '87.107.30.143'),
                "authorName": `${first_name} ${last_name}`,
                "date": getPersianDate(current.created_at),
                "title": current.title,
                "summery": current.summery,
                "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                "tags": current.tags,
                "image": current.image_url.replace('192.168.53.150', '87.107.30.143'),
                "link": { name: 'single', params: { id: current.id } }
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

    @include breakpoint_max(medium) {
        padding: 1em;
    }

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