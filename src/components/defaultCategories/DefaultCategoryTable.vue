<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-if="showId"
          class="align-middle"
        >Id</th>
        <th
          v-if="showType"
          class="align-middle"
        >Type</th>
        <th class="align-middle">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="category in defaultCategories"
        :key="category.id"
      >
        <td
          v-if="showId"
          class="align-middle"
        >{{ category.id }}</td>
                <td
          v-if="showType"
          class="align-middle"
        > {{category.type == "C" ? "Credito" : "Debito"}} </td>
        <td class="align-middle">{{ category.name }}</td>
        <td class="text-end align-middle" v-if="showDeleteButton">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="deleteClick(category)"
            v-if="showDeleteButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
              style="margin: 0 0 0 0"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "DefaultCategoryTable",
  props: {
    defaultCategories: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showType: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["delete"],
  methods: {
    deleteClick(category) {
      this.$emit("delete", category);
    },
  },
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}

.img_photo {
  width: 3.2rem;
  height: 3.2rem;
}
</style>
