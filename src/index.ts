import { ModuleGraph } from '@src/graph';

const fileName = process.argv[2];

const graph = new ModuleGraph(fileName);

console.log(JSON.stringify(graph, null, 2));