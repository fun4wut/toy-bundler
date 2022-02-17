import { ModuleGraph } from './graph';
import { genOutputCode } from './runtime/template';

const fileName = process.argv[2];

const graph = new ModuleGraph(fileName);

// console.log(graph)

console.log(genOutputCode(graph.dumpFromTemplate()));