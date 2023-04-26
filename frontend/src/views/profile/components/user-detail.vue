<template>
    <section class="user-detail">
        <figure class="user-detail__avatar">
            <img :src="Image" alt="" class="user-detail__avatar-img">
            <span></span>
            <div class="user-detail__specification">
                <span class="user-detail__specification-name">{{ name }}</span>
                <figure class="user-detail__specification-social">
                    <img class="user-detail__specification-social-img" src="@/assets/images/user-square.png" alt="">
                    <figcaption class="user-detail__specification-social-id">{{ socialId }}</figcaption>
                </figure>
            </div>
        </figure>
        <button @click="btnClick()" class="user-detail__button">{{ buttonText }}</button>
    </section>
</template>
<script>


export default {
    props: {
        name: String,
        Image: String,
        socialId: String,
        buttonText: String
    },
    methods: {
        btnClick() {
            this.$emit('btnClick')
        }
    }
}
</script>
<style lang="scss">
.user-detail {
    @include flex-direction();
    align-items: center;
    justify-content: space-between;
    background-image: url("@/assets/images/Pattern2.png"), url("@/assets/images/Rectangle 22.png");
    background-repeat: no-repeat;
    height: 148px;
    width: 100%;
    max-width: 1200px;
    border-radius: 10px;

    &__avatar {
        @include flex-direction();
        align-items: center;
        justify-content: space-evenly;
        margin: 0;
        gap: 24px;
        margin: 0 24px;
    }

    &__avatar-img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    &__specification {
        @include flex-direction(column);
        justify-content: space-evenly;
    }

    &__specification-name {
        font-weight: 700;
        font-size: 32px;
        color: #FAFBFC;
    }

    &__specification-social {
        @include flex-direction();
        margin: 0;
        align-items: center;
        gap: 8px;
    }

    &__specification-social-img {
        width: 20px;
        height: 20px;
    }

    &__specification-social-id {
        font-size: 18px;
        color: #FAFBFC;
    }

    &__button {
        margin: 0 24px;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        padding: 8px 24px;
        background-color: transparent;
        cursor: pointer;
    }

    @include breakpoint_max(xsmall) {
        &__button {
            display: none;
        }
    }
}
</style>