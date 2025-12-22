# Getting Started

## Usage

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

## Dependencies

- `"vue": "^2.0.0 || >=3.0.0"`

## Vue Version Notes

For `<=vue2.6`, you need to install @vue/composition-api manually.
For `>=vue2.7`, composition-api is built-in, so no additional setup is required.

## Attention!!!

1. `list.item.id` <font color="#f00">Must be unique!!!</font>
2. <font color="#f00">Margin!!!</font> cannot be used between item elements

## Import and Usage

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
