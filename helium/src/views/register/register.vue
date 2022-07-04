<template>
    <main class="main">
        <default-header class="main__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <button class="header__button">ورود/ثبت نام</button>
        </default-header>
        <default-carousel :carouselDatas="carouselDatas" />
        <horizontal-card-container :cards="cards" />
        <vertical-card-container  :cards="cards"/>
        
    </main>
    <default-footer/>
</template>
<script>
import DefaultHeader from "@/components/headers/default-header.vue";
import DefaultCarousel from "@/components/carousels/default-carousel.vue";
import HorizontalCardContainer from "../../components/card-containers/horizontal-card-container.vue";
import VerticalCardContainer from "../../components/card-containers/vertical-card-container.vue";
import DefaultFooter from "../../components/footers/default-footer.vue";
export default {
    name: "register-page",
    components: {
    DefaultHeader,
    DefaultCarousel,
    HorizontalCardContainer,
    VerticalCardContainer,
    DefaultFooter
},
    data() {
        return {
            "carouselDatas": [
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
                {
                    "carouselImage": '/src/assets/images/unsplash_Im7lZjxeLhg.png',
                    "cardData": {
                        "authFigure": "/src/assets/images/Ellipse 1.png",
                        "authorName": "محمدسبحان سجایی فر",
                        "date": "۲۸ تیر ۱۴۰۰",
                        "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                        "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                        "studyDuration": "۷ دقیقه مطالعه",
                        "tag": "تکنولوژی",
                        "image": ""
                    }
                },
            ],

            cards: [
                {
                    "authFigure": "/src/assets/images/Ellipse 1.png",
                    "authorName": "محمدسبحان سجایی فر",
                    "date": "۲۸ تیر ۱۴۰۰",
                    "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                    "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                    "studyDuration": "۷ دقیقه مطالعه",
                    "tag": "تکنولوژی",
                    "image": "/src/assets/images/Rectangle%207.png"
                },
                                {
                    "authFigure": "/src/assets/images/Ellipse 1.png",
                    "authorName": "محمدسبحان سجایی فر",
                    "date": "۲۸ تیر ۱۴۰۰",
                    "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                    "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                    "studyDuration": "۷ دقیقه مطالعه",
                    "tag": "تکنولوژی",
                    "image": "/src/assets/images/Rectangle%207.png"
                },
                                {
                    "authFigure": "/src/assets/images/Ellipse 1.png",
                    "authorName": "محمدسبحان سجایی فر",
                    "date": "۲۸ تیر ۱۴۰۰",
                    "title": "کنترل کننده زیردریایی طراحی شده در دانشگاه صنعتی شریف در بین ۱۰ زیردریایی برتر جهان قرار گرفت.",
                    "summery": `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف
                        برای
                        ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                    "studyDuration": "۷ دقیقه مطالعه",
                    "tag": "تکنولوژی",
                    "image": "/src/assets/images/Rectangle%207.png"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;

    &__header {
        position: fixed;
        top: 0px;
        z-index: 10;
    }
}
</style>