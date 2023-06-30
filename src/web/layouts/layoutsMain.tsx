/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 23:23:42
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-30 16:51:45
 */
import { useRoutes } from 'react-router-dom';
import routes from '../routers';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';


const LayoutsMain = (): JSX.Element => {
  const routing = useRoutes(routes);
  return (
    <div className="w-full h-full">
      <Layout>
          <Content
            className="site-layout-background"
            id= 'mainContent'
            style={{
              minHeight: 280,
              height: '100%'
            }}
          >
            {routing}
          </Content>
        </Layout>
    </div>
  );
};
export default LayoutsMain;
