<template>
  <div id="app">
    <VNavigation />
    <div class="app__content">
      <transition name="invoice">
        <VInvoiceModal v-if="invoiceModal"/>
      </transition>
      <transition name="modal">
        <VModal v-if="discardModal" />
      </transition>
    <transition name="page">
      <router-view/>
    </transition>
    </div>
  </div>
</template>

<script>
import VNavigation from '@/components/VNavigation.vue';
import VInvoiceModal from '@/components/VInvoiceModal.vue';
import VModal from '@/components/VModal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    VNavigation,
    VInvoiceModal,
    VModal
  },
  computed: {
    ...mapState([
      'invoiceModal',
      'discardModal'
    ])
  },
  mounted(){
    // Removed the getinvoices store dispatch
    // The app should not call it, the invoice call should be only made when you are loged in and on the inovice page
  }
}
</script>

<style lang="scss">

@import '@/assets/scss/global.scss';
@import '@/assets/scss/variables.scss';

#app {
  overflow-x: hidden;
  width: 100vw;
  max-height: 100vh;
}


a {
    text-decoration: none !important;
    color: inherit !important;
    outline: none !important;
}
  

.invoice-enter-active,
.invoice-leave-active {
  transition: transform 0.5s ease ;
}
.invoice-enter,
.invoice-leave-to {
  transform: translateX(-100%);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 250ms ease ;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 500ms ease ;
}
.page-enter,
.page-leave {
  opacity: 0;
}


</style>
