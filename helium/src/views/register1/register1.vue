<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm :schema="schema" :="formData" @submitForm="handelUserExistAPI($event)">
                <DefaultTextInput :="phoneInput" />
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
            toast: useToast(),
            schema: Yup.object().shape({
                'Phon-Number': Yup.number().typeError('فیلد از نوع عددی است').required('فیلد ضروری است'),
            }),
            formData: {
                title: 'ورود/ثبت نام',
                description: '',
                submitText: 'ادامه'
            },
            phoneInput: {
                name: 'Phon-Number',
                id: 'Phon-Number',
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

        async handelUserExistAPI(e) {
            this.showModal = true
            let resp = await fetch('http://87.107.30.143:3003/auth/user-exist', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'phone_number': e['Phon-Number'] }),
            })
            let respData = await resp.json()
            this.showModal=false
            if (resp.status == 400) {
                this.toast.error(respData.message)

                this.$router.push({ name: 'register2', query: { 'phone_number': e['Phon-Number'] } })
                this.toast.info('وارد صفحه ثبت نام می شوید')
            } else if (resp.status == 200) {
                if (respData.isUserExist) {
                    this.toast.success('شما قبلا ثبت نام کرده اید')
                    this.$router.push({ name: 'login', query: { 'phone_number': e['Phon-Number'] } })
                    this.toast.info('وارد صفحه لاگین می شوید')
                } else {
                    this.toast.error('لطفا ثبت نام کنید')
                    this.$router.push({ name: 'register2', query: { 'phone_number': e['Phon-Number'] } })
                    this.toast.info('وارد صفحه ثبت نام می شوید')
                }


            }

        }

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