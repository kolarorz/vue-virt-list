import { DefaultTheme, defineConfig } from 'vitepress';

import pkg from '../../../package.json';

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'vue-virt-list',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/zh/guide/started' },
      { text: 'Examples', link: '/zh/examples/basic' },
      { text: 'API', link: '/zh/api/virt-list' },
      {
        text: pkg.version,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/keno-lee/vue-virt-list/releases',
          },
          {
            text: '参与贡献',
            link: 'https://github.com/keno-lee/vue-virt-list/blob/master/CONTRIBUTING.md',
          },
        ],
      },
      // 开发中
      // { text: 'Playground', link: '/playground/' },
    ],

    sidebar: {
      '/zh/guide/': {
        base: '/zh/guide/',
        items: sidebarGuide(),
      },

      '/zh/examples/': {
        base: '/zh/examples/',
        items: sidebarExamples(),
      },

      '/zh/api/': {
        base: '/zh/api/',
        items: sidebarApi(),
      },
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/keno-lee/vue-virt-list',
      },
    ],
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: 'started' },
        { text: '特殊说明', link: 'instructions' },
      ],
    },
  ];
}

function sidebarExamples(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '示例',
      items: [
        { text: '基础示例', link: 'basic.md' },
        { text: '海量数据', link: 'huge-data' },
        { text: '固定高度', link: 'fixed' },
        { text: '水平滚动', link: 'horizontal' },
        { text: '插槽', link: 'slots' },
        { text: '各类操作', link: 'operations' },
        { text: '可变窗口大小', link: 'resize' },

        { text: '可变高度', link: 'dynamic' },
        { text: '表格', link: 'table' },
        { text: '无限加载', link: 'infinity' },
        { text: '聊天室', link: 'chat' },
        { text: '高阶用法', link: 'advanced' },
        {
          text: '分页',
          link: 'pagination',
        },
        {
          text: '开箱即用',
          collapsed: false,
          items: [
            { text: 'RealList', link: 'real-list' },
            { text: 'VirtGrid', link: 'virt-grid' },
            { text: 'VirtTree', link: 'virt-tree' },
            { text: 'VirtTable', link: 'virtable' },
          ],
        },
        {
          text: 'Beta',
          collapsed: false,
          items: [{ text: 'VirtScrollbar', link: 'virt-scrollbar' }],
        },
      ],
    },
  ];
}

function sidebarApi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'API',
      items: [
        { text: 'VirtList', link: 'virt-list' },
        { text: 'VirtGrid', link: 'virt-grid' },
        { text: 'VirtTree', link: 'virt-tree' },
      ],
    },
  ];
}
