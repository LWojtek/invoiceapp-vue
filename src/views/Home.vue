<template>
  <div class="container invoices">
    <div class="invoices__content">
      <VInvoicesHeader />
      <ul class="invoice__container" v-if="invoiceData.length >= 1">
        <VInvoiceListItem 
        v-for="invoice in invoiceData"
        :key="invoice.id"
        :invoice="invoice"
        />
      </ul>
      <transition name="empty" v-else>
        <div class="empty" >
          <div>
            <h1>There is nothing here</h1>
            <p>Create a new invoice by clicking the New Invoice button and get started</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import VInvoicesHeader from '@/components/VInvoicesHeader.vue';
import VInvoiceListItem from '@/components/VInvoiceListItem.vue';


import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    VInvoicesHeader,
    VInvoiceListItem
  },
  computed: {
    ...mapState(['invoiceData'])
  },
  methods: {
    newInvoice(){
      this.$store.commit('toggleInvoice')
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.invoices {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 999px){
    padding-top: 10.3rem;
  }
}

.invoices__content {
  width: 100vw;
  height: 100vh;
  padding: 8rem 2rem 2rem;
  transform: translateX(5.15rem);

  @media screen and (max-width: 999px){
    height: 100%;
  }
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;

  background-color: rgba(0,0,0, .5);
  opacity: 0;
  z-index: -1;
  transition: opacity 400ms;

  @media screen and (max-width: 999px){
    max-height: 100vh;
  }

  &.active {
    z-index: 0;
    opacity: 1;
  }
}

.invoice__container {
  list-style-type: none;
  padding: 3rem 0;
}

.invoice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: border 200ms;

  &:hover {
    border: 1px solid #7B5CFA;
  }

  &__id {
    flex-basis: 15%;
    font-weight: 700;
  }

  &__date {
    flex-basis: 15%;
  }

  &__name {
    flex-basis: 35%;
  }

  &__amount {
    flex-basis: 15%;
    font-weight: 700;
  }

  &__icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 5%;
    color: #7B5CFA;

    @media screen and (max-width: 767px){
      display: none;
    }
  }
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60rem;
  text-align: center;

  div {
    padding: 4rem;
    border-radius: 2rem;
    box-shadow: 0 4px 12px 0 rgba(0,0,0, .15);
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.6rem;
  }
}

.empty-enter-active,
.empty-leave-active {
  transition:all 0.25s ease ;
}
.empty-enter-to,
.empty-leave-to {
  transform: scale(0);
  opacity: 0;
}

</style>
