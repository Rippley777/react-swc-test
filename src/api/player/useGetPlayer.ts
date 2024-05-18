import axios from 'axios';
import { UseMutationResult, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { setUserPlayerData } from '../../store/reducers/users';
import { API_URL } from '..';

type LoginResponse = { token: string; id: string; username: string };
type LoginError = { message: string };
type UserParams = { username: string; password: string }; // Add password if needed
axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('token')}`;

export const useGetPlayer = (): UseMutationResult<
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
          `${API_URL}/player/get-default-player`,

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
          dispatch(setUserPlayerData(data));
        }
      },
      onError: (error: LoginError) => {
        console.error('Error:', error.message);
      },
    },
  );
};
