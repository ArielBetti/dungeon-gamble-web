import { mountAuthRoute } from '@/router/paths';
import { sendRegister } from '@/services/sendRegister';
import { useUserActions } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSendRegister = () => {
  const navigation = useNavigate();
  const { setUser, setToken } = useUserActions();

  return useMutation({
    mutationFn: sendRegister,
    onSuccess: (res) => {
      setUser({
        email: res.email,
        login: res.login,
        name: res.name,
        nameWithTag: res.nameWithTag,
        tag: res.tag,
        token: res.token,
      });
      setToken(res.token);
      navigation(mountAuthRoute('arena'));
    },
  });
};
