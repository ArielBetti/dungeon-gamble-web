import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Howl } from 'howler';
import bg from '../../assets/bg-login-px.png';
import loopTheme from '../../assets/login-theme.wav';
import clickSound from '../../assets/click.mp3';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS, mountAuthRoute } from '@/router/paths';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSendLoginParams } from '@/services/types/types-sendlogin';
import { LoginSchema } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSendLogin } from '@/queries/useSendLogin';
import { toast } from '@/components/ui/use-toast';
import useSound from 'use-sound';
import { useUser } from '@/store/user';

const Login = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { mutate: sendLogin, isPending } = useSendLogin();

  const form = useForm<TSendLoginParams>({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;

  const handleSubmitForm = (values: TSendLoginParams) => {
    sendLogin(
      {
        login: values.login,
        password: values.password,
      },
      {
        onSuccess: () => {
          console.log('ss');
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: 'Erro',
            description:
              e?.response?.data?.message || 'Ocorreu um erro inesperado',
          });
        },
      },
    );
  };

  useEffect(() => {
    if (user) {
      navigate(mountAuthRoute('arena'));
    }

    const sound = new Howl({
      src: [loopTheme],
      autoplay: true,
      loop: true,
      volume: 0.15,
    });

    sound.play();

    return () => {
      sound.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-md:bg-login-bg bg-cover bg-center bg-no-repeat px-3">
      <div className="relative flex items-center w-full justify-center max-w-[850px] max-h-[800px] max-md:w-full max-md:h-screen border border-border rounded-md overflow-hidden">
        <img
          className="animate-[pulse_5s_infinite] delay-75 max-md:hidden shadow-inner"
          src={bg}
          alt=""
        />
        <div className="flex-col p-3 flex items-center justify-start absolute bg-card/90 top-0 left-0 w-full max-w-[370px] max-md:max-w-full h-full border-r border-border">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">Dungeon Gamble</h1>
            <p className="text-xs">Entre para jogar!</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5 w-full pt-10">
            <Form {...form}>
              <form
                className="flex flex-col gap-5 w-full transition-all"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <div className="flex flex-col items-start justify-center w-full gap-2">
                  <FormField
                    control={control}
                    name="login"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="Tav"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-2">
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            type="password"
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="●●●●"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-start text-sm flex-col w-full">
                  <span>Não tem conta?</span>
                  <Button
                    onClick={() => navigate(PATHS.register)}
                    className="p-0 m-0 text-lg"
                    variant="link"
                  >
                    Criar uma conta
                  </Button>
                </div>
                <Button
                  key="submit-create-user"
                  disabled={!isValid}
                  isLoading={isPending}
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  Entrar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
