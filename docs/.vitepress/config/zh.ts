import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-virt-list',
  description: 'vue-virt-list',
  lang: 'zh-Hans',
  // head: [['link', { rel: 'icon', href: '/vue-virt-list/favicon.ico' }]],

  base: '/vue-virt-list/',

  assetsDir: '/public',

  themeConfig: {
    docFooter: { prev: '上一篇', next: '下一篇' },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/zh/guide/start/' },
      { text: '示例', link: '/zh/examples/base/' },
      { text: '接口', link: '/zh/api/' },
      // { text: 'Playground', link: '/playground/' },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/keno-lee/vue-virt-list',
      },
    ],

    sidebar: {
      '/zh/guide/': [
        { text: '开始使用', link: '/zh/guide/start/' },
        { text: '特殊说明', link: '/zh/guide/instructions/' },
      ],

      '/zh/examples/': [
        { text: '基础示例', link: '/zh/examples/base/' },
        // { text: '高性能', link: '/examples/performance/' },
        { text: '固定高度', link: '/zh/examples/fixed/' },
        { text: '水平滚动', link: '/zh/examples/horizontal/' },
        { text: '插槽', link: '/zh/examples/slot/' },
        { text: '各类操作', link: '/zh/examples/operate/' },
        { text: '可变窗口大小', link: '/zh/examples/resize/' },

        { text: '可变高度', link: '/zh/examples/dynamic/' },
        { text: '表格', link: '/zh/examples/table/' },
        { text: '无限加载', link: '/zh/examples/infinity/' },
        { text: '聊天室', link: '/zh/examples/chat/' },

        {
          text: '进阶',
          collapsed: false,
          items: [
            { text: '高阶用法', link: '/zh/examples/advanced/' },
            {
              text: '分页-虚拟列表',
              link: '/zh/examples/pagination-virt/',
            },
            { text: '分页-真实列表', link: '/zh/examples/pagination-real/' },
          ],
        },
      ],
    },
  },
});
