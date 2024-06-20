import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import bg from '../../assets/tarven-bg.png';
import loopTheme from '../../assets/tavern-theme.mp3';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS, mountAuthRoute } from '@/router/paths';
import { useForm } from 'react-hook-form';
import { TSendRegisterParams } from '@/services/types/types-sendregister';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './scheme';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSendRegister } from '@/queries/useSendRegister';
import { useUser } from '@/store/user';

const Register = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { mutate: sendRegister, isPending } = useSendRegister();

  const form = useForm<TSendRegisterParams>({
    resolver: zodResolver(RegisterSchema),
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
      email: '',
      name: '',
      tag: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;

  const handleSubmitForm = (values: TSendRegisterParams) => {
    sendRegister(
      {
        login: values.login,
        password: values.password,
        email: values.email,
        name: values.name,
        tag: values.tag,
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
    <div className="flex flex-col items-center justify-center min-h-screen max-md:bg-register bg-cover bg-center bg-no-repeat px-3">
      <div className="relative flex items-center w-full justify-center max-w-[850px] max-h-[800px] max-md:w-full max-md:h-screen border border-border rounded-md overflow-hidden">
        <img
          className="animate-[pulse_5s_infinite] delay-75 max-md:hidden"
          src={bg}
          alt=""
        />
        <div className="flex-col p-3 flex items-center justify-start absolute bg-card/90 top-0 left-0 w-full max-w-[370px] max-md:max-w-full h-full border-r border-border">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">Dungeon Gamble</h1>
            <p className="text-xs">Cadastre-se e jogue!</p>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="poti@dgg.com"
                            type="email"
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
                <div className="flex flex-col items-start justify-center w-full gap-2">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Apelido(Nick)</FormLabel>
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
                    name="tag"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Apelido(Nick)</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="#DGG"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-start text-sm flex-col w-full">
                  <span>Já tem uma conta?</span>
                  <Button
                    onClick={() => navigate(PATHS.login)}
                    className="p-0 m-0 text-lg"
                    variant="link"
                  >
                    Entrar com minha conta
                  </Button>
                </div>
                <Button
                  disabled={!isValid}
                  isLoading={isPending}
                  className="w-full flex items-center justify-center"
                >
                  Registrar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
