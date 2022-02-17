import { getPkgJson, getPkgName, resolveExactFile } from '@src/utils';
import pathUtils from 'path';


export interface Dependency {
  declPath: string;
  absPath: string;
  canBundle: boolean;
}

export class RelativeDep implements Dependency {
  constructor(public declPath: string, srcFilePath: string) {
    const absDir = pathUtils.join(srcFilePath, '../', declPath); // /User/xxx/proj/src/utils
    this.absPath = resolveExactFile(absDir) || '';
    this.canBundle = true;
  }
  canBundle: boolean;
  absPath: string;
}

export class PackageDep implements Dependency {
  constructor(public declPath: string, srcFilePath: string) {
    this.pkgName = getPkgName(declPath);
    // relative('lodash', 'lodash/dist/index.js') => 'dist/index.js'，算出对应包名的相对路径
    const relativeRefPath = pathUtils.relative(this.pkgName, this.declPath);
    
    for (let curDir = srcFilePath; curDir !== '/'; curDir = pathUtils.dirname(curDir)) {
      const pkgJson = getPkgJson(pathUtils.join(curDir, 'node_modules', this.pkgName), this.pkgName);
      if (!pkgJson) {
        continue;
      }
      // 拼出pkg的目录，然后再找对应的文件
      const pkgDir = pathUtils.dirname(pkgJson.__path);
      // 直接require包名，遵循pkg.json的main字段
      if (relativeRefPath === '') {
        this.absPath = resolveExactFile(pathUtils.join(pkgDir, pkgJson.main || 'index.js')) || '';
      } else { // 非require包名的情况下，在pkg的目录下进行查找
        this.absPath = resolveExactFile(pathUtils.join(pkgDir, relativeRefPath)) || '';
      }
      this.canBundle = true;
      return;
    }
    this.canBundle = false;
  }
  pkgName: string;
  absPath: string;
  canBundle: boolean;
}

export class HttpDep implements Dependency {
  constructor(public declPath: string, srcFilePath: string) {}
  canBundle: boolean;
  absPath: string;
}
