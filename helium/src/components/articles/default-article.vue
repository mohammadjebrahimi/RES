<template>
  <article class="article">

    <div class="article__title">{{ title }}</div>
    <div class="article__footer">
      <div class="article__study-duration">{{ studyDuration }}</div>
      .
      <span v-for="(tag, index) in tags" :key="`tag-${index}`" class="card__tag">{{ tag?.name }}</span>
    </div>
    <!--متن مقاله-->
    <figure class="article__image">
      <img class="image" :src="image_url" alt="image">
    </figure>


    <div class="article__text">
      <p> {{content}}<br></p>
    </div>

  </article>
</template>
<script>
export default {
  name: "default-article",
  props: {
    'title': String,
    'read_time_minutes': String,
    'tags': Array,
    'image_url': String,
    'content': String,
    studyDuration:String
  },

}
</script>
<style lang="scss">
.article {
  margin: auto;
  max-width: 798px;
  width: 100%;

  &__header {
    @include flex-direction();
    align-items: center;
    width: 100%
  }

  &__auth-figure {
    margin: 0 0 0 12px;
  }

  &__header-left {
    @include flex-direction(column);
  }

  &__author-name {
    font-size: 14px;
    color: #28394F;
  }

  &__date {
    color: #8593A6;
    font-weight: 600;
    font-size: 11px;
  }

  &__title {
    font-size: 32px;
    width: 100%;
    font-weight: 700;
  }

  &__footer {
    @include flex-direction();
    margin: 18px 0 32px;
    font-weight: 700;
    font-size: 25px;
    color: #8593A6;
    width: 100%;
    align-items: baseline;
    gap: 10px;
  }

  &__study-duration {
    color: #8593A6;
    font-weight: 600;
    font-size: 11px;
  }

  &__image {
    width: 100%;
    margin: 0;
    @include flex-direction();
    justify-content: center;

    &>img {
      width: 100%;
      height: auto;
    }
  }
&__text{
      word-break: break-all;
}
  &__tag {
    @include tag()
  }

}
</style>