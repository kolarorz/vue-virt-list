<template>
  <div class="grid-item">
    <div>
      <div style="font-size: 12px">
        row:{{ index }}-item:{{ itemData.index }}
      </div>
      <div style="display: flex; align-items: center">
        <img :src="itemData.avatar" />
        <div style="margin-left: 6px">{{ itemData.name }}</div>
      </div>
    </div>

    <div
      style="border: 1px solid #ccc; font-size: 12px; cursor: pointer"
      @click="onDelete"
    >
      delete
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onDelete() {
      this.$emit('deleteItem', this.itemData);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-item {
  width: 200px;
  height: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 4px;
  overflow: hidden;

  img {
    display: block;
    width: 40px;
    height: 40px;
  }
}
</style>
