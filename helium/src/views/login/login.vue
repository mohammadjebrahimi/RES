<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm :schema="schema" :="formData" @submitForm="handelLoginAPI($event)">
                <DefaultTextInput v-model:value="phoneNumber" :="phoneInput" />
                <DefaultTextInput :="passwordInput" />
            </DefaultForm>
        </SingelCard>
        <EmptyModal v-model:show="showModal">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import SingelCard from '@/components/cards/singel-card.vue'
import DefaultForm from '../../components/forms/default-form.vue'
import DefaultTextInput from '../../components/inputs/default-text-input.vue'
import { useToast } from "vue-toastification";
import * as Yup from "yup";
import EmptyModal from '../../components/modals/empty-modal.vue'
import Circle from '../../components/loading/circle.vue'

export default {
    name: "register1-page",
    data() {
        return {
            showModal: false,
            phoneNumber: this.$route.query['phone_number'],
            toast: useToast(),
            schema: Yup.object().shape({
                'phone_number': Yup.number().typeError('فیلد از نوع عددی است').required('فیلد ضروری است'),
                password: Yup.string().min(6, 'حداقل 6 کاراکتر').required('فیلد ضروری است'),
            }),
            formData: {
                title: 'ورود/ثبت نام',
                description: '',
                submitText: 'ادامه'
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
            phoneInput: {
                name: 'phone_number',
                id: 'phone_number',
                label: 'لطفا شماره تلفن همراه خود را وارد کنید',
                placeHolder: [
                    'مثال:',
                    '۰۹۱۵۱۲۳۴۵۶۷'
                ],
                ltr: true,
                type: 'tel',
                required: false
            }
        }

    },
    components: {
        defaultHeader,
        defaultFooter,
        SingelCard,
        DefaultForm,
        DefaultTextInput,
        EmptyModal,
        Circle
    },
    methods: {

        async handelLoginAPI(e) {
            this.showModal = true
            let resp = await fetch('http://87.107.30.143:3003/auth/login', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            })
            let respData = await resp.json()
            this.showModal = false
            if (resp.status >= 400) {
                this.toast.error(respData.message)

            } else if (resp.status <= 300) {
                this.toast.success('لاگین شدید.')
                localStorage.setItem("accessToken", respData.accessToken);
                this.$router.push({ name: 'profile' })

            }

        },
  

    }
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

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>