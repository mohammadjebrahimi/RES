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
                        <input type="file" class="create-new-article__article-edit-image-input"
                            @change="setArticleImage($event)" accept="image/png, image/gif, image/jpeg" />
                    </label>
                </div>
            </div>
            <input class="create-new-article__article-insert-title" placeholder="عنوان مطلب خود را وارد کنید " />
            <div class="create-new-article__article-tag-section">
                <p class="create-new-article__article-tag" v-if="selectedTagObject?.value">{{selectedTagObject?.value}}</p>
                <a id="insertTag" @click="showTagModal = !showTagModal"
                    class="create-new-article__article-tag-editor"><img src="@/assets/images/tag-2.png" alt=""></a>
            </div>
            <div class="create-new-article__article-content-section">
                <textarea oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    class="create-new-article__article-insert-content"
                    placeholder="متن اصلی خود را وارد کنید..."></textarea>
                <label class="create-new-article__article-edit-image"><img src="@/assets/images/gallery-edit.png"
                        alt="">
                    <input type="file" class="create-new-article__article-edit-image-input"
                        @change="setArticleImage($event)" accept="image/png, image/gif, image/jpeg" />
                </label>
            </div>
            <button class="create-new-article__article-submit" type="button" disabled>انتشار
                مطلب</button>
        </div>

        <DefaultModal @ok="getTag()" v-model:show="showTagModal">
            <DefaultForm class="modal__form" v-bind="foemData">
                <DefaultSelectInput v-model:value="selectedTagKey" v-bind="selectInputData" ref="tag" />
            </DefaultForm>
        </DefaultModal>
    </div>
</template>
<script>
import DefaultModal from '@/components/modals/default-modal.vue'
import DefaultSelectInput from '@/components/inputs/default-select-input.vue'
import DefaultForm from '@/components/forms/default-form.vue'

export default {
    name: "create-new-article",
    components: {
        DefaultModal,
        DefaultSelectInput,
        DefaultForm
    },
    data() {
        return {
            selectedTagKey: '',
            selectedTagObject: '',
            articleImage: '/src/assets/images/Group 254.png',
            showTagModal: false,
            selectInputData: {
                options: [
                    { key: '01', value: 'نانو تکنولوژی ' },
                    { key: '02', value: ' تکنولوژی ' },
                    { key: '03', value: 'نانو ' },
                    { key: '04', value: 'هویچ' },
                ],
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
        getTag(e) {
          this.selectedTagObject=  this.$refs.tag.options.filter(
                (option) => option.key == this.selectedTagKey
            )[0]
        }
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