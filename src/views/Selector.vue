<template>
  <div class="selector">
    <div id="title-with-shadow" />
    <title-area id="title" />
    <search-box id="search" :focus="true" />
    <poster-grid />
  </div>
</template>

<script>
// @ is an alias to /src
import TitleArea from "@/components/TitleArea.vue";
import SearchBox from "@/components/SearchBox.vue";
import PosterGrid from "@/components/PosterGrid.vue";

export default {
  name: "Selector",
  components: {
    TitleArea,
    SearchBox,
    PosterGrid
  }
};
</script>

<style scoped>
#title {
  position: relative;
  z-index: 50;
}

#title-with-shadow {
  position: fixed;
  top: 0;
  height: 64px;
  width: 100%;
  z-index: 25;
  background-color: #383a59;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

#search {
  position: sticky;
  top: 64px;
  transform: translateY(-50%);
  z-index: 100;
}
</style>
