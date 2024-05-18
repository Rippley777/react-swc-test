import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useMutation, UseMutationResult } from 'react-query';

import { clearUser, setUserDataOnLogin } from '../../store/reducers/users';
import { API_URL } from '..';

export const register = (username: string, password: string) => {
  return axios
    .post(`${API_URL}/auth/register`, {
      username,
      password,
    })
    .then((response) => {
      console.log('Registration successful:', response.data);
    })
    .catch((error) => {
      console.error('Registration failed:', error.response.data);
    });
};

type LoginResponse = { token: string; id: string; username: string };
type LoginError = { message: string };
type UserParams = { username: string; password: string }; // Add password if needed

export const useUserLogin = (): UseMutationResult<
  LoginResponse,
  LoginError,
  UserParams
> => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, LoginError, UserParams>(
    async ({ username, password }: UserParams) => {
      if (!username) {
        throw new Error('No email provided');
      }

      try {
        const response = await axios.post<LoginResponse>(
          `${API_URL}/auth/login`,
          {
            username,
            password,
          },
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data;
          throw new Error(
            errorData.message ?? errorData ?? 'Network response was not ok',
          );
        } else {
          throw new Error(
            'A error occurred that could use a less generic message',
          );
        }
      }
    },
    {
      onSuccess: (data) => {
        if (data?.id) {
          dispatch(setUserDataOnLogin(data));
        }
        if (data?.token) {
          localStorage.setItem('token', data.token); // Store token in localStorage
        }
      },
      onError: (error: LoginError) => {
        console.error('Error:', error.message);
      },
    },
  );
};

export const useUserLogout = () => {
  const dispatch = useDispatch();
  return useMutation(async () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
  });
};

// // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
