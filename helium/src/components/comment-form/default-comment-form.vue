<template>
    <section class="comment-form">
        <h3 class="comment-form__title">{{ label }}</h3>
        <div>
            <DefaultForm @submitForm="submitForm($event)" class="comment-form__form" :schema="schema" :alignToEnd="true"
                submitText="ثبت نظر">
                <DefaultTextInput class="comment-form__input-box1" :="fnameInput" />
                <DefaultTextInput class="comment-form__input-box2" :="lnameInput" />
                <DefaultTextInput class="comment-form__input-box3" :="emailInput" />
                <DefaultTextAreaInput class="comment-form__textarea4" :="suggestInput" />
            </DefaultForm>
            <!-- <form class="comment-form__form" :action="action">
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
            </form> -->

        </div>
    </section>
</template>
<script>
import DefaultForm from '../forms/default-form.vue';
import DefaultTextInput from '../inputs/default-text-input.vue';
import DefaultTextAreaInput from '../inputs/default-text-area-input.vue';
import * as Yup from "yup";
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
        replyTo: {
            default: null
        },
        articleId: {
            type: Number,
        },
    },
    data() {
        return {

            schema: Yup.object().shape({
                'content': Yup.string().matches('^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC \n]+$', 'فارسی وارد کنید').required('فیلد ضروری است'),
                'email': Yup.string().email('ایمیل معتبر نیست').required('فیلد ضروری است'),
                'first_name': Yup.string().matches('^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]+$', 'فارسی وارد کنید').required('فیلد ضروری است'),
                'last_name': Yup.string().matches('^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]+$', 'فارسی وارد کنید').required('فیلد ضروری است'),
            }),
            fnameInput: {
                name: 'first_name',
                id: 'first_name',
                placeHolder: [
                    '*نام',
                ],
                type: 'text',
                required: true,
            },
            lnameInput: {
                name: 'last_name',
                id: 'last_name',
                placeHolder: [
                    '*نام خانوادگی',
                ],
                type: 'text',
                required: true,
            },
            emailInput: {
                name: 'email',
                id: 'email',
                placeHolder: [
                    '*پست الکترونیکی'
                ],
                ltr: true,
                type: 'Email',
                required: true,
            },

            suggestInput: {
                name: 'content',
                id: 'content',
                placeHolder: [
                    '*نطر دادن'
                ],
                ltr: false,
                required: true,
            },
        }
    },

    components: { DefaultForm, DefaultTextInput, DefaultTextAreaInput },
    methods: {
        submitForm(e) {
            e['reply_to']=JSON.parse(this.replyTo)
            e['article_id']=+this.articleId
            this.$emit('submitComment', e)
        }
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
        gap: 0px;

        .form__input-container {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: repeat(2, auto);
            grid-column-gap: 5px;
            grid-row-gap: 15px;

            @include breakpoint_max(medium) {
                grid-template-columns: 1fr;
                grid-template-rows: repeat(4, auto);
                grid-column-gap: 5px;
                grid-row-gap: 5px;
            }
        }

        .form__submit {
            margin: 20px 0 60px;
        }


    }



    &__input-box1 {
        grid-area: 1 / 1 / 2 / 3;

        @include breakpoint_max(medium) {
            grid-area: 1 / 1 / 2 / 2;
        }

        .input-box__input {
            padding: 0%;
        }

        .input-box__input-placeholder {
            padding: 0%;
        }

    }

    &__input-box2 {
        grid-area: 1 / 3 / 2 / 5;

        @include breakpoint_max(medium) {
            grid-area: 2 / 1 / 3 / 2;
        }

        .input-box__input {
            padding: 0%;
        }

        .input-box__input-placeholder {
            padding: 0%;
        }
    }

    &__input-box3 {
        grid-area: 1 / 5 / 2 / 8;

        @include breakpoint_max(medium) {
            grid-area: 3 / 1 / 4/ 2;
        }

        .input-box__input {
            padding: 0%;
        }

        .input-box__input-placeholder {
            padding: 0%;
        }
    }

    &__textarea4 {
        grid-area: 2 / 1 / 3 / 8;

        @include breakpoint_max(medium) {
            grid-area: 4 / 1 /5 / 2;
        }

        .textarea__input {
            padding: 0%;
        }

        .textarea__input-placeholder {
            padding: 0%;
        }
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