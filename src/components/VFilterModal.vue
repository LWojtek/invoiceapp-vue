<template>
  <ul class="filter__modal">
    <!-- Try to seperate the function values from text -->
    <!-- Previously you used element innerText to define the value of the filter -->
    <!-- Keep it seperate as it is much safer, lets say in the future someone will ask you to change the text -->
    <!-- You would have to change all the logic -->
    <!-- Inner text should not define your logic values ;) -->
    <li @click="updateFilter('Draft')">Draft</li>
    <li @click="updateFilter('Pending')">Pending</li>
    <li @click="updateFilter('Paid')">Paid</li>
    <li @click="updateFilter()">Clear Filter</li>
  </ul>
</template>

<script>

export default {
  data(){
    return {
      selectedFilter: null,
    }
  },
  methods: {
    updateFilter(filter){
      this.selectedFilter = filter;
    }
  },

  watch: {
    selectedFilter(newData){
      this.$emit('selected', newData);
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
