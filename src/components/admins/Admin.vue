<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Discard changes and leave"
    msg="Do you really want to leave? You have unsaved changes!"
    @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <admin-detail
    :admin="admin"
    :errors="errors"
    @save="save"
    @cancel="cancel"
  ></admin-detail>
</template>

<script>
import AdminDetail from "./AdminDetail.vue";

export default {
  name: "Admin",
  components: {
    AdminDetail,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      admin: this.newAdmin(),
      errors: null,
    };
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler(newValue) {
        this.loadAdmin(newValue);
      },
    },
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.admin);
    },
    newAdmin() {
      return {
        id: null,
        name: "",
        email: "",
      };
    },
    loadAdmin(id) {
      this.errors = null;
      if (!id || id < 0) {
        this.admin = this.newAdmin();
        this.originalValueStr = this.dataAsString();
      } else {
        this.$axios
          .get("admins/" + id)
          .then((response) => {
            this.admin = response.data.data;
            this.originalValueStr = this.dataAsString();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    save() {
      this.errors = null;
      this.$store
        .dispatch("insertAdmin", this.admin)
        .then((admin) => {
          this.$toast.success(
            "Admin #" + admin.id + " was created successfully."
          );
          this.admin = admin;
          this.originalValueStr = this.dataAsString();
          this.$router.back();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$toast.error(
              "Admin was not created due to validation errors!"
            );
            this.errors = error.response.data.errors;
          } else {
            this.$toast.error(
              "Admin was not created due to unknown server error!"
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
