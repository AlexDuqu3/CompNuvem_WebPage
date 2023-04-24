<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-if="showCode"
          class="align-middle"
        >Code</th>
        <th
          v-if="showName"
          class="align-middle"
        >Name</th>
        <th
          v-if="showDescription"
          class="align-middle"
        >Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="paymentType in paymentTypes"
        :key="paymentType.code"
      >
        <td
          v-if="showCode"
          class="align-middle"
        >{{ paymentType.code }}</td>
                <td
          v-if="showName"
          class="align-middle"
        > {{paymentType.name}} </td>
        <td
          v-if="showDescription"
          class="align-middle"
        > {{paymentType.description}} </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "PaymentTypeTable",
  props: {
    paymentTypes: {
      type: Array,
      default: () => [],
    },
    showCode: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showDescription: {
      type: Boolean,
      default: true,
    }
  },
  emits: [
    'edit',
  ],
  methods: {
    /*canViewUserDetail (userId) {
      if (!this.$store.state.user) {
        return false
      }
      return this.$store.state.user.type == 'A' || this.$store.state.user.id == userId
    },
    photoFullUrl (user) {
      return user.photo_url
        ? this.$serverUrl + "/storage/fotos/" + user.photo_url
        : "./assets/img/avatar-none.png"
    },
    editClick (user) {
      this.$emit('edit', user)
    },*/
  }
}
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
</style>
