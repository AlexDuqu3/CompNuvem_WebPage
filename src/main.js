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

let toastOptions = {
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
}
const socketIO = new VueSocketIO({ 
    debug: true, 
    connection: 'http://192.168.1.79:3001', 
    vuex: { 
        store, 
        actionPrefix: 'SOCKET_', 
        mutationPrefix: 'SOCKET_' 
    }
})

const app = createApp(App).use(store).use(router).use(Toaster, toastOptions).use(socketIO) 

store.$toast = app.$toast
store.$socket = socketIO.io 
axios.defaults.baseURL = "http://192.168.1.79:8081/api" 
app.config.globalProperties.$axios = axios 
app.config.globalProperties.$serverUrl = "http://192.168.1.79:8081"

app.component('field-error-message', FieldErrorMessage)
app.component('confirmation-dialog', ConfirmationDialog)


app.mount('#app')

