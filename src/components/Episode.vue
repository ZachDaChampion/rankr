<template>
  <div class="container">
    <div class="episode">
      <img-component id="img" ref="img" :src="data.img" />
      <div class="details">
        <h1>{{ data.title }}</h1>
        <h2>S{{ data.season }} E{{ data.episode }} · {{ data.date }}</h2>
        <p>{{ data.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgComponent from "@/components/ImgComponent.vue";

@Component({
  components: { ImgComponent }
})
export default class Episode extends Vue {
  @Prop({ required: true })
  public data!: any;

  public get imgLoaded() {
    return (this.$refs.img as ImgComponent).imgLoaded;
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap");

.episode {
  text-align: start;
  width: 33vw;
  transition: 200ms;
  border-radius: 16px;
  margin-bottom: 64px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #383a59;
  /* background-color: #282a36; */
}

.episode:hover {
  cursor: pointer;
  transform: translateY(-16px);
  opacity: 0.65;
}

.details {
  transform: translateY(-16px);
  padding: 24px;
  padding-bottom: 8px;
  /* border-radius: 16px; */
  border-radius: 0 0 16px 16px;
}

h1 {
  font-family: "Hind Madurai", sans-serif;
  margin: 0;
}

h2 {
  font-family: "Hind Madurai", sans-serif;
  font-size: 1.1em;
  margin: 0;
  margin-bottom: 12px;
  opacity: 0.8;
}

p {
  margin: 0;
  color: #ddcbf7bb;
}

#img {
  margin: 8px;
  border-radius: 12px;
  /* border-radius: 16px 16px 0 0; */
  object-fit: cover;
  width: calc(33vw - 16px);
  /* box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}
</style>
