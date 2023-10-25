<template>
  <div class="demo-row">
    <div
      :style="`display: flex; align-items: center; justify-content: center;`"
      class="demo-cell"
      style="width: 80px"
    >
      {{ itemData.id }}
    </div>
    <div class="demo-cell" style="width: 600px">{{ itemData.source }}</div>
    <div class="demo-cell" style="width: 600px">{{ itemData.en }}</div>
    <div
      class="demo-cell"
      style="width: 100px; position: sticky; right: 0; background-color: #fff"
    >
      冻结操作区
    </div>
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
