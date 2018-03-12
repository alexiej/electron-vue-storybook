<template>
    <button class="button-styles" >
        <slot/>
  </button>
</template>
<script>
export default {
}
</script>

<style lang="scss" scoped>
.button-styles {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
  background: brown;
  color: #fff;
}
</style>


