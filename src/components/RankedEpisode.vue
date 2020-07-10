<template>
  <div class="ranked-episode" v-if="data">
    <div id="main-info">
      <div id="img-area">
        <img-component id="img" ref="img" :src="data.img" />
        <div id="rank">{{ rank }}</div>
      </div>
      <div id="description">
        <div id="title-section">
          <h1>{{ data.title }}</h1>
          <h2>S{{ data.season }} E{{ data.episode }} · {{ data.date }}</h2>
        </div>
        <p>{{ data.overview }}</p>
        <!-- <h3 id="rating">Rating: {{ rating }}</h3> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgComponent from "@/components/ImgComponent.vue";
import axios from "axios";

@Component({
  components: { ImgComponent },
})
export default class RankedEpisode extends Vue {
  @Prop({ required: true })
  public showId!: string;

  @Prop({ required: false })
  public season!: number;

  @Prop({ required: false })
  public number!: number;

  @Prop({ required: false })
  public rank!: number;

  @Prop({ required: false })
  public rating!: number;

  @Prop({ required: false })
  public index!: number;

  public data: any = {};

  public get imgLoaded() {
    return (this.$refs.img as ImgComponent).imgLoaded;
  }

  get lookup() {
    return this.$store.getters.getComparisons(this.showId).lookup;
  }

  created() {
    if (
      this.$store.getters.getCached(
        `epData-${this.showId}-${this.season}-${this.number}`
      )
    )
      this.data = this.$store.getters.getCached(
        `epData-${this.showId}-${this.season}-${this.number}`
      );
    else
      axios
        .get(
          `http://localhost:3000/episode?show=${this.showId}&s=${this.season}&e=${this.number}&imgsize=w500`
        )
        .then((res) => (this.data = res.data));
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

#rating {
  margin: 0;
  font-size: 0.8em;
  margin-left: 16px;
  color: #ddcbf7bb;
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
  text-align: start;
}

h2 {
  margin: 0;
  font-size: 1em;
  font-family: "Hind Madurai", sans-serif;
  text-align: start;
}

p {
  margin: 0;
  margin-left: 16px;
  color: #ddcbf7bb;
  text-align: start;
}
</style>
