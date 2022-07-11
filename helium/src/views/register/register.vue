<template>
    <main class="register">
        <default-header class="register__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <button @click="redirect()" class="header__button">ورود/ثبت نام</button>
        </default-header>
        <default-carousel :carouselDatas="carouselDatas" />
        <horizontal-card-container class="register__horizontal-card-container" :cards="cards" />
        <vertical-card-container class="register__vertical-card-container" :cards="cards" />

    </main>
    <default-footer />
</template>
<script>
import DefaultHeader from "@/components/headers/default-header.vue";
import DefaultCarousel from "@/components/carousels/default-carousel.vue";
import HorizontalCardContainer from "@/components/card-containers/horizontal-card-container.vue";
import VerticalCardContainer from "@/components/card-containers/vertical-card-container.vue";
import DefaultFooter from "@/components/footers/default-footer.vue";
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
                    "carouselImage": '/src/assets/images/unsplash_NnRv949hZ1Q.png',
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
    },
    methods: {
        redirect() {
            this.$router.push({ name: 'register1' })
        }
    }
}
</script>
<style lang="scss" scoped>
.register {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    padding: 0 1em;

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