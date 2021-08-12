import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '../firebase/firebaseInit';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: undefined,
    filter: undefined,
    invoiceData: [],
    filteredData: [],
    currentInvoiceArray: null,
    invoiceModal: null,
    discardModal: null,
    editInvoice: null,
    invoicesLoaded: null,
    isAuth: false
  },

  getters: {
    // use getters for any filter data
    // mutations are for updates like delete, replace, update
    // read aboud vuex getters please
    filterInvoices(state) {
      let filter = state.filter;
      console.log(filter);
      if (!filter) {
        return state.invoiceData;
      }
      return state.invoiceData.filter((invoice) => {
        return invoice['invoice' + filter];
      });
    }
  },

  mutations: {
    setUser ( state, payload ) {
      state.currentUser = payload
    },
    setAuth( state, payload ) {
      state.isAuth = payload
    },
    toggleInvoice ( state ) {
      state.invoiceModal = !state.invoiceModal;
    },
    toggleModal ( state ) {
      state.discardModal = !state.discardModal;
    },
    toggleEditInvoice ( state ) {
      state.editInvoice = !state.editInvoice;
    },
    setInvoiceData ( state, payload ) {
      state.invoiceData = payload;
    },
    invoicesLoaded ( state ) {
      state.invoicesLoaded = true
    },
    setCurrentInvoice ( state, payload ) {
      state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
        return invoice.invoiceId === payload;
      })
    },
    updateStatusToPaid ( state, payload ) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true
          invoice.invoicePending = false
        }
      })
    },
    updateStatusToPending ( state, payload ) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePending = true
          invoice.invoicePaid = false
          invoice.invoiceDraft = false
        }
      })
    },
    deleteInvoice( state, payload ) {
      state.invoiceData = state.invoiceData.filter((invoice) => {
        return invoice.docId !== payload
      })
    },
    updateFilter(state, filter) {
      state.filter = filter;
    }
  }, 
  actions: {
    async getInvoices({ commit, state }) {
      const getData = firebaseApp.firestore().collection ('users').doc(`'${state.currentUser.uid}'`).collection('invoices');
      const results = await getData.get();
      const dataArr = results.docs.map(doc => doc.data())
      commit("setInvoiceData", dataArr);
      commit("invoicesLoaded");
    },
    async updateStatusToPaid({ commit, state }, docId) {
      const getInvoice = firebaseApp.firestore().collection('users').doc(`'${state.currentUser.uid}'`).collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false
      });
      commit('updateStatusToPaid', docId)
    },
    async updateStatusToPending({ commit, state }, docId) {
      const getInvoice = firebaseApp.firestore().collection('users').doc(`'${state.currentUser.uid}'`).collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      })
      commit('updateStatusToPending', docId)
    },
    async deleteInvoice({ commit, state }, docId) {
      const getInvoice = firebaseApp.firestore().collection('users').doc(`'${state.currentUser.uid}'`).collection('invoices').doc(docId);
      await getInvoice.delete();
      commit('deleteInvoice', docId)
    },
    async updateInvoice({ commit, dispatch }, {docId, routeId}) {
      commit('deleteInvoice', docId)
      await dispatch('getInvoices')
      commit('toggleInvoice')
      commit('toggleEditInvoice')
      commit('setCurrentInvoice', routeId)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
