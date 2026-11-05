import type { HeadConfig, UserConfig } from 'vitepress';

const siteUrl = 'https://kolarorz.github.io/vue-virt-list/';
export const seo: Pick<UserConfig, 'sitemap' | 'transformPageData'> = {
  sitemap: { hostname: siteUrl },
  transformPageData(page) {
    // relativePath 是重写后的公开路径；同时兼容源目录 zh/ 前缀。
    const path = page.relativePath.replace(/^zh\//, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    const english = path.startsWith('en/');
    const url = new URL(path, siteUrl).href;
    if (!page.description) page.description = english
      ? `${page.title}: vue-virt-list virtual scrolling for Vue 2 and Vue 3, with native scrolling, dynamic item heights and examples.`
      : `${page.title}：vue-virt-list 的 Vue 2 / Vue 3 虚拟列表用法，支持原生滚动、动态行高与在线示例。`;
    const title = page.titleTemplate === false ? page.title : `${page.title} | vue-virt-list`;
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'vue-virt-list' }],
      ['meta', { property: 'og:locale', content: english ? 'en_US' : 'zh_CN' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: page.description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: page.description }],
    ];
    const existing: HeadConfig[] = page.frontmatter.head || [];
    page.frontmatter.head = [...head.filter(([tag, attrs]) => !existing.some(([otherTag, other]) =>
      tag === otherTag && (attrs.rel ? attrs.rel === other.rel : attrs.property ? attrs.property === other.property : attrs.name === other.name)
    )), ...existing];
  },
};
