import ENDPOINTS from '@/api/endpoints';
import { requester } from '@/api/requester';
import { TSendLoginAPI, TSendLoginParams } from './types/types-sendlogin';

export const sendLogin = async (
  body: TSendLoginParams,
): Promise<TSendLoginAPI> => {
  const { data } = await requester({}).post<TSendLoginAPI>(
    `${ENDPOINTS.login}`,
    body,
  );

  return data;
};
