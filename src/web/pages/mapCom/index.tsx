/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 13:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-13 18:07:12
 */
import React, { useState, FC, useEffect } from 'react'
import TiandituMap from './tianditu'
import { Select } from 'antd';
import { DivisionApi } from '@web/api/map';
import { ProjectItem } from '@web/type/map';


interface Props {
  getProdInfo: (id: number, info: ProjectItem) => void
}
const SearchCom: FC<Props> = (props ) => {
  const { getProdInfo } = props;

  const [typeList, setTypeList] = useState([])
  const [entList, setEntListt] = useState([])
  const [proList, setProList] = useState<ProjectItem[]>([])
  const [defaultTypeValue, setDefaultTypeValue] = useState('-1')
  const [defaultEntValue, setDefaultEntValue] = useState()
  const [defaultProValue, setDefaultProValue] = useState()

  const fieldTypeNames = {
    label: 'typeName',
    value: 'typeCode'
  }

  let enterpriseValue = '';
  let projectValue = '';
  
  const handleChange = (value: number) => {
    const proInfo = proList.filter((info) => Number(info.id )=== value)[0]
    getProdInfo(value, proInfo)
  }
  const getTypeList = () => {
    DivisionApi.getListProjectType().then((rs: any) => {
      if (rs?.code === 200) {
        let target = rs.data;
        target.unshift({
          typeCode: '-1',
          typeName: '全部类型'
        });
        setTypeList(rs.data)
        setDefaultTypeValue('-1')
      }
    });
  };

  const getEntList = () => {
    DivisionApi.getEntList().then((rs: any) => {
      if (rs?.code === 200) {
        setEntListt(rs.data)
      } else {
        setEntListt([])
      }
    });
  };

  const getProjectInfoFun = (params?: { projectApprovalType: string; entId: string }) => {
    DivisionApi.getProjectInfo(params!).then((rs) => {
      if (rs.code === 200) {
        setProList(rs.data)
      } else {
        setProList([])
      }
    });
  };

  const proChange = (value: string, type?: string) => {
    if (type === 'type') {
      projectValue = value;
    }
    if (type === 'enterprise') {
      enterpriseValue = value;
    }
    const params = {
      projectApprovalType: projectValue && projectValue !== '-1' ? projectValue : '',
      entId: enterpriseValue ? enterpriseValue : ''
    };
    getProjectInfoFun(params);
  };

  
  
  useEffect( () => {
    const fun = async () => {
      await getTypeList()
      await getEntList()
      await getProjectInfoFun()
    }
    fun()
  }, [])
  return (
    <div className='absolute top-[20px] left-[20px] z-[999]'>
      <Select
        style={{ width: 120 }}
        onChange={(value) => proChange(value, 'type')}
        defaultValue={defaultTypeValue}
        fieldNames={fieldTypeNames}
        options={typeList}
        className='mr-[10px]'
      />
      <Select
        style={{ width: 200 }}
        onChange={(value: any) => proChange(value, 'type')}
        defaultValue={defaultEntValue}
        fieldNames={fieldTypeNames}
        options={entList}
        placeholder='全部企业'
        className='mr-[10px]'
      />
      <Select
        style={{ width: 200 }}
        onChange={handleChange}
        defaultValue={defaultProValue}
        placeholder='全部项目'
        optionLabelProp='label'
        options={
          proList.map((item) => ({
            label: <span>{item.projName} <span className='ml-[10px] text-[14px] font-normal text-dark-grey'>{item.projApprovalType}</span></span>,
            value: item.id,
          }))
        }
      />
    </div>

  );
};

const MapCom: FC = () => {
  const [infoData, setInfoData] = useState<ProjectItem | Record<string, any>>({})

  const getProdInfo = (id: number, info: ProjectItem) => {
    setInfoData(info)
  }
  return (
    <div className='h-full w-full'>
      <SearchCom getProdInfo={getProdInfo}></SearchCom>
      <TiandituMap info = {infoData as ProjectItem}></TiandituMap>
    </div>
  )
}
export default MapCom