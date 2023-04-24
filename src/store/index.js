import {
  createStore
} from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    user: null,
    vcard: null,
    admins: [],
    vcards: [],
    categories: null,
    paymentTypes: null,
    transactions: null,
    defaultCategories: []
  },
  mutations: {
    //user
    resetUser(state) {
      if (state.user) {
        this.$socket.emit('logged_out', state.user)
        state.user = null
      }
    },
    setUser(state, loggedInUser) {
      state.user = loggedInUser
    },

    //user vcard balance
    resetVcardBalance(state) {
      state.vcard.balance = null
    },
    setVcardBalance(state, newBalance) {
      state.vcard.balance = newBalance
    },

    //vcard
    resetVcard(state) {
      state.vcard = null
    },
    setVcard(state, vcardInfo) {
      state.vcard = vcardInfo
    },
    //categories
    resetCategories(state) {
      state.categories = null
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    //paymentTypes
    resetPaymentTypes(state) {
      state.paymentTypes = null
    },
    setPaymentTypes(state, paymentTypes) {
      state.paymentTypes = paymentTypes
    },

    //transactions
    resetTransactions(state) {
      state.transactions = null
    },
    setTransactions(state, transactions) {
      state.transactions = transactions
    },
    insertTransaction (state, newTransaction) {
      state.transactions.unshift(newTransaction)
    },


    //Default Categories
    resetDefaultCategories(state) {
      state.defaultCategories = null
    },
    setDefaultCategories(state, defaultCategories) {
      state.defaultCategories = defaultCategories
    },
    insertDefaultCategory (state, newDefaultCategory) {
      state.defaultCategories.push(newDefaultCategory)
    },
    deleteDefaultCategory (state, deleteDefaultCategory) {
      let idx = state.defaultCategories.findIndex((t) => t.id === deleteDefaultCategory.id)
      if (idx >= 0) {
        state.defaultCategories.splice(idx, 1)
      }
    },

    //Admins
    resetAdmins (state) {
      state.admins = null
    },
    setAdmins (state, admins) {
      state.admins = admins
    },
    insertAdmin (state, newAdmin) {
      state.admins.push(newAdmin)
    },
    updateAdmin (state, updateAdmin) {
      let idx = state.admins.findIndex((t) => t.id === updateAdmin.id)
      if (idx >= 0) {
        state.admins[idx] = updateAdmin
      }
    },
    deleteAdmin (state, deleteAdmin) {
      let idx = state.admins.findIndex((t) => t.id === deleteAdmin.id)
      if (idx >= 0) {
        state.admins.splice(idx, 1)
      }
    },

    //Vcards
    resetVcards (state) {
      state.vcards = null
    },
    setVcards (state, vcards) {
      state.vcards = vcards
    },
    insertVcard (state, newVcard) {
      state.vcards.push(newVcard)
    },
    updateVcard (state, updateVcard) {
      let idx = state.vcards.findIndex((t) => t.phone_number === updateVcard.phone_number)
      if (idx >= 0) {
        state.vcards[idx] = updateVcard
      }
    },
    deleteVcard (state, deleteVcard) {
      let idx = state.vcards.findIndex((t) => t.phone_number === deleteVcard.phone_number)
      if (idx >= 0) {
        state.vcards.splice(idx, 1)
      }
    },

  },
  getters: {
    //Admins
    admins: (state) => {
      return state.admins
    },
    totalAdmins: (state) => {
      return state.admins.length
    },

    //Vcards
    vcards: (state) => {
      return state.vcards
    },
    totalVcards: (state) => {
      return state.vcards.length
    },

    //Categories
    categories: (state) => {
      return state.categories
    },
    totalCategories: (state) => {
      return state.categories.length
    },
    debitCategories: (state) => {
      return state.categories.filter(p =>
        (p.type == 'D')
      )
    },
    totalDebitCategories: (state, getters) => {
      return getters.debitCategories.length
    },
    creditCategories: (state) => {
      return state.categories.filter(p =>
        (p.type == 'C')
      )
    },
    totalCreditCategories: (state, getters) => {
      return getters.creditCategories.length
    },

    //PaymentTypes
    paymentTypes: (state) => {
      return state.paymentTypes
    },
    totalPaymentTypes: (state) => {
      return state.paymentTypes.length
    },

    //Transactions
    transactions: (state) => {
      return state.transactions
    },
    totalTransactions: (state) => {
      return state.transactions.length
    },

    //Default Categories
    defaultCategories: (state) => {
      return state.defaultCategories
    },
    totalDefaultCategories: (state) => {
      return state.defaultCategories.length
    },

  },
  actions: {

    //User (View Table in BD, common info from users and admins)
    async loadUser(context) {
      try {
        let response = await axios.get('users/me')
        context.commit('setUser', response.data.data)
        this.$socket.emit('logged_in', response.data.data)
      } catch (error) {
        context.commit('resetUser', null)
        throw error
      }
    },

    async restoreToken(context) {
      let storedToken = sessionStorage.getItem('token')
      if (storedToken) {
        axios.defaults.headers.common.Authorization = "Bearer " + storedToken
        return storedToken
      }
      delete axios.defaults.headers.common.Authorization
      context.commit('resetUser', null)
      return null
    },

    //Vcard
    async loadVcard(context) {
      try {
        let response = await axios.get(`vcards/${this.state.user.id}`)
        context.commit('setVcard', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetVcard', null)
        throw error
      }
    },

    //Categories
    async loadCategories(context) {
      try {
        let response
        if (this.state.user.user_type == 'V') {
          response = await axios.get(`vcards/${this.state.user.id}/categories`)
        } else {
          response = await axios.get('categories')
        }
        context.commit('setCategories', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetCategories', null)
        throw error
      }
    },

    // Payment Types
    async loadPaymentTypes(context) {
      try {
        let response = await axios.get('paymentTypes')
        context.commit('setPaymentTypes', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetPaymentTypes', null)
        throw error
      }
    },

    //Default Categories
    async loadDefaultCategories(context) {
      try {
        let response = await axios.get('categories/default')
        context.commit('setDefaultCategories', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetDefaultCategories', null)
        throw error
      }
    },
    async insertDefaultCategory (context, defaultCategory) {
      let response = await axios.post("categories/default", defaultCategory)
      context.commit('insertDefaultCategory', response.data.data)
      return response.data.data
    },
    async deleteDefaultCategory (context, defaultCategory) {
      let response = await axios.delete("categories/default/" + defaultCategory.id)
      context.commit('deleteDefaultCategory', response.data.data)
      return response.data.data
    },

    //Transactions
    async loadTransactions(context) {
      try {
        let response
        if (this.state.user.user_type == 'V') {
          response = await axios.get(`transactions/${this.state.user.id}`)
        } else {
          response = await axios.get('transactions')
        }
        context.commit('setTransactions', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetTransactions', null)
        throw error
      }
    },
    async insertCreditTransaction (context, creditTransaction) {
      let response = await axios.post("creditTransaction", creditTransaction)
      context.commit('insertTransaction', response.data[0])
      context.commit('updateVcard', response.data[1])
      return response.data[0]
    },
    async insertTransaction (context, transaction) {
      let response = await axios.post("transactions", transaction)
      context.commit('insertTransaction', response.data.data[0])
      context.commit('setVcardBalance', response.data.data[0].new_balance)
      return response.data
    },

    //Admins
    async loadAdmins (context) {
      try {
        let response = await axios.get('admins')
        context.commit('setAdmins', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetAdmins', null)
        throw error
      }
    },
    async insertAdmin (context, admin) {
      let response = await axios.post("admins", admin)
      context.commit('insertAdmin', response.data.data)
      return response.data.data
    },
    async updateAdmin (context, admin) {
      let response = await axios.put("admins/" + admin.id, admin)
      context.commit('updateAdmin', response.data.data)
      return response.data.data
    },
    async deleteAdmin (context, admin) {
      let response = await axios.delete("admins/" + admin.id)
      context.commit('deleteAdmin', response.data.data)
      return response.data.data
    },

    //Vcards
    async loadVcards (context) {
      try {
        let response = await axios.get('vcards')
        context.commit('setVcards', response.data.data)
        return response.data.data
      } catch (error) {
        context.commit('resetVcards', null)
        throw error
      }
    },
    async insertVcard (context, vcard) {
      let response = await axios.post("vcards", vcard)
      context.commit('insertVcard', response.data.data)
      return response.data.data
    },
    async updateVcard (context, vcard) {
      let response = await axios.put("vcards/" + vcard.phone_number, vcard)
      context.commit('updateVcard', response.data.data)
      return response.data.data
    },
    async deleteVcard (context, vcard) {
      let response = await axios.delete("vcards/" + vcard.phone_number)
      context.commit('deleteVcard', response.data.data)
      return response.data.data
    },
    async blockUnblockVcard (context, vcard) {
      let response = await axios.put("vcards/blockUnblock/" + vcard.phone_number)
      context.commit('updateVcard', response.data.data)
      return response.data.data
    },


    async refresh(context) {
      let userPromise = context.dispatch('loadUser')
      await userPromise

      if (context.state.user.user_type == 'V') {
        let vcardPromise = context.dispatch('loadVcard')
        await vcardPromise
      }

      if (context.state.user.user_type == 'A') {
        let adminsPromise = context.dispatch('loadAdmins')
        let vcardsPromise = context.dispatch('loadVcards')
        let defaultCategoriesPromise = context.dispatch('loadDefaultCategories')
        await adminsPromise
        await vcardsPromise
        await defaultCategoriesPromise
      }

      let categoriesPromise = context.dispatch('loadCategories')
      let paymentTypesPromise = context.dispatch('loadPaymentTypes')
      let transactionsPromise = context.dispatch('loadTransactions')

      await categoriesPromise
      await paymentTypesPromise
      await transactionsPromise
      console.log("After Refresh: ")
      console.log(this.state)
    },

    async SOCKET_newTransaction(context, transaction) {
      console.log("Dentro da newTransaction")
      console.log(transaction)
      console.log(context)
      let transactionID = parseInt(transaction.payment_reference)

      if (transactionID == context.state.user.id) {
        this.$toast.info(`Recieved ${transaction.value} from ${transaction.vcard}`)
        context.dispatch('refresh')
      } else {
        this.$toast.info(`Vcard # ${transaction.payment_reference} recieved ${transaction.value}!`)
      }

    },

  },
  modules: {}
})