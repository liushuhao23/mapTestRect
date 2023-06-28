import { Button, Select, message } from 'antd';
import { DivisionApi } from '@web/api/map';
import React, { useState, FC, useEffect, useRef } from 'react';
import { CityItem, ProjectItem } from '@web/type/map';
import { Popover, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';

interface Props {
  getProdInfo: (id: number, info: ProjectItem) => void;
  getProList: (val: ProjectItem[]) => void;
  renderingGjson: (val: any) => void;
  resetFun: (val: void) => void;
}
interface ContentDomProps {
  closePosition: () => void;
  resetFun: (val: void) => void;
  renderingGjson: (val: any) => void;
}
const mapping: Record<string, string> = {
  economize: 'market',
  market: 'distinguish',
  distinguish: 'village',
};

const ContentDom: FC<ContentDomProps> = props => {
  const { closePosition, renderingGjson, resetFun } = props;
  const [economizeList, setEconomizeList] = useState<CityItem[]>([]);
  const [economizeValue, setEconomizeValue] = useState(null);

  const [marketList, setMarketList] = useState<CityItem[]>([]);
  const [marketValue, setMarketValue] = useState(null);

  const [distinguishList, setDistinguishList] = useState<CityItem[]>([]);
  const [distinguishValue, setDistinguishValue] = useState(null);

  const [villageList, setVillageList] = useState<CityItem[]>([]);
  const [villageValue, setVillageValue] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);

  const typeValue = useRef<{ type: string; code: string }>({
    type: '',
    code: '',
  });
  const fieldEcoNames = {
    label: 'name',
    value: 'code',
  };
  const changeEco = (value: any, type: string) => {
    if (type === 'economize') {
      setEconomizeValue(value);
      setMarketValue(null);
      setDistinguishValue(null);
      setVillageValue(null);
    }
    if (type === 'market') {
      setMarketValue(value);
      setDistinguishValue(null);
      setVillageValue(null);
    }
    if (type === 'distinguish') {
      setDistinguishValue(value);
      setVillageValue(null);
    }
    if (type === 'village') {
      setVillageValue(value);
    }
    getDivisionFun(value, mapping[type]);
  };

  const getDivisionFun = (code: string, type: string) => {
    DivisionApi.getCityDetail({ code, maxLevel: '5' }).then(rs => {
      if (rs?.data?.children?.length) {
        type === 'market' && setMarketList(rs.data.children);
        type === 'distinguish' && setDistinguishList(rs.data.children);
        type === 'village' && setVillageList(rs.data.children);
        typeValue.current = {
          type,
          code,
        };
      }
    });
  };

  const positioning = () => {
    DivisionApi.getCityDetail({ code: typeValue.current.code, maxLevel: '5' }).then(rs => {
      if (rs?.code === 200) {
        if (rs?.data?.geojson) {
          renderingGjson(rs.data);
        } else {
          message.error('该区域没行政区划示例数据，请联系管理员”');
        }
      }
    });
  };

  const reset = () => {
    setEconomizeList([]);
    setMarketList([]);
    setDistinguishList([]);
    setVillageList([]);
    setEconomizeValue(null);
    setMarketValue(null);
    setDistinguishValue(null);
    setVillageValue(null);
    resetFun()
    getOneLevelFun()
  };

  const getOneLevelFun = () => {
    DivisionApi.getOneLevel().then((rs: any) => {
      rs?.data?.length && setEconomizeList(rs.data);
    });
  }

  useEffect(() => {
    getOneLevelFun()
  }, []);

  useEffect(() => {
    economizeValue ? setDisabledButton(false) : setDisabledButton(true);
  }, [economizeValue]);

  return (
    <>
      <div className="searchMapCityCom w-[287px] h-[273px] rounded-[4px]">
        <div className="relative text-[16px] font-medium">
          <span>项目定位</span>
          <CloseOutlined className="absolute right-[5px] cursor-pointer" onClick={closePosition} />
        </div>
        <div className="mt-[20px]">
          <ul>
            <li className="flex items-center mb-[15px]">
              <span className="w-[30px] text-[rgba(71,81,106)] text-[14px] font-normal mr-[10px]">
                省级
              </span>
              <Select
                onChange={value => changeEco(value, 'economize')}
                placeholder="选择省"
                value={economizeValue}
                fieldNames={fieldEcoNames}
                options={economizeList}
                className="mr-[10px] w-5/6"
              />
            </li>
            <li className="flex items-center mb-[15px]">
              <span className="w-[30px] text-[rgba(71,81,106)] text-[14px] font-normal mr-[10px]">
                市级
              </span>
              <Select
                onChange={value => changeEco(value, 'market')}
                fieldNames={fieldEcoNames}
                placeholder="选择市"
                value={marketValue}
                options={marketList}
                className="mr-[10px] w-5/6"
              />
            </li>
            <li className="flex items-center mb-[15px]">
              <span className="w-[30px] text-[rgba(71,81,106)] text-[14px] font-normal mr-[10px]">
                区级
              </span>
              <Select
                onChange={value => changeEco(value, 'distinguish')}
                fieldNames={fieldEcoNames}
                placeholder="选择区"
                value={distinguishValue}
                options={distinguishList}
                className="mr-[10px] w-5/6"
              />
            </li>
            <li className="flex items-center mb-[15px]">
              <span className="w-[30px] text-[rgba(71,81,106)] text-[14px] font-normal mr-[10px]">
                乡级
              </span>
              <Select
                onChange={value => changeEco(value, 'village')}
                fieldNames={fieldEcoNames}
                placeholder="选择乡"
                value={villageValue}
                options={villageList}
                className="mr-[10px] w-5/6"
              />
            </li>
          </ul>
        </div>
        <div className="w-full h-[50px] flex items-center justify-end">
          <Button className="footerItem" onClick={reset}>
            重置
          </Button>
          <Button
            className="ml-[5px]"
            type="primary"
            disabled={disabledButton}
            onClick={positioning}
          >
            定位
          </Button>
        </div>
      </div>
    </>
  );
};

