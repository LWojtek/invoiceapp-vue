<template>
  <div class="newinvoice">
    <VLoading v-if="this.loading" />
    <VEmptyWarning v-if="this.emptyWarning" />
    <h2 v-if="!this.editInvoice">New Invoice</h2>
    <h2 v-if="this.editInvoice">Edit Invoice</h2>
    <form @submit.prevent="submitForm">
      <fieldset>
        <!-- Bill From -->
        <legend>Bill from</legend>
        <div class="flex__col">
          <label for="billerStreetAddress">Street Address</label>
          <input
            id="billerStreetAddress"
            v-model="billerStreetAddress"
            required
            type="text"
          >
        </div>
        <div class="flex__row">
          <div class="flex__col flex-30">
            <label for="billerCity">City</label>
            <input
              id="billerCity"
              v-model="billerCity"
              required
              type="text"
            >
          </div>
          <div class="flex__col flex-30">
            <label for="billerPostCode">Post Code</label>
            <input
              id="billerPostCode"
              v-model="billerPostCode"
              required
              type="text"
            >
          </div>
          <div class="flex__col flex-30">
            <label for="billerCountry">Country</label>
            <input
              id="billerCountry"
              v-model="billerCountry"
              required
              type="text"
            >
          </div>
        </div>
      </fieldset>
      <fieldset>
        <!-- Bill To -->
        <legend>Bill to</legend>
        <div class="flex__col">
          <label for="clientName">Clients Name</label>
          <input
            id="clientName"
            v-model="clientName"
            required
            type="text"
          >
        </div>
        <div class="flex__col">
          <label for="clientEmail">Clients Email</label>
          <input
            id="clientEmail"
            v-model="clientEmail"
            required
            type="text"
          >
        </div>
        <div class="flex__col">
          <label for="clientStreetAddress">Street Address</label>
          <input
            id="clientStreetAddress"
            v-model="clientStreetAddress"
            required
            type="text"
          >
        </div>
        <div class="flex__row">
          <div class="flex__col flex-30">
            <label for="clientCity">City</label>
            <input
              id="clientCity"
              v-model="clientCity"
              required
              type="text"
            >
          </div>
          <div class="flex__col flex-30">
            <label for="clientPostCode">Post Code</label>
            <input
              id="clientPostCode"
              v-model="clientPostCode"
              required
              type="text"
            >
          </div>
          <div class="flex__col flex-30">
            <label for="clientCountry">Country</label>
            <input
              id="clientCountry"
              v-model="clientCountry"
              required
              type="text"
            >
          </div>
        </div>
        <div class="flex__col">
          <label for="paymentTerms">Payment Terms</label>
          <select
            id="paymentTerms"
            v-model="paymentTerms"
            required
            type="text"
          >
            <option value="7">
              Net 7 Days
            </option>
            <option value="14">
              Net 14 Days
            </option>
            <option value="30">
              Net 30 Days
            </option>
            <option value="60">
              Net 60 Days
            </option>
          </select>
        </div>
        <div class="flex__row">
          <div class="flex__col flex-50">
            <label for="invoiceDate">Invoice Date</label>
            <input
              id="invoiceDate"
              v-model="invoiceDate"
              disabled
              type="text"
            >
          </div>
          <div class="flex__col flex-50">
            <label for="paymentDueDate">Payment Due</label>
            <input
              id="paymentDueDate"
              v-model="paymentDueDate"
              disabled
              type="text"
            >
          </div>
        </div>
        <div class="flex__col">
          <label for="description">Product Description</label>
          <input id="description" v-model="productDescription" type="text" name="description">
        </div>
      </fieldset>
      <fieldset>
        <h3 class="table__head">
          Item List
        </h3>
        <table class="item__list">
          <thead>
            <tr class="table__heading">
              <th class="item__name">
                Item Name
              </th>
              <th class="item__qty">
                Qty
              </th>
              <th class="item__price">
                Price
              </th>
              <th class="total">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in invoiceItemList"
              :key="index"
              class="table__items"
            >
              <td class="item__name">
                <input v-model="item.itemName" required type="text" value="">
              </td>
              <td class="item__qty">
                <input v-model="item.qty" required type="number" value="0">
              </td>
              <td class="item__price">
                <input v-model="item.price" required type="number" value="0" step="any">
              </td>
              <td class="total">
                ${{ (item.total = item.price * item.qty) }}
              </td>
              <div class="icon__wrapper">
                <i class="fas fa-trash-alt" @click="deleteInvoiceItem(item.id)" />
              </div>
            </tr>
          </tbody>
        </table>
        <div class="form__button" @click="addNewInvoiceItem">
          <i class="fas fa-plus" />
          Add New Item
        </div>
      </fieldset>
      <transition name="fade">
        <div class="invoice__action">
          <button v-if="!this.editInvoice" type="button" class="btn btn--discard" @click="closeInvoice">
            Discard
          </button>
          <button v-if="!this.editInvoice" class="btn btn--draft" @click.prevent="saveDraft">
            Save as Draft
          </button>
          <button  v-if="!this.editInvoice"  type="submit" class="btn btn--save" @click="publishInvoice">
            Save & Send
          </button>

          <!-- edit button --> 

          <button v-if="this.editInvoice" class="btn btn--draft" @click="closeInvoice">
            Cancel
          </button>
          <button  v-if="this.editInvoice"  type="submit" class="btn btn--save" @click="publishInvoice">
            Save Changes
          </button>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'
