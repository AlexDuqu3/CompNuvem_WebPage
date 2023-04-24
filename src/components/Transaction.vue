<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Send Money</h3>
    </div>
  </div>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-lg-7">
            <form class="form" v-on:submit="debitTransaction">
              <div class="form-group row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Reference</label>
                    <input
                      type="text"
                      placeholder=""
                      class="form-control"
                      name="payment_reference"
                      id="payment_reference"
                      required
                      v-model="transaction.payment_reference"
                    />
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.payment_reference"
                      >{{ this.errors.payment_reference[0] }}</small
                    >
                  </div>
                </div>
                <p></p>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="form__label">Value</label>
                    <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="0.00"
                      name="value"
                      id="value"
                      required
                      v-model="transaction.value"
                    />
                    <span class="input-group-text">€</span>
                  </div>
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.value"
                      >{{ this.errors.value[0] }}</small
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="form__div">
                    <label for="" class="form__label">Confirmation Code</label>
                    <input
                      type="password"
                      class="form-control"
                      name="confirmation_code"
                      id="confirmation_code"
                      required
                      v-model="transaction.confirmation_code"
                    />
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.confirmation_code"
                      >{{ this.errors.confirmation_code[0] }}</small
                    >
                  </div>
                </div>
                <p></p>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" style="margin-bottom: 5px;">Payment Type</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="transaction.payment_type"
                      required
                    >
                      <option
                        v-for="item in paymentTypes"
                        :key="item.code"
                        v-bind:value="item.code"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.payment_type"
                      >{{ this.errors.payment_type[0] }}</small
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="form__label" style="margin-bottom: 5px;">Category <small>(Optional)</small></label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="transaction.category_id"
                    >
                      <option selected v-bind:value="null">None</option>
                      <option
                        v-for="item in debitCategories"
                        :key="item.id"
                        v-bind:value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.category_id"
                      >{{ this.errors.category_id[0] }}</small
                    >
                  </div>
                </div>
                <p></p>
                <div class="col-12">
                  <div class="form-group">
                    <label for="" class="form__label">Description <small>(Optional)</small></label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      v-model="transaction.description"
                    />
                    <small
                      id="referenceError"
                      class="form-text text-danger"
                      v-if="this.errors.descritpion"
                      >{{ this.errors.description[0] }}</small
                    >
                  </div>
                </div>
                <p></p>
                <div class="col-12">
                  <button
                    @click.prevent="debitTransaction"
                    type="submit"
                    class="btn btn-primary w-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <p></p>
          </div>

          <div class="col-lg-5 mb-lg-0 mb-3" style="background: #f1f1f1">
            <!--<span>Summary</span>-->
            <p></p>

             <div class="d-flex justify-content-between p-3">
              <div class="d-flex flex-column">
                <span>Sending to: </span>
              </div>
              <div class="mt-1">
                <span> {{ this.transaction.payment_reference ? this.transaction.payment_reference : 'None Inserted' }} </span>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex justify-content-between mb-2">
                <span>Payment Type: </span> <span> {{this.transaction.payment_type ? this.transaction.payment_type : 'None Selected'}}</span>
              </div>
            </div>
              <hr class="mt-0 line" style="border: 2px solid white;margin:0px 0px 0px 0px;"/>
            <div class="d-flex justify-content-between p-3">
              <div class="d-flex flex-column">
                <span>Current Balance: </span>
              </div>
              <div class="mt-1">
                <span>{{ vcardBalance }} €</span>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex justify-content-between mb-2">
                <span>Sending Value: </span> <span> - {{this.transaction.value ? this.transaction.value : 0}} €</span>
              </div>
            </div>
            <div class="p-3 d-flex justify-content-between">
              <div class="d-flex flex-column">
                <span>After Balance: </span>
              </div>
              <span>{{vcardBalance - this.transaction.value}} €</span>
            </div>
          </div>
        </div>
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
      debitTransactionFeedback: false,
      transaction: {
        vcard: this.$store.state.vcard ? this.$store.state.vcard.phone_number : null,
        payment_reference: null,
        value: null,
        confirmation_code: null,
        category_id: null,
        payment_type: null,
        description: null,
      },
    };
  },
  computed: {
    vcardBalance (){
      return this.$store.state.vcard.balance
    },
    debitCategories (){
      return this.$store.state.categories ? this.$store.getters.debitCategories : null
    },
    paymentTypes (){
      return this.$store.state.paymentTypes ? this.$store.getters.paymentTypes : null
    }
  },
  methods: {
    debitTransaction () {
      this.errors = false;
      this.debitTransactionFeedback = false;

      this.$store
        .dispatch("insertTransaction", this.transaction)
        .then((response) => {
          this.$socket.emit('newTransaction',this.transaction)
          this.debitTransactionFeedback = response.data[0];
          this.transaction.payment_reference = null
          this.transaction.value = null
          this.transaction.category_id= null
          this.transaction.payment_type = null
          this.transaction.description = null
          this.transaction.confirmation_code = null
          this.$toast.success(
            "Success! " +
              this.debitTransactionFeedback.value +
              " € was sent to " +
              this.debitTransactionFeedback.payment_reference +
              "."
          );
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.transaction.confirmation_code = null
          this.$toast.error("Transaction failed! Please check the errors.");
        });
    },
  },
};
</script>

<style scoped>

</style>
