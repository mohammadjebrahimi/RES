<template>
    <section class="comment-form">
        <h3 class="comment-form__title">{{ label }}</h3>
        <div>
            <form class="comment-form__form" :action="action">
                <div class="comment-form__form-row">

                    <input type="text" id="form-fname" placeholder="نام*" class="input comment-form__fname-input">
                    <input type="text" id="form-lname" placeholder="نام خانوادگی*"
                        class="input comment-form__lname-input">
                    <input type="text" id="form-Email" placeholder="پست الکترونیک*"
                        class="input comment-form__email-input">
                </div>

                <textarea oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    id="form-suggest" placeholder="نظردادن*" class="input comment-form__suggest-input"></textarea>
                <input type="submit" value="ثبت نظر" class="comment-form__submit">
            </form>

        </div>
    </section>
</template>
<script>
export default {
    name: "default-comment-form",
    props: {
        action: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
    }
}
</script>
<style lang="scss">
.comment-form {
    @include flex-direction(column);
    margin: auto;
    max-width: 798px;
    width: 100%;

    &__title {
        font-weight: 600;
        font-size: 18px
    }

    &__form {
        @include flex-direction(column);
    }

    &__suggest-input {
        resize: vertical;
    }

    &__form-row {
        @include flex-direction();
        gap: 15px;
    }

    &__email-input {
        flex-grow: 2;
    }

    .input {
        height: 46px;
        border: 0;
        border-bottom: 2.5px solid navy;

        &::placeholder {

            font-weight: 400;
            font-size: 16px;
            line-height: 32px;
            /* identical to box height, or 200% */

            text-align: right;

            /* Text 3 */

            color: #8593A6;

        }
    }

    &__submit {
        background: $primaryColor;
        border-radius: 4px;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        text-align: right;
        border: 0;
        padding: 8px 24px;
        color: #FFFFFF;
        width: fit-content;
        align-self: end;
        margin: 20px 0 100px 0;
    }

    @include breakpoint_max(small) {
        &__form-row {
            @include flex-direction(column)
        }

    }
}
</style>