import { DefaultTheme, defineConfig } from 'vitepress';

import pkg from '../../../package.json';

export const en = defineConfig({
  lang: 'en-US',
  description: 'vue-virt-list',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/en/guide/started' },
      { text: 'Examples', link: '/en/examples/basic' },
      { text: 'API', link: '/en/api/virt-list' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/kolarorz/vue-virt-list/releases',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/kolarorz/vue-virt-list/blob/master/CONTRIBUTING.md',
          },
        ],
      },
      // 开发中
      // { text: 'Playground', link: '/playground/' },
    ],

    sidebar: {
      '/en/guide/': {
        base: '/en/guide/',
        items: sidebarGuide(),
      },

      '/en/examples/': {
        base: '/en/examples/',
        items: sidebarExamples(),
      },

      '/en/api/': {
        base: '/en/api/',
        items: sidebarApi(),
      },
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/kolarorz/vue-virt-list',
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
        {
          text: 'VirtList',
          collapsed: false,
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
          ],
        },

        { text: 'RealList', link: 'real-list' },
        { text: 'VirtGrid', link: 'virt-grid' },
        { text: 'VirtTree', link: 'virt-tree' },
        { text: 'VirtTable', link: 'virtable' },
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
