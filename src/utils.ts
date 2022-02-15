import { transform } from '@babel/standalone';
import fse from 'fs-extra';
import detect from 'detective';
import { DepType } from './types';
import pathUtils from 'path';
import findPkg from 'find-package-json';

/**
 * 把文件转成cjs格式
 * @param path 文件路径
 */
export function transformToCjs(path: string) {
  const code = fse.readFileSync(path).toString();
  const res = transform(code, {
    presets: ['env']
  });
  return res.code || '';
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

export function detectDepType(path: string) {
  if (path.startsWith('./') || path.startsWith('../')) {
    return DepType.Relative;
  }
  if (path.startsWith('http')) {
    return DepType.Http;
  }
  return DepType.Package;
}

export const isFile = (path: string) => {
  try {
    return fse.statSync(path).isFile;
  } catch {
    return false;
  }
}

/**
 * 根据目录，查找出该文件的具体路径，查找失败则返回false
 * @param path 目录绝对路径
 * @returns 
 */
export function resolveExactFile(path: string): string | false {
  if (isFile(path)) {
    return path;
  }
  let newPath
  if (isFile((newPath = pathUtils.join(path, 'index.js')))) {
    return newPath;
  }
  return false;
}

/**
 * 根据目录，查找出该pkg的具体路径，查找失败则返回false
 * 需要处理：
 * 1. lodash
 * 2. lodash/dist/add
 * 3. 
 * @param path 目录绝对路径
 * @returns 
 */
 export function resolveExactPkg(path: string): string | false {
  if (isFile(path)) {
    return path;
  }
  for (const f of findPkg(path)) {
      // 根据包名和目录名是否匹配来进行查找
      if (f.name !== pathUtils.basename(path)) {
        continue;
      }
      const dirname = pathUtils.dirname(f.__path);
      // 拼出pkg的入口，然后再找对应的文件
      const entryPath = pathUtils.join(dirname, f.main || 'index.js');
      return entryPath;
  }
  return false;
}
