<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId" class="align-middle">Id</th>
        <th class="align-middle">Name</th>
        <th v-if="showEmail" class="align-middle">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="admin in admins" :key="admin.id">
        <td v-if="showId" class="align-middle">{{ admin.id }}</td>
        <td class="align-middle">{{ admin.name }}</td>
        <td v-if="showEmail" class="align-middle">{{ admin.email }}</td>
        <td class="text-end align-middle" v-if="showDeleteButton">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="deleteClick(admin)"
            v-if="showDeleteButton && $store.state.user.id != admin.id"
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
  name: "AdminTable",
  props: {
    admins: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showEmail: {
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
    deleteClick(admin) {
      this.$emit("delete", admin);
    },
  },
};
</script>

<style scoped>
/*button {
  margin-left: 3px;
  margin-right: 3px;
}*/

.img_photo {
  width: 3.2rem;
  height: 3.2rem;
}
</style>
