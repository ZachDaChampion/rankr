<template>
  <div class="title-area">
    <h1>rankr</h1>
    <h2>Rank things accurately.</h2>
    <SearchBox />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchBox from "@/components/SearchBox.vue";

@Component({
  components: { SearchBox }
})
export default class TitleArea extends Vue {}
</script>

<style scoped>
.title-area {
  background-color: #383a59;
}

h1 {
  font-size: 96px;
  margin: 0;
}
</style>
