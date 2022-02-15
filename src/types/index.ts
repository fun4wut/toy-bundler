export enum DepType {
  Relative,
  Package,
  Http
}

/** 打包单元 */
export interface BundleUnit {
  canBundle: boolean;
  entryPath: string;
}