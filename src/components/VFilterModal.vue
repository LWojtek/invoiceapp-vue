<template>
  <div class="filter__modal">
    <div>
      <input id="paid" type="checkbox">
      <label for="paid">Paid</label>
      <div class="checkbox" />
    </div>
    <div>
      <input id="pending" type="checkbox">
      <label for="pending">Pending</label>
      <div class="checkbox" />
    </div>
    <div>
      <input id="draft" type="checkbox">
      <label for="draft">Draft</label>
      <div class="checkbox" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

.filter__modal {
  position: absolute;

  display: flex;
  flex-direction: column;
  background: #fff;
  width: 60%;
  bottom: 0;
  transform: translateY(100%) translateX(-15%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0,0,0, .1);

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
