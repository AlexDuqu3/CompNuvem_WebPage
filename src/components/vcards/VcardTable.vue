<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showPhoto" class="align-middle">Photo</th>
        <th v-if="showPhoneNr" class="align-middle">Phone Nr</th>
        <th class="align-middle">Name</th>
        <th v-if="showEmail" class="align-middle">Email</th>
        <th v-if="showBalance" class="align-middle">Balance</th>
        <th v-if="showMax_debit" class="align-middle">Max Debit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vcard in vcards" :key="vcard.phone_number">
        <td v-if="showPhoto" class="align-middle">
          <img :src="photoFullUrl(vcard)" class="rounded-circle img_photo" />
        </td>
        <td v-if="showPhoneNr" class="align-middle">
          {{ vcard.phone_number }}
        </td>
        <td class="align-middle">{{ vcard.name }}</td>
        <td v-if="showEmail" class="align-middle">{{ vcard.email }}</td>
        <td v-if="showBalance" class="align-middle">{{ vcard.balance }} €</td>
        <td v-if="showMax_debit" class="align-middle">
          {{ vcard.max_debit }} €

          <a
            href="#"
            class="text-decoration-none"
            @click.prevent="editMaxDebitClick(vcard)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
              style="margin: 0 0 0.1rem 0.1rem"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              ></path>
            </svg>
          </a>
        </td>
        <td class="text-end align-middle" v-if="showCreditButton">
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="creditTransactionClick(vcard)"
            v-if="showCreditButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send-plus"
              viewBox="0 0 16 16"
              style="margin: 0 0 0 0"
            >
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"
              />
              <path
                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
        </td>
        <td class="text-end align-middle" v-if="showBlockButton">
          <button
            type="button"
            class="btn btn-outline-success"
            @click="blockUnblockClick(vcard)"
            v-if="showBlockButton && vcard.blocked == 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-unlock-fill"
              viewBox="0 0 16 16"
              style="margin: 0 0 0 0"
            >
              <path
                d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"
              />
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="blockUnblockClick(vcard)"
            v-if="showBlockButton && vcard.blocked == 1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
              style="margin: 0 0 0 0"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              />
            </svg>
          </button>
        </td>
        <td class="text-end align-middle" v-if="showDeleteButton">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="deleteClick(vcard)"
            v-if="showDeleteButton && vcard.balance == 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
              style="margin: 0 0 0 0"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VcardTable",
  props: {
    vcards: {
      type: Array,
      default: () => [],
    },
    showPhoneNr: {
      type: Boolean,
      default: true,
    },
    showEmail: {
      type: Boolean,
      default: true,
    },
    showBalance: {
      type: Boolean,
      default: true,
    },
    showMax_debit: {
      type: Boolean,
      default: true,
    },
    showPhoto: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
    showBlockButton: {
      type: Boolean,
      default: true,
    },
    showCreditButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["delete", "blockUnblock", "edit", "credit"],
  methods: {
    /*canViewUserDetail (userId) {
      if (!this.$store.state.user) {
        return false
      }
      return this.$store.state.user.type == 'A' || this.$store.state.user.id == userId
    },*/
    photoFullUrl(vcard) {
      return vcard.photo_url
        ? this.$serverUrl + "/storage/fotos/" + vcard.photo_url
        : "img/avatar-none.png";
    },
    deleteClick(vcard) {
      this.$emit("delete", vcard);
    },
    blockUnblockClick(vcard) {
      this.$emit("blockUnblock", vcard);
    },
    editMaxDebitClick(vcard) {
      this.$emit("edit", vcard);
    },
    creditTransactionClick(vcard) {
      this.$emit("credit", vcard);
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}

.img_photo {
  width: 3.2rem;
  height: 3.2rem;
}

.filter-div {
  min-width: 2rem;
}
</style>
