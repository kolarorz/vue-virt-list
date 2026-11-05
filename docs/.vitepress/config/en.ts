import { DefaultTheme, defineConfig } from 'vitepress';

import pkg from '../../../package.json';

export const en = defineConfig({
  lang: 'en-US',
  description: 'Virtual lists and trees for Vue 2 and Vue 3 with native scrolling, dynamic item heights, infinite loading and chat examples.',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Choose a project', link: '/en/guide/project-selection' },
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
      // Under development
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
        { text: 'Choose a project', link: 'project-selection' },
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

            { text: 'keep-alive', link: 'keep-alive' },
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
