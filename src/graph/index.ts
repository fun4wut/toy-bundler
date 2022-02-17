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
  loaded: boolean = false;
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
}

export class ModuleGraph {
  graphArr: ModuleNode[] = [];
  constructor(entry: string) {
    const entryNode = new ModuleNode(entry);
    const visDep = new Set<string>();
    this.graphArr.push(entryNode);
    visDep.add(entryNode.filePath);

    for (const mod of this.graphArr) {
      mod.deps.forEach(d => {
        const { absPath, canBundle } = mod.resolveDep(d);
        if (!canBundle) { // node 基础库，直接require
          mod.depDict[d] = DIRECT_REQUIRE;
          return;
        }
        // 如果该文件已经加入过依赖图了，直接跳过
        if (visDep.has(absPath)) {
          return;
        }
        visDep.add(absPath);
        const depNode = new ModuleNode(absPath);
        this.graphArr.push(depNode);
        mod.depDict[d] = depNode.id;
      });
    }
  }
}