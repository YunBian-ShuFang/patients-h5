<script setup lang="ts">
import { computed, ref } from 'vue'

// 定义 props，指定组件的外部传入属性
const props = defineProps<{
  disabled?: boolean // 表示是否禁用操作，类型为可选的布尔值
}>()

// 用 ref 创建一个响应式变量 showPopover，初始值为 false，表示Popover是否显示
const showPopover = ref(false)

// 创建一个 computed 属性 actions，用来构造显示在 Popover 中的操作列表
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled }, // 查看处方操作，是否禁用由 props.disabled 控制
  { text: '删除订单' } // 删除订单操作
])

// 定义事件（emit），允许子组件向父组件发送名为 'on-delete' 和 'on-preview' 的事件
const emit = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-preview'): void
}>()

// 当用户在 Popover 中选择一个操作时调用该方法
const onSelect = (action: { text: string }, i: number) => {
  // 如果选择的是第一个操作“查看处方”，则触发 'on-preview' 事件
  if (i === 0) emit('on-preview')

  // 如果选择的是第二个操作“删除订单”，则触发 'on-delete' 事件
  if (i === 1) emit('on-delete')
}
</script>

<template>
  <div class="consult-more">
    <van-popover
      placement="top-start"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference>更多</template>
    </van-popover>
  </div>
</template>

<style lang="scss" scoped>
.consult-more {
  flex: 1;
  color: var(--cp-tag);
  font-size: 13px;
}
</style>
