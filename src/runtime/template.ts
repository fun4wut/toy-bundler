export const genOutputCode = (modulesStr: string) => `
  const __require = typeof require !== 'undefined' ? require : () => { throw new Error('gg') };
  (function(modules) {
    const moduleCache = {};
    const resolveModule = id => {
      const {
        factory,
        map
      } = modules[id];

      const localModule = {
        exports: {},
        loaded: false,
      };
      moduleCache[id] = localModule;

      const localRequire = requireDeclarationName => {
        const depId = map[requireDeclarationName];
        if (moduleCache[depId] && moduleCache[depId].loaded) {
          return moduleCache[depId].exports;
        }
        return depId >= 0 ? resolveModule(depId) : __require(requireDeclarationName)
      };
  
      factory(localModule, localModule.exports, localRequire);
      localModule.loaded = true;
      return localModule.exports;
    }
    const res = resolveModule(0);
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = res;
    } else {
      (globalThis || self || global).myBundle = res;
    }
  })(${modulesStr});
`;
