import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '../firebase/firebaseInit';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    invoiceData: [],
    currentInvoiceArray: null,
    invoiceModal: null,
    discardModal: null,
    editInvoice: null,
    invoicesLoaded: null,
  },
  mutations: {
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
        }
      })
    },
    deleteInvoice( state, payload ) {
      state.invoiceData = state.invoiceData.filter((invoice) => {
        return invoice.docId !== payload
      })
    }
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
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
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
        invoicePending: true
      })
      commit('updateStatusToPending', docId)
    },
    async deleteInvoice({ commit }, docId) {
      const getInvoice = firebaseApp.firestore().collection('invoices').doc(docId);
      await getInvoice.delete();
      commit('deleteInvoice', docId)
    }
  },
  modules: {
  }
})
