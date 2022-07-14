<template>
    <div class="create-new-article">
        <div class="create-new-article__header">
            <figure class="create-new-article__icon"><img src="@/assets/images/Edit.png" alt=""></figure>
            <p class="create-new-article__title">ایجاد مطلب جدید</p>
        </div>
        <div class="create-new-article__article">
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
            <input name="title" class="create-new-article__article-insert-title"
                placeholder="عنوان مطلب خود را وارد کنید " />
            <div class="create-new-article__article-tag-section">
                <template v-for="(tag, index) in tags" :key="`tag-${index}`">
                    <p class="create-new-article__article-tag" v-if="tag.name">{{
                            tag.name
                    }}
                    </p>
                </template>

                <a id="insertTag" @click="showTagModal = !showTagModal"
                    class="create-new-article__article-tag-editor"><img src="@/assets/images/tag-2.png" alt=""></a>
            </div>
            <div class="create-new-article__article-content-section">
                <textarea name="content" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    class="create-new-article__article-insert-content"
                    placeholder="متن اصلی خود را وارد کنید..."></textarea>
                <label class="create-new-article__article-edit-image"><img src="@/assets/images/gallery-edit.png"
                        alt="">
                    <input type="file" class="create-new-article__article-edit-image-input"
                        @change="setArticleImage($event)" accept="image/png, image/gif, image/jpeg" />
                </label>
            </div>
            <button @click="submit()" class="create-new-article__article-submit" type="button">انتشار
                مطلب</button>
        </div>

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
import DefaultModal from '@/components/modals/default-modal.vue'
import DefaultSelectInput from '@/components/inputs/default-select-input.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import { useToast } from "vue-toastification";
import EmptyModal from '../../../components/modals/empty-modal.vue';
import Circle from '../../../components/loading/circle.vue';
export default {
    name: "create-new-article",
    components: {
        DefaultModal,
        DefaultSelectInput,
        DefaultForm,
        EmptyModal,
        Circle
    },
    data() {
        return {
            toast: useToast(),
            tags: [],
            selectedTags: [],
            tagsString: null,
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
        setArticleImage(event) {
            let image = event.target.value
            if (image === '' || image === 'undefined') {
                return
            }
        },
        getTag() {
            this.tags = this.selectedTags
            this.tagsString = this.tags.map(({ id, name }) => (id))
                .join(',');
        },
        async submit() {
            this.showLoading = true
            let data = new FormData()
            data.append('image', document.getElementsByName("image")[0].files[0])
            data.append('title', document.getElementsByName("title")[0].value)
            data.append('content', document.getElementsByName("content")[0].value)
            data.append('tags', [this.tagsString])

            let resp = await fetch('http://87.107.30.143:3003/articles', {
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
                if (Array.isArray(respData.message)) {
                    respData.message.forEach(message => this.toast.error(message))
                } else {
                    this.toast.error(respData.message)
                }


            } else if (resp.status == 200 || resp.status == 201) {
                this.toast.success(respData.message)

            }
        },
        async handelTagAPI(token) {
            this.showLoader = true
            let resp = await fetch(`http://87.107.30.143:3003/tags`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            })
            let tags = await resp.json()
            if (resp.status < 300) {

                return tags
            } else {
                this.toast.error(tags.message)
            }
            this.showLoader = false
        },
        async handelAddTagAPI(token, tag_name) {
            this.showLoader = true
            let resp = await fetch(`http://87.107.30.143:3003/tags`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ tag_name })
            })
            this.showLoader = false
            let tag = await resp.json()
            if (resp.status < 300) {
                this.toast.success(tag.message)

                return tag
            } else {
                this.toast.error(tag.message)
                return false
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
        this.selectInputData.options = options.data
    }
}
</script>
<style lang="scss" scoped>
.create-new-article {
    @include flex-direction(column);
    margin: auto;
    max-width: 798px;
    width: 100%;

    &__header {
        @include flex-direction();
        align-items: baseline;
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
        border: none;
        margin: 28px 0 16px 0;
        font-weight: 600;
        font-size: 18px;
        line-height: 36px;

        &::placeholder {

            color: #8593A6;
        }
    }

    &__article-insert-content {
        width: 100%;
        height: 40px;
        border: none;
        margin: 28px 0 16px 0;
        resize: none;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 16px;
        line-height: 32px;

        &::placeholder {
            color: #8593A6;
        }
    }

    &__article-edit-image-input {
        display: none;
    }
}
</style>