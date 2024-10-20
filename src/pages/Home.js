import React, { useEffect, useMemo, useState } from 'react';
import AxiosInstance from '../services/api';
import { MaterialReactTable } from 'material-react-table';

const Home = () => {
  const [myData, setMyData] = useState([]);

  const GetData = async () => {
    try {
      const res = await AxiosInstance.get('balance/');
      setMyData(res.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'market',
        header: '코인',
        size: 100,
      },
      {
        accessorKey: 'balance',
        header: '보유 수량',
        size: 150,
      },
      {
        accessorKey: 'avg_buy_price',
        header: '매수 평균가',
        size: 150,
      },
      {
        accessorKey: 'trade_price',
        header: '현재가',
        size: 150,
      },
      {
        accessorKey: 'buy_price',
        header: '매수 금액',
        size: 150,
      },
      {
        accessorKey: 'current_price',
        header: '평가 금액',
        size: 150,
      },
      {
        accessorKey: 'eva_percent',
        header: '평가 손익률',
        size: 150,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={myData} />;
};

export default Home;
