# 海量数据

## 示例

30w行数据

巨量数据请使用 `ShallowRef !!!`，`否则内存就爆了!!!` 如需响应式，请使用 `virtListRef.value?.forceUpdate();`。或者，自己新增一个`renderKey`来控制渲染

<!<< @/demos/huge-data/Main.vue
