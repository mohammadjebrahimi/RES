<template>
    <main class="register">
        <default-header class="register__header" />

        <default-carousel :carouselSlides="carouselSlides" />
        <horizontal-card-container class="register__horizontal-card-container" :cards="cards" />
        <vertical-card-container class="register__vertical-card-container" :cards="cards" />

    </main>
    <default-footer />
</template>
<script setup lang="ts">
import DefaultHeader from "@/components/headers/default-header.vue";
import DefaultCarousel from "@/components/carousels/default-carousel.vue";
import HorizontalCardContainer from "@/components/card-containers/horizontal-card-container.vue";
import VerticalCardContainer from "@/components/card-containers/vertical-card-container.vue";
import DefaultFooter from "@/components/footers/default-footer.vue";
import { useToast } from "vue-toastification";
import getPersianDate from "@/mixins/date.js"
import { onBeforeMount, ref } from 'vue';



const toast = useToast()
const carouselSlides = ref([])
//    [] {
//         "carouselImage": '/src/assets/images/unsplash_NnRv949hZ1Q.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
//     {
//         "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
//         "cardData": {
//             "authFigure": "/src/assets/images/Ellipse 1.png",
//             "authorName": "محمدسبحان سجایی فر",
//             "date": "۲۸ تیر ۱۴۰۰",
//             "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
//             "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
//             برای
//             ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
//             "studyDuration": "۷ دقیقه مطالعه",
//             "tags": [{
//                 "id": 1,
//                 "name": "علمی"
//             }],
//             "image": ""
//         }
//     },
// ],

const cards = ref([])

const handelArticlesAPI = async (token:string, page:number) => {
    let resp = await fetch(`http://localhost:4000`, {
        method: 'POSt', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            query: `query($page:Int){
  articles(page:$page){
    created_at,id,image_url,author{
        username
        image_url
    },tags {
        name
        id
    },read_time_minutes,summery,content,title 
  }
}`,
            variables: {
                page
            }
        }),
    })
    let respData = await resp.json()
    if (resp.status < 300) {

        if (respData.errors) {
            toast.error(respData.errors[0].message)
        }
        else if (respData.data.articles.length > 0) {
            // toast.success('مقالات لود شدند')

        } else {
            toast.error('موردی برای نمایش نیست')
        }
        return respData.data.articles
    } else {
        toast.error('خطای پیش بینی نشده')
    }

}
onBeforeMount(async () => {
    let articles = await handelArticlesAPI(localStorage.getItem("accessToken")!, 1)

    cards.value = articles.map((current:any) => {
        return {
            "authFigure": current.author.image_url.replace('192.168.53.150', '87.107.30.143'),
            "authorName": `${current.author.username}`,
            "date": getPersianDate(current.created_at),
            "title": current.title,
            "summery": current.summery,
            "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
            "tags": current.tags,
            "image": current.image_url.replace('192.168.53.150', '87.107.30.143'),
            "link": { name: 'single', params: { id: current.id } }
        }
    })

    carouselSlides.value = articles.map((current:any) => {
        return {
            "carouselImage": current.image_url.replace('192.168.53.150', '87.107.30.143'),
            "cardData": {
                "authFigure": current.author.image_url.replace('192.168.53.150', '87.107.30.143'),
                "authorName": `${current.author.username}`,
                "date": getPersianDate(current.created_at),
                "title": current.title,
                "summery": current.summery,
                "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                "tags": current.tags,
                "link": { name: 'single', params: { id: current.id } }
            }
        }
    })
})

</script>
<style lang="scss" scoped>
.register {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;

    @include breakpoint_max(medium) {
        padding: 0 1em;
    }

    flex-grow: 1;

    @include breakpoint_max(small) {

        margin-top: 63px;

    }

    &__horizontal-card-container {
        margin: 4rem auto 0;
    }

    &__vertical-card-container {
        margin: 4rem auto 0;
    }

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }

}
</style>