<script setup lang="ts">
import { uploadImage } from '@/services/consult';
import type { Image } from '@/types/consult';
import { Toast, type UploaderAfterRead } from 'vant';
import { ref } from 'vue';

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', img: Image): void
}>()

const text = ref('')

// 文字发送
const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}

// 图片发送
const sendImage: UploaderAfterRead = async (data) => {
  // 1. 如果数据是数组，则直接返回，忽略处理
  if (Array.isArray(data)) return

  // 2. 如果没有文件对象，则不处理
  if (!data.file) return

  // 3. 显示上传中提示
  const t = Toast.loading('正在上传')

  // 4. 调用 uploadImage 函数上传文件
  const res = await uploadImage(data.file)

  // 5. 清除上传中提示
  t.clear()

  // 6. 上传成功后触发 'send-image' 事件，传递上传后的图片信息
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field v-model="text" type="text" class="input" :border="false" placeholder="问医生" autocomplete="off"
      :disabled="disabled" @keyup.enter="sendText"></van-field>
    <!-- 不预览，使用小图标作为上传按钮 -->
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="sendImage">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;

  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }

  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
