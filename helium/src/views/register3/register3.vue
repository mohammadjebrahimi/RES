<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm :schema="schema" :="formData">
                <DefaultTextInput :="userName" />
                <DefaultTextInput :="passwordInput" />
                <DefaultTextInput :="repeatedPassInput" />
                <DefaultFileInput :="fileInput" />
            </DefaultForm>
        </SingelCard>
    </main>
    <default-footer />
</template>
<script>
import * as Yup from "yup";
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import SingelCard from '@/components/cards/singel-card.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import DefaultTextInput from '@/components/inputs/default-text-input.vue'
import DefaultFileInput from '@/components/inputs/default-file-input.vue'
export default {
    name: "register3-page",
    data() {
        return {
            schema: Yup.object().shape({
                userName: Yup.string().required('فیلد ضروری است'),
                email: Yup.string().email().required('فیلد ضروری است'),
                password: Yup.string().min(6, 'حداقل 6 کاراکتر').required('فیلد ضروری است'),
                repeatedPass: Yup.string()
                    .required('فیلد ضروری است')
                    .oneOf([Yup.ref("password")], "تکرار رمز عبور مطابقت ندارد"),
            }),
            formData: {
                title: 'شما هنوز در هلیوم ثبت نام نکرده اید.',
                description: 'لطفا اطلاعات زیر را برای ثبت نام کامل کنید.',
                submitText: 'ادامه'
            },
            userName: {
                name: 'userName',
                id: 'userName',
                label: 'نام کاربری',
                placeHolder: [
                    'نام کاربری دلخواه خود را به انگلیسی وارد کنید.'
                ],
                ltr: true,
                type: 'text',
                required: true,
            },
            passwordInput: {
                name: 'password',
                id: 'password',
                label: 'رمز عبور',
                placeHolder: [
                    'رمز عبور دلخواه را به انگلیسی وارد کنید',
                ],
                type: 'password',
                required: true,
                ltr: true,

            },
            repeatedPassInput: {
                name: 'repeatedPass',
                id: 'repeatedPass',
                label: 'تکرار رمز عبور',
                placeHolder: [
                    'رمز عبور خود را مجدد وارد کنید',
                ],
                ltr: true,
                type: 'password',
                required: true,
            },
            fileInput: {
                name: 'file',
                id: 'userImage',
                label: 'بارگزاری تصویر',
                accept: "image/png, image/gif, image/jpeg",
                image: '/src/assets/images/Default Avatar.png',
            },
        }

    },
    components: {
        defaultHeader,
        defaultFooter,
        SingelCard,
        DefaultForm,
        DefaultTextInput,
        DefaultFileInput
    },
}
</script>
<style lang="scss" scoped>
.main {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    padding: 1em;
    margin-top: 63px;
    flex-grow: 1;
    padding: 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>