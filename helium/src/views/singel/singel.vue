<template>
    <main class="singel">
        <default-header class="singel__header">
            <img class="header__search" src="@/assets/images/search-normal.png" alt="search" />
            <img class="header__search" src="@/assets/images/notification.png" alt="notification" />
            <img class="header__search" src="@/assets/images/Ellipse s2.png" alt="admin" />
        </default-header>
        <default-article :="articleDetail">
            <!--متن مقاله-->
            <figure class="article__image">
                <img class="image" src="/src/assets/images/Rectangle 13.png" alt="image">
            </figure>


            <div class="article__text">
                <p> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و
                    متون بلکه
                    روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                    متنوع با
                    هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
                    می
                    طلبد تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                    ایجاد
                    کرد. در این صورت
                    می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
                    نیاز
                    شامل حروفچینی
                    دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. <br></p>


                <h3>کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف برای ارتش جمهوری <br>
                    اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.</h3>


                <p> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و
                    متون بلکه
                    روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                    متنوع با
                    هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
                    می
                    طلبد تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                    ایجاد
                    کرد. در این صورت
                    می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
                    نیاز
                    شامل حروفچینی
                    دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. <br></p>
            </div>
            <!--عکس مقاله-->
            <figure class="article__image">
                <img class="image" src="/src/assets/images/Rectangle dsds.png" alt="image">
            </figure>
            <!--متن مقاله-->
            <div class="Article-text">
                <p> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و
                    متون بلکه
                    روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                    متنوع با
                    هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
                    می
                    طلبد تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                    ایجاد
                    کرد.
                </p>
            </div>
        </default-article>
        <horizontal-card-container class="singel__horizontal-card-containe" label="از همین نویسنده" :cards="cards"></horizontal-card-container>
        <DefaultCommentContainer  class="singel__comments" label="نظرات" :comments="comments" />
        <DefaultCommentForm action="" label="نظر دادن" />
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
export default {
    name: "singel-page",
    components: {
        defaultArticle,
        defaultHeader,
        defaultFooter,
        HorizontalCardContainer,
        DefaultCommentContainer,
        DefaultCommentForm
    },
    data() {
        return {
            articleDetail: {
                'title': `کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف برای ارتش
            جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت.`,
                'studyDuration': '۷ دقیقه مطالعه',
                'tag': `تکنولوژی`,
            },
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
            ],
            comments: [{
                authorName: "سروش صفایی زاده",
                date: "۲۸ تیر ۱۴۰۰",
                comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده
                از
                طراحان گرافیک است. چاپگرها و متون بلکه
                روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                متنوع با
                هدف بهبود ابزارهای
                کاربردی می باشد.`
            }, {
                authorName: "سروش صفایی زاده",
                date: "۲۸ تیر ۱۴۰۰",
                comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده
                از
                طراحان گرافیک است. چاپگرها و متون بلکه
                روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                متنوع با
                هدف بهبود ابزارهای
                کاربردی می باشد.`
            }, {
                authorName: "سروش صفایی زاده",
                date: "۲۸ تیر ۱۴۰۰",
                comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده
                از
                طراحان گرافیک است. چاپگرها و متون بلکه
                روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                متنوع با
                هدف بهبود ابزارهای
                کاربردی می باشد.`
            },]

        }
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