<h1 align="center">vue-virt-list — Vue 2 / Vue 3 虚拟列表与虚拟树</h1>

<p align="center">原生滚动 · 动态行高 · 无限加载<br>Virtual lists and trees for Vue 2 and Vue 3, with native scrolling.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-virt-list"><img src="https://img.shields.io/npm/v/vue-virt-list?style=flat-square&amp;label=npm" alt="vue-virt-list npm version"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT license"></a>
  <a href="https://github.com/kolarorz/vue-virt-list"><img src="https://img.shields.io/badge/TypeScript-supported-3178c6?style=flat-square" alt="TypeScript supported"></a>
</p>

<p align="center"><a href="https://kolarorz.github.io/vue-virt-list/">中文文档</a> · <a href="https://kolarorz.github.io/vue-virt-list/en/">English docs</a></p>
<p align="center"><strong><a href="https://kolarorz.github.io/vue-virt-list/">文档</a> · <a href="https://kolarorz.github.io/vue-virt-list/examples/basic">在线演示</a> · <a href="#quick-start">快速开始</a> · <a href="https://kolarorz.github.io/vue-virt-list/guide/project-selection">项目选型</a></strong></p>

---

## 保留熟悉的 Vue 与浏览器体验

| 原生滚动 | 动态内容 | Vue 2 / Vue 3 |
| --- | --- | --- |
| 保留浏览器滚动行为 | 不定高消息、聊天与无限加载 | 通过 vue-demi 支持两代 Vue |
| [基础示例](https://kolarorz.github.io/vue-virt-list/examples/basic) | [动态行高](https://kolarorz.github.io/vue-virt-list/examples/dynamic) · [聊天列表](https://kolarorz.github.io/vue-virt-list/examples/chat) | [快速接入](https://kolarorz.github.io/vue-virt-list/guide/started) |

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


## Quick Start

```shell
npm install vue-virt-list -S
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

<details>
<summary>Options API 示例</summary>

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

</details>

## 社区与支持

[提交 Issue](https://github.com/kolarorz/vue-virt-list/issues) · [讨论](https://github.com/kolarorz/vue-virt-list/discussions) · [贡献指南](./CONTRIBUTING.md) · [设计与优势说明](https://d8diegi800.feishu.cn/wiki/MX2Vwn1RWiwUsokjhshcr6sVnNb?from=from_copylink)

<details>
<summary>微信交流群</summary>


有问题可扫码加好友进入技术交流群（备注github账号名&vue-virt-list）

<img src="https://cdn.jsdelivr.net/gh/kolarorz/images@master/wechat.jpg" width=200 />

</details>

<details>
<summary>赞助与致谢</summary>


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

</details>

## License

[MIT](./LICENSE) © kolarorz
