<template>
  <div class="invoices__header--right">
    <div class="invoices__header--filter" @click="modal = !modal">
      <div class="text__wrapper" style="text-align: center;">
        Filter by status <span v-if="this.val">{{ this.val }}</span>
      </div>
      <div class="icon__wrapper">
        <i class="fas fa-chevron-down" :class="{ active : modal }" />
      </div>
    </div>
    <div class="invoices__header--btn" @click="newInvoice">
      <div class="icon__wrapper">
        <i class="fas fa-2x fa-plus-circle" />
      </div>
      <div class="text__wrapper">
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
      modal: false,
      val: null,

    }
  },
  methods: {
    newInvoice(){
      this.$store.commit('toggleInvoice')
    }
  },
  created(){
    this.bus.$on('filteredInvoice', (value) => {
      if (value === 'Clear Filter') {
        this.filteredInvoice = null;
        this.modal = false
        this.val = null
        return
      }
      this.val = value
      this.modal = false
    })
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.text__wrapper {
  span {
    color: $primary-violet-dark;
  }
}


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
