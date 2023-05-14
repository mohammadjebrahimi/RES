<template>
  <a href="#" class="card-2">
    <figure class="card-2__outer-image">
      <img :src="image" alt="inner-image">
    </figure>
    <default-card class="card-2__card" :authFigure="authFigure" :authorName="authorName" :tags="tags"
      :studyDuration="studyDuration" :summery="summery" :title="title" :date="date" :link="link">
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
    'tags': Array,
    'image': String,
    'link': {
      default: "/#"
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
    display: flex;
    position: relative;
    margin: 0 0 0 2em;
     width: 30%;
    min-height: 100%;

    &:before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: #208bee40;
      transform-origin: 0 bottom 0;
      transform: scaleY(0);
      transition: .4s ease-out;
      
    }

    &>img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

  }

  &:hover &__outer-image:before {
    transform: scaleY(1);
  }

  &__card {
    width: 70%;
    box-shadow: none;
    background: transparent;
    backdrop-filter: none;
  }

  @include breakpoint_max(medium) {
    @include flex-direction(column);
    align-items: center;

    &__outer-image {
      width:70%;
      margin: 0;
    }
  }
}
</style>