import path from 'path';

import { glob } from 'glob';
import { ViteDevServer } from 'vite';

/**
 * Извлекает и обрабатывает CSS модули для SSR с использованием Vite
 * ВАЖНО: viteServer обязателен для получения правильных хешированных имен классов
 */
export async function extractCSSModules(rootPath: string, viteServer: ViteDevServer): Promise<string> {
  const cssModulePattern = path.join(rootPath, 'src/**/*.module.css');
  const cssModuleFiles = await glob(cssModulePattern.replace(/\\/g, '/'));

  if (cssModuleFiles.length === 0) return '';

  const processedCSS: string[] = [];

  for (const filePath of cssModuleFiles) {
    const relativePath = '/' + path.relative(rootPath, filePath).replace(/\\/g, '/');

    try {
      const transformResult = await viteServer.transformRequest(relativePath);

      if (!transformResult?.code) continue;

      let cssContent = '';
      const viteMatch = transformResult.code.match(/__vite__css\s*=\s*["'`]([^"'`]+)["'`]/);

      if (viteMatch) {
        cssContent = viteMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      }

      if (cssContent?.trim()) {
        processedCSS.push(`/* ${relativePath} */\n${cssContent}`);
      } else {
        console.warn(`Could not extract CSS content from ${relativePath}. Transform result:`, {
          codeSnippet: transformResult.code.substring(0, 200) + '...',
          hasCode: !!transformResult.code,
          codeLength: transformResult.code.length,
        });
      }
    } catch (error) {
      console.error(`Failed to process CSS module ${filePath}:`, error);
    }
  }

  return processedCSS.join('\n\n');
}
