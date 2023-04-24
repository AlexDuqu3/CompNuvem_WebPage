<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Default Categories Managment</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalDefaultCategories }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by Name:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          maxlength="255"
          v-model="filters.nameFilter"
          style="width:36.5vw;"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin: 0 0 0 0"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectOwner" class="form-label">Filter by Type:</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <select
            class="form-select"
            id="selectStatus"
            v-model="filters.typeFilter"
            style="width: 20vw"
          >
            <option selected v-bind:value="null">None</option>
            <option value="C">Credit</option>
            <option value="D">Debit</option>
          </select>
        </div>
        <button class="btn btn-outline-secondary" type="button" @click="filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin: 0 0 0 0"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addDefaultCategory"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Category
      </button>
    </div>
  </div>
  <defaultCategory-table
  v-if="categories"
    :defaultCategories="categories"
    @delete="deleteDefaultCategory"
  ></defaultCategory-table>
</template>

<script>
import DefaultCategoryTable from "./DefaultCategoryTable.vue";

export default {
  name: "DefaultCategory",
  components: {
    DefaultCategoryTable,
  },
  data() {
    return {
      //categories: [],
      filters: {
        nameFilter: null,
        typeFilter: null,
      },
    };
  },
  /*mounted() {
    this.categories = this.$store.getters.defaultCategories;
  },*/
  computed: {
    categories () {
      return this.$store.getters.defaultCategories
    },
    totalDefaultCategories() {
      return this.$store.getters.totalDefaultCategories;
    },
  },
  methods: {
    addDefaultCategory() {
      this.$router.push({ name: "NewDefaultCategory" });
    },
    filter() {
      if (this.filters.nameFilter || this.filters.typeFilter) {
        this.$axios
          .post("categories/default/filter", this.filters)
          .then((response) => {
            //this.categories = response.data.data;
            this.$store.commit('setDefaultCategories', response.data.data)
            this.filters = {
              nameFilter: null,
              typeFilter: null,
            };
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error("Error trying to filter Default Categories.");
            this.filters = {
              nameFilter: null,
              typeFilter: null,
            };
            //this.categories = this.$store.getters.defaultCategories;
            this.$store.dispatch('loadDefaultCategories')
          });
      } else {
        //this.categories = this.$store.getters.defaultCategories;
        this.$store.dispatch('loadDefaultCategories')
      }
    },
    deleteDefaultCategory(category) {
      this.$store.dispatch("deleteDefaultCategory", category).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>
