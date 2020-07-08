<template>
  <div class="ranked-episode">
    <div id="main-info">
      <div id="img-area">
        <img-component
          id="img"
          ref="img"
          src="https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01.png"
        />
        <div id="rank">1</div>
      </div>
      <div id="description">
        <div id="title-section">
          <h1>Title</h1>
          <h2>S1 E2 · 2020-05-08</h2>
        </div>
        <p>This is an example description for an episode.</p>
      </div>
    </div>
    <!-- <h1>#1</h1> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgComponent from "@/components/ImgComponent.vue";

@Component({
  components: { ImgComponent },
})
export default class RankedEpisode extends Vue {
  public get imgLoaded() {
    return (this.$refs.img as ImgComponent).imgLoaded;
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap");

.ranked-episode {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
}

#main-info {
  display: flex;
  flex-direction: row;
}

#img-area {
  position: relative;
  margin: 0 16px;
}

#img {
  width: 20vw;
  max-width: 256px;
  border-radius: 16px;
}

#rank {
  position: absolute;
  left: 8px;
  top: 8px;
  justify-content: center;
  background-color: #282a36;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  font-size: 1.5em;
  width: 1.5em;
  height: 1.5em;
  font-family: "Hind Madurai", sans-serif;
  color: #bd93f9;
}

#description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#title-section {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

h1 {
  margin: 0 16px;
  font-family: "Hind Madurai", sans-serif;
}

h2 {
  margin: 0;
  font-size: 1em;
  font-family: "Hind Madurai", sans-serif;
}

p {
  margin: 0;
  margin-left: 16px;
  color: #ddcbf7bb;
}
</style>
