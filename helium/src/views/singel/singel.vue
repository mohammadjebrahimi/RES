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
        <horizontal-card-container class="singel__horizontal-card-containe" label="از همین نویسنده" :cards="cards">
        </horizontal-card-container>
        <DefaultCommentContainer class="singel__comments" label="نظرات" :comments="comments" />
        <DefaultCommentForm action="" label="نظر دادن" />
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
    },
    async created() {
        let article = await this.handelArticleAPI(localStorage.getItem("accessToken"), this.$route.params.id)
        let articleData = article.data
        console.log(articleData);
        this.articleDetail = {
            'title': articleData.title,
            'studyDuration': `${articleData.read_time_minutes} دقیقه مطالعه`,
            'tags': articleData.tags,
        }
        this.cards = articleData.fromThisUser.map((current) => {
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
        this.comments = articleData.comments.map((current) => {
            return {
                authorName: `${current.first_name} ${current.last_name}`,
                date: getPersianDate(current.created_at),
                comment: current.content
            }
        })
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