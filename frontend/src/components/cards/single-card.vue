<template >
    <div class="single-card">
        <a class="single-card__close" v-if="showClose" @click="close()"></a>
        <slot></slot>
        <a class="single-card__ok" :class="{ 'single-card__ok--outline': outLineBtn }" v-if="showOk" @click="ok()">{{
                buttonText
        }}</a>
    </div>
</template>
<script>
export default {
    name: "default-modal",
    props: {
        showClose: {
            type: Boolean,
            default: true
        },
        showOk: {
            type: Boolean,
            default: true
        },
        buttonText: {
            type: String,
            default: 'تایید'
        }
        ,
        outLineBtn: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        ok() {
            this.$emit('ok', '')
        },
        close() {
            this.$emit('close', '')
        }
    }
}
</script>
<style lang="scss">
.single-card {


    @include flex-direction(column);
    max-width: 478px;
    width: 100%;
    background: #FAFBFC;
    box-shadow: 0px 8px 16px rgb(32 48 64 / 15%);
    border-radius: 12px;
    padding: 51px;

    @include breakpoint_max(small) {
        & {
            @include flex-direction(column);
            max-width: 470px;
            width: 90%;
            padding: 5%;
        }
    }

    &__close {
        width: 20px;
        height: 20px;
        background-image: url('/src/assets/images/cross.png');
        background-repeat: no-repeat;
        background-position: center center;
        align-self: end;
    }

    &__ok {
        @include rectangular-button();
        margin: 30px 0 0;
        align-self: end;
        text-decoration: none;

        &--outline {
            background: transparent;
            color: $primaryColor;
            border: 1px solid rgba(36, 52, 71, 0.15);
            width: fit-content;
        }
    }
}
</style>