<template>
  <form class="row g-3 needs-validation" novalidate>
    <h3 class="mt-5 mb-3">Login</h3>
    <hr />

    <div class="mb-3">
      <div class="mb-3">
        <label for="inputUsername" class="form-label"><b>Username:</b></label>
        <input
          type="text"
          class="form-control"
          id="inputUsername"
          required
          v-model="credentials.username"
        />
        <field-error-message
          :errors="errors"
          fieldName="username"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputPassword" class="form-label"><b>Password:</b> </label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          required
          v-model="credentials.password"
        />
        <field-error-message
          :errors="errors"
          fieldName="password"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button type="button" class="btn btn-primary px-5" @click.prevent="login">
        Login
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      errors: null,
    };
  },
  emits: ["login"],
  methods: {
    login() {
      this.errors = null;
      this.$axios
        .post("login", this.credentials)
        .then((response) => {
          this.$toast.success(
            "User " +
              this.credentials.username +
              " has entered the application."
          );
          this.$axios.defaults.headers.common.Authorization =
            "Bearer " + response.data.access_token;

          sessionStorage.setItem('token',response.data.access_token)
          
          this.$store.dispatch("refresh").then(() => {
            this.$emit("login");
            this.$router.push({ name: "Home" });
          });
        })
        .catch((error) => {
          delete this.$axios.defaults.headers.common.Authorization;
          this.$store.commit("resetUser");
          this.credentials.password = "";
          if (error.response.data.msg) {
            this.$toast.error(error.response.data.msg);
          } else {
            this.$toast.error("User credentials are invalid");
          }
        });
    },
  },
};
</script>
