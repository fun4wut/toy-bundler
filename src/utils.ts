import fse from 'fs-extra';
import detect from 'detective';
import { Dependency, HttpDep, LocalDep } from './dependency';
import { transformSync } from 'esbuild';
import pathUtils from 'path';
import resolve from 'resolve';

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

export function detectDependency(path: string, srcFilePath: string): Dependency {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return new HttpDep(path, srcFilePath);
  }
  return new LocalDep(path, srcFilePath);
}


export function resolveFilePath(path: string, baseDir: string) {
  return resolve.sync(path, {
    basedir: baseDir,
    extensions: ['.js', '.ts', '.node'],
    preserveSymlinks: false,
  });
}

export function canBundle(path: string) {
  return pathUtils.isAbsolute(path) && !['.node'].includes(pathUtils.extname(path))
}