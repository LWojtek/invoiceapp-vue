<template>
  <div v-if="currentInvoice" class="container">
    <div class="invoice__wrapper">
      <div class="invoice">
        <router-link style="text-decoration: none; color: inherit;" to="/">
          <div class="btn--back">
            <i class="fas fa-lg fa-long-arrow-alt-left" />
            Go back
          </div>
        </router-link>
        <div class="invoice__header">
            <div class="invoice__header--left">
            <div
                class="invoice__status"
                :class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending }"
            >
                <div class="icon__wrapper">
                <i class="fas fa-dot-circle" />
                </div>
                <div class="invoice__status--text">
                <span v-if="currentInvoice.invoicePaid">Paid</span>
                <span v-if="currentInvoice.invoiceDraft">Draft</span>
                <span v-if="currentInvoice.invoicePending">Pending</span>
                </div>
            </div>
            </div>
            <div class="invoice__header--right">
            <div class="btn btn--edit" @click="toggleEditInvoice">
                Edit
            </div>
            <div class="btn btn--delete" @click="deleteInvoice(currentInvoice.docId)">
                Delete
            </div>
            <div v-if="currentInvoice.invoicePending" class="btn btn--mark" @click="updateStatusToPaid(currentInvoice.docId)" >
                Mark as paid
            </div>
            <div v-else-if="currentInvoice.invoicePaid" class="btn btn--mark" @click="updateStatusToPending(currentInvoice.docId)">
                Mark as pending
            </div>
            <div v-else class="btn btn--mark" :class="{disabled : currentInvoice.invoiceDraft}">
                Mark as paid
            </div>
            </div>
        </div>
        <div class="invoice__body">
            <div class="invoice__body--header">
            <div>
                <h3 v-if="currentInvoice.id">
                #{{ currentInvoice.id }}
                </h3>
                <p v-if="currentInvoice.productDescription">
                {{ currentInvoice.productDescription }}
                </p>
                <p v-else class="warning">
                &lt; Product description &gt;
                </p>
            </div>
            <div style="text-align: center">
                <p v-if="currentInvoice.billerStreetAddress">
                {{ currentInvoice.billerStreetAddress }}
                </p>
                <p v-else class="warning">
                &lt; Biller street address &gt;
                </p>
                <p v-if="currentInvoice.billerCity">
                {{ currentInvoice.billerCity }}
                </p>
                <p v-else class="warning">
                &lt; Biller city &gt;
                </p>
                <p v-if="currentInvoice.billerPostCode">
                {{ currentInvoice.billerPostCode }}
                </p>
                <p v-else class="warning">
                &lt; Biller postcode &gt;
                </p>
                <p v-if="currentInvoice.billerCountry">
                {{ currentInvoice.billerCountry }}
                </p>
                <p v-else class="warning">
                &lt; Biller country &gt;
                </p>
            </div>
            </div>
            <div class="invoice__body--details">
            <div>
                <p>Invoice Date</p>
                <h3>{{ currentInvoice.invoiceDate }}</h3>
                <p>Payment Due</p>
                <h3 v-if=" currentInvoice.paymentDueDate">
                {{ currentInvoice.paymentDueDate }}
                </h3>
            </div>
            <div>
                <p>Bill to:</p>
                <h3 v-if="currentInvoice.clientName">
                {{ currentInvoice.clientName }}
                </h3>
                <h3 v-else class="warning">
                &lt; Client name &gt;
                </h3>
                <p v-if="currentInvoice.clientStreetAddress">
                {{ currentInvoice.clientStreetAddress }}
                </p>
                <p v-else class="warning">
                &lt; Client street address &gt;
                </p>
                <p v-if="currentInvoice.clientCity">
                {{ currentInvoice.clientCity }}
                </p>
                <p v-else class="warning">
                &lt; Client city &gt;
                </p>
                <p v-if="currentInvoice.clientPostCode">
                {{ currentInvoice.clientPostCode }}
                </p>
                <p v-else class="warning">
                &lt; Client postcode &gt;
                </p>
                <p v-if="currentInvoice.clientCountry">
                {{ currentInvoice.clientCountry }}
                </p>
                <p v-else class="warning">
                &lt; Client street country &gt;
                </p>
            </div>
            <div>
                <p>Sent to:</p>
                <h3 v-if="currentInvoice.clientEmail">
                {{ currentInvoice.clientEmail }}
                </h3>
                <h3 v-else class="warning">
                &lt; Client email address &gt;
                </h3>
            </div>
            </div>
            <div class="invoice__body--summary">
            <table>
                <thead>
                <tr>
                    <th class="text-left">
                    Item Name
                    </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in currentInvoice.invoiceItemList" :key="index">
                    <td class="text-left">
                    {{ item.itemName }}
                    </td>
                    <td>{{ item.qty }}</td>
                    <td>${{ item.price }}</td>
                    <td>${{ item.total }}</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="invoice__total">
            <span>Grand Total</span>
            <p>${{ currentInvoice.invoiceTotal }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data () {
    return {
      currentInvoice: null,
      invoiceId: this.$route.params.invoiceId
    }
  },
  computed: {
    ...mapState(['invoiceData', 'currentInvoiceArray', 'editInvoice'])
  },
  created () {
    this.getCurrentInvoice()
  },
  methods: {
    getCurrentInvoice () {
      this.$store.commit('setCurrentInvoice', this.invoiceId)
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    updateStatusToPaid(docId){
        this.$store.dispatch('updateStatusToPaid', docId)
    },
    updateStatusToPending(docId){
        this.$store.dispatch('updateStatusToPending', docId)
    },
    async deleteInvoice(docId) {
        await this.$store.dispatch('deleteInvoice', docId)
        this.$router.push({ name: 'Home' })
    },
    toggleEditInvoice(){
        this.$store.commit('toggleEditInvoice')
        this.$store.commit('toggleInvoice')        
    }
  },
  watch: {
      editInvoice(){
          if (!this.editInvoice) {
              this.currentInvoice = this.currentInvoiceArray[0];
          }
      }
  }
}
</script>

<style lang="scss" scoped>

.btn--back {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 12rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 2rem;
  color: #7e88c4;
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .15);
  transition: box-shadow 250ms;
  font-weight: 700;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0, .15);
  }

  i {
    margin-right: 1rem;
    color: #7B5CFA;
  }
}

