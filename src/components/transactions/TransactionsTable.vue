<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th class="align-middle">Reference</th>
        <th class="align-middle">Type</th>
        <th class="align-middle">Payment Type</th>
        <th class="align-middle">Category</th>
        <th class="align-middle">Date & Time</th>
        <th class="align-middle">Value</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(transaction, index) in transactions" v-bind:key="index">
        <tr>
          <td class="align-middle">
            {{ transaction.payment_reference }}
          </td>
          <td class="align-middle">
            {{ transaction.type == "C" ? "Credito" : "Debito" }}
          </td>

          <td class="align-middle">
            {{ transaction.payment_type }}
          </td>

          <td class="align-middle">
            {{ transaction.category ? transaction.category.name : "-" }}
          </td>

          <td class="align-middle">
            {{ transaction.datetime }}
          </td>

          <td class="align-middle">{{ transaction.value }} €</td>
          <td
            v-if="hasDescription(transaction)"
            class="align-middle"
            @click="toggle(index)"
            :class="{ opened: opened.includes(index) }"
          >
            <i
              class="dropdown-toggle"
              data-bs-toggle="collapse"
              :href="`#collapseExample_${index}`"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            ></i>
          </td>
          <td v-else></td>
        </tr>
        <tr v-if="opened.includes(index) && hasDescription(transaction)">
          <td colspan="6">
            <div class="card" style="width: 100%">
              <div class="card-body">
                <h5 class="card-title">Description</h5>

                <p class="card-text">{{ transaction.description }}</p>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "TransactionsTable",

  data() {
    return {
      opened: [],
    };
  },
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /*recipient(transaction) {
      if (transaction.payment_type == "VCARD") {
        return transaction.pair_Vcard_object.name;
      }
      return transaction.payment_type;
    },*/
    hasDescription(transaction) {
      if (transaction.description == null) {
        return false;
      }
      return true;
    },

    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
  },
  computed: {},
};
</script>