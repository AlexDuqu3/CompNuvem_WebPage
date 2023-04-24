<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Discard changes and leave"
    msg="Do you really want to leave? You have unsaved changes!"
    @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <creditTransaction-detail
    :creditTransaction="creditTransaction"
    :errors="errors"
    @save="makeCreditTransaction"
    @cancel="cancel"
  ></creditTransaction-detail>
</template>

<script>
import CreditTransactionDetail from "./CreditTransactionDetail.vue";

export default {
  name: "CreditTransaction",
  components: {
    CreditTransactionDetail,
  },
  props: {
    phone_number: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      creditTransaction: {
        vcard: this.phone_number,
        payment_reference: null,
        value: null,
        confirmation_code: null,
        category_id: null,
        payment_type: null,
        description: null,
      },
      errors: null,
    };
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.creditTransaction);
    },
    makeCreditTransaction() {
      this.errors = null;
      this.$store
        .dispatch("insertCreditTransaction", this.creditTransaction)
        .then((creditTransaction) => {
          this.$toast.success(
            "Credit Transaction to #" +
              creditTransaction.vcard +
              " was done successfully."
          );
          this.creditTransaction = creditTransaction;
          this.originalValueStr = this.dataAsString();
          this.$router.back();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
            if (this.errors.vcard) {
              this.$toast.error(this.errors.vcard);
            } else {
              this.$toast.error(
                "Credit Transaction failed due to validation errors!"
              );
            }
          } else {
            this.$toast.error(
              "Credit Transaction failed due to unknown server error!"
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
