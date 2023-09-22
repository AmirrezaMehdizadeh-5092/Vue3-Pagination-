<template>
  <div class="app">
    <h1 v-if="!list">لطفا صبر کیند</h1>

    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="deep-purple-accent-4"
    ></v-progress-linear>

    <v-card
      v-for="i in list"
      class="mx-auto"
      style="margin: 20px 0"
      max-width="344"
    >
      <router-link :to="'/food/' + i.id"
        ><v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          cover
        ></v-img
      ></router-link>

      <v-card-title>{{ i.title }}</v-card-title>
      <v-card-subtitle>{{ i.description }}</v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
          @click="
            loading = true;
            ShowP(i.id);
          "
        >
          SHOW
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <vue-awesome-paginate
      style="margin: 30px 0"
      v-if="list"
      :total-items="GetResponse.length"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "../plugin/pinia";
import axios from "axios";
import router from "../plugin/router";

export default {
  name: "HomeComp",
  created() {
    document.title = "Home Page";
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const start = ref("");
    const end = ref("");
    const newP = ref("");
    const list = ref([]);
    const loading = ref(false);

    const ShowP = (id) => {
      setTimeout(() => {
        router.push(`/food/${id}`);
      }, 1500);
    };

    watch(loading, (val) => {
      if (!val) return;
      setTimeout(() => {
        loading.value = false;
      }, 1250);
    });

    const onClickHandler = (page) => {
      currentPage.value = page;
      window.location.href = `/?page=${page}`;
    };

    const GetResponse = computed(() => {
      return store.GetResponse;
    });

    onMounted(() => {
      store.getMethod("products");
      const url = new URL(window.location);
      const param = new URLSearchParams(url.search);
      const pagee = param.get("page");
      newP.value = pagee;
      if (pagee == null) {
        newP.value = 1;
      }
      currentPage.value = newP.value;
      start.value = (newP.value - 1) * 5;
      end.value = start.value + 5;
      axios.get("https://fakestoreapi.com/products").then((response) => {
        for (let index = start.value; index < end.value; index++) {
          list.value.push(response.data[index]);
        }
      });
    });

    return {
      store,
      GetResponse,
      onClickHandler,
      currentPage,
      start,
      end,
      newP,
      list,
      ShowP,
      loading,
    };
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
