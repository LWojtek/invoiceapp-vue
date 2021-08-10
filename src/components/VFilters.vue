<template>
  <div class="invoices__header--right">
    <div class="invoices__header--filter" @click="modal = !modal">
      <div class="text__wrapper">
        Filter by status
      </div>
      <div class="icon__wrapper">
        <i class="fas fa-chevron-down" :class="{ active : modal }" />
      </div>
    </div>
    <div class="invoices__header--btn">
      <div class="icon__wrapper">
        <i class="fas fa-2x fa-plus-circle" />
      </div>
      <div class="text__wrapper" @click="newInvoice">
        New Invoice
      </div>
    </div>
    <transition name="modal">
      <VFilterModal v-if="modal" />
    </transition>
  </div>
</template>

<script>

import VFilterModal from '@/components/VFilterModal'

export default {
  components: {
    VFilterModal
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    newInvoice(){
      this.$store.commit('toggleInvoice')
    }
  },
}
</script>

<style lang="scss" scoped>


.modal-enter,
.modal-leave-to {
  visibility: hidden;
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 150ms ease;
}

i {
  transition: 150ms transform;

  &.active {
    transform: rotate(180deg)
  }
}

</style>
