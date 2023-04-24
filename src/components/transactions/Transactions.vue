<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Transactions Managment</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalTransactions }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label"
        >Filter by {{ filters.searchFilter.name }}:</label
      >
      <div class="input-group">
        <div class="input-group-prepend">
          <input
            type="text"
            class="form-control"
            :placeholder="filters.searchFilter.name"
            maxlength="255"
            v-model="filters.searchFilter.value"
            style="width: 35vw"
          />
        </div>
        <select
          class="costum-select"
          id="inputGroupSelect01"
          v-model="filters.searchFilter.name"
        >
          <option selected value="vcard">Vcard</option>
          <option value="payment_reference">Reference</option>
        </select>
        <button class="btn btn-outline-secondary" type="button" @click="filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin: 0 0 0 0"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label"
        >Filter by {{ filters.typeFilter.type }}:</label
      >
      <div class="input-group">
        <div class="input-group-prepend">
          <select
            class="form-select"
            id="selectStatus"
            v-if="filters.typeFilter.type == 'payment_type'"
            v-model="filters.typeFilter.value"
            style="width: 20vw"
          >
            <option selected v-bind:value="null">None</option>
            <option
              v-for="item in getPaymentTypes"
              :key="item.code"
              v-bind:value="item.code"
            >
              {{ item.name }}
            </option>
          </select>
          <select
            class="form-select"
            id="selectStatus"
            v-else
            v-model="filters.typeFilter.value"
            style="width: 20vw"
          >
            <option selected v-bind:value="null">None</option>
            <option value="C">Credit</option>
            <option value="D">Debit</option>
          </select>
        </div>
        <select
          class="costum-select"
          id="inputGroupSelect01"
          v-model="filters.typeFilter.type"
        >
          <option selected value="type">Type</option>
          <option value="payment_type">Payment Type</option>
        </select>
        <button class="btn btn-outline-secondary" type="button" @click="filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin: 0 0 0 0"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <transactions-table
    v-if="transactions"
    :transactions="transactions"
  ></transactions-table>
  <!--<div v-else class="loader"></div> loader enquanto da refresh da store -->
</template>

<script>
import TransactionsTable from "./TransactionsTable.vue";

export default {
  name: "Transactions",
  components: {
    TransactionsTable,
  },
  data() {
    return {
      errors: null,
      filters: {
        searchFilter: {
          name: "vcard",
          value: null,
        },
        typeFilter: {
          type: "type",
          value: null,
        },
      },
    };
  },
  /*mounted() {
    this.transactions = this.$store.getters.transactions;
  },*/
  computed: {
    transactions() {
      return this.$store.getters.transactions;
    },
    getPaymentTypes() {
      return this.$store.getters.paymentTypes;
    },
    totalTransactions() {
      return this.$store.getters.totalTransactions;
    },
  },
  methods: {
    filter() {
      if (this.filters.searchFilter.value || this.filters.typeFilter.value) {
        console.log(this.filters);
        this.$axios
          .post("transactions/filterTransactions", this.filters)
          .then((response) => {
            this.$store.commit("setTransactions", response.data.data)
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error("Error trying to search/filter transactions.");
            this.filters = {
              searchFilter: {
                name: "vcard",
                value: null,
              },
              typeFilter: {
                type: null,
                value: null,
              },
            };
            this.$store.dispatch("loadTransactions")
          });
      } else {
        this.$store.dispatch("loadTransactions")
      }
    },
  },
};
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

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>