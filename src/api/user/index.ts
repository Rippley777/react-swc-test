import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useMutation, UseMutationResult } from 'react-query';
import { setUserDataOnLogin } from '../../store/reducers/users';

const API_URL = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL ?? 'API_URL is not defined!'); // Log API_URL to console

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

type UploadResponse = { token: string; id: string; username: string };
type UploadError = { message: string };
type UserParams = { username: string; password: string }; // Add password if needed

export const useUserLogin = (): UseMutationResult<
  UploadResponse,
  UploadError,
  UserParams
> => {
  const dispatch = useDispatch();

  return useMutation<UploadResponse, UploadError, UserParams>(
    async ({ username, password }: UserParams) => {
      if (!username) {
        throw new Error('No email provided');
      }

      try {
        const response = await axios.post<UploadResponse>(
          `${API_URL}/auth/login`,
          {
            username,
            password, // Add password if needed
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
      onError: (error: UploadError) => {
        console.error('Error:', error.message);
      },
    },
  );
};

// type UserParams = {
//   username: string | null;
//   password: string | null;
// };

// type UploadResponse = void;

// type UploadError = Error;

// export const useUserLogin = (): UseMutationResult<
//   UploadResponse,
//   UploadError,
//   UserParams
// > => {
//   const dispatch = useDispatch();

//   return useMutation(async ({ username, password }: UserParams) => {
//     if (!username) {
//       throw new Error('No email provided');
//     }
//     return axios
//       .post(`${API_URL}/auth/login`, {
//         username,
//         password,
//       })
//       .then((response) => {
//         console.log('Login successful:', response.data);

//         // Assuming the server responds with a token on successful login
//         localStorage.setItem('token', response.data.token); // Store token in localStorage
//         dispatch(setUserId(response.data.user.id));
//       })
//       .catch((error) => {
//         console.error('Login failed:', error.response.data);
//         throw new Error(error.response.data);
//       });
//     // await fetch(userApiUrl, {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({
//     //     email,
//     //     username,
//     //   }),
//     // })
//     //   .then((response) => {
//     //     if (!response.ok) {
//     //       // throw new Error('Network response was not ok');
//     //     }
//     //     return response.json();
//     //   })
//     //   .then((data) => {
//     //     if (data?.user?._id) {
//     //       dispatch(setUserId(data.user._id));
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error:', error);
//     //   });
//   });
// };

// // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
