import { canBundle, resolveFilePath } from '@src/utils';
import pathUtils from 'path';

export interface Dependency {
  declPath: string;
  absPath: string;
  canBundle: boolean;
}

export class LocalDep implements Dependency {
  constructor(public declPath: string, srcFilePath: string) {
    this.absPath = resolveFilePath(declPath, pathUtils.dirname(srcFilePath));
    this.canBundle = canBundle(this.absPath);
  }
  canBundle: boolean;
  absPath: string;
}

export class HttpDep implements Dependency {
  constructor(public declPath: string, srcFilePath: string) {}
  canBundle: boolean;
  absPath: string;
}
