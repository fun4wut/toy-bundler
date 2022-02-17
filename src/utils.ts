import { transform } from '@babel/standalone';
import fse from 'fs-extra';
import detect from 'detective';
import { Dependency, HttpDep, PackageDep, RelativeDep } from './dependency';
import findPkg from 'find-package-json';
import pathUtils from 'path';

/**
 * 把文件转成cjs格式
 * @param path 文件路径
 */
export function transformToCjs(path: string) {
  const code = fse.readFileSync(path).toString();
  const res = transform(code, {
    filename: 'x.ts',
    presets: ['env', 'typescript']
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

export function detectDependency(path: string, srcFilePath: string): Dependency {
  if (path.startsWith('./') || path.startsWith('../')) {
    return new RelativeDep(path, srcFilePath);
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return new HttpDep(path, srcFilePath);
  }
  return new PackageDep(path, srcFilePath);
}

export function getPkgName(path: string) {
  const [first, second, ..._] = path.split(pathUtils.sep);
  return path.startsWith('@') ? pathUtils.join(first, second) : first;
}


export function getPkgJson(path: string, pkgName: string) {
  // 只找最近的那一个
  for (const f of findPkg(path)) {
    if (f.name === pkgName) {
      return f;
    }
    return null;
  }
  return null;
}

/**
 * 给定了绝对路径，再去查找他的带扩展名的路径
 * @param path 
 * @returns 
 */
export const resolveFileWithExt = (path: string): string | false => {
  const exts = ['', '.js', '.ts'];
  for (const ext of exts) {
    const pathWithExt = path + ext;
    if (fse.pathExistsSync(pathWithExt)) {
      return fse.statSync(pathWithExt).isFile() && pathWithExt;
    }
  }
  return false;
}

/**
 * 根据目录，查找出该文件的具体路径，查找失败则返回false
 * @param path 目录绝对路径
 * @returns 
 */
export function resolveExactFile(path: string): string | false {
  let newPath;
  if (newPath = resolveFileWithExt(path)) {
    return newPath;
  }
  if (newPath = resolveFileWithExt(pathUtils.join(path, 'index'))) {
    return newPath;
  }
  return false;
}
