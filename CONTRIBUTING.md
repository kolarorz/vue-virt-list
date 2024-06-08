# 贡献代码

1. fork 代码，

2. git clone 本地

3. 修改代码

4. 提交pr

## 本地运行

```shell
pnpm i
```

```shell
npm run dev
```

## docs

master分支：github actions自动发布文档

## publish

1. 更改版本号
2. 添加release和tag
3. github actions自动发布组件

## 开发注意事项

### render

由于需要支持vue2&vue3，所以不允许使用

1. `template`模版
2. `JSX.Element`

应当使用 `_h` 或者 `_h2Slot` 函数

#### 原理

传递插槽

```ts
// vue2写法
h('div', {
  // 其他属性
  attrs: {},
  // 传递插槽
  scopedSlots: {
    default: this.$slots.stickyHeader,
    stickyHeader: this.$scopedSlots.stickyHeader,
  },
});

// vue3写法
h(
  'div',
  { ...attrs },
  // 传递插槽
  {
    default: this.$slots.stickyHeader,
    stickyHeader: this.$scopedSlots.stickyHeader,
  },
);
```

渲染插槽

```ts
// vue2写法
h('div', {}, [this.$scopedSlots.default({})]);

// vue3写法 - 推荐使用 functional
h('div', {}, { default: () => this.$slots.default({}) });
```

### 禁用从vue引入

属性和方法引入应当从`vue-demi`中引入，例如：

```ts
import { onMounted, ref } from 'vue-demi';
```
