import { mountAuthRoute } from '@/router/paths';
import { sendLogin } from '@/services/sendLogin';
import { useUserActions } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSendLogin = () => {
  const navigation = useNavigate();
  const { setUser, setToken } = useUserActions();

  return useMutation({
    mutationFn: sendLogin,
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
