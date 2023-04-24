<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Discard changes and leave"
    msg="Do you really want to leave? You have unsaved changes!"
    @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <defaultCategory-detail
    :defaultCategory="defaultCategory"
    :errors="errors"
    @save="save"
    @cancel="cancel"
  ></defaultCategory-detail>
</template>

<script>
import DefaultCategoryDetail from "./DefaultCategoryDetail.vue";

export default {
  name: "DefaultCategory",
  components: {
    DefaultCategoryDetail,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      defaultCategory: {
        name: null,
        type: null,
      },
      errors: null,
    };
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.defaultCategory);
    },
    save() {
      this.errors = null;
      this.$store
        .dispatch("insertDefaultCategory", this.defaultCategory)
        .then((defaultCategory) => {
          this.$toast.success(
            "Default Category #" +
              defaultCategory.id +
              " was added successfully."
          );
          this.defaultCategory = defaultCategory;
          this.originalValueStr = this.dataAsString();
          this.$router.back();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$toast.error(
              "Default Category was not created due to validation errors!"
            );
            this.errors = error.response.data.errors;
          } else {
            this.$toast.error(
              "Default Category was not created due to unknown server error!"
            );
          }
        });
    },
    cancel() {
      // Replace this code to navigate back
      // this.loadUser(this.id)
      this.$router.back();
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack();
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null;
    let newValueStr = this.dataAsString();
    if (this.originalValueStr != newValueStr) {
      this.nextCallBack = next;
      let dlg = this.$refs.confirmationDialog;
      dlg.show();
    } else {
      next();
    }
  },
};
</script>
