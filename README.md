# vue-virt-list — Vue 2 / Vue 3 虚拟列表与虚拟树

支持 Vue 2 与 Vue 3 的原生滚动虚拟列表，适用于动态行高、无限加载与聊天列表。

Virtual lists and trees for Vue 2 and Vue 3, with native scrolling and dynamic item heights.

[中文文档](https://kolarorz.github.io/vue-virt-list/) · [English docs](https://kolarorz.github.io/vue-virt-list/en/) · [在线示例](https://kolarorz.github.io/vue-virt-list/examples/basic)

<p align="center">
<img src="https://img.picgo.net/2024/10/18/banner0cf18d1d1663f5d2.png" width="600" alt="vue-virt-list：Vue 2 / Vue 3 虚拟列表"/>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/vue-virt-list?minimal=true"><img src="https://img.shields.io/npm/dm/vue-virt-list.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-virt-list"><img src="https://img.shields.io/npm/v/vue-virt-list.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-virt-list"><img src="https://img.shields.io/npm/l/vue-virt-list.svg?sanitize=true" alt="License"></a>
</p>

## 三个项目如何选择 / Choose a project

| 你的需求 | 项目 | 框架支持 |
| --- | --- | --- |
| Vue 虚拟列表、虚拟树，需要原生滚动行为 | **vue-virt-list（本项目）** | Vue 2 / Vue 3 |
| 跨框架虚拟列表、树、网格及流式 AI 聊天 | **[virt-list](https://github.com/kolarorz/virt-list)** | Vue 2 / Vue 3、React 16.8+、原生 JS |
| 合并单元格、固定行列、筛选和编辑等完整表格能力 | **[virt-table](https://github.com/kolarorz/virt-table)** | Vue 3、React 18+、原生 JS |

新版 `virt-list` 使用 JavaScript 管理位移与自绘滚动条，并非原地升级。
现有项目满足需求，或依赖原生滚动行为时，可以继续使用 `vue-virt-list`。
迁移前请对照 API、样式引入与滚动行为。[阅读选型说明](https://kolarorz.github.io/vue-virt-list/guide/project-selection)。

**English:** Keep `vue-virt-list` for native Vue scrolling; choose `virt-list` for cross-framework lists and streaming chat, or `virt-table` for a full data grid. The newer libraries are not drop-in replacements. [Selection guide](https://kolarorz.github.io/vue-virt-list/en/guide/project-selection).

[体验新版流式聊天](https://kolarorz.github.io/virt-list/vue/ai/streaming) · [体验虚拟表格与合并单元格](https://kolarorz.github.io/virt-table/)


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

### Composition API

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

<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import { VirtList } from 'vue-virt-list';
  const list = ref([{ id: 0, text: 'text' }]);

  // 大数据建议使用 shallowRef: https://kolarorz.github.io/vue-virt-list/guide/instructions#shallowref
  // const list = shallowRef([{ id: 0, text: 'text' }])
</script>
```

## WeChat

有问题可扫码加好友进入技术交流群（备注github账号名&vue-virt-list）

<img src="https://cdn.jsdelivr.net/gh/kolarorz/images@master/wechat.jpg" width=200 />

## Sponsor

开源不易，如果帮助到你，请作者喝杯咖啡吧~

<img src="https://cdn.jsdelivr.net/gh/kolarorz/images@master/wechatpay.jpg" width=200 />

<img src="https://cdn.jsdelivr.net/gh/kolarorz/images@master/alipay.jpg" width=200 />

### 感谢您的慷慨

- AliPay

  - \*\*丹
  - \*\*平
  - \*\*理

- WechatPay

  - 甜言蜜语说给左耳听
