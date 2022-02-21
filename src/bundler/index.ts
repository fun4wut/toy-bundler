import { ModuleGraph } from "@src/graph";
import { genOutputCode } from "@src/runtime/template";
import pathUtils from 'path';
import resolve from 'resolve';
import fse from 'fs-extra';

export interface BundleOption {
  input: string;
  output: string;
  external: string[];
}

export interface Dependency {
  absPath: string;
  canBundle: boolean;
}

export class Bundler {
  graph: ModuleGraph;
  constructor(public option: BundleOption) {
    this.graph = new ModuleGraph(this.resolveDependency);
    const input = pathUtils.resolve(this.option.input);
    this.graph.addEntry(input);
  }

  doBundle = () => {
    const code = genOutputCode(this.graph.dumpFromTemplate());
    fse.writeFileSync(pathUtils.resolve(this.option.output), code);
  }

  canBundle = (path: string) => {
    return pathUtils.isAbsolute(path);
  }

  resolveDependency = (path: string, srcFilePath: string): Dependency => {
    const EXTERNAL_MOD_CODE = 2333;
    try {
      const absPath = resolve.sync(path, {
        basedir: pathUtils.dirname(srcFilePath),
        extensions: ['.js', '.ts'],
        preserveSymlinks: false,
        packageFilter: pkg => {
          if (this.option.external.includes(pkg.name)) {
            const err: any = new Error('HIT EXTERNAL MODULE');
            err.code = EXTERNAL_MOD_CODE;
            throw err;
          }
          return pkg;
        },
      });
      return {
        absPath,
        canBundle: this.canBundle(absPath),
      }
    } catch (error) {
      if (error.code !== EXTERNAL_MOD_CODE) {
        throw error;
      }
      console.log('not bundled:', path);
      return {
        canBundle: false,
        absPath: '',
      };
    }
  }
}