import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-virt-list',
  description: 'vue-virt-list',
  lang: 'en-US',
  // head: [['link', { rel: 'icon', href: '/vue-virt-list/favicon.ico' }]],

  base: '/vue-virt-list/',

  assetsDir: '/public',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/start/' },
      { text: 'Examples', link: '/examples/base/' },
      { text: 'API', link: '/api/' },
      // { text: 'Playground', link: '/playground/' },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/keno-lee/vue-virt-list',
      },
    ],

    sidebar: {
      '/guide/': [
        { text: 'Start using', link: '/guide/start/' },
        { text: 'Special instructions', link: '/guide/instructions/' },
      ],

      '/examples/': [
        { text: 'Basic examples', link: '/examples/base/' },
        // { text: '高性能', link: '/examples/performance/' },
        { text: 'Fixed height', link: '/examples/fixed/' },
        { text: 'Horizontal scroll', link: '/examples/horizontal/' },
        { text: 'Slot', link: '/examples/slot/' },
        { text: 'Operations', link: '/examples/operate/' },
        { text: 'Resize window', link: '/examples/resize/' },

        { text: 'Dynamic height', link: '/examples/dynamic/' },
        { text: 'Table', link: '/examples/table/' },
        { text: 'Infinite loading', link: '/examples/infinity/' },
        { text: 'Chat room', link: '/examples/chat/' },

        {
          text: 'Advanced',
          collapsed: false,
          items: [
            { text: 'Advanced usage', link: '/examples/advanced/' },
            {
              text: 'Pagination VirtList',
              link: '/examples/pagination-virt/',
            },
            {
              text: 'Pagination RealList',
              link: '/examples/pagination-real/',
            },
          ],
        },
      ],
    },
  },
});
