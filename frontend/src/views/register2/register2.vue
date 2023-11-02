<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <singleCard :showClose="false" :showOk="false">
            <DefaultForm @submitForm="getData($event)" :schema="schema" :="formData">
                <DefaultTextInput :="phoneInput" />
                <DefaultTextInput :="fnameInput" />
                <DefaultTextInput :="lnameInput" />
                <DefaultTextInput v-model:value="defaultEmail" :="emailInput" />
            </DefaultForm>
        </singleCard>
    </main>
    <default-footer />
</template>
<script setup lang="ts">
import * as Yup from "yup";
import type { defaultFormComponentPropsShape, textInput } from '@/types/types'
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import singleCard from '@/components/cards/single-card.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import DefaultTextInput from '@/components/inputs/default-text-input.vue'
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

type schemaShape = {
    PhonNumber: number
    Email: string
    fName: string
    lName: string
}

const route = useRoute()
const router = useRouter()
const defaultEmail = route.query['email'] as string
const schema:Yup.SchemaOf<schemaShape> = Yup.object().shape({
    'PhonNumber': Yup.number().typeError('فیلد از نوع عددی است').required('فیلد ضروری است'),
    'Email': Yup.string().email('ایمیل معتبر نیست').required('فیلد ضروری است'),
    'fName': Yup.string().matches(/^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]+$/, 'فارسی وارد کنید').required('فیلد ضروری است'),
    'lName': Yup.string().matches(/^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]+$/, 'فارسی وارد کنید').required('فیلد ضروری است'),
})
const formData = ref<defaultFormComponentPropsShape>({
    title: 'شما هنوز در هلیوم ثبت نام نکرده اید.',
    description: 'لطفا اطلاعات زیر را برای ثبت نام کامل کنید.',
    submitText: 'ادامه'
})
const phoneInput = ref<textInput>({
    name: 'PhonNumber',
    id: 'PhonNumber',
    label: 'لطفا شماره تلفن همراه خود را وارد کنید',
    placeHolder: [
        'مثال:',
        '۰۹۱۵۱۲۳۴۵۶۷'
    ],
    ltr: true,
    type: 'tel',
})
const fnameInput = ref<textInput>({
    name: 'fName',
    id: 'fName',
    label: 'نام',
    placeHolder: [
        'نام',
    ],
    type: 'text',
    required: true,
})
const lnameInput = ref<textInput>({
    name: 'lName',
    id: 'lName',
    label: ' نام خانوادگی',
    placeHolder: [
        ' نام خانوادگی',
    ],
    type: 'text',
    required: true,
})
const emailInput = ref<textInput>({
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

const getData = (e:any) => {
    router.push({ name: 'register3', query: e })
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
    padding: 0 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>