<template>
    <footer class="footer">

        <div class="footer__right  footer__brand">
            <DefaultBrand class="footer__brand" />
            <div class="footer__desc">
                هلیوم بستری برای اشتراک گزاری ایده ها و فکر افراد پیشرو در زمینه علم و دانش است. در هلیوم میتوانید به
                جدیدترین مقالات علمی در کشور دسترسی داشته باشید و خود نیز در ترویج علم و دانش نقشی داشته باشید.
            </div>
        </div>
        <div class="footer__links">
            <a class="footer__link" herf="#">بنویسید</a>
            <a class="footer__link" herf="#">راهنما</a>
            <a class="footer__link" herf="#">معرفی به دوستان</a>
            <a class="footer__link" herf="#">قوانین</a>
        </div>
    </footer>
</template>
<script>
import DefaultBrand from "../brands/default-brand.vue";
export default {
    name: "default-footer",
    components: {
        DefaultBrand,
    }
}
</script>
<style lang="scss" >
.footer {

    @include flex-direction();
    min-height: 131px;
    background-color: #333333;
    background-image: url("../../assets/images/Pattern.png"), url("../../assets/images/Rectangle 81.png");
    align-items: center;
    justify-content: space-around;
    padding: 1em;

    &__right {
        @include flex-direction();
        gap: 30px;

    }

    &__brand {

        filter: brightness(0) invert(1);
    }

    &__desc {
        max-width: 670px;
        color: white;
    }

    &__links {
        @include flex-direction();
        padding: 1em;
        max-width: 400px;
        justify-content: space-between;
        gap: 10px;
    }

    &__link {
        color: white;
        font-size: 18px;
    }

    @include breakpoint_max(small) {
        @include flex-direction(column);
        justify-content: center;
        align-items: center;

        &__right {
            @include flex-direction(column);
            justify-content: center;
            align-items: center;
        }
    }

}
</style>