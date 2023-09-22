<template>
    <div class="app">
      <span>{{GetResponse}}</span>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from "vue";
  import { useStore } from "../plugin/pinia";
  
  export default {
    name: "AboutComp",
    setup() {
      const store = useStore();
      const GetResponse = computed(() => {
        return store.GetResponse;
      });
      onMounted(() => {
        store.getMethod('products/1');
      });
      return {
        store,
        GetResponse,
      };
    },
  };
  </script>
  