import firebaseApp from '@/firebase/firebaseInit'

import VLoading from '@/components/VLoading.vue';
import VEmptyWarning from '@/components/VEmptyWarning.vue';

export default {
    components: {
        VLoading,
        VEmptyWarning
    },
    computed: {
      ...mapState(['editInvoice', 'discardModal', 'invoiceModal', 'currentInvoiceArray', 'isAuth'])
    },
    data(){
        return {
            currentUserID: null,
            loading: null,
            emptyWarning: false,
            invoiceId: null,
            invoiceProcessing: false,
            dateOptions: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            billerStreetAddress: null,
            billerCity: null,
            billerPostCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientPostCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoicePaid: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0
        }
    },
    methods: {
      addNewInvoiceItem () {
          this.invoiceItemList.push({
              id: uuidv4(),
              itemName: '',
              qty: '',
              price: 0
          })
          this.emptyWarning = false
      },
      deleteInvoiceItem (id) {
          this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id)
      },
      closeInvoice(){
        this.$store.commit('toggleModal');
        if (this.editInvoice) {
          this.$store.commit('toggleEditInvoice')
        }
      },
      publishInvoice() {
        if (this.invoiceItemList.length >= 1) {
          this.invoicePending = true;
        }
      },
      saveDraft() {
        if (!this.editInvoice) {
          this.invoiceDraft = true;
          this.submitForm();
        } else {
          this.submitForm();
        }
      },
      calInvoiceTotal() {
        this.invoiceTotal = 0;
        this.invoiceItemList.forEach((item) => {
          this.invoiceTotal += item.total;
        });
      },
      async uploadInvoice() {
        if (!this.invoiceDraft) {
          if (this.invoiceItemList.length <= 0) {
            this.emptyWarning = true
            return;
          }
        }
        this.loading = true;
        this.calInvoiceTotal();
        const dataBase = firebaseApp.firestore().collection('users').doc(`'${this.currentUserID}'`).collection('invoices').doc()
        await dataBase.set({
          invoiceId: `${uuidv4().slice(1, 6).toUpperCase()}`,
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerPostCode: this.billerPostCode,
          billerCountry: this.billerCountry,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientPostCode: this.clientPostCode,
          clientCountry: this.clientCountry,
          invoiceDate: this.invoiceDate,
          invoiceDateUnix: this.invoiceDateUnix,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: this.invoicePending,
          invoiceDraft: this.invoiceDraft,
          invoicePaid: null,
        });
        this.loading = false;
        this.$store.commit('toggleInvoice');
        this.$store.dispatch('getInvoices')
      },
      async updateInvoice () {
        if (this.invoiceDraft) {
          if (this.invoiceItemList.length <= 0) {
            this.emptyWarning = true
            return;
          }
        } 
        this.loading = true;
        this.calInvoiceTotal();

        if (this.invoiceDraft) {
          const database = firebaseApp.firestore().collection('users').doc(`'${this.currentUserID}'`).collection('invoices').doc(this.docId);
          await database.update({
            billerStreetAddress: this.billerStreetAddress,
            billerCity: this.billerCity,
            billerPostCode: this.billerPostCode,
            billerCountry: this.billerCountry,
            clientName: this.clientName,
            clientEmail: this.clientEmail,
            clientStreetAddress: this.clientStreetAddress,
            clientCity: this.clientCity,
            clientPostCode: this.clientPostCode,
            clientCountry: this.clientCountry,
            paymentTerms: this.paymentTerms,
            paymentDueDate: this.paymentDueDate,
            paymentDueDateUnix: this.paymentDueDateUnix,
            productDescription: this.productDescription,
            invoiceItemList: this.invoiceItemList,
            invoiceTotal: this.invoiceTotal,
            invoicePending: true,
            invoiceDraft: false,
          });          
        } else {
          const database = firebaseApp.firestore().collection('users').doc(`'${this.currentUserID}'`).collection('invoices').doc(this.docId);
          await database.update({
            billerStreetAddress: this.billerStreetAddress,
            billerCity: this.billerCity,
            billerPostCode: this.billerPostCode,
            billerCountry: this.billerCountry,
            clientName: this.clientName,
            clientEmail: this.clientEmail,
            clientStreetAddress: this.clientStreetAddress,
            clientCity: this.clientCity,
            clientPostCode: this.clientPostCode,
            clientCountry: this.clientCountry,
            paymentTerms: this.paymentTerms,
            paymentDueDate: this.paymentDueDate,
            paymentDueDateUnix: this.paymentDueDateUnix,
            productDescription: this.productDescription,
            invoiceItemList: this.invoiceItemList,
            invoiceTotal: this.invoiceTotal
        })
        
      }
        
        this.loading = false;

        const data = {
          docId: this.docId,
          routeId: this.$route.params.invoiceId
        };

        this.$store.dispatch('updateInvoice', data)

      },
      submitForm(){
        if (this.editInvoice) {
          this.updateInvoice();
          return;
        }
        this.uploadInvoice();
      }
    },
  created() {
    // get current date for invoice date field
       if(this.$store.state.isAuth) {
        this.currentUserID = this.$store.state.currentUser.uid
      }     
      if (!this.editInvoice) {
        this.invoiceDateUnix = Date.now();
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString("en-us", this.dateOptions);
      }
      if (this.editInvoice) {
        const currentInvoice = this.currentInvoiceArray[0];
        this.docId = currentInvoice.docId;
        this.billerStreetAddress = currentInvoice.billerStreetAddress;
        this.billerCity = currentInvoice.billerCity;
        this.billerPostCode = currentInvoice.billerPostCode;
        this.billerCountry = currentInvoice.billerCountry;
        this.clientName = currentInvoice.clientName;
        this.clientEmail = currentInvoice.clientEmail;
        this.clientStreetAddress = currentInvoice.clientStreetAddress;
        this.clientCity = currentInvoice.clientCity;
        this.clientPostCode = currentInvoice.clientPostCode;
        this.clientCountry = currentInvoice.clientCountry;
        this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
        this.invoiceDate = currentInvoice.invoiceDate;
        this.paymentTerms = currentInvoice.paymentTerms;
        this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
        this.paymentDueDate = currentInvoice.paymentDueDate;
        this.productDescription = currentInvoice.productDescription;
        this.invoicePending = currentInvoice.invoicePending;
        this.invoiceDraft = currentInvoice.invoiceDraft;
        this.invoiceItemList = currentInvoice.invoiceItemList;
        this.invoiceTotal = currentInvoice.invoiceTotal;
      }
    },
    watch: {
      paymentTerms () {
        if (this.paymentTerms === null) {
          return
        }
        const futureDate = new Date()
        this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms))
        this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions)
      }
    },
}

