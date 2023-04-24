<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">My Card Dashboard</h3>
    </div>
    <div class="mx-2 total-filtro">
     <!-- <h5 class="mt-4">Total: {{ totalTransactions }}</h5>-->
    </div>
  </div>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="container preload" id="vcardContainer">
          <div class="creditcard">
            <div class="front">
              <div id="ccsingle"></div>
              <svg
                version="1.1"
                id="cardfront"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 750 471"
                style="enable-background: new 0 0 750 471"
                xml:space="preserve"
              >
                <g id="Front">
                  <g id="CardBackground">
                    <g id="Page-1_1_">
                      <g id="amex_1_">
                        <path
                          id="Rectangle-1_1_"
                          class="lightcolor grey"
                          d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                            C0,17.9,17.9,0,40,0z"
                        />
                      </g>
                    </g>
                    <path
                      class="darkcolor greydark"
                      d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                    />
                  </g>
                  <text
                    transform="matrix(1 0 0 1 40 300)"
                    id="svgnumber"
                    class="st2 st5 st6"
                  >
                    {{ vcardName }}
                  </text>
                  <text
                    transform="matrix(1 0 0 1 40 428)"
                    id="svgname"
                    class="st2 st5 st6"
                  >
                    {{ vcardEmail }}
                  </text>
                  <text transform="matrix(1 0 0 1 40 389)" class="st7 st5 st8">
                    Email
                  </text>
                  <text
                    transform="matrix(1 0 0 1 550.7754 388)"
                    class="st7 st5 st8"
                  >
                    Balance
                  </text>
                  <text transform="matrix(1 0 0 1 40 261)" class="st7 st5 st8">
                    Name
                  </text>
                  <g>
                    <text
                      transform="matrix(1 0 0 1 550.3848 428)"
                      id="svgexpire"
                      class="st2 st5 st9"
                    >
                      {{ vcardBalance }} €
                    </text>
                    <text
                      transform="matrix(1 0 0 1 420 75)"
                      class="st7 st5 st8"
                    >
                      Phone Nr
                    </text>
                    <text
                      transform="matrix(1 0 0 1 420 125)"
                      id="svgnumber"
                      class="st2 st3 st4"
                    >
                      <!--{{this.vCard.phone_number}}-->
                      {{ vcardPhoneNr }}
                    </text>
                  </g>
                  <g id="cchip">
                    <g>
                      <path
                        class="st2"
                        d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                        c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                      />
                    </g>
                    <g>
                      <g>
                        <rect
                          x="82"
                          y="70"
                          class="st12"
                          width="1.5"
                          height="60"
                        />
                      </g>
                      <g>
                        <rect
                          x="167.4"
                          y="70"
                          class="st12"
                          width="1.5"
                          height="60"
                        />
                      </g>
                      <g>
                        <path
                          class="st12"
                          d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                            c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                            C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                            c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                            c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                        />
                      </g>
                      <g>
                        <rect
                          x="82.8"
                          y="82.1"
                          class="st12"
                          width="25.8"
                          height="1.5"
                        />
                      </g>
                      <g>
                        <rect
                          x="82.8"
                          y="117.9"
                          class="st12"
                          width="26.1"
                          height="1.5"
                        />
                      </g>
                      <g>
                        <rect
                          x="142.4"
                          y="82.1"
                          class="st12"
                          width="25.8"
                          height="1.5"
                        />
                      </g>
                      <g>
                        <rect
                          x="142"
                          y="117.9"
                          class="st12"
                          width="26.2"
                          height="1.5"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Back"></g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form__div">
          <label for="" class="form__label">Description</label>
          <input type="text" placeholder=" " />
        </div>

      </div>
    </div>

    <p></p>

    <div class="form__div">
      <label for="" class="form__label">Description</label>
      <input type="text" placeholder=" " />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      errors: false,
      //vCard: {},
    };
  },
  computed: {
    vcard() {
      return this.$store.state.vcard;
    },
    vcardBalance() {
      return this.$store.state.vcard ? this.$store.state.vcard.balance : "--.--";
    },
    vcardPhoneNr() {
      return this.$store.state.vcard ? this.$store.state.vcard.phone_number : "Undifined Phone Nr";
    },
    vcardName() {
      return this.$store.state.vcard ? this.$store.state.vcard.name : "Undifined Name";
    },
    vcardEmail() {
      return this.$store.state.vcard ? this.$store.state.vcard.email : "Undifined Email";
    },
    vcardMaxdebit() {
      return this.$store.state.vcard ? this.$store.state.vcard.max_debit : "Undifined";
    },
    vcardPhotoUrl() {
      let urlPhoto = this.$store.state.vcard
        ? this.$store.state.vcard.photo_url
        : null;
      return urlPhoto
        ? this.$serverUrl + "/storage/fotos/" + urlPhoto
        : "img/avatar-none.png";
    },
  },
};
</script>

<style scoped>
@import "../assets/css/vcard.css";
</style>
