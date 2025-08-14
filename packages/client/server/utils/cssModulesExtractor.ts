import fs from 'fs/promises';
import path from 'path';

import { glob } from 'glob';
import { createServer as createViteServer, ViteDevServer } from 'vite';

// Кэш для CSS модулей
let cssModulesCache: string | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут в production

let globalViteServer: ViteDevServer | null = null;

/**
 * Создает или переиспользует Vite сервер для обработки CSS модулей
 */
async function getViteServer(rootPath: string): Promise<ViteDevServer> {
  if (globalViteServer) {
    return globalViteServer;
  }

  globalViteServer = await createViteServer({
    root: rootPath,
    server: { middlewareMode: true },
    appType: 'custom',
    optimizeDeps: { disabled: true },
    ssr: {
      noExternal: true,
    },
  });

  return globalViteServer;
}

/**
 * Извлекает и обрабатывает CSS модули для SSR с использованием Vite
 */
export async function extractCSSModules(rootPath: string): Promise<string> {
  const now = Date.now();
  if (cssModulesCache && now - cacheTimestamp < CACHE_DURATION && process.env.NODE_ENV === 'production') {
    return cssModulesCache;
  }

  try {
    return await extractCSSModulesViaVite(rootPath);
  } catch (error) {
    return cssModulesCache ?? '';
  }
}

/**
 * Извлекает CSS модули используя Vite
 */
async function extractCSSModulesViaVite(rootPath: string): Promise<string> {
  const cssModulePattern = path.join(rootPath, 'src/**/*.module.css');
  const cssModuleFiles = await glob(cssModulePattern.replace(/\\/g, '/'));

  if (cssModuleFiles.length === 0) return;

  const viteServer = await getViteServer(rootPath);
  const processedCSS: string[] = [];

  for (const filePath of cssModuleFiles) {
    try {
      const relativePath = '/' + path.relative(rootPath, filePath).replace(/\\/g, '/');
      const transformResult = await viteServer.transformRequest(relativePath);

      if (transformResult?.code) {
        let cssContent = '';
        const cssRegex = /\.textContent\s*=\s*"([^"]+)"/g;

        let match: RegExpExecArray | null;

        while ((match = cssRegex.exec(transformResult.code)) !== null) {
          cssContent += match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }

        if (!cssContent && transformResult.code.includes('createHotContext')) {
          const styleMatch = transformResult.code.match(/(?:__vite__css|textContent\s*=\s*")[^"]*"([^"]+)"/);

          if (styleMatch) {
            cssContent = styleMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          }
        }

        if (!cssContent) {
          const rawCSS = await fs.readFile(filePath, 'utf-8');
          cssContent = rawCSS;
        }

        if (cssContent) {
          processedCSS.push(`/* ${relativePath} */\n${cssContent}`);
        }
      }
    } catch (error) {
      console.warn(`Could not process CSS module ${filePath}:`, error);
    }
  }

  const result = processedCSS.join('');

  cssModulesCache = result;
  cacheTimestamp = Date.now();

  return result;
}

/**
 * Очищает кэш CSS модулей и закрывает Vite сервер
 */
export async function clearCSSModulesCache(): Promise<void> {
  cssModulesCache = null;
  cacheTimestamp = 0;

  if (globalViteServer) {
    await globalViteServer.close();
    globalViteServer = null;
  }
}