</script>

<style lang="scss">

h2 {
  color: #505050;
}

.newinvoice {
  position: fixed;
  top: 0;
  left: 0;
  width: 70rem;

  background: #fff;
  z-index: 1;
  padding: 10.3rem 4rem 4rem 14.3rem;

  height: 100%;
  margin: 0em;
  overflow-y: auto;
  z-index: 2 !important;

  @media screen and (max-width: 999px) {
    margin-left: -10.3rem;
    max-height: calc(100vh);
    padding: 14.3rem 4rem 4rem 14.3rem
  }

  @media screen and (max-width: 767px) {
    width: calc(100% + 10.3rem);
    min-height: 100vh;
    max-height: 100vh;
  }

  @media screen and (max-width: 568px) {
    padding: 8rem 2rem 2rem 12rem;
  }
}

fieldset {
  border: none;
  margin: 2rem 0;

  legend {
    color: #7B5CFA;
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 1rem;
    transform: translateY(1rem);
    letter-spacing: 1px;
  }
}

form {
  label {
    font-size: 1.2rem;
    color: #7e88c4;
    margin: 2rem 0 0.5rem;
    letter-spacing: 1px;
  }
}

input,
select {
  width: 100%;
  font-size: 1.6rem;
  height: 4rem;
  border: 1px solid #7c5cfa31;
  outline: none;
  padding: 1rem;
  color: #7e88c4;

  &:focus {
     border: 1px solid #7B5CFA;
  }
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #7e88c4;;
}

