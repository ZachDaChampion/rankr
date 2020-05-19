<template>
  <div class="search-box">
    <input
      id="box"
      v-model="msg"
      placeholder="Search for a show to rank"
      :style="{ width: msg.length > 14 ? 'calc(100% - 256px)' : '420px' }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SearchBox extends Vue {
  msg = "";
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
  transform: translateY(50%);
  transition: 250ms, width 500ms;
}

#box:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

#box:focus {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
