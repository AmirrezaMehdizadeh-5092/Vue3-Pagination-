<template>
  <h1>Product id : {{ GetProductId }}</h1>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const GetProductId = computed(() => {
      return route.params.id;
    });
    return {
      route,
      GetProductId,
    };
  },
};
</script>
