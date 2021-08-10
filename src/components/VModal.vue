<template>
  <div class="modal__container">
    <div class="modal">
      <h2>Are you sure you want to exit? <br>Your changes will not be saved.</h2>
      <div class="buttons">
        <div class="btn buttons--return" @click="closeModal">
          Return
        </div>
        <div class="btn buttons--close" @click="closeInvoice">
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        closeModal(){
            this.$store.commit('toggleModal')
        },
        closeInvoice(){
          this.$store.commit('toggleModal');
          this.$store.commit('toggleInvoice');
          if (this.editInvoice) {
            this.$store.commit('toggleEditInvoice')
          }
        }
    }
}
</script>

<style lang="scss" scoped>

.modal__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0, .15);
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 50rem;
  max-width: 50rem;
  background-color: #373A53;
  padding: 5rem;
  border-radius: 2rem;

  h2 {
    text-align: center;
    line-height: 3rem;
    color: #fff;
    font-size: 1.7rem;
    font-weight: 400;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  .btn {
    color: #fff;
    padding: 1.5rem 4rem;
    text-align: center;
    border-radius: 2rem;
    font-weight: 700;
    cursor: pointer;
    transition: 250ms opacity;
    letter-spacing: 1px;

    &:hover {
      opacity: 0.8;
    }
  }

  &--return {
    background-color: #9175FF;
  }

  &--close {
    background-color: #fd3a17;
  }

  &--return,
  &--close {
    flex-basis: 47%;
  }
}

</style>
