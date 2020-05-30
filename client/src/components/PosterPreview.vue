<template>
  <div class="poster-preview" :style="{ width: posterWidth }">
    <img
      id="img"
      :src="compImgLink"
      :style="{ height: posterHeight, width: posterWidth }"
    />
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PosterPreview extends Vue {
  @Prop({ required: false, default: require("@/assets/no_poster.jpg") })
  public imgLink!: string;

  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public posterWidth!: string;

  get posterHeight() {
    return parseInt(this.posterWidth, 10) * 1.5 + "px";
  }

  get compImgLink(): string {
    return this.imgLink || require("@/assets/no_poster.jpg");
  }
}
</script>

<style scoped>
.poster-preview {
  border-radius: 16px;
  transition: 200ms;
}

.poster-preview:hover {
  cursor: pointer;
  transform: scale(1.05);
}

#img {
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

h2 {
  color: white;
  opacity: 0.75;
}
</style>
