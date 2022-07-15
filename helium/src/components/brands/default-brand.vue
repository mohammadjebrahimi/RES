<template>
    <div class="brand">
        <div class="brand__logo">
            <div class="brand__logo-rec2"></div>
            <div class="brand__logo-rec1"></div>
        </div>
        <span class="brand__name">هلیوم+</span>
    </div>
</template>
<script>
export default {
    name: "default-brand",

}
</script>
<style lang="scss" scoped>
.brand {
    @include flex-direction();

    &__logo {
        position: relative;
        margin: 0px 0px 0 15px;
        height: 50px;
        width: 80px;
    }

    &__name {
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        text-align: right;
        color: $primaryColor;
    }


    &__logo-rec1 {
        position: absolute;
        border: 7px solid #6D6C80;
        height: 24px;
        width: 24px;
        right: 5px;
        top: 6px;
        transform: rotate(-45deg);
        border-radius: 4px;
    }

    &__logo-rec2 {
        position: absolute;
        border: 7px solid $primaryColor;
        height: 24px;
        width: 24px;
        right: 35px;
        top: 6px;
        transform: rotate(-45deg);
        border-radius: 4px;
    }
}
</style>