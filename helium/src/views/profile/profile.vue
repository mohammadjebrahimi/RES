<template>
    <main class="profile">
        <default-header class="profile__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <img class="header__search" src="@/assets/images/notification.png" alt="notification" />
            <img class="header__search" src="@/assets/images/Ellipse s2.png" alt="admin" />
        </default-header>
        <UserDetail @btnClick="showSpecification()" :="userDetail" />
        <HorizontalCardContainer class="profile__horizontal-card-container" label="مقالات" :cards='cards'
            buttonText="مشاهده بیشتر" />


        <DefaultModal outLineBtn="true" buttonText="بستن" :showClose="false" v-model:show="showModal">
            <VisitCard :="person" />
        </DefaultModal>

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

export default {
    data() {
        return {
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
            ],
            userDetail: {
                name: 'مجتبی محمدی پناه',
                Image: '/src/assets/images/23.png',
                socialId: 'Mojtabaa_2890',
                buttonText: 'اطلاعات کامل ارتباطی'
            },
            person: {
                name: 'مجتبی محمدی پناه',
                image: '/src/assets/images/23.png',
                specifications: [
                    {
                        image: '/src/assets/images/user-square.png',
                        value: 'Mojtabaa_2890',
                        big: true
                    },
                    {
                        image: '/src/assets/images/sms.png',
                        value: 'exampel@bmail.com',
                        big: false
                    },
                    {
                        image: '/src/assets/images/mobile.png',
                        value: '09151231234',
                        big: false,
                        number: true
                    }
                ]
            },
            showModal: false
        }

    },
    components: {
        DefaultModal,
        defaultHeader,
        defaultFooter,
        UserDetail,
        HorizontalCardContainer,
        VisitCard
    },
    methods: {
        showSpecification() {
            this.showModal = !this.showModal
        }
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