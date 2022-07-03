<template>
  <a href="#" class="card-2">
    <figure class="card-2__outer-image">
      <img :src="image" alt="inner-image">
    </figure>
    <default-card :authFigure="authFigure" :authorName="authorName" :tag="tag" :studyDuration="studyDuration" :summery="summery" :title="title" :date="date" :href="href">
    </default-card>
  </a>
</template>
<script>
import defaultCard from './default-card.vue'
export default {
  name: "card2",
  components: { defaultCard },
  props: {
    'authFigure': String,
    'authorName': String,
    'date': String,
    'title': String,
    'summery': String,
    'studyDuration': String,
    'tag': String,
    'image': String,
    'href': {
      type: String,
      default: "#"
    }
  },

}
</script>
<style lang="scss">
.card-2 {
  @include flex-direction();
  justify-content: center;
  text-decoration: none;

  &__outer-image {
    position: relative;
    margin: 0 0 0 2em;
    height: fit-content;

    &:before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: #c2ddf68c;
      transform-origin: 0 bottom 0;
      transform: scaleY(0);
      transition: .4s ease-out;
    }

    &>img {
      width: 100%;
      height: auto;
      max-width: 586px;
      max-height: 387px;
    }

  }

  &:hover &__outer-image:before {
    transform: scaleY(1);
  }

  &__card {
    max-width: 735px;
    width: 100%;
    box-shadow: none;
    background: transparent;
    backdrop-filter: none;
  }

  @include breakpoint_max(small) {
    @include flex-direction(column);

    &__outer-image {
      margin: 0;
    }
  }
}
</style>