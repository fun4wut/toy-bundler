export const genOutputCode = (modulesStr: string) => `
  const __require = typeof require !== 'undefined' ? require : () => new Proxy({},{
    get: () => ({}) // 非node环境下使用require, mock出一个可以无限套的oject, 避免程序挂掉
  });
  (function(modules) {
    const moduleCache = {}; // 避免循环引用, 参考node https://github.com/nodejs/node/blob/v4.0.0/lib/module.js#L298-L316
    const resolveModule = (id) => {
      const { factory, map } = modules[id];
      /**
       * 1. 检查缓存,如果缓存存在且已经加载,直接返回缓存,不做下面的处理
         2. 如果缓存不存在,新建一个 Module 实例
         3. 将这个 Module 实例放到缓存中
         4. 通过这个 Module 实例来加载文件
         5. 返回这个 Module 实例的 exports
         ### 先放缓存,再加载文件 可以避免循环引用的死锁 ###
       * /
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
