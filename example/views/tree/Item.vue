<template>
  <div class="demo-cell">{{ itemData.id }} - {{ itemData.text }}</div>
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
