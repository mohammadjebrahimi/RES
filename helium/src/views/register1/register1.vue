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

export default {
    name: "register1-page",
    data() {
        return {
            toast: useToast(),
            schema: Yup.object().shape({
                'Phon-Number': Yup.number('فیلد از نوع عددی است').required('فیلد ضروری است'),
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
        DefaultTextInput
    },
    methods: {

        async handelUserExistAPI(e) {

            let resp = await fetch('http://87.107.30.143:3003/auth/user-exist', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            })
            let respData = await resp.json()
            if (resp.status == 400) {
                this.toast.error(respData.message)
              
                this.$router.push({ name: 'register2', query: { 'phone_number': e['Phon-Number'] } })
                    this.toast.info('وارد صفحه ثبت نام می شوید')
            } else if (resp.status == 200) {
                this.toast.success(respData.message)
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