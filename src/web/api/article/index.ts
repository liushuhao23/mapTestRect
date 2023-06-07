/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-03 11:06:15
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-29 23:45:36
 */
import ApiBase, {AjaxReturnType} from '@web/asstes/http/api';

export interface AjaxReturn_AppInfo extends AjaxReturnType {
    data: any
  }

class Article  extends ApiBase{
    public url =  {
        get: '/blog/api/user/users'
    }

    getItem (parmas: any): Promise<AjaxReturnType> {
        return this.post(this.url.get)
    }
}

export default new Article()