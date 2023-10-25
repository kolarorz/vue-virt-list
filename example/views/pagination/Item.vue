<template>
  <div
    style="
      min-height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 4px 10px;
    "
  >
    <span>{{ itemData.id }} - {{ itemData.text }}</span>
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
