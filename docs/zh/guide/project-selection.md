---
title: vue-virt-list、virt-list 与 virt-table 如何选择
description: 对比三个项目的框架支持、滚动模型和使用场景：Vue 原生滚动列表、跨框架流式聊天列表与完整的虚拟化业务表格。
---

# 三个项目如何选择

`vue-virt-list`、`virt-list` 和 `virt-table` 面向不同需求。新项目不是旧项目的原地升级，安装包和部分 API、滚动行为不同。

| 需求 | 建议项目 | 框架与主要能力 |
| --- | --- | --- |
| Vue 项目，需要原生滚动列表或虚拟树 | [vue-virt-list](https://github.com/kolarorz/vue-virt-list) | Vue 2 / Vue 3；动态行高、无限加载、聊天列表 |
| 跨框架列表、网格、树形或流式 AI 对话 | [virt-list](https://github.com/kolarorz/virt-list) | Vue 2 / Vue 3、React 16.8+、原生 JS；动态高度、流式跟随、双向历史加载 |
| 带列定义、合并单元格、固定行列和编辑的业务表格 | [virt-table](https://github.com/kolarorz/virt-table) | Vue 3、React 18+、原生 JS；行列双向虚拟化、排序、筛选、分组与编辑 |

## 继续使用 vue-virt-list

如果现有 Vue 项目已经满足需求，或依赖原生滚动条、原生滚动事件与浏览器滚动行为，可以继续使用本项目。

- [快速开始](./started)
- [动态行高示例](/examples/dynamic)
- [聊天列表示例](/examples/chat)

## 了解新版 virt-list

`virt-list` 将虚拟滚动拆成框架无关内核与各框架绑定，并提供流式聊天、历史加载、虚拟树和网格等场景。

**滚动模型是迁移前必须了解的差异**：新版由 JavaScript 管理位移，使用自绘滚动条并接管滚动输入，并非原生滚动组件的直接替换。

- [React 流式聊天示例](https://kolarorz.github.io/virt-list/react/ai/streaming)
- [Vue 流式聊天示例](https://kolarorz.github.io/virt-list/vue/ai/streaming)
- [Vue 3 快速开始](https://kolarorz.github.io/virt-list/vue/guide/started) / [Vue 2 快速开始](https://kolarorz.github.io/virt-list/vue2/guide/started)
- [滚动模型与取舍](https://kolarorz.github.io/virt-list/vanilla/guide/custom-scrollbar)

迁移前先用一个真实页面验证：按框架安装 `@virt-list/vue` 或 `@virt-list/vue2`，检查 props、事件与 ref 方法，补上包内样式，验证容器高度、滚动定位、历史前插及项目依赖的浏览器行为。不要只替换 import 后直接上线。

## 需要完整表格时选择 virt-table

如果需求已经包括列定义、合并单元格、固定列、筛选或编辑，优先评估完整表格，减少在通用虚拟列表之上自行拼装这些能力。

- [十万行与合并单元格在线演示](https://kolarorz.github.io/virt-table/)
- [Vue 快速开始](https://kolarorz.github.io/virt-table/vue/guide/started) / [React 快速开始](https://kolarorz.github.io/virt-table/react/guide/started)
- [开源与企业版能力说明](https://kolarorz.github.io/virt-table/enterprise/)

`@virt-table/*` 核心采用 MIT 许可证；`@virt-table-pro/*` 是单独授权的企业插件。示例涉及的企业能力以文档标注为准。
