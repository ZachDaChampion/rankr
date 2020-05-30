<template>
  <div class="poster-grid">
    <poster-preview
      v-for="(item, index) in posters"
      :key="index"
      :title="item.title"
      :img-link="item.link"
      poster-width="250px"
    />
    <!-- <div :v-for="(title, link) in posters">
      <poster-preview :title="title" :img-link="link" poster-width="250px" />
    </div> -->
  </div>
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
</style>
