<script setup lang="ts">
// 提供 name 属性即可
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.cp-icon {
  // 和字体大小一样
  width: 1em;
  height: 1em;
}
</style>
