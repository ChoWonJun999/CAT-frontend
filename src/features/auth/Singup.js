import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../../services/api';
import MyInput from '../../components/common/MyInput';
import Paper from '@mui/material/Paper';
import MyButtonField from '../../components/common/MyButton';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const Signup = ({ csrfToken }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const defaultValues = {
    userId: '',
    userPw: '',
    userPwChk: '',
    userEmail: '',
    userPh: '',
    accessKey: '',
    secretKey: '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  const submission = data => {
    AxiosInstance.post(`register/`, {
      user: {
        username: data.userId,
        password: data.userPw,
        email: data.userEmail,
      },
      phone_number: data.userPh,
      access_key: data.accessKey,
      secret_key: data.secretKey,
    })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box height={{ xs: '70%' }} width={{ xs: '80%', sm: '70%', md: '60%', lg: '50%' }}>
      <Paper>
        <h1>Sing up</h1>
        <form onSubmit={handleSubmit(submission)} style={{ width: '300px' }}>
          <MyInput
            label="Id"
            name="userId"
            control={control}
            place="Id"
            rules={{
              required: '아이디는 필수 항목입니다.',
            }}
          />
          <MyInput
            type="password"
            label="Password"
            name="userPw"
            control={control}
            rules={{
              required: '비밀번호는 필수 항목입니다.',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
            }}
          />
          <MyInput
            type="password"
            label="Password Check"
            name="userPwChk"
            control={control}
            rules={{
              required: '비밀번호 확인은 필수 항목입니다.',
              validate: value => value === control._formValues.userPw || '비밀번호가 일치하지 않습니다.',
            }}
          />
          <MyInput
            type="email"
            label="Email"
            name="userEmail"
            control={control}
            rules={{
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: '유효한 이메일 주소를 입력해 주세요.',
              },
            }}
          />
          <MyInput
            type="tel"
            label="Phone Number"
            name="userPh"
            control={control}
            rules={{
              required: '전화번호는 필수 항목입니다.',
              pattern: {
                value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                message: '유효한 전화번호를 입력해 주세요. 예: 010-1234-5678',
              },
            }}
          />
          <MyInput
            label="Access key"
            name="accessKey"
            control={control}
            rules={{
              required: 'Access key는 필수 항목입니다.',
            }}
          />
          <MyInput
            label="Secret Key"
            name="secretKey"
            control={control}
            rules={{
              required: 'Secret key는 필수 항목입니다.',
            }}
          />
          <Grid container>
            <Grid item>
              <MyButtonField
                name="LoginBtn"
                color="upbitDarkBlue"
                control={control}
                value="뒤로 가기"
                onClick={() => history.back()}
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item>
              <MyButtonField name="LoginBtn" color="upbitDarkBlue" control={control} value="가입" type="submit" />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
