import { getPkgName, resolveExactFile } from '@src/utils';
import pathUtils from 'path';
import findPkg from 'find-package-json';


export interface Dependency {
  requiredPath: string;
  absPath: string;
  canBundle: boolean;
}

export class RelativeDep implements Dependency {
  constructor(public requiredPath: string, srcFilePath: string) {
    const absDir = pathUtils.join(srcFilePath, '../', requiredPath); // /User/xxx/proj/src/utils
    this.absPath = resolveExactFile(absDir) || '';
    this.canBundle = true;
  }
  canBundle: boolean;
  absPath: string;
}

export class PackageDep implements Dependency {
  constructor(public requiredPath: string, srcFilePath: string) {
    this.pkgName = getPkgName(requiredPath);
    // relative('lodash', 'lodash/dist/index.js') => 'dist/index.js'，算出对应包名的相对路径
    const relativeRefPath = pathUtils.relative(this.pkgName, this.requiredPath);
    for (const f of findPkg(srcFilePath)) {
      // 根据包名是否匹配来进行查找
      if (f.name !== this.pkgName) {
        continue;
      }
      // 拼出pkg的目录，然后再找对应的文件
      const pkgDir = pathUtils.dirname(f.__path);
      // 直接require包名，遵循pkg.json的main字段
      if (relativeRefPath === '') {
        this.absPath = resolveExactFile(pathUtils.join(pkgDir, f.main || 'index.js')) || '';
      } else { // 非require包名的情况下，在pkg的目录下进行查找
        this.absPath = resolveExactFile(pathUtils.join(pkgDir, relativeRefPath)) || '';
      }
      break;
    }
    this.canBundle = Boolean(this.absPath);
  }
  pkgName: string;
  absPath: string;
  canBundle: boolean;
}

export class HttpDep implements Dependency {
  constructor(public requiredPath: string, srcFilePath: string) {}
  canBundle: boolean;
  absPath: string;
}
