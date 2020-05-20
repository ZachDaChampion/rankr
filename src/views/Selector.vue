<template>
  <div class="selector">
    <div id="title-with-shadow" />
    <title-area id="title" />
    <search-box id="search" :focus="true" />
    <div id="poster-grid">
      <poster-preview
        img-link="https://image.tmdb.org/t/p/w500/sUTqIb82LxYhPT0SfI8AR03GLpz.jpg"
        title="The Mandalorian"
        poster-width="250px"
      />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
      <poster-preview title="Another example" poster-width="250px" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TitleArea from "@/components/TitleArea.vue";
import SearchBox from "@/components/SearchBox.vue";
import PosterPreview from "@/components/PosterPreview.vue";

export default {
  name: "Selector",
  components: {
    TitleArea,
    SearchBox,
    PosterPreview
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

#poster-grid {
  display: grid;
  margin: 96px;
  margin-top: 32px;
  gap: 64px;
  grid-gap: 64px;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
}
</style>
