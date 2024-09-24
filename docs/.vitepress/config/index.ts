import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import { en } from './en';
import { zh } from './zh';
let NAME_KEY = 1;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
  cleanUrls: true,
  title: 'vue-virt-list',
  base: '/vue-virt-list/',
  assetsDir: '/public',
  head: [['link', { rel: 'icon', href: '/vue-virt-list/favicon.ico' }]],
  markdown: {
    container: {
      detailsLabel: '源码',
    },
    config(md) {
      md.core.ruler.before(
        'block',
        'vue-virt-list-example-snippet-pre',
        (state) => {
          const regex = /<!<< (.+)/;
          let result = regex.exec(state.src);
          while (result) {
            const [, match] = result;
            state.src = state.src.replace(
              regex,
              `
<!!<< ${match}
::: details
  <<< ${match}
:::
        `,
            );
            result = regex.exec(state.src);
          }
        },
      );

      md.block.ruler.before(
        'table',
        'vue-virt-list-example-snippet',
        (state, startLine, endLine) => {
          const regex = /<!!<< (.+)/;
          let start = state.bMarks[startLine] + state.tShift[startLine];
          let max = state.eMarks[startLine];
          const result = regex.exec(state.src.slice(start, max));
          if (!result) {
            return false;
          }
          let [, sourceFile] = result;

          if (/^examples/.test(state.env.relativePath)) {
            // 如果匹配到了
            sourceFile = sourceFile.replace('@/demos/', '../demos/');
          } else {
            sourceFile = sourceFile.replace('@/demos/', '../../demos/');
          }

          // const ViewName = sourceFile
          //   .replace('.vue', '')
          //   .replace(/\.*?\//g, '');
          const ViewName = `Example${NAME_KEY++}`;
          let scriptToken = state.tokens.find((token) =>
            /<script( setup)?>/.test(token.content),
          )!;
          if (!scriptToken) {
            scriptToken = state.push('html_block', '', 0);
            scriptToken.content = '<script setup>\n</script>\n';
            scriptToken.block = true;
          }
          scriptToken.content = scriptToken.content.replace(
            /<script(.*)>\n/,
            `<script$1>\nimport ${ViewName} from '${sourceFile}' \n`,
          );

          const token = state.push('html_inline', '', 0);
          token.content = `<ClientOnly><${ViewName}/></ClientOnly>`;
          token.block = false;
          token.map = [startLine, startLine + 1];

          state.line++;
          return true;
        },
      );
    },
  },
  vite: {
    // plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../../', import.meta.url)),
        'vue-virt-list/lib/assets/tree.css': fileURLToPath(
          new URL('../../../src/components/tree/tree.css', import.meta.url),
        ),
        'vue-virt-list': fileURLToPath(
          new URL('../../../src/index.ts', import.meta.url),
        ),
      },
      // alias: [
      //   // {
      //   //   find: '@/',
      //   //   replacement: fileURLToPath(new URL('../../../', import.meta.url)),
      //   // },
      //   {
      //     find: 'vue-virt-list',
      //     replacement: fileURLToPath(
      //       new URL('../../../src/index.ts', import.meta.url),
      //     ),
      //   },
      //   // {
      //   //   find: /^.*\/VPNavBar\.vue$/,
      //   //   replacement: fileURLToPath(
      //   //     new URL('./components/CustomNavBar.vue', import.meta.url),
      //   //   ),
      //   // },
      // ],
    },
    ssr: {
      noExternal: ['@vue/repl'],
    },
  },
});
