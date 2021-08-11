<template>
  <ul class="filter__modal">
    <li @click="filterInvoices">Draft</li>
    <li @click="filterInvoices">Pending</li>
    <li @click="filterInvoices">Paid</li>
    <li @click="filterInvoices">Clear Filter</li>
  </ul>

<!-- <div class="filter__modal">
    <div>
      <input id="paid" type="checkbox" v-model="isPaid" @change="filterInvoices">
      <label for="paid">Paid</label>
      <div class="checkbox" />
    </div>
    <div>
      <input id="pending" type="checkbox" v-model="isPending" @change="filterInvoices">
      <label for="pending">Pending</label>
      <div class="checkbox" />
    </div>
    <div>
      <input id="draft" type="checkbox" v-model="isDraft" @change="filterInvoices">
      <label for="draft">Draft</label>
      <div class="checkbox" />
    </div>
  </div> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      filterMenu: null,
      filteredInvoice: null,
    }
  },
  computed: {
    ...mapState(['invoiceData']),
    filteredInvoices(){
      return this.invoiceData.filter((invoice) => {
        if (this.filteredInvoice === 'Draft') {
          return invoice.invoiceDraft
        } else if (this.filteredInvoice === 'Paid') {
          return invoice.invoicePaid
        } else if (this.filteredInvoice === 'Pending') {
          return invoice.invoicePending
        } else {
          return invoice
        }
      })
    }
  },
  methods: {
    filterInvoices(e){
      if (e.target.value === 'Clear Filter') {
        this.filteredInvoice = null;
        return
      }
      this.filteredInvoice = e.target.innerText;
      this.bus.$emit('filteredInvoice', this.filteredInvoice)
      this.$store.commit('filterInvoices', this.filteredInvoice)
    }
  }
}


</script>

<style lang="scss">

@import '@/assets/scss/variables.scss';

.filter__modal {
  position: absolute;

  display: flex;
  flex-direction: column;
  background: #fff;
  width: 60%;
  bottom: 0;
  transform: translateY(100%) translateX(-15%);
  // padding: 2rem;
  list-style-type: none;
  // border-radius: 1rem;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .2);

  li {
    text-align: center;
    padding: 0.5rem 3rem;
    cursor:pointer;
    transition: 200ms all;

    &:hover {
      background-color: $primary-violet-light;
      color: #fff;
    }
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
    label {
      transform: translateX(1rem);
    }
  }
}

.checkbox {
  position: absolute;
  background: #E0E4FA;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  z-index: -1;
  transition: 250ms;

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:transparent;
    border-radius: 0.5rem;
    transition: 250ms;
  }

  &::after {
    background-image: none;
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: 90% 50%;
  }

}

  input[type=checkbox]{
    z-index: 0;
    width: 2rem;
    height: 2rem;
    opacity: 0;
        cursor: pointer;
  }

  input[type=checkbox]:checked ~ .checkbox::before {
    background:#7B5CFA;
  }

  input[type=checkbox]:checked ~ .checkbox::after {
    background-image: url('../assets/images/icon-check.svg');
  }

</style>
