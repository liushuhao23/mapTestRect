/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-04-23 11:16:00
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-18 21:08:59
 */
export interface CityItem {
  name: string;
  level: number;
  geojson: string | null;
  geom: null | string;
  population: null | string;
  area: null | string;
  isLeaf: number;
  isLeafBoolean: boolean;
  code: string;
  children: null | CityItem[];
  xcoordinate: number;
  ycoordinate: number;
  pcode: null | number;
}

export interface ProjectItem {
  address: string;
  city?: string;
  clearenceLevel?: string;
  county?: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 落位地址
   */
  modelUrl: string;
  /**
   * 项目类型
   */
  projApprovalType: string;
  projectDetailUrl?: string;
  /**
   * 项目领域
   */
  projectDomain: string;
  projectUrl: string;
  projId?: string;
  projLevel?: string;
  projManager?: string;
  projName?: string;
  /**
   * 领域
   */
  projType?: string;
  province?: string;
  systemFrom?: string;
  id: string
  projRegion: string;
  projAddress: string
}

export interface TypeItem {
  typeCode: string;
  typeName: string;
}

export interface EntItem {
  companyCode: string;
  companyName: string;
}
