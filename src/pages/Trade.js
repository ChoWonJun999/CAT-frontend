import { useForm } from 'react-hook-form';
import React, { useEffect, useState, useMemo } from 'react';
import AxiosInstance from '../services/api';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import MyButton from '../components/common/MyButton';

const Trade = () => {
  const [myData, setMyData] = useState([]);
  const [onAndOff, setOnAndOff] = useState();

  const { control } = useForm();
  const GetData = async () => {
    try {
      const res = await AxiosInstance.get('trade/5/');
      console.log(res.data.state);
      setOnAndOff(res.data.state);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
    setMyData([]);
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleOnAndOff = () => {
    const axios = async () => {
      try {
        await AxiosInstance.put('trade/5/', { state: !onAndOff, method: 1 });
        setOnAndOff(!onAndOff);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    axios();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'method',
        header: '방식',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: '설명',
        size: 150,
      },
      {
        accessorKey: 'choice',
        header: '선택',
        size: 150,
      },
    ],
    []
  );

  return (
    <Box>
      <Box>타겟 코인 : KRW-BTC / 현재 방식 : chk.trade_method</Box>
      <Box>
        <MyButton control={control} name="onAndOffBtn" value={!onAndOff ? '시작' : '종료'} onClick={handleOnAndOff} />
      </Box>
      <MaterialReactTable columns={columns} data={myData} />
    </Box>
  );
};

export default Trade;