.invoice__wrapper {
  padding: 10.3rem 2rem 2rem;
}
.invoice {
  transform: translateX(5.15rem);

  @media screen and (max-width: 999px) {
    transform: translateX(0);
    padding-top: 8rem;
  }
}

// header 

.invoice__header {

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .2);

  &--left {
    display: flex;
    justify-content: space-between;
    flex-basis: 30%;
  }

  &--right {
    display: flex;
  }

  .btn {
    background-color: red;
    padding: 1.8rem;
    cursor: pointer;
    border-radius: 2.5rem;
    color: #fff;
    letter-spacing: 1px;
    font-weight: 700;
    transition: 250ms all;
    box-shadow: 0 4px 8px 0 rgba(0,0,0, .2);

    &:hover {
        box-shadow: 0 6px 12px 0 rgba(0,0,0, .2);
    }

    &--delete {
      background-color: #fd3a17;
      margin: 0 1.5rem;

      &:hover {
        background: tomato;
      }
    }

    &--edit{
      background-color: #8a8584;

      &:hover {
        background: #464646;
      }
    }

    &--mark {
      background-color: #7B5CFA;

      &:hover {
          background: #9175FF;
      }
    }
  }
}

.btn--mark {   

    &.disabled {
        background-color: rgba(123, 92, 250, 0.1);
        color: rgb(107, 107, 107);
        // pointer-events: none;
        cursor: not-allowed;

        &:hover {
            background: rgba(123, 92, 250, 0.1);
            box-shadow: 0 4px 8px 0 rgba(0,0,0, .2);
        }
    }
}

.status__text {
  flex-basis: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7e88c4;
  font-weight: 700;
  letter-spacing: 1px;
}

.invoice__status {
    display: flex;
    justify-content: space-between;
    flex-basis: 70%;
    padding: 1.5rem;

    &.paid {
      color: #30d59b;
      background-color: #F3FDF9;
    }

    &.pending {
      color: #ff8c00;
      background-color: #FFF8F0
    }

    &.draft {
      color: #494949;
      background-color: #F3F3F5;
    }

    &--text {
      flex-basis: 60%;
      padding: 0.2rem 0;
    }

    .icon__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 40%;
      margin-right: 1rem;
    }

  }

// body 

.warning {
  color: tomato !important;
}

.text-center {
  text-align: center !important;
}

.text-left {
  text-align: left !important;
}

.text-right {
  text-align: right !important;
}

.invoice__body {
  position: relative;
  background-color: #fff;
  margin-top: 2rem;
  border-radius: 1rem;
  z-index: 1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .2);

  p {
    color: #7e88c4;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.8rem;
    color: #505050;
    margin-bottom: 2rem;
  }

  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 3rem 0;

    >div {
      h3 {
        margin-bottom: 1rem;
      }
    }
  }

  &--details {
    display: flex;
    justify-content: space-between;
    margin: 5rem 0;
    padding: 3rem 3rem 0;
  }

  &--summary {
    background-color: rgb(250, 250, 250);
    padding: 3rem;
    // border-top: 1px solid #7e88c4;

    table {
      width: 100%;

      th {
        font-weight: 700;
        padding-left: 0;
        padding-right: 0;
      }

      td {
        text-align: center;
      }
    }
  }

  .invoice__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373A53;
    padding: 3rem 3rem 3rem 3rem;
    border-radius: 0 0 1rem 1rem;
    color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0, .15);

    span {
      font-weight: 700;
      font-size: 1.8rem;
      letter-spacing: 1px;
    }

    p {
      width: 11.8rem;
      font-size: 3rem;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
  }
}


</style>
