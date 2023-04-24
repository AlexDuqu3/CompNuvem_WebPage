<template>
  <!-- Button trigger to Show modal - HIDDEN -->
  <button
    ref="hiddenButtonToShowMaxDebit"
    type="button"
    class="d-none"
    data-bs-toggle="modal"
    data-bs-target="#confirmationModalMaxDebit"
  ></button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmationModalMaxDebit"
    tabindex="-1"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <!-- Button trigger to Hide modal - HIDDEN -->
      <button
        ref="hiddenButtonToHideDialog"
        type="button"
        class="d-none"
        data-bs-dismiss="modal"
      ></button>

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmationModalLabel">
            Edit Max Debit
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mx-2 mt-2 flex-grow-1 filter-div">
            <label for="selectStatus" class="form-label"
              >Insert the new max value:</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Max Value"
                maxlength="10"
                v-model="newValue"
              />
              <span class="input-group-text">€</span>
            </div>
            <field-error-message
            :errors="errors"
            fieldName="name"
          ></field-error-message>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ cancelBtn }}
          </button>
          <button type="button" class="btn btn-primary" @click="clickConfirm(newValue)">
            {{ confirmationBtn }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditMaxDebit",
  props: {
    cancelBtn: {
      type: String,
      default: "Cancel",
    },
    confirmationBtn: {
      type: String,
      default: "Confirm",
    },
  },
  data() {
    return {
      newValue: null,
      errors: null
    };
  },
  emits: ["show", "hide", "save"],
  methods: {
    show() {
      //Easy way to show the modal:
      console.log("ENTERED HERE?");
      let btnToShowModal = this.$refs.hiddenButtonToShowMaxDebit;
      btnToShowModal.click();
      this.$emit("show");
    },
    hide() {
      //Easy way to hide the modal:
      let btnToHideModal = this.$refs.hiddenButtonToHideDialog;
      btnToHideModal.click();
      this.$emit("hide");
    },
    clickConfirm(newMaxDebit) {
      this.errors = null
      if (newMaxDebit > 0) {
        this.errors = null
        this.hide();
        this.$emit("save", newMaxDebit);
      } else {
        this.errors = {name: ["Value must be a number higher than 0."]}
      }
    },
  },
};
</script>