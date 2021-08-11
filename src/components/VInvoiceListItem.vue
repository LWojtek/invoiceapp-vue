<template>
  <router-link v-if="invoiceData.length>=1" :to="`/invoices/${invoice.invoiceId}`">
    <li class="invoice"
    >
        <div class="invoice__id">
        #{{ invoice.invoiceId }}
        </div>
        <div class="invoice__date">
        {{ invoice.invoiceDate }}
        </div>
        <div class="invoice__name">
        {{ invoice.clientName }}
        </div>
        <div class="invoice__amount">
        ${{ invoice.invoiceTotal }}
        </div>
        <div
        class="invoice__status"
        :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }"
        >
            <div class="icon__wrapper">
                <i class="fas fa-dot-circle" />
                </div>
                <div class="invoice__status--text">
                <span v-if="invoice.invoicePaid">Paid</span>
                <span v-if="invoice.invoiceDraft">Draft</span>
                <span v-if="invoice.invoicePending">Pending</span>
            </div>
        </div>
        <div class="invoice__icon">
        <i class="fas fa-lg fa-chevron-circle-right" />
        </div>
    </li>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['invoiceData'])
  },
  props: {
    invoice: {
      type: Object,
      default () {}
    }
  }
}
</script>

<style lang="scss" scoped>

nuxt-link {
  color: inherit;
  text-decoration: none;
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
  transition: box-shadow 200ms;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .2);

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0, .2);
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
.invoice__status {
    display: flex;
    justify-content: space-between;
    min-width: 15%;
    flex-basis: 15%;
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
    }

  }


</style>
