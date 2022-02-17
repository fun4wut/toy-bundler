export const genOutputCode = (modulesStr: string) => `
  const __require = typeof require !== 'undefined' ? require : () => { throw new Error('gg') };
  (function(modules) {
    const moduleCache = {}; // 避免循环引, 参考node https://github.com/nodejs/node/blob/v4.0.0/lib/module.js#L298-L316
    const resolveModule = (id) => {
      const { factory, map } = modules[id];
  
      if (moduleCache[id]) {
        return moduleCache[id].exports;
      }
  
      const localModule = {
        exports: {},
        loaded: false,
      };
      moduleCache[id] = localModule;
  
      const localRequire = (requireDeclarationName) => {
        const depId = map[requireDeclarationName];
        return depId >= 0
          ? resolveModule(depId)
          : __require(requireDeclarationName);
      };
  
      factory(localModule, localModule.exports, localRequire);
      localModule.loaded = true;
      return localModule.exports;
    };
    const res = resolveModule(0);
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = res;
    } else {
      (globalThis || self || global).myBundle = res;
    }
  })(${modulesStr});
`;
