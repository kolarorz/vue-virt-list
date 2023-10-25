<template>
  <div :class="['chat-row', itemData.type === 'me' ? 'right' : '']">
    <div :class="['chat-cell']">{{ itemData.id }} - {{ itemData.msg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="scss">
.chat-row {
  // width: 100%;
  padding: 10px 0;
  display: flex;

  &.right {
    justify-content: flex-end;
  }

  .chat-cell {
    width: 60%;
    background-color: cyan;
    // min-height: 40px;
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
