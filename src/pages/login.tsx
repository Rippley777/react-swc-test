import { useForm, Controller } from 'react-hook-form';
// import { signIn } from '../../../shared/auth/authService';
import { useUserLogin } from '../api/user';
// import { useUserLogin } from '../../../shared/api/user';

type LoginFormProps = {
  setError?: (error: string) => void;
  onLoginSuccess?: () => void;
  redirectToProfile?: boolean;
};

type LoginFormValues = {
  username: string;
  password: string;
};
const LoginForm = (
  {
    //   setError,
    //   onLoginSuccess,
    //   redirectToProfile,
  }: LoginFormProps,
) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  //   const dispatch = useDispatch();
  const { mutate, error } = useUserLogin();

  const onSubmit = async ({ username, password }: LoginFormValues) => {
    mutate({ username, password });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <Controller
        name="username"
        control={control}
        rules={{ required: 'Username or email is required' }}
        render={({ field }) => <input {...field} data-testid="username" />}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field }) => (
          <input {...field} type="password" data-testid="password" />
        )}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
