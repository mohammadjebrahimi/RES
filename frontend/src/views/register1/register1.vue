<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <singleCard :showClose="false" :showOk="false">
            <DefaultForm :schema="schema" :="formData" @submitForm="handelUserExistAPI($event)">
                <DefaultTextInput :="emailInput" />
            </DefaultForm>
        </singleCard>

        <EmptyModal v-model:show="showModal">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import singleCard from '@/components/cards/single-card.vue'
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
                'Email': Yup.string().email('ایمیل معتبر نیست').required('فیلد ضروری است'),
            }),
            formData: {
                title: 'ورود/ثبت نام',
                description: '',
                submitText: 'ادامه'
            },
            emailInput: {
                name: 'Email',
                id: 'Email',
                label: 'پست الکترونیکی',
                placeHolder: [
                    'مثال:',
                    'example@helium.com'
                ],
                ltr: true,
                type: 'Email',
                required: true,
            },
        }

    },
    components: {
        defaultHeader,
        defaultFooter,
        singleCard,
        DefaultForm,
        DefaultTextInput,
        EmptyModal,
        Circle
    },
    methods: {

        async handelUserExistAPI(e) {
            this.showModal = true
            let resp = await fetch('http://localhost:4000', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query($email: String!){
                        users(email: $email){
    __typename
  }
}`,
                    variables: {
                        email: e['Email']
                    }
                }),
            })
            let respData = await resp.json()
            this.showModal = false
            if (resp.status == 200) {
                if (respData.errors) {
                    this.toast.error(respData.errors[0].message)
                }
                else if (respData.data.users.length) {
                    this.toast.success('شما قبلا ثبت نام کرده اید')
                    this.$router.push({ name: 'login', query: { 'email': e['Email'] } })
                    this.toast.info('وارد صفحه لاگین می شوید')
                } else {
                    this.toast.error('لطفا ثبت نام کنید')
                    this.$router.push({ name: 'register2', query: { 'email': e['Email'] } })
                    this.toast.info('وارد صفحه ثبت نام می شوید')
                }
            } else {

                this.$router.push({ name: 'register2', query: { 'email': e['Email'] } })
                this.toast.info('وارد صفحه ثبت نام می شوید')
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