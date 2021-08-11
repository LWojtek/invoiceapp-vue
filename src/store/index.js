import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '../firebase/firebaseInit';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    invoiceData: [],
    filteredData: [],
    currentInvoiceArray: null,
    invoiceModal: null,
    discardModal: null,
    editInvoice: null,
    invoicesLoaded: null,
    isAuth: false
  },
  mutations: {
    filterInvoices ( state, payload ) {
      state.filteredData = state.invoiceData.filter((invoice) => {
        if (payload === 'Draft') {
          return invoice.invoiceDraft
        } else if ( payload === 'Paid' ) {
          return invoice.invoicePaid
        } else if ( payload === 'Pending' ) {
          return invoice.invoicePending
        } else {
          return invoice
        }
      })
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
      state.invoiceData.push(payload)
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
  },
  actions: {
    async getInvoices({ commit, state }) {
      const getData = firebaseApp.firestore().collection("invoices");
      const results = await getData.get();
      results.forEach((doc) => {
        if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerPostCode: doc.data().billerPostCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientPostCode: doc.data().clientPostCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit("setInvoiceData", data);
        }
      });
      commit("invoicesLoaded");
    },
    async updateStatusToPaid({ commit }, docId) {
      const getInvoice = firebaseApp.firestore().collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false
      });
      commit('updateStatusToPaid', docId)
    },
    async updateStatusToPending({ commit }, docId) {
      const getInvoice = firebaseApp.firestore().collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      })
      commit('updateStatusToPending', docId)
    },
    async deleteInvoice({ commit }, docId) {
      const getInvoice = firebaseApp.firestore().collection('invoices').doc(docId);
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
  }
})
