<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <singleCard :showClose="false" :showOk="false">
            <DefaultForm :schema="schema" :="formData" @submitForm="handelLoginAPI($event)">
                <DefaultTextInput v-model:value="defaultEmail" :="emailInput" />
                <DefaultTextInput :="passwordInput" />
            </DefaultForm>
        </singleCard>
        <EmptyModal v-model:show="showModal">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script setup lang="ts">
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import singleCard from '@/components/cards/single-card.vue'
import DefaultForm from '../../components/forms/default-form.vue'
import DefaultTextInput from '../../components/inputs/default-text-input.vue'
import { useToast } from "vue-toastification";
import * as Yup from "yup";
import EmptyModal from '../../components/modals/empty-modal.vue'
import Circle from '../../components/loading/circle.vue'
import { reactive, ref, type FormHTMLAttributes } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { defaultFormComponentPropsShape, textInput } from '@/types/types'
import type { FormActions } from 'vee-validate'

const router = useRouter()
const route = useRoute()
const showModal = ref<boolean>(false)
const defaultEmail = route.params['email'] as string
const toast = useToast()
type formInputType={ Email: string, password: string }
const schema: Yup.SchemaOf<formInputType> = Yup.object().shape({
    'Email': Yup.string().email('ایمیل معتبر نیست').required('فیلد ضروری است'),
    'password': Yup.string().min(6, 'حداقل 6 کاراکتر').required('فیلد ضروری است'),
})
const formData:defaultFormComponentPropsShape = reactive({
    title: 'ورود/ثبت نام',
    description: '',
    submitText: 'ادامه'
})
const passwordInput: textInput = reactive({
    name: 'password',
    id: 'password',
    label: 'رمز عبور',
    placeHolder: [
        'رمز عبور دلخواه را به انگلیسی وارد کنید',
    ],
    type: 'password',
    required: true,
    ltr: true,

})
const emailInput: textInput = reactive({
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
})


const handelLoginAPI = async (e: Event) => {
    showModal.value = true
    let resp = await fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
mutation($email: String!,$password:String!){
  login(email:$email,password:$password) {
    token,
  } 
}
`,
            variables: {
                email: e['Email' as keyof Event],
                password: e['password' as keyof Event],
            }
        }),
    })
    let respData = await resp.json()
    showModal.value = false


    if (resp.status == 200) {
        if (respData.errors) {
            toast.error(respData.errors[0].message)
        }
        else {
            toast.success('لاگین شدید.')
            localStorage.setItem("accessToken", respData.data.login.token);
            router.push({ name: 'profile' })
        }
    } else {
        toast.error('خطای پیش بینی نشده')
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