const SearchCom: FC<Props> = props => {
  const { getProdInfo, getProList, renderingGjson, resetFun } = props;

  const [typeList, setTypeList] = useState([]);
  const [entList, setEntList] = useState([]);
  const [proList, setProList] = useState<ProjectItem[]>([]);
  const [defaultTypeValue, setDefaultTypeValue] = useState('-1');
  const [defaultProValue, setDefaultProValue] = useState();
  const [visible, setVisible] = useState(false);

  const fieldTypeNames = {
    label: 'typeName',
    value: 'typeCode',
  };

  let enterpriseValue = '';
  let projectValue = '';

  const handleChange = (value: number) => {
    const proInfo = proList.filter(info => Number(info.id) === value)[0];
    getProdInfo(value, proInfo);
  };
  const getTypeList = () => {
    DivisionApi.getListProjectType().then((rs: any) => {
      if (rs?.code === 200) {
        let target = rs.data;
        target.unshift({
          typeCode: '-1',
          typeName: '全部类型',
        });
        setTypeList(rs.data);
        setDefaultTypeValue('-1');
      }
    });
  };

  const getEntList = () => {
    DivisionApi.getEntList().then((rs: any) => {
      if (rs?.code === 200) {
        setEntList(rs.data);
      } else {
        setEntList([]);
      }
    });
  };

  const getProjectInfoFun = (params?: { projectApprovalType: string; entId: string }) => {
    DivisionApi.getProjectInfo(params!).then(rs => {
      let target: ProjectItem[] = [];
      if (rs.code === 200) {
        target = rs.data;
      } else {
        target = [];
      }
      setProList(target);
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
      entId: enterpriseValue ? enterpriseValue : '',
    };
    getProjectInfoFun(params);
  };

  const closePosition = () => {
    setVisible(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setVisible(newOpen);
  };

  useEffect(() => {
    if (proList.length) {
      getProList(proList);
    }
  }, [proList]);

  useEffect(() => {
    const fun = async () => {
      await getTypeList();
      await getEntList();
      await getProjectInfoFun();
    };
    fun();
  }, []);
  return (
    <div className="selectMapCom absolute top-[20px] left-[20px] z-[999] flex">
      <Select
        style={{ width: 120 }}
        onChange={value => proChange(value, 'type')}
        defaultValue={defaultTypeValue}
        fieldNames={fieldTypeNames}
        options={typeList}
        className="mr-[10px]"
      />
      <Select
        style={{ width: 200 }}
        onChange={handleChange}
        defaultValue={defaultProValue}
        placeholder="全部项目"
        optionLabelProp="label"
        options={proList.map(item => ({
          label: (
            <span>
              {item.projName}
              <span className="ml-[10px] text-[14px] font-normal text-dark-grey">
                {item.projApprovalType}
              </span>
            </span>
          ),
          value: item.id,
        }))}
      />
      <Popover
        content={
          <ContentDom
            closePosition={closePosition}
            resetFun={resetFun}
            renderingGjson={renderingGjson}
          />
        }
        title=""
        onOpenChange={handleOpenChange}
        open={visible}
        placement="bottomLeft"
        overlayClassName="selectMapComPopover"
        trigger="click"
      >
        <div className="h-[32px] rounded-[5px] cursor-pointer">
          <span className="min-w-[99px] ml-[10px] h-[32px] bg-[#ffffff] flex items-center text-[15px] pl-[5px] pr-[15px] shadow-[0_10px_24px_rgba(157,170,194,0.2)]">
            <svg className="w-[15px] h-[15px] mr-[5px]" aria-hidden="true">
              <use xlinkHref="#icon-dingwei"></use>
            </svg>
            <span className="text-[rgba(157,170,194)]">全国</span>
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default SearchCom;
