<template>
  <div class="title-area" style="height: 50vh">
    <div id="title-container">
      <h1>rankr</h1>
      <h2>Rank things accurately.</h2>
    </div>
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

#title-container {
  position: absolute;
  top: 25vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
