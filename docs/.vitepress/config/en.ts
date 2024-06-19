import { DefaultTheme, defineConfig } from 'vitepress';

import pkg from '../../../package.json';

export const en = defineConfig({
  lang: 'en-US',
  description: 'vue-virt-list',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/started' },
      { text: 'Examples', link: '/examples/basic' },
      { text: 'API', link: '/api/virt-list' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/keno-lee/vue-virt-list/releases',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/keno-lee/vue-virt-list/blob/master/CONTRIBUTING.md',
          },
        ],
      },
      // 开发中
      // { text: 'Playground', link: '/playground/' },
    ],

    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: sidebarGuide(),
      },

      '/examples/': {
        base: '/examples/',
        items: sidebarExamples(),
      },

      '/api/': {
        base: '/api/',
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
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: 'started' },
        { text: 'Special Instructions', link: 'instructions' },
      ],
    },
  ];
}

function sidebarExamples(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Examples',
      items: [
        { text: 'Basic', link: 'basic' },
        { text: 'Huge Data', link: 'huge-data' },
        { text: 'Fixed Size', link: 'fixed' },
        { text: 'Horizontal Scroll', link: 'horizontal' },
        { text: 'Slots', link: 'slots' },
        { text: 'Operations', link: 'operations' },
        { text: 'Resize Client', link: 'resize' },

        { text: 'Dynamic Size', link: 'dynamic' },
        { text: 'Table', link: 'table' },
        { text: 'Infinity Load', link: 'infinity' },
        { text: 'Chat Room', link: 'chat' },
        { text: 'Advanced Usage', link: 'advanced' },
        {
          text: 'Pagination',
          link: 'pagination',
        },
        {
          text: 'Out of The Box',
          collapsed: false,
          items: [
            { text: 'RealList', link: 'real-list' },
            { text: 'VirtGrid', link: 'virt-grid' },
            { text: 'VirtTree', link: 'virt-tree' },
            { text: 'VirtTable', link: 'virtable' },
          ],
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
