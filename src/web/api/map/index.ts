/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-04-23 11:16:10
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-14 21:39:07
 */

import ApiBase from '@assets/http/api';
import { CityItem, TypeItem, ProjectItem, EntItem } from '@type/map';
import { ReverseReferenceCity } from '@type/map/common';

const mockUrl = '/gisconfig';
const divisionPath = {
  cityList: '/division/api/v1/city/cityList',
  getDetail: '/division/api/v1/city/getDetail',
  getTianDiTuPosition: 'https://api.tianditu.gov.cn/v2/search',
  getProjectInfo: `${mockUrl}/map/listProject`,
  getEntList: `${mockUrl}/map/listCompany`,
  getListProjectType: `${mockUrl}/map/listProjectType`
};

class Division extends ApiBase {
  async getOneLevel(): Promise<any> {
    return this.get(divisionPath.cityList, { maxLevel: 1 });
  }

  async getCityDetail(params: {code: string, maxLevel: string}): Promise<ReverseReferenceCity<CityItem>> {
    return this.get(divisionPath.getDetail, { ...params });
  }

  async getTianDiTuPosition(params: {keyWord: string}): Promise<ReverseReferenceCity<CityItem>> {
    // eslint-disable-next-line max-len
    return this.get(`${divisionPath.getTianDiTuPosition}?postStr={"keyWord":${JSON.stringify(params.keyWord)},"level":12,"mapBound":"116.02524,39.83833,116.65592,39.99185","queryType":7,"start":0,"count":10}&type=query&tk=56e3056c11d2a791484e789d494fcac1`, {});
  }

  async getProjectInfo(params: {projectApprovalType?: string, entId?: string}): Promise<ReverseReferenceCity<ProjectItem[]>> {
    return this.post(divisionPath.getProjectInfo, { ...params });
  }

  async getEntList(): Promise<ReverseReferenceCity<TypeItem[]>> {
    return this.get(divisionPath.getEntList, {});
  }

  async getListProjectType(): Promise<ReverseReferenceCity<EntItem[]>> {
    return this.get(divisionPath.getListProjectType, {});
  }
}

const DivisionApi = new Division();
// eslint-disable-next-line import/prefer-default-export
export { DivisionApi };
