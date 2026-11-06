---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Vue 2 / Vue 3 虚拟列表与虚拟树
description: 适用于 Vue 2 和 Vue 3 的虚拟列表与虚拟树组件，支持原生滚动、动态行高、无限加载和聊天列表。

hero:
  name: 'vue-virt-list'
  tagline: 一个支持 vue2&vue3 的高性能虚拟(滚动)列表组件

  actions:
    - theme: brand
      text: 快速开始
      link: /guide/started
    - theme: alt
      text: 三个项目如何选择
      link: /guide/project-selection
    - theme: alt
      text: 新版 virt-list
      link: https://kolarorz.github.io/virt-list/
    - theme: alt
      text: 虚拟表格 virt-table
      link: https://kolarorz.github.io/virt-table/

features:
  - title: 轻量
    details: 8K(gzipped 3k)
  - title: 打破壁垒
    details: 支持 vue2.x 和 vue3.x (powered by vue-demi)
  - title: 高性能
    details: 百万级数据、满帧率渲染、O(1) 复杂度的滚动增量计算
  - title: 类型支持
    details: typescript 支持
  - title: 平滑滚动
    details: 支持向上平滑滚动
  - title: 高扩展
    details: 4个插槽供选择 - 支持表格、无限滚动、聊天室、合并单元格等
---

## 相关项目

- **[VirtList GitHub 仓库](https://github.com/kolarorz/virt-list)**：适用于 React、Vue 和原生JS的虚拟列表、树、网格与流式聊天。[文档与示例](https://kolarorz.github.io/virt-list/)。
- **[VirtTable GitHub 仓库](https://github.com/kolarorz/virt-table)**：适用于 React、Vue 和原生JS的虚拟表格与 Data Grid，支持合并单元格、固定行列与编辑。[文档与示例](https://kolarorz.github.io/virt-table/)。

需要原生滚动行为的 Vue 项目可继续使用 vue-virt-list；新项目并非直接替换升级。[查看选型与迁移说明](/guide/project-selection)。
