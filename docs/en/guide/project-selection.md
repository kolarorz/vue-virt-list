---
title: Choosing between vue-virt-list, virt-list and virt-table
description: Choose native Vue virtual scrolling, cross-framework lists for streaming chat, or a virtualized data grid with merged cells and editing.
---

# Choose a project

These projects serve different needs. The newer packages are not drop-in upgrades: package names, APIs and scrolling behavior differ.

| Use case | Project | Frameworks and capabilities |
| --- | --- | --- |
| Vue lists or trees with native scrolling | [vue-virt-list](https://github.com/kolarorz/vue-virt-list) | Vue 2 / Vue 3; dynamic heights, infinite loading and chat lists |
| Cross-framework lists, grids, trees or streaming AI chat | [virt-list](https://github.com/kolarorz/virt-list) | Vue 2 / Vue 3, React 16.8+, vanilla JS; dynamic heights, stream following and bidirectional history |
| Business tables with merged cells, pinned columns and editing | [virt-table](https://github.com/kolarorz/virt-table) | Vue 3, React 18+, vanilla JS; row and column virtualization, sorting, filtering and editing |

## Stay with vue-virt-list

Keep this project when it meets your Vue application's needs, particularly if you depend on native scrollbars, scroll events or browser scrolling behavior.

- [Get started](./started)
- [Dynamic height example](/en/examples/dynamic)
- [Chat example](/en/examples/chat)

## Explore virt-list

The newer library separates its virtualization engine from framework bindings and provides streaming chat, history loading, trees and grids.

**Check the scrolling model before migrating.** It uses JavaScript-managed offsets and custom scrollbars, with input handled by the library. It is not a direct replacement for a native scrolling component.

- [React streaming chat](https://kolarorz.github.io/virt-list/react/ai/streaming)
- [Vue streaming chat](https://kolarorz.github.io/virt-list/vue/ai/streaming)
- [Vue 3 setup](https://kolarorz.github.io/virt-list/vue/guide/started) / [Vue 2 setup](https://kolarorz.github.io/virt-list/vue2/guide/started)
- [Scrolling model and tradeoffs](https://kolarorz.github.io/virt-list/vanilla/guide/custom-scrollbar)

Before migration, try a representative screen. Install the appropriate `@virt-list/vue` or `@virt-list/vue2` package, review props, events and ref methods, import its stylesheet and verify container sizing, scroll positioning, history prepends and required browser behavior. Changing the import alone is not sufficient. The linked documentation is currently in Chinese.

## Explore virt-table

Choose a data grid when you need column definitions, merged cells, pinned columns, filtering or editing instead of building those behaviors on a general-purpose list.

- [Live large-table and merged-cell demos](https://kolarorz.github.io/virt-table/)
- [Vue setup](https://kolarorz.github.io/virt-table/vue/guide/started) / [React setup](https://kolarorz.github.io/virt-table/react/guide/started)
- [Open-source and enterprise capabilities](https://kolarorz.github.io/virt-table/enterprise/)

The `@virt-table/*` core is MIT-licensed. Enterprise plugins under `@virt-table-pro/*` require separate licensing; check each demo's capability notes.
