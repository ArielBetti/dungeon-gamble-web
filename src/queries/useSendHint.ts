import { sendHint } from '@/services/sendHint';
import { THintParams } from '@/services/types/types-send-hint';
import { useToken } from '@/store/user';
import { useMutation } from '@tanstack/react-query';

export const useSendHint = () => {
  const token = useToken();
  return useMutation({
    mutationFn: (body: THintParams[]) => sendHint(body, token),
  });
};
