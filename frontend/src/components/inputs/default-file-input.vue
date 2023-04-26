<template>
    <div class="file-input-box">
        <figure class="file-input-box__input-fig">
            <img :src="image" alt="بارگزاری عکس">
        </figure>
        <input :name="name" type="file" :id="id" class="file-input-box__file-input" :accept="accept">
        <label :for="id" class="file-input-box__file-input-placeholder">{{label}}</label>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        id: {
            type: String,
            required: true
        },
        label: String,
        accept:String,
        image:String,
    }
}
</script>
<style lang="scss">
.file-input-box {
    @include flex-direction(row);
    width: 90%;
    padding: 5%;
    align-items: center;
    justify-content: space-between;
    background: #EDEDED;

    &__input-fig {
        border-radius: 50%;
        width: 60px;
        margin: 0;
        height: 60px;
    }

    &__file-input {
        display: none;
    }

    &__file-input-placeholder {
        font-size: 14px;
        line-height: 24px;
        text-align: right;
        color: #208BEE;
        font-weight: 700;
        cursor: pointer;
    }

}
</style>