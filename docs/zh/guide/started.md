# 开始使用

## 安装

::: code-group

```sh [npm]
  $ npm install vue-virt-list
```

```sh [pnpm]
  $ pnpm install vue-virt-list
```

```sh [yarn]
  $ yarn add vue-virt-list
```

:::

## 依赖

- `"vue": "^2.0.0 || >=3.0.0"`

## vue版本说明

`<=vue2.6` 需要自行安装 @vue/composition-api
`>=vue2.7` 自带 composition-api，则无需处理

## 注意!!!

1. `list.item.id` <font color="#f00">必须唯一!!!</font>
2. item元素之间不能使用 <font color="#f00">margin!!!</font>

## 引入

```html
<template>
  <div style="width: 500px; height: 400px">
    <VirtList itemKey="id" :list="list" :itemPreSize="20">
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
