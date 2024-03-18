import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
          const [, sourceFile] = result;

          const ViewName = sourceFile
            .replace('.vue', '')
            .replace(/\.*?\//g, '');
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
            `<script$1>\nimport ${ViewName} from  '${sourceFile}' \n`,
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
    // configFile: path.resolve(__dirname, '../../../scripts/dev.ts'),
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../../', import.meta.url)),
        'vue-virt-list': fileURLToPath(
          new URL('../../../src/index.ts', import.meta.url),
        ),
      },
    },
    ssr: {
      noExternal: ['@vue/repl'],
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         'vue-virt-list': ['vue-virt-list'],
    //       },
    //       chunkFileNames(chunkInfo) {
    //         if (chunkInfo.name === 'vue-virt-list') {
    //           return 'public/[name].js';
    //         }
    //         return 'public/[name].[hash].js'
    //       },
    //       minifyInternalExports: false,
    //     }
    // },
    // }
  },
});
