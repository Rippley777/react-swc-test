import { useForm, Controller } from 'react-hook-form';
// import { signIn } from '../../../shared/auth/authService';
import { useUserLogin } from '../api/user';
import { Input } from '../components/ui/forms/input';
import { useEffect } from 'react';
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
  const { mutate, isSuccess, error } = useUserLogin();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/player';
    }
  }, [isSuccess]);

  const onSubmit = async ({ username, password }: LoginFormValues) => {
    mutate({ username, password });
  };

  return (
    <div className="flex justify-center flex-1">
      <form
        className="flex flex-col gap-y-5 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-primary">Sample Game</h1>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        <div>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username or email is required' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Username or email"
                data-testid="username"
              />
            )}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                data-testid="password"
              />
            )}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Login</button>
        <div>New to the game?</div>
        <a href="/signup">Sign up</a>
      </form>
    </div>
  );
};

export default LoginForm;
