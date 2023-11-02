<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <singleCard :showClose="false" :showOk="false">
            <DefaultForm @submitForm="handelUserSignUpAPI($event)" :schema="schema" :="formData">
                <DefaultTextInput :="userName" />
                <DefaultTextInput :="passwordInput" />
                <DefaultTextInput :="repeatedPassInput" />
                <DefaultFileInput :="fileInput" />
            </DefaultForm>
        </singleCard>
        <EmptyModal v-model:show="showLoading">
            <Circle size="80px" />
        </EmptyModal>


    </main>
    <default-footer />
</template>
<script setup lang="ts">
import * as Yup from "yup";
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import singleCard from '@/components/cards/single-card.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import DefaultTextInput from '@/components/inputs/default-text-input.vue'
import DefaultFileInput from '@/components/inputs/default-file-input.vue'
import { useToast } from "vue-toastification";

import Circle from "../../components/loading/circle.vue";
import EmptyModal from "../../components/modals/empty-modal.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import type { defaultFormComponentPropsShape, textInput, fileInput } from "@/types/types";

type schemaShape = {
    userName: string
    password: string
    repeatedPass: string
}

const route = useRoute()
const router = useRouter()
const showLoading = ref<boolean>(false)
const toast = useToast()
const schema: Yup.SchemaOf<schemaShape> = Yup.object().shape({
    userName: Yup.string().required('فیلد ضروری است'),
    password: Yup.string().min(6, 'حداقل 6 کاراکتر').required('فیلد ضروری است'),
    repeatedPass: Yup.string()
        .required('فیلد ضروری است')
        .oneOf([Yup.ref("password")], "تکرار رمز عبور مطابقت ندارد"),
})
const formData = ref<defaultFormComponentPropsShape>({
    title: 'شما هنوز در هلیوم ثبت نام نکرده اید.',
    description: 'لطفا اطلاعات زیر را برای ثبت نام کامل کنید.',
    submitText: 'ادامه'
})
const userName = ref<textInput>({
    name: 'userName',
    id: 'userName',
    label: 'نام کاربری',
    placeHolder: [
        'نام کاربری دلخواه خود را به انگلیسی وارد کنید.'
    ],
    ltr: true,
    type: 'text',
    required: true,
})
const passwordInput = ref<textInput>({
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
const repeatedPassInput = ref<textInput>({
    name: 'repeatedPass',
    id: 'repeatedPass',
    label: 'تکرار رمز عبور',
    placeHolder: [
        'رمز عبور خود را مجدد وارد کنید',
    ],
    ltr: true,
    type: 'password',
    required: true,
})
const fileInput = ref<fileInput>({
    name: 'file',
    id: 'userImage',
    label: 'بارگزاری تصویر',
    accept: "image/png, image/gif, image/jpeg",
    image: '/src/assets/images/Default Avatar.png',
})

const handelUserSignUpAPI = async (e: any) => {
    let data = new FormData()
    const query = `mutation(    
                  $username : String! 
                  $password : String! 
                  $image : Upload 
                  $phone_number : String! 
                  $email : String! 
                  $last_name : String! 
                  $first_name : String! 
                  ){  signup(      
                  username : $username
                  password : $password
                  image : $image 
                  phone_number : $phone_number
                  email : $email
                  last_name : $last_name
                  first_name : $first_name){  
                      __typename  }}`;

    const username = e.userName
    const password = e.password
    const image = (document.getElementsByName("file")[0] as any).files[0]
    const phone_number = route.query['PhonNumber']!
    const email = route.query.Email!
    const last_name = route.query.lName!
    const first_name = route.query.fName!

    data.append("operations", JSON.stringify({ query }));
    data.append('map', `{ "0": ["variables.username"],
             "1": ["variables.password"],
             "2": ["variables.image"],
             "3": ["variables.phone_number"],
             "4": ["variables.email"],
             "5": ["variables.last_name"],
             "6": ["variables.first_name"] }
            `)
    data.append('0', username);
    data.append('1', password);
    data.append('2', image);
    data.append('3', phone_number as string);
    data.append('4', email as string);
    data.append('5', last_name as string);
    data.append('6', first_name as string);


    showLoading.value = true
    let resp = await fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT'
        headers: {
            'Accept': 'application/json',

        },
        body: data,
    })


    let respData = await resp.json()
    showLoading.value = false
    if (resp.status >= 400) {
        if (Array.isArray(respData.message)) {
            respData.message.forEach((message: string) => toast.error(message))
        } else {
            toast.error(respData.message)
        }
    } else {
        router.push({ name: 'register-done' })
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
    padding: 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>