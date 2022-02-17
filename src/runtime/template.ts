export const genOutputCode = (modulesStr: string) => `
  const __require = typeof require !== 'undefined' ? require : () => { throw new Error('gg') };
  (function(modules) {
    const resolveModule = id => {
      const {
        factory,
        map
      } = modules[id];
      const localRequire = requireDeclarationName => {
        const depId = map[requireDeclarationName]
        return depId >= 0 ? resolveModule(depId) : __require(requireDeclarationName)
      };
      const localModule = {
        exports: {}
      };
  
      factory(localModule, localModule.exports, localRequire);
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
