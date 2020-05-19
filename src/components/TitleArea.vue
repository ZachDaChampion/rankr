<template>
  <div class="title-area">
    <h1>rankr</h1>
    <h2>Rank things accurately.</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TitleArea extends Vue {}
</script>

<style scoped>
.title-area {
  background-color: #383a59;
  padding: 32px;
}

h1 {
  font-size: 96px;
  margin: 0;
}
</style>
