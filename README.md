# vue-virt-list 虚拟列表 虚拟滚动列表 虚拟树

<p align="center">
<img src="https://img.picgo.net/2024/10/18/banner0cf18d1d1663f5d2.png" width="600"/>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/vue-virt-list?minimal=true"><img src="https://img.shields.io/npm/dm/vue-virt-list.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-virt-list"><img src="https://img.shields.io/npm/v/vue-virt-list.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-virt-list"><img src="https://img.shields.io/npm/l/vue-virt-list.svg?sanitize=true" alt="License"></a>
</p>

<!-- <a href="./README.md" target="_blank">EN</a> | <a href="./README_cn.md" target="_blank">中文</a> -->

## Documentation

To check out docs, visit <a href="https://kolarorz.github.io/vue-virt-list/" target="_blank">vue-virt-list</a>

👉 <a href="https://d8diegi800.feishu.cn/wiki/MX2Vwn1RWiwUsokjhshcr6sVnNb?from=from_copylink" target="_blank">Advantages</a>

## Quick Start

```shell
npm install vue-virt-list -S
```

### Options API

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

### Composition API

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

<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import { VirtList } from 'vue-virt-list';
  const list = ref([{ id: 0, text: 'text' }]);

  // 大数据建议使用 shallowRef: https://kolarorz.github.io/vue-virt-list/guide/instructions#shallowref
  // const list = shallowRef([{ id: 0, text: 'text' }])
</script>
```

## Sponsor

开源不易，如果帮助到你，请作者喝杯咖啡吧~

<img src="https://img.picgo.net/2024/10/18/wechatb7962c50d6ed1d1b.png" width=200 />
<img src="https://img.picgo.net/2024/10/18/alipayd8563fbfb64b0daa.png" width=200 />

## WeChat

有问题可扫码加好友进入技术交流群（备注github账号名）

<img src="https://img.picgo.net/2024/10/18/qrcode3659314a0b986be8.jpeg" width=200 />
