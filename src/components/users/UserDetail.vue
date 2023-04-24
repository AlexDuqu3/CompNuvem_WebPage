<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="save"
  >
    <h3 class="mt-5 mb-3">User #{{ this.editingUser.id }}</h3>
    <hr>
    <div class="d-flex flex-wrap justify-content-between">
      <div class="w-75 pe-4">
        <div class="mb-3">
          <label
            for="inputName"
            class="form-label"
          >Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="User Name"
            required
            v-model="editingUser.name"
          >
          <field-error-message
            :errors="errors"
            fieldName="name"
          ></field-error-message>
        </div>

        <div class="mb-3 px-1">
          <label
            for="inputEmail"
            class="form-label"
          >Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            required
            v-model="editingUser.email"
          >
          <field-error-message
            :errors="errors"
            fieldName="email"
          ></field-error-message>
        </div>
        <div class="mb-3 px-1" v-if="this.user.user_type == 'V'">
          <label
            for="inputConfirmationCode"
            class="form-label"
          >Confirmation Code</label>
          <input
            type="text"
            class="form-control"
            id="inputConfirmationCode"
            placeholder="Confirmation Code"
            required
            v-model="editingUser.confirmation_code"
          >
          <field-error-message
            :errors="errors"
            fieldName="confirmation_code"
          ></field-error-message>
        </div>
      </div>
      <div class="w-25">
        <div class="mb-3">
          <label class="form-label">Photo</label>
          <div class="form-control text-center">
            <img
              :src="photoFullUrl"
              class="w-100"
            >
          </div>
           <input
            type="file"
            class="form-control"
            id="inputImage"
            placeholder="Image"
            @change="onChange"
          >

        </div>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary px-5"
        @click="save"
      >Save</button>
      <button
        type="button"
        class="btn btn-light px-5"
        @click="cancel"
      >Cancel</button>
    </div>

  </form>
</template>

<script>
//import axios from 'axios'
export default {
  name: 'UserDetail',
  components: {
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: [
    'save',
    'saveAdmin',
    'cancel'
  ],
  data () {
    return {
      editingUser: this.user,
      imageFile: null
    }
  },
  watch: {
    user (newUser) {
      this.editingUser = newUser
    }
  },
  computed: {
    photoFullUrl () {
      return this.editingUser.photo_url
        ? this.$serverUrl + "/storage/fotos/" + this.editingUser.photo_url
        : "./assets/img/avatar-none.png"
    },
  },
  methods: {
    onChange(e){
      
      this.imageFile = e.target.files[0]
      const formData = new FormData
      formData.set('imageFile',this.imageFile)
      
      this.$axios.post('upload_img',formData).then((response) => {       
            console.log(response.data.message)
            this.editingUser.photo_url = response.data.message
          })
          .catch((error) => {
            console.log(error)
          })
    },
    save () {
      if(this.user.user_type == 'V'){
        this.$emit('save', this.editingUser)
      }
      else{
        this.saveAmin()
      }
      
    },
    saveAmin(){
      this.$emit('saveAdmin', this.editingUser)
    },
    cancel () {
      this.$emit('cancel', this.editingUser)
    },
  }
}
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
</style>
