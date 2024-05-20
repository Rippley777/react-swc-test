import { useForm, Controller } from 'react-hook-form';
import { useUserLogin } from '../../../api/user';
import { Input } from '../../ui/forms/input';
import { useEffect } from 'react';

type LoginFormProps = {
  triggerLogin: boolean;
};

type LoginFormValues = {
  username: string;
  password: string;
};
const LoginForm = ({ triggerLogin }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isSuccess, error } = useUserLogin();

  useEffect(() => {
    if (triggerLogin) {
      // console.log('Login form triggered');
      mutate(getValues());
    }
  }, [triggerLogin]);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/player';
    }
  }, [isSuccess]);

  const onSubmit = async ({ username, password }: LoginFormValues) => {
    mutate({ username, password });
  };

  return (
    <form
      className="flex flex-col gap-y-5 items-center animate-fadeInSlow"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
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
        {/* {errors.username && <span>{errors.username.message}</span>} */}
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
        {/* {errors.password && <span>{errors.password.message}</span>} */}
      </div>
    </form>
  );
};

export default LoginForm;
