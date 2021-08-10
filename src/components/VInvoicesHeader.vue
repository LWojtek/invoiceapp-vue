<template>
  <div class="invoices__header">
    <div class="invoices__header--left">
      <h1>Invoices</h1>
      <!-- <span>Showing {{ invoices.length }} invoices</span> -->
    </div>
    <VFilters />
  </div>
</template>

<script>
import VFilters from '@/components/VFilters.vue'

export default {
    components: {
        VFilters
    }
}
</script>

<style lang="scss">

.invoices__header {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 767px){
    flex-direction: column;
  }

  &--left {
    flex-basis: 20%;

    h1 {
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 1.2rem;
      color: gray;
    }
  }

  &--right {
    position: relative;
    flex-basis: 40%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 767px) {
      flex-basis: 70%;
    }
  }

  &--filter,
  &--btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-basis:50%;

    @media screen and (max-width: 767px){
      flex-basis:40%;
    }

    .icon__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 20%;
    }

    .text__wrapper {
      flex-basis: 80%;
    }
  }

  &--filter {
    cursor: pointer;
    font-weight: bold;

    i {
      color: #7B5CFA;
    }
  }

  &--btn {
    cursor: pointer;
    max-height: 5rem;
    border-radius: 3rem;
    background: #7B5CFA;
    margin-left: 2rem;
    padding: 1rem;
    color: #fff;
    transition: background-color 250ms;

    .text__wrapper {
      margin-left: 1rem;
    }

    &:hover {
      background-color: #9175FF;
    }
  }
}
</style>
