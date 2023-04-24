<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="create">
    <h3 class="mt-5 mb-3">Making Credit Transaction</h3>
    <hr />
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-lg-7">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="w-100 pe-4">
                <div class="mb-3">
                  <label for="inputPaymentType" class="form-label"
                    >Payment Type</label
                  >
                  <select
                    class="form-select"
                    id="selectStatus"
                    v-model="makeCreditTransaction.payment_type"
                    
                  >
                    <option
                      v-for="item in paymentTypes"
                      :key="item.code"
                      v-bind:value="item.code"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <field-error-message
                    :errors="errors"
                    fieldName="payment_type"
                  ></field-error-message>
                </div>

                <div class="mb-3">
                  <label for="inputReference" class="form-label"
                    >Sender Reference</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="inputReference"
                    placeholder="Reference"
                    required
                    v-model="makeCreditTransaction.payment_reference"
                  />
                  <field-error-message
                    :errors="errors"
                    fieldName="reference"
                  ></field-error-message>
                </div>

                <div class="mb-3">
                  <label for="inputValue" class="form-label">Value</label>
                  <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="inputValue"
                    placeholder="0.00"
                    required
                    v-model="makeCreditTransaction.value"
                  />
                  <span class="input-group-text">€</span>
                  </div>
                  <field-error-message
                    :errors="errors"
                    fieldName="value"
                  ></field-error-message>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 mb-lg-0 mb-3" style="background: #f1f1f1">
            <div class="d-flex justify-content-between p-3">
              <div class="d-flex flex-column">
                <span>Payment Type: </span>
              </div>
              <div class="mt-1">
                <span
                  >{{
                    this.makeCreditTransaction.payment_type
                      ? this.makeCreditTransaction.payment_type
                      : "None Selected"
                  }}
                  </span
                >
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex justify-content-between mb-2">
                <span>Sending from: </span>
                <span>
                  {{
                    this.makeCreditTransaction.payment_reference
                      ? this.makeCreditTransaction.payment_reference
                      : "No Reference"
                  }}
                  </span
                >
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex justify-content-between mb-2">
                <span>Sending to: </span>
                <span>
                  {{
                    this.makeCreditTransaction.vcard
                      ? this.makeCreditTransaction.vcard
                      : "No Vcard"
                  }}
                  </span
                >
              </div>
            </div>
            <div class="p-3 d-flex justify-content-between">
              <div class="d-flex flex-column">
                <span>Value: </span>
              </div>
              <span>{{ this.makeCreditTransaction.value ? this.makeCreditTransaction.value
                      : "0.00" }} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-end">
      <button type="button" class="btn btn-primary px-5" @click="save">
        Save
      </button>
      <button type="button" class="btn btn-secondary px-5" @click="cancel" style="margin-left: 0.5vw; margin-right:1vw;">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AdminDetail",
  components: {},
  props: {
    creditTransaction: {
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
      makeCreditTransaction: this.creditTransaction,
    };
  },
  computed: {
    paymentTypes() {
      return this.$store.getters.paymentTypes;
    },
  },
  methods: {
    save() {
      this.$emit("save", this.makeCreditTransaction);
    },
    cancel() {
      this.$emit("cancel", this.makeCreditTransaction);
    },
  },
};
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
</style>
