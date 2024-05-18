import axios from 'axios';
import { UseMutationResult, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { setUserPlayerData } from '../../store/reducers/users';
import { API_URL } from '..';

type CreatePlayerResponse = { token: string; id: string; username: string };
type CreatePlayerError = { message: string };
type UserParams = { username: string; password: string }; // Add password if needed
axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('token')}`;

export const useCreatePlayer = (): UseMutationResult<
  CreatePlayerResponse,
  CreatePlayerError,
  UserParams
> => {
  const dispatch = useDispatch();

  return useMutation<CreatePlayerResponse, CreatePlayerError, UserParams>(
    async () => {
      try {
        const response = await axios.post<CreatePlayerResponse>(
          `${API_URL}/player/create-player`,
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
      onError: (error: CreatePlayerError) => {
        console.error('Error:', error.message);
      },
    },
  );
};
