<template>
  <nav
    class="
      navbar navbar-expand-md navbar-dark
      bg-dark
      sticky-top
      flex-md-nowrap
      p-0
      shadow
    "
  >
    <div class="container-fluid" style="padding: 0; height:3.5rem;">
      <a class="navbar-brand col-md-3 col-lg-2" href="#"
          style="text-align:center;"
        ><!--<img
          src="./assets/logo.png"
          alt=""
          class="rounded-circle z-depth-0 avatar-img"
        />-->
        <b style="font-size: 1.3rem;">Vcard App</b> </a
      >
      <button
        id="buttonSidebarExpandId"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="margin-right: 1rem;"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav" style="margin-right: 1rem;">
          <li class="nav-item" v-show="!user">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'Register' }"
              :to="{ name: 'Register' }"
              ><i class="bi bi-box-arrow-in-right"></i>
              Register
            </router-link>
          </li>
          <li class="nav-item" v-show="!user">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'Login' }"
              :to="{ name: 'Login' }"
              ><i class="bi bi-box-arrow-in-right"></i>
              Login
            </router-link>
          </li>
          <li class="nav-item dropdown" v-show="user">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <img
                :src="userPhotoUrl"
                class="rounded-circle z-depth-0 avatar-img"
                alt="avatar image"
              />
              <span class="avatar-text">{{ userName }}</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{
                    active: $route.name == 'User' && $route.params.id == userId,
                  }"
                  :to="{ name: 'User', params: { id: userId } }"
                  ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{active: $route.name === 'ChangePassword'}"
                  :to="{ name: 'ChangePassword'}"
                >
                  <i class="bi bi-key-fill"></i>Change password
                </router-link>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout"
                  ><i class="bi bi-arrow-right"></i>Logout</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">

          <!-- User -->
          <ul class="nav flex-column" v-show="this.$store.state.user && this.$store.state.user?.user_type == 'V'">
            <h6
            class="
              sidebar-heading
              d-flex
              justify-content-between
              align-items-center
              px-3
              mt-4
              mb-1
              text-muted
            "
          >
            <span>User Panel</span>
          </h6>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Card' }"
                :to="{ name: 'Card' }"
              >
                <i class="bi bi-credit-card"></i>
                My Card
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Transaction' }"
                :to="{ name: 'Transaction' }"
              >
                <i class="bi bi-send"></i>
                Send Money
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                  class="nav-link"
                    :class="{active: $route.name === 'Transactions'}"
                    :to="{ name: 'Transactions'}"
                  ><i class="bi bi-clock-history"></i>
                  Transactions History
                </router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-bookmarks"></i>
                Categories
              </a>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'PaymentTypes' }"
                :to="{ name: 'PaymentTypes' }"
              >
                <i class="bi bi-gear"></i>
                Definitions
              </router-link>
            </li>
          </ul>

          <!-- Admin -->
          <ul class="nav flex-column" v-show="this.$store.state.user && this.$store.state.user?.user_type == 'A'">
            <h6
            class="
              sidebar-heading
              d-flex
              justify-content-between
              align-items-center
              px-3
              mt-4
              mb-1
              text-muted
            "
          >
            <span>Admin Panel</span>
          </h6>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Admins' }"
                :to="{ name: 'Admins' }"
              >
                <i class="bi bi-person-circle"></i>
                Admins
              </router-link>
            </li>
            
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Vcards' }"
                :to="{ name: 'Vcards' }"
              >
                <i class="bi bi-credit-card-fill"></i>
                Vcards
              </router-link>
            </li>

            <!-- <li class="nav-item">
              <router-link
                  class="nav-link"
                    :class="{active: $route.name === 'Transactions'}"
                    :to="{ name: 'Transactions'}"
                  ><i class="bi bi-card-list"></i>
                  Transactions
                </router-link>
            </li> -->

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'DefaultCategories' }"
                :to="{ name: 'DefaultCategories' }"
              >
                <i class="bi bi-bookmark-star-fill"></i>
                Default Categories
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'PaymentTypes' }"
                :to="{ name: 'PaymentTypes' }"
              >
                <i class="bi bi-paypal"></i>
                Payment Types
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'PaymentTypes' }"
                :to="{ name: 'PaymentTypes' }"
              >
                <i class="bi bi-graph-up"></i>
                Statistics
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'PaymentTypes' }"
                :to="{ name: 'PaymentTypes' }"
              >
                <i class="bi bi-gear-fill"></i>
                Definitions
              </router-link>
            </li>

          </ul>

          <div class="d-block d-md-none">
            <h6
              class="
                sidebar-heading
                d-flex
                justify-content-between
                align-items-center
                px-3
                mt-4
                mb-1
                text-muted
              "
            >
              <span>User</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#"
                  ><i class="bi bi-person-check-fill"></i>
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-box-arrow-in-right"></i>
                  Login
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    :src="userPhotoUrl"
                    class="rounded-circle z-depth-0 avatar-img"
                    alt="avatar image"
                  />
                  <span class="avatar-text">{{ userName }}</span>
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-person-square"></i>Profile</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-key-fill"></i>Change password</a
                    >
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" @click.prevent="logout"
                      ><i class="bi bi-arrow-right"></i>Logout</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
// REMOVE THESE IMPORTS WHEN VUE-ROUTER IS CONFIGURED

export default {
  name: "RootComponent",
  computed: {
    user() {
      return this.$store.state.user;
    },
    userId() {
      return this.$store.state.user ? this.$store.state.user.id : -1;
    },

    userName() {
      return this.$store.state.user ? this.$store.state.user.name : "";
    },
    userPhotoUrl() {
      let urlPhoto = this.$store.state.user
        ? this.$store.state.user.photo_url
        : null;
      return urlPhoto
        ? this.$serverUrl + "/storage/fotos/" + urlPhoto
        : "img/avatar-none.png";
    },
  },
  mounted() {
    this.$store.dispatch('restoreToken')
      .then((token) => {
        if (token) {
          this.$store.dispatch('refresh')
        }
      })
  },
  methods: {
    refresh () {
      this.$store.dispatch('refresh')
    },
    logout() {
      this.$axios
        .post("logout")
        .then(() => {
          this.$toast.success("User has logged out of the application.");
          delete this.$axios.defaults.headers.common.Authorization;
          sessionStorage.removeItem("token");
          this.$store.commit("resetUser");
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.$toast.error(
            "There was a problem logging out of the application!"
          );
        });
    },
  },
 
};
</script>

<style lang="css">
@import "./assets/css/dashboard.css";

.avatar-img {
  margin: 0rem 0.5rem 0rem 0rem;
  width: 2.6rem;
  height: 2.6rem;
}
.avatar-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.dropdown-item {
  font-size: 0.875rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

#sidebarMenu {
  overflow-y: auto;
}
</style>
