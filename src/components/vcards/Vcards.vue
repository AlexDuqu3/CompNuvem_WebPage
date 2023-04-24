<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Delete vcard"
    :msg="`Do you really want to delete the vcard ${ vcardToDeleteDescription }?`"
    @confirmed="deleteConfirmed"
  >
  </confirmation-dialog>
  <edit-max-debit
    ref="editMaxDebit"
    confirmationBtn="Save Max Debit"
    @save="saveMaxDebit"
  >
  </edit-max-debit>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Vcards Managment</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalVcards }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by Phone Number:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Phone Number"
          maxlength="9"
          v-model="phoneFilter"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filterByPhone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin:0 0 0 0;"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by Name:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          maxlength="255"
          v-model="nameFilter"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filterByName"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin:0 0 0 0;"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectOwner" class="form-label">Filter by Email:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          maxlength="255"
          v-model="emailFilter"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="filterByEmail"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            style="margin:0 0 0 0;"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <vcard-table
    v-if="vcards"
    :vcards="vcards"
    @delete="deleteVcard"
    @blockUnblock="blockUnblockVcard"
    @edit="editMaxDebitVcard"
    @credit="makeCreditTransaction"
  ></vcard-table>
</template>

<script>
import EditMaxDebit from './EditMaxDebit.vue'
import VcardTable from "./VcardTable.vue"

export default {
  name: 'Vcards',
  components: {
    VcardTable,
    EditMaxDebit
  },
  data () {
    return {
      //vcards: [],
      phoneFilter: null,
      nameFilter: null,
      emailFilter: null,
      vcardToDelete: null,
      vcardToUpdate: null,
    }
  },
  /*mounted () {
    this.vcards = this.$store.getters.vcards
  },*/
  computed: {
    vcards () {
      return this.$store.getters.vcards
    },
    totalVcards () {
      return this.$store.getters.totalVcards
    }
  },
  methods: {
    makeCreditTransaction (vcard) {
      console.log("Vcards: " + vcard.phone_number)
      this.$router.push({ name: 'NewCreditTransaction', params: { phone_number: vcard.phone_number } })
    },
    deleteConfirmed() {
      this.$store.dispatch("deleteVcard", this.vcardToDelete).catch((error) => {
        console.log(error);
      });
    },
    deleteVcard(vcard) {
      this.vcardToDelete = vcard;
      let dlg = this.$refs.confirmationDialog;
      dlg.show();
    },
    saveMaxDebit(newMaxDebit) {
      this.vcardToUpdate.max_debit = newMaxDebit
      this.$store.dispatch("updateVcard", this.vcardToUpdate).catch((error) => {
        console.log(error);
      });
    },
    editMaxDebitVcard(vcard) {
      this.vcardToUpdate = vcard;
      console.log(this.$refs)
      let dlg = this.$refs.editMaxDebit;
      dlg.show();
    },
    blockUnblockVcard(vcard) {
      this.$store.dispatch("blockUnblockVcard", vcard).catch((error) => {
        console.log(error);
      });
    },
    filterByPhone() {
      if(this.phoneFilter){
        this.$axios.get("vcards/filterByPhone/" + this.phoneFilter)
        .then((response) => {
          //this.vcards = response.data.data
          this.$store.commit('setVcards', response.data.data)
          this.phoneFilter = null
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
              "Error trying to search " + this.phoneFilter + "."
            );
          this.phoneFilter = null
          //this.vcards = this.$store.getters.vcards
          this.$store.dispatch('loadVcards')
        })
      } else {
        //this.vcards = this.$store.getters.vcards
        this.$store.dispatch('loadVcards')
      }
    },
    filterByName() {
      if(this.nameFilter){
        this.$axios.get("vcards/filterByName/" + this.nameFilter)
        .then((response) => {
          //this.vcards = response.data.data
          this.$store.commit('setVcards', response.data.data)
          this.nameFilter = null
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
              "Error trying to search " + this.nameFilter + "."
            );
          this.nameFilter = null
          //this.vcards = this.$store.getters.vcards
          this.$store.dispatch('loadVcards')
        })
      } else {
        //this.vcards = this.$store.getters.vcards
        this.$store.dispatch('loadVcards')
      }
    },
    filterByEmail() {
      if(this.emailFilter){
        this.$axios.get("vcards/filterByEmail/" + this.emailFilter)
        .then((response) => {
          //this.vcards = response.data.data
          this.$store.commit('setVcards', response.data.data)
          this.emailFilter = null
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
              "Error trying to search " + this.emailFilter + "."
            );
          this.emailFilter = null
          //this.vcards = this.$store.getters.vcards
          this.$store.dispatch('loadVcards')
        })
      } else {
        //this.vcards = this.$store.getters.vcards
        this.$store.dispatch('loadVcards')
      }
    },
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
