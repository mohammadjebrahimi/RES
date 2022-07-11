<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm @submitForm="handelUserSignUpAPI($event)" :schema="schema" :="formData">
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
import { useToast } from "vue-toastification";

export default {
    name: "register3-page",
    data() {
        return {
            toast: useToast(),
            schema: Yup.object().shape({
                userName: Yup.string().required('فیلد ضروری است'),
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
    methods: {
        async handelUserSignUpAPI(e) {

            // let data = {
            //     username: e.userName,
            //     password: e.password,
            //     image: 'jjj',
            //     phone_number: this.$route.query['Phon-Number'],
            //     email: this.$route.query.Email,
            //     last_name: this.$route.query.lName,
            //     first_name: 'لققلثقل',
            // }
            let data = new FormData()
            // data.append( 'username', 'amirhossein')
            // data.append( 'password', '123456' )
            // data.append( 'image', document.getElementsByName("file")[0].files[0] )
            // data.append( 'phone_number', '09155602894')
            // data.append( 'email', 'amirhossein.shahraki@pm.me')
            // data.append( 'last_name', 'شهرکی')
            // data.append( 'first_name', 'امیرحسین')

            data.append( 'username', e.userName)
            data.append( 'password', e.password )
            data.append( 'image', document.getElementsByName("file")[0].files[0] )
            data.append( 'phone_number',  this.$route.query['Phon-Number'])
            data.append( 'email', this.$route.query.Email)
            data.append( 'last_name',  this.$route.query.lName)
            data.append( 'first_name',  this.$route.query.fName)


            let resp = await fetch('http://87.107.30.143:3003/auth/signup', {
                method: 'POST', // or 'PUT'
                headers: {
                   'Accept': 'application/json'
                },
                body: data,
            })
            let respData = await resp.json()
            if (resp.status == 400 ||resp.status == 500) {
                if (Array.isArray(respData.message)) {
                    respData.message.forEach(message => this.toast.error(message))
                } else {
                    this.toast.error(respData.message)
                }


            } else if (resp.status == 200||resp.status == 201) {

                let respLogin = await fetch('http://87.107.30.143:3003/auth/login', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "phone_number": this.$route.query['Phon-Number'],
                        "password": e.password 
                    }),
                })
                let respDataLogin = await respLogin.json()
                if (respLogin.status == 400) {
                    this.toast.error(respDataLogin.message)

                } else if (respLogin.status == 200) {
                    this.toast.success('لاگین شدید.')
                    localStorage.setItem("accessToken", respDataLogin.accessToken);
                    this.$router.push({ name: 'register-done' })
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
    padding: 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>