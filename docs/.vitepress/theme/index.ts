import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './custom.scss';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

// import Basic from '../../demos/basic/Main.vue';
// import Advanced from '../../demos/advanced/Main.vue';
// import Chat from '../../demos/chat/Main.vue';
// import Dynamic from '../../demos/dynamic/Main.vue';
// import Fixed from '../../demos/fixed/Main.vue';
// import Grid from '../../demos/grid/Main.vue';
// import Horizontal from '../../demos/horizontal/Main.vue';
// import HugeData from '../../demos/hugeData/Main.vue';
// import InfinityDemo from '../../demos/infinity/Main.vue';
// import Operations from '../../demos/operations/Main.vue';
// import RealList from '../../demos/real-list/Main.vue';
// import Pagination from '../../demos/pagination/Main.vue';
// import Performance from '../../demos/performance/Main.vue';
// import Resize from '../../demos/resize/Main.vue';
// import Slots from '../../demos/slots/Main.vue';
// import TableDemo from '../../demos/table-demo/Main.vue';
// import Tree from '../../demos/tree/Main.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    // app.component('Basic', Basic);
    // app.component('Advanced', Advanced);
    // app.component('Chat', Chat);
    // app.component('Dynamic', Dynamic);
    // app.component('Fixed', Fixed);
    // app.component('Grid', Grid);
    // app.component('Horizontal', Horizontal);
    // app.component('HugeData', HugeData);
    // app.component('Infinity', InfinityDemo);
    // app.component('Operations', Operations);
    // app.component('RealList', RealList);
    // app.component('Pagination', Pagination);
    // app.component('Performance', Performance);
    // app.component('Resize', Resize);
    // app.component('Slots', Slots);
    // app.component('TableDemo', TableDemo);
    // app.component('Tree', Tree);
  },
} satisfies Theme;
