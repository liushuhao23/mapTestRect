/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-04-23 11:16:10
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 14:56:16
 */

import ApiBase from '@assets/http/api';

const baseUrl = '/gisconfig/map';

const workspacePath = {
  lastLogin: `${baseUrl}/lastLogin`,
  judgeProjectPermission: `${baseUrl}/judgeProjectPermission`
};

class Workspace extends ApiBase {
  async lastLogin(params: { projectId: string; type: number; userId: string; accountId: string }): Promise<any> {
    return this.post(workspacePath.lastLogin, { ...params });
  }

  async judgeProjectPermission(projectId: string): Promise<any> {
    return this.get(workspacePath.judgeProjectPermission, { projectId });
  }
}

const WorkspaceApi = new Workspace();
// eslint-disable-next-line import/prefer-default-export
export { WorkspaceApi };
