<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="changePassword"
  >
    <h3 class="mt-5 mb-3">Change Password</h3>
    <hr>
    <div class="mb-3">
      <div class="mb-3">
        <label
          for="inputCurrentPassword"
          class="form-label"
        ><b>Current Password</b></label>
        <input
          type="password"
          class="form-control"
          id="inputCurrentPassword"
          required
          v-model="passwords.current_password"
        >
        <field-error-message
          :errors="errors"
          fieldName="current_password"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label
          for="inputPassword"
          class="form-label"
        ><b>New Password:</b></label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          required
          v-model="passwords.password"
        >
        <field-error-message
          :errors="errors"
          fieldName="password"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label
          for="inputPasswordConfirm"
          class="form-label"
        ><b>Password Confirmation:</b></label>
        <input
          type="password"
          class="form-control"
          id="inputPasswordConfirm"
          required
          v-model="passwords.password_confirm"
        >
        <field-error-message
          :errors="errors"
          fieldName="password_confirm"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-primary px-5"
        @click="changePassword"
      >Change Password</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      passwords: {
        current_password: null,
        password: null,
        password_confirm: null
      },
      errors: null,
    }
  },
  emits: [
    'changedPassword',
  ],
  methods: {
    changePassword () {
      this.errors = false;
      this.$axios
        .put("changePassword", this.passwords)
        .then((response) => {
          this.$toast.success(
            "Password of " + response.data.data.name + " was successfully changed."
          );
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
      this.$emit('changedPassword')
    },
  }
}
</script>

<style scoped>
</style>
