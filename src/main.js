import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSocketIO from 'vue-3-socket.io' 
import Toaster from "@meforma/vue-toaster"

import FieldErrorMessage from "./components/global/FieldErrorMessage.vue"
import ConfirmationDialog from "./components/global/ConfirmationDialog.vue"

const apidomain = process.env.VUE_APP_API_URL

axios.defaults.baseURL =  apidomain + "/api" 

let toastOptions = {
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
}
const socketIO = new VueSocketIO({ 
    debug: true, 
    connection: process.env.VUE_APP_SOCKETS_URL, 
    vuex: { 
        store, 
        actionPrefix: 'SOCKET_', 
        mutationPrefix: 'SOCKET_' 
    }
})

const app = createApp(App).use(store).use(router).use(Toaster, toastOptions).use(socketIO) 

app.config.globalProperties.$axios = axios 
app.config.globalProperties.$serverUrl = apidomain

store.$toast = app.$toast
store.$socket = socketIO.io 



app.component('field-error-message', FieldErrorMessage)
app.component('confirmation-dialog', ConfirmationDialog)


app.mount('#app')

