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
    <router-view/>
    </div>
    <div
			class="fb-customerchat"
			page_id="100819355676998"
			minimized="true"
		></div>
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
  created(){
    this.$store.dispatch('getInvoices')
  }
}
</script>

<style lang="scss">

@import '@/assets/scss/global.scss';
@import '@/assets/scss/variables.scss';


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


</style>
