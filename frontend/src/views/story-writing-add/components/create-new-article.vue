<template>
    <div class="create-new-article">
        <div class="create-new-article__header">
            <figure class="create-new-article__icon"><img src="@/assets/images/Edit.png" alt=""></figure>
            <p class="create-new-article__title">ایجاد مطلب جدید</p>
        </div>
        <!-- <div class="create-new-article__article">
      
            <input name="title" class="create-new-article__article-insert-title"
                placeholder="عنوان مطلب خود را وارد کنید " />

            <div class="create-new-article__article-summery-section">
                <textarea name="summery" class="create-new-article__article-insert-summery"
                    placeholder="خلاصه متن  را وارد  ..."></textarea>



            </div>


            <button @click="submit()" class="create-new-article__article-submit" type="button">انتشار
                مطلب</button>
        </div> -->

        <DefaultForm @submitForm="submit()" class="create-new-article__article" :schema="schema" submitText="انتشار مطلب">
            <div class="create-new-article__article-image-section">
                <figure class="create-new-article__article-image">
                    <img :src="articleImage" alt="">
                </figure>
                <div class="create-new-article__article-image-editor">
                    <button class="create-new-article__article-maximize-image"><img
                            src="@/assets/images/maximize-circle.png" alt=""></button>
                    <label class="create-new-article__article-edit-image"><img src="@/assets/images/gallery-edit.png"
                            alt="">
                        <input name="image" type="file" class="create-new-article__article-edit-image-input"
                            @change="setArticleImage($event)" accept="image/png, image/gif, image/jpeg" />
                    </label>
                </div>
            </div>
            <DefaultTextInput class="create-new-article__article-title" :="titleInput" />
            <div class="create-new-article__article-tag-section">
                <template v-for="(tag, index) in tags" :key="`tag-${index}`">
                    <p class="create-new-article__article-tag" v-if="tag.name">{{
                        tag.name
                    }}
                    </p>
                </template>

                <a id="insertTag" @click="showTagModal = !showTagModal" class="create-new-article__article-tag-editor"><img
                        src="@/assets/images/tag-2.png" alt=""></a>
            </div>
            <DefaultTextAreaInput class="create-new-article__article-summery" :="summeryInput" />
            <DefaultForm>
                <tiptapEditor v-model="editorValue" :editable="true" class="create-new-article__tiptap" />
            </DefaultForm>
        </DefaultForm>

        <DefaultModal @ok="getTag()" v-model:show="showTagModal">
            <DefaultForm class="modal__form" v-bind="foemData">
                <DefaultSelectInput @OptionBtnClicked="OptionBtnClicked($event)" v-model:value="selectedTags"
                    v-bind="selectInputData" ref="tag" />
            </DefaultForm>
        </DefaultModal>

        <EmptyModal v-model:show="showLoading">
            <Circle size="80px" />
        </EmptyModal>
    </div>
</template>
<script>
import tiptapEditor from '@/components/tiptap-editor/index.vue'
import DefaultModal from '@/components/modals/default-modal.vue'
import DefaultSelectInput from '@/components/inputs/default-select-input.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import { useToast } from "vue-toastification";
import EmptyModal from '../../../components/modals/empty-modal.vue';
import Circle from '../../../components/loading/circle.vue';
import DefaultTextInput from '../../../components/inputs/default-text-input.vue';
import DefaultTextAreaInput from '../../../components/inputs/default-text-area-input.vue';
import { readImageAsBase64 } from '@/components/tiptap-editor/upload/default-uploader'

import * as Yup from "yup";

