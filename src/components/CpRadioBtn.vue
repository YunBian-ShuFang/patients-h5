<script setup lang="ts">
defineProps<{
  options: {
    label: string
    value: string | number
  }[]
  // 默认选项
  modelValue?: string | number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const toggleItem = (value: string | number) => {
  // 触发自定义事件，把数据传给父组件
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="cp-radio-btn">
    <a
      class="item"
      href="javascript:;"
      v-for="item in options"
      :key="item.value"
      :class="{ active: modelValue === item.value }"
      @click="toggleItem(item.value)"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: block;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    color: var(--cp-text2);
    border-radius: 4px;
    transform: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
