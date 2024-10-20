import React, { useEffect, useMemo, useState } from 'react';
import AxiosInstance from '../services/api';
import { MaterialReactTable } from 'material-react-table';

const History = () => {
  const [myData, setMyData] = useState([]);

  const GetData = async () => {
    try {
      const res = await AxiosInstance.get('orders/');
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
        accessorKey: 'currency',
        header: '코인',
        size: 100,
      },
      {
        accessorKey: 'balance',
        header: '주문 종류',
        size: 150,
      },
      {
        accessorKey: 'avg_buy_price',
        header: '거래 수량',
        size: 150,
      },
      {
        accessorKey: 'trade_price',
        header: '거래 단가',
        size: 150,
      },
      {
        accessorKey: 'buy_price',
        header: '거래 금액',
        size: 150,
      },
      {
        accessorKey: 'current_price',
        header: '수수료',
        size: 150,
      },
      {
        accessorKey: 'eva_percent',
        header: '정산 금액',
        size: 150,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={myData} />;
};

export default History;
