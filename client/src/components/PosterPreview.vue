<template>
  <div class="poster-preview" :style="{ width: posterWidth }" @click="navigate()">
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
  @Prop({ required: true })
  public imgLink!: string;

  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public posterWidth!: string;

  @Prop({ required: true })
  public id!: number;

  get posterHeight() {
    return parseInt(this.posterWidth, 10) * 1.5 + "px";
  }

  get compImgLink(): string {
    return this.imgLink || require("@/assets/no_poster.jpg");
  }

  navigate() {
    this.$router.push({path: 'compare', query: {id: this.id.toString()}})
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap");

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
  font-family: "Hind Madurai", sans-serif;
  color: white;
  opacity: 0.75;
}
</style>
