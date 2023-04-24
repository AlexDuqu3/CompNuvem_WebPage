<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Payment Types Managment</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalPaymentTypes }}</h5>
    </div>
  </div>
  <hr />
  <paymentType-table
    :paymentTypes="$store.getters.paymentTypes"
    @edit="editPaymentType"
  ></paymentType-table>
</template>

<script>
import PaymentTypeTable from "./PaymentTypeTable.vue"

export default {
  name: 'PaymentTypes',
  components: {
    PaymentTypeTable
  },
  computed: {
    totalPaymentTypes () {
      return this.$store.getters.totalPaymentTypes
    }
  },
}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>
