<template>
  <nav>
    <div class="header__logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26"><path fill="#FFF" fill-rule="evenodd" d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z" /></svg>
    </div>
    <div class="header__buttons">
      <div class="header__switch">
        <i class="fas fa-lg fa-moon" />
      </div>
      <div class="header__logout">
        <i class="fas fa-lg fa-power-off" />
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  width: 10.3rem;
  background-color: $dark-bg;
  color: $white;

  border-radius: 0 2rem 2rem 0;

  @media screen and (max-width: 999px) {
    flex-direction: row;

    width: 100vw;
    height: 10.3rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: unset;

    border-radius: 0;
  }
}

.header__logo {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  height: 10.3rem;
  width: 100%;
  background: $primary-violet-dark;
  border-radius: 0 2rem 2rem 0;
  cursor: pointer;

  @media screen and (max-width: 999px) {
    width: 10.3rem;
    height: 100%;
    border-radius: 0 2rem 2rem 0rem;
  }

  svg {
    transform: scale(1.2);
    transition: transform 250ms;
    z-index: 1;
  }

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: $primary-violet-light;
    border-radius: 2rem 0 0 0;

    @media screen and (max-width: 999px) {
      border-radius: 2rem 0 2rem 0rem;
    }
  }
}

.header__logo:hover > svg {
  transform: scale(1.4);
}

.header__buttons {

  width: 100%;

  @media screen and (max-width: 999px) {
    display: flex;
    width: 20.6rem;
    height: 100%;
  }
}

.header__switch,
.header__logout {
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 100%;
  height: 8rem;
  cursor: pointer;

  i {
    color: #7e88c4;
    transition: color 250ms;
  }

  @media screen and (max-width: 999px) {
    min-width: 10.3rem;
    max-width: 10.3rem;
    min-height: 100%;
  }

}

.header__switch {
  border-bottom: 1px solid #4a4e6d;

  @media screen and (max-width: 999px) {
    border-bottom: none;
    border-right: 1px solid #4a4e6d;
  }

}

.header__switch:hover > i {
  color: #fff;
}

.header__logout:hover > i {
  color: #fff;
}

</style>
