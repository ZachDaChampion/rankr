<template>
  <transition-group class="poster-grid" name="slide">
    <poster-preview
      v-for="item in posters"
      class="poster"
      :key="item.id"
      :title="item.title"
      :img-link="item.link"
      :id="item.id"
      poster-width="250px"
    />
    <!-- <div :v-for="(title, link) in posters">
      <poster-preview :title="title" :img-link="link" poster-width="250px" />
    </div> -->
  </transition-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PosterPreview from "@/components/PosterPreview.vue";

@Component({
  components: { PosterPreview },
})
export default class PosterGrid extends Vue {
  get posters(): Array<any> {
    return this.$store.state.searchResults;
  }
}
</script>

<style scoped>
.poster {
  display: block;
}

.poster-grid {
  display: grid;
  margin: 96px;
  margin-top: 32px;
  gap: 64px;
  grid-gap: 64px;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  justify-items: center;
}

.slide-enter-active,
.slide-leave-active,
.slide-move {
  transition: opacity 500ms cubic-bezier(0.075, 0.82, 0.165, 1),
    transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.slide-enter {
  opacity: 0;
  transform: translateY(50%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-active {
  position: absolute;
  left: calc(50% - 128px);
  top: calc(50% - 32px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
  transform-origin: center center;
}
</style>
