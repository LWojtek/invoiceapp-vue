<template>
  <div class="empty__warning">
    <p>Please add items to the invoice</p>
  </div>
</template>

<style lang="scss" scoped>

.empty__warning {
  position: sticky;
  z-index: 1;
  background-color: rgb(248, 102, 77);
  top: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0, 0.15);
}

</style>
