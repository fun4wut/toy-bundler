import { detectDependency, getDeps, transformToCjs } from '@src/utils';
import pathUtils from 'path';

let globalIdCounter = 0;
// 标识为node std，直接require，不需要bundle
const DIRECT_REQUIRE = -19260817;
export class ModuleNode {
  id: number;
  /** 绝对路径 */
  filePath: string;
  ext: string;
  code: string;
  deps: string[];
  depDict: Record<string, number> = {};
  constructor(path: string) {
    this.id = globalIdCounter++;
    this.filePath = pathUtils.resolve(path);
    this.code = transformToCjs(this.filePath);
    this.deps = getDeps(this.code);
    this.ext = pathUtils.extname(this.filePath);
  }
  resolveDep = (path: string) => {
    return detectDependency(path, this.filePath);
  }
  dumpFromTemplate = () => {
    return `
      ${this.id}: {
        factory: (module, exports, require) => {
          ${this.code}
        },
        map: ${JSON.stringify(this.depDict)}
      }
    `;
  }
}

export class ModuleGraph {
  pathToModule: Map<string, ModuleNode> = new Map();
  constructor(entry: string) {
    const entryNode = new ModuleNode(entry);
    this.pathToModule.set(entryNode.filePath, entryNode);

    for (const mod of this.pathToModule.values()) {
      mod.deps.forEach(d => {
        const { absPath, canBundle } = mod.resolveDep(d);
        if (!canBundle) { // node 基础库，直接require
          mod.depDict[d] = DIRECT_REQUIRE;
          return;
        }
        // 如果该文件已经加入过依赖图了，处理下依赖映射即可，直接跳过
        if (this.pathToModule.has(absPath)) {
          mod.depDict[d] = this.pathToModule.get(absPath)!.id;
          return;
        }
        const depNode = new ModuleNode(absPath);
        this.pathToModule.set(absPath, depNode);
        mod.depDict[d] = depNode.id;
      });
    }
  }
  dumpFromTemplate = () => {
    return `
      {
        ${[...this.pathToModule.values()].map(m => m.dumpFromTemplate()).join(',')}
      }
    `;
  }
}