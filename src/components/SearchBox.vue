<template>
  <div class="search-box">
    <input
      :autofocus="!!focus"
      id="box"
      v-model="msg"
      placeholder="Search for a show to rank"
      :style="{
        minWidth:
          msg.length > 15
            ? 'min(calc(100vw - 256px), 1024px)'
            : 'min(calc(100vw - 256px), 420px)'
      }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import debounce from "debounce";
import axios from "axios";
// import { EventBus } from './event-bus.js';

@Component
export default class SearchBox extends Vue {
  msg = this.$store.state.searchTerm;

  refreshSearchResults(data: Array<any>): void {
    console.log("DATA", data);
    const mappedData = data.map(val => {
      return {
        id: val.id,
        title: `${val.name} (${val.year})`,
        link: val.poster_path
      };
    });
    this.$store.dispatch("updateSearchResults", mappedData);
  }

  updateResults(value: string) {
    this.$store.dispatch("updateSearchTerm", value);
    if (value.trim())
      axios
        .get(`tvsearch?search=${value}`)
        .then(result => this.refreshSearchResults(result.data));
  }

  @Prop({ required: true })
  public focus!: boolean;

  @Prop({ required: false, default: 1000 })
  public debounceTime!: number;

  @Watch("msg")
  onPropertyChanged = debounce(
    (value: string) => this.updateResults(value),
    this.debounceTime
  );
}
</script>

<style scoped>
#box {
  padding: 16px 24px 16px 24px;
  border: none;
  font-size: 32px;
  text-align: center;
  color: #282a36;
  -webkit-border-radius: 5px;
  border-radius: 100vh;
  outline: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 250ms, width 500ms;
}

#box:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

#box:focus {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
