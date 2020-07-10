<template>
  <img class="img-component" :src="src" @load="loaded = true" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImgComponent extends Vue {
  @Prop({ required: true })
  public src!: string;

  @Prop({ required: false })
  public defaultImg!: string;

  public get imgLoaded() {
    return this.loaded;
  }

  private loaded = false;
}
</script>

<style scoped></style>
