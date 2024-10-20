import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../../services/api';
import MyInput from '../../components/common/MyInput';
import Paper from '@mui/material/Paper';
import MyButton from '../../components/common/MyButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const defaultValues = {
    user_id: '',
    user_pw: '',
  };
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  const submission = async data => {
    try {
      const response = await AxiosInstance.post('login/', {
        username: data.user_id,
        password: data.user_pw,
      });
      console.log(response);
      const { access, refresh } = response.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error.response.data);
    }
  };

  return (
    <Box height={{ xs: '80%', sm: '70%', md: '60%', lg: '50%' }} width={{ xs: '80%', sm: '70%', md: '60%', lg: '50%' }}>
      <Paper>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submission)} style={{ width: '300px' }}>
          <MyInput
            label="아이디"
            name="user_id"
            control={control}
            rules={{
              required: 'ID를 입력하세요.',
            }}
          />
          <MyInput
            type="password"
            name="user_pw"
            label="비밀번호"
            control={control}
            rules={{
              required: '비밀번호를 입력하세요.',
            }}
          />
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Box>
            <MyButton
              type="submit"
              name="LoginBtn"
              color="upbitDarkBlue"
              control={control}
              value="로그인"
              width="45%"
            />
            <MyButton
              name="LoginBtn"
              color="upbitDarkBlue"
              control={control}
              value="회원가입"
              onClick={() => navigate('/singup')}
              width="45%"
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