input[type=date] {
  font-family: 'Avenir', sans-serif;
  color: #7e88c4;
  font-size: 1.6rem;
  text-align: center;
}

.table__head {
  margin: 2rem 0 0;
  color: #505050;

}

table {
  border-collapse:separate;
  border-spacing: 0 1em;
  letter-spacing: 1px;

  @media screen and (max-width: 569px) {
    max-width: 100vw;
  }

  tr th {
  color: #7e88c4;
  font-weight: 400;
  padding: 2rem;
  }

  input,
  .total {
    letter-spacing: 1px;
    text-align: center;
    color: #7e88c4;
  }

  .item__name {
    width: 50%;
  }

  .total {
    font-weight: 700;
  }

  .icon__wrapper {
    display: table-cell;
    padding-top: 1.1rem;
    padding-left: 1rem;
    cursor: pointer;
    width: 10%;

    i {
      color: tomato;
    }
  }

}

.form__button {
  background-color: #F6F8FE;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  color: #7e88c4;
  font-weight: bold;
  border-radius: 2rem;
  transition: background-color 250ms;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #E0E4FA;
  }

  i {
    margin-right: 1rem;
  }
}

// Actions buttons

.invoice__action {
  position: sticky;
  left: -4rem;
  right: -4rem;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 767px) {
    position: unset;
  }

  padding: 2rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15);

  .btn {
    padding: 1.5rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 250ms;
    background-color: #fd3a17;
    color: white;
    font-weight: 700;
    text-align: center;
    outline: none;
    border: none;

    @media screen and (max-width: 568px) {
      width: 100%;
    }

    &--discard {
      margin-right: auto;
      letter-spacing: 1px;

      @media screen and (max-width: 568px) {
        margin-right: 0;
      }

      &:hover {
        background-color: tomato;
      }

    }
    &--draft {
      background-color: #8a8584;
      margin-right: 2rem;

      @media screen and (max-width: 568px) {
        margin-right: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      &:hover {
        background-color: #464646;
      }
    }
    &--save {
      background-color: #7B5CFA;
      margin-right: 2rem;

      &:hover {
        background-color: #9175FF;
      }

      @media screen and (max-width: 568px) {
        margin-right: 0;
      }
    }
  }

}

// Number input reset

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

// Scrollbar

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #585b72;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

</style>
