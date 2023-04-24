<template>
  <div class="container">
    <h1>Access your Vcard</h1>
    <p>Please fill in this Form to create a vCard</p>
    <hr />

    <p v-if="this.errors">
      <b class="text-danger">Please correct the following error(s):</b>
    </p>

    <div>
      <label for="phoneN"><b>Phone Number: </b></label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Phone Number"
        name="phone_number"
        id="phone_number"
        required
        v-model="vCard.phone_number"
      />
      <small class="form-text text-danger" v-if="this.errors.phone_number">{{
        this.errors.phone_number[0]
      }}</small>
      <p></p>
      <label for="psw"><b>Password: </b></label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter Password"
        name="psw"
        id="psw"
        required
        v-model="vCard.password"
      />
      <small class="form-text text-danger" v-if="this.errors.password">{{
        this.errors.password[0]
      }}</small>
      <p></p>
      <label for="email"><b>Email:</b></label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Email"
        name="email"
        id="email"
        required
        v-model="vCard.email"
      />
      <small class="form-text text-danger" v-if="this.errors.email">{{
        this.errors.email[0]
      }}</small>
      <p></p>
      <label for="name"><b>Name:</b></label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Name"
        name="name"
        id="name"
        required
        v-model="vCard.name"
      />
      <small class="form-text text-danger" v-if="this.errors.name">{{
        this.errors.name[0]
      }}</small>
      <p></p>
      <label for="confirmationCode"><b>Confirmation Code: </b></label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter Confirmation code"
        name="code"
        id="code"
        required
        v-model="vCard.confirmation_code"
      />
      <small
        class="form-text text-danger"
        v-if="this.errors.confirmation_code"
        >{{ this.errors.confirmation_code[0] }}</small
      >
      <p></p>

      <div class="mb-3 d-flex justify-content-center">
        <button
          @click.prevent="savevCard"
          type="button"
          class="btn btn-primary px-5"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      errors: false,
      vCard: {
        phone_number: "",
        name: "",
        email: "",
        password: "",
        confirmation_code: "",
        blocked: 0,
        balance: 0.0,
        max_debit: 5000.0,
      },
    };
  },
  methods: {
    savevCard() {
      this.errors = false;
      this.$axios
        .post("vcards", this.vCard)
        .then((response) => {
          this.$toast.success(
            "User " + response.data.data.name + " was successfully created."
          );
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
/*input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}*/

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04aa6d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}

/*input {
  border-bottom: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}*/

li {
  font-size: 0.8rem;
  text-align: left;
  color: red;
  border-top: 0px;
  margin-top: 0px;
  padding-top: 0px;
}
</style>