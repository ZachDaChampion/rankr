<template>
  <div class="selector">
    <TitleArea id="title" />
    <SearchBox id="search" :focus="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import TitleArea from "@/components/TitleArea.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "Selector",
  components: {
    TitleArea,
    SearchBox
  }
};
</script>

<style scoped>
#title {
  position: sticky;
  top: calc(64px - 50vh);
  /* transform: translateY(-64px); */
}

#search {
  position: sticky;
  top: 64px;
  transform: translateY(-50%);
}
</style>
