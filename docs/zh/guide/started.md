# 开始使用

## 安装

::: code-group

```sh [npm]
  $ npm add vue-virt-list
```

```sh [pnpm]
  $ pnpm add vue-virt-list
```

```sh [yarn]
  $ yarn add vue-virt-list
```

:::

## 依赖

- `"vue": "^2.0.0 || >=3.0.0"`

## 注意!!!

1. `list.item.id` <font color="#f00">必须唯一!!!</font>
2. item元素之间不能使用 <font color="#f00">margin!!!</font>

## 引入

```html
<template>
  <div style="width: 500px; height: 400px">
    <VirtList itemKey="id" :list="list" :minSize="20">
      <template #default="{ itemData, index }">
        <div>{{ index }} - {{ itemData.id }} - {{ itemData.text }}</div>
      </template>
    </VirtList>
  </div>
</template>

<script>
  import { VirtList } from 'vue-virt-list';
  export default {
    components: { VirtList },
    data() {
      return {
        list: [{ id: 0, text: 'text' }],
      };
    },
  };
</script>
```
