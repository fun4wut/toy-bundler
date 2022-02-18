import { ModuleGraph } from './graph';
import { genOutputCode } from './runtime/template';
import fse from 'fs-extra';
const fileName = process.argv[2];

const graph = new ModuleGraph(fileName);

// console.log(graph)
const res = genOutputCode(graph.dumpFromTemplate());
fse.writeFileSync('./playground/rrr.js', res);
