<template>
  <div class="demo-cell" style="height: 40px">
    {{ itemData.id }} - {{ itemData.name }}
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