export default {
    name: "create-new-article",
    components: {
        DefaultModal,
        DefaultSelectInput,
        DefaultForm,
        EmptyModal,
        Circle,
        tiptapEditor,
        DefaultTextInput,
        DefaultTextAreaInput
    },
    data() {
        return {
            schema: Yup.object().shape({
                summery: Yup.string().required('فیلد ضروری است'),
                title: Yup.string().required('فیلد ضروری است'),
            }),
            titleInput: {
                name: 'title',
                id: 'title',
                placeHolder: [
                    'عنوان مطلب خود را وارد کنید',
                ],
                type: 'text',
                required: true,
            },
            summeryInput: {
                name: 'summery',
                id: 'summery',
                placeHolder: [
                    'خلاصه متن  را وارد  ...',
                ],
                ltr: false,
                required: true,
            },
            toast: useToast(),
            editorValue: '',
            tags: [],
            selectedTags: [],
            tagsId: [],
            articleImage: '/src/assets/images/Group 254.png',
            showTagModal: false,
            showLoading: false,
            selectInputData: {
                optionValue: 'name',
                options: [],
                name: 'tag',
                id: 'tag',
                label: 'لطفا دسته بندی موضوعی خود را وارد کنید',
                placeHolder: 'انتخاب کنید',
                ltr: false
            },
            foemData: {
                action: '',
                title: '',
                description: '',
                alignToEnd: true
            }
        }
    },
    methods: {
        async setArticleImage(event) {
            let image = event.target.value
            if (image === '' || image === 'undefined') {
                return
            }
            const img = await readImageAsBase64(event.target.files[0])
            this.articleImage = img.src
        },
        getTag() {
            this.tags = this.selectedTags
            this.tagsId = this.tags.map(({ id, name }) => (id)).join(',')

        },
        async submit() {
            this.showLoading = true
            const query = `mutation(    
                  $title : String! 
                  $content : String 
                  $summery:String!
                  $image : Upload 
                  $tags : [ID]!
                  ){  createArticle(      
                    title : $title
                    summery: $summery
                    content : $content
                  image : $image 
                  tags : $tags
){  
                      __typename  }}`;

            const content = this.editorValue
            const title = document.getElementsByName("title")[0].value
            const summery = document.getElementsByName("summery")[0].value
            const image = document.getElementsByName("image")[0].files[0]
            const tags = this.tagsId

            let data = new FormData()
            data.append("operations", JSON.stringify({ query }));
            data.append('map', `{ "0": ["variables.content"],
             "1": ["variables.title"],
             "2": ["variables.summery"],
             "3": ["variables.image"],
             "4": ["variables.tags"]
 } `)
            data.append('0', content);
            data.append('1', title);
            data.append('2', summery);
            data.append('3', image);
            data.append('4', tags);





            let resp = await fetch('http://localhost:4000', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Accept': 'application/json',
                    'Authorization': localStorage.getItem("accessToken")

                },
                body: data,
            })

            let respData = await resp.json()

            this.showLoading = false
            if (resp.status == 400 || resp.status == 500 || resp.status == 401) {
                this.toast.error('خطای پیش بینی نشده')
            } else if (resp.status == 200 || resp.status == 201) {
                if (respData.errors) {
                    this.toast.error(respData.errors[0].message)
                } else {

                    this.toast.success('با موفقیت ثبت شد')
                }

            }
        },
        async handelTagAPI(token) {
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `query{
  tags{
    id
    name
  }
}`
                }),
            })
            let respData = await resp.json()
            if (resp.status < 300) {
                if (resp.status <= 300) {
                    if (respData.errors) {
                        this.toast.error(respData.error[0].message)

                    }
                }
                return respData.data.tags
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }
            this.showLoader = false
        },
        async handelAddTagAPI(token, tag_name) {
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `mutation($name:String!){
  createTag(name:$name){
    id
    name
  }
}`,
                    variables: {
                        name: tag_name
                    }
                }),
            })
            this.showLoader = false
            let respData = await resp.json()
            if (resp.status < 300) {
                if (resp.status <= 300) {
                    if (respData.errors) {
                        this.toast.error(respData.error[0].message)

                    }
                }
                let options = await this.handelTagAPI(localStorage.getItem("accessToken"))
                this.selectInputData.options = options
                return respData.data.tags
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }

        },
        async OptionBtnClicked(e) {
            let tag = await this.handelAddTagAPI(localStorage.getItem("accessToken"), e)
            if (tag) {
                this.selectInputData.options.push(tag.data)
            }
        }
    },
    async mounted() {
        let options = await this.handelTagAPI(localStorage.getItem("accessToken"))
        this.selectInputData.options = options
    }
}
</script>
<style lang="scss" >
.create-new-article {
    @include flex-direction(column);
    margin: auto;
    max-width: 798px;
    width: 100%;

    &__header {
        @include flex-direction();
        align-items: baseline;
    }

    &__tiptap {
        margin: 28px 0 16px 0;
    }

    &__icon {
        width: 24px;
        height: 24px;
        margin: 0 0 0 10px;
    }

    &__title {
        font-weight: 700;
        font-size: 20px;
    }

    &__article {
        @include flex-direction(column);
        margin: 0 0 140px;

        &-title {
            & input.input-box__input {
                border: 0;
                padding: 0%;
                outline: 0;
                border: none;
                font-weight: 600;
                font-size: 18px;
                line-height: 36px;
                color: #8593A6;

                &::placeholder {
                    color: #8593A6;
                }

                &:focus {
                    color: #0D0D0D;
                }
            }

            & .input-box__input-placeholder {
                padding: 0%;
            }
        }

        &-summery {
            & textarea.textarea__input {
                border: 0;
                padding: 0%;
                outline: 0;
                width: 100%;
                border: none;
                resize: none;
                box-sizing: border-box;
                font-weight: 400;
                font-size: 12px;
                line-height: 32px;
                color: #8593A6;

                &::placeholder {
                    color: #8593A6;
                }

                &:focus {
                    color: #0D0D0D;
                }
            }

            & .textarea__input-placeholder {
                padding: 0%;
                font-weight: 400;
                font-size: 12px;
                line-height: 32px;
                align-items: baseline
            }

        }
    }

    &__article-image {
        width: 100%;
        margin: 0;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__article-image-section {
        @include flex-direction;
        position: relative;
        height: 496px;
        width: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden
    }

    &__article-image-editor {
        @include flex-direction();
        gap: 60px;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;

    }


    &__article-edit-image,
    &__article-maximize-image,
    &__article-tag-editor,
    &__article-content-editor {
        @include circle-button()
    }

    &__article-title {
        font-weight: 600;
        font-size: 18px;
    }

    &__article-tag {
        @include tag()
    }

    &__article-tag-section {
        @include flex-direction();
        gap: 16px
    }

    &__article-submit {
        @include rectangular-button();
        margin: 80px auto 160px;
    }


    &__article-submit:disabled {
        background: rgba(32, 139, 238, 0.45);
    }

    &__article-insert-title {
        outline: 0;
        border: none;
        margin: 28px 0 16px 0;
        font-weight: 600;
        font-size: 18px;
        line-height: 36px;
        color: #8593A6;

        &::placeholder {

            color: #8593A6;
        }

        &:focus {
            color: #0D0D0D;
        }
    }

    &__article-insert-summery {
        outline: 0;
        width: 100%;
        height: 40px;
        border: none;
        margin: 28px 0 16px 0;
        resize: none;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 12px;
        line-height: 32px;
        color: #8593A6;

        &::placeholder {
            color: #8593A6;
        }

        &:focus {
            color: #0D0D0D;
        }
    }

    &__article-edit-image-input {
        display: none;
    }
}
</style>