import fse from 'fs-extra';
import detect from 'detective';
import { transformSync } from 'esbuild';

/**
 * 把文件转成cjs格式
 * @param path 文件路径
 */
export function transformToCjs(path: string) {
  try {
    const code = fse.readFileSync(path).toString();
    const res = transformSync(code, {
      format: 'cjs',
    });
    return res.code || '';
  } catch (error) {
    console.error('transform err', path, error);
    return '';
  }
}

/**
 * 获取依赖列表
 * @param code 
 * @returns 
 */
export function getDeps(code: string) {
  const originalDeps = detect(code);
  return originalDeps;
}
