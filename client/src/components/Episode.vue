<template>
  <div class="container">
    <div class="episode">
      <img
        id="img"
        src="https://image.tmdb.org/t/p/w780/gz1hIpFhZB8tjsdYQQt9MGgPhI.jpg"
      />
      <div class="details">
        <h1>Chapter 1: The Mandalorian</h1>
        <h2>S01 E01 · 2019-11-12</h2>
        <p>
          A Mandalorian bounty hunter tracks a target for a well-paying client.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Episode extends Vue {
  @Prop({ required: false })
  public imgLink!: string;

  @Prop({ required: false })
  public title!: string;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap');

.episode {
  text-align: start;
  max-width: 33vw;
  transition: 200ms;
  border-radius: 16px;
  margin-bottom: 64px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #282a36;
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
  font-family: 'Hind Madurai', sans-serif;
  margin: 0;
}

h2 {
  font-family: 'Hind Madurai', sans-serif;
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
  max-width: calc(33vw - 16px);
  /* box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}
</style>
