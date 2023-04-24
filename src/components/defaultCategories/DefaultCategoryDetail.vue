<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="create">
    <h3 class="mt-5 mb-3">Creating Admin</h3>
    <hr />
    <div class="d-flex flex-wrap justify-content-between">
      <div class="w-100 pe-4">
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Admin Name"
            required
            v-model="createDefaultCategory.name"
          />
          <field-error-message
            :errors="errors"
            fieldName="name"
          ></field-error-message>
        </div>

        <div class="mb-3 px-1">
          <label for="inputEmail" class="form-label">Email</label>
          <select
            class="form-select"
            id="selectStatus"
            v-model="createDefaultCategory.type"
            style="width:20vw;"
          >
            <option selected v-bind:value="C">Credit</option>
            <option selected value="D">Debit</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-end">
      <button type="button" class="btn btn-primary px-5" @click="save">
        Save
      </button>
      <button type="button" class="btn btn-light px-5" @click="cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "DefaultCategoryDetail",
  components: {},
  props: {
    defaultCategory: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      createDefaultCategory: this.defaultCategory,
    };
  },
  methods: {
    save() {
      this.$emit("save", this.createDefaultCategory);
    },
    cancel() {
      this.$emit("cancel", this.createDefaultCategory);
    },
  },
};
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
</style>
