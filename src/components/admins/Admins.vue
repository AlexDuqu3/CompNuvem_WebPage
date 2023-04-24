<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Delete admin"
    :msg="`Do you really want to delete the admin ${adminToDeleteDescription}?`"
    @confirmed="deleteConfirmed"
  >
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Admins Managment</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalAdmins }}</h5>
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
          v-model="nameFilter"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filterByName"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin:0 0 0 0;"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectOwner" class="form-label">Filter by Email:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          maxlength="255"
          v-model="emailFilter"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filterByEmail"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin:0 0 0 0;"
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
        @click="addAdmin"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Admin
      </button>
    </div>
  </div>
  <admin-table :admins="admins" @delete="deleteAdmin" v-if="admins"></admin-table>
</template>

<script>
import AdminTable from "./AdminTable.vue";

export default {
  name: "Admins",
  components: {
    AdminTable,
  },
  data() {
    return {
      nameFilter: null,
      emailFilter: null,
      adminToDelete: null,
    };
  },
  computed: {
    admins () {
      return this.$store.getters.admins
    },
    totalAdmins() {
      return this.$store.getters.totalAdmins;
    },
    adminToDeleteDescription() {
      return this.adminToDelete
        ? `#${this.adminToDelete.id} (${this.adminToDelete.name})`
        : "";
    },
  },
  methods: {
    filterByName() {
      if(this.nameFilter){
        this.$axios.get("admins/filterByName/" + this.nameFilter)
        .then((response) => {
          this.$store.commit('setAdmins', response.data.data)
          this.nameFilter = null
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
              "Error trying to filter Admins."
            );
          this.nameFilter = null
          this.$store.dispatch('loadAdmins')
        })
      } else {
        this.$store.dispatch('loadAdmins')
      }
    },
    filterByEmail() {
      if(this.emailFilter){
        this.$axios.get("admins/filterByEmail/" + this.emailFilter)
        .then((response) => {
          this.$store.commit("setAdmins", response.data.data)
          this.emailFilter = null
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
              "Error trying to filter Admins."
            );
          this.emailFilter = null
          this.$store.dispatch('loadAdmins')
        })
      } else {
        this.$store.dispatch('loadAdmins')
      }
    },
    addAdmin() {
      this.$router.push({ name: "NewAdmin" });
    },
    deleteConfirmed() {
      this.$store.dispatch("deleteAdmin", this.adminToDelete).catch((error) => {
        console.log(error);
      });
    },
    deleteAdmin(admin) {
      this.adminToDelete = admin;
      let dlg = this.$refs.confirmationDialog;
      dlg.show();
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
