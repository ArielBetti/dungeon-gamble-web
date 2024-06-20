import ENDPOINTS from '@/api/endpoints';
import { requester } from '@/api/requester';
import { THintAPI, THintParams } from './types/types-send-hint';

export const sendHint = async (
  body: THintParams[],
  token: string,
): Promise<THintAPI> => {
  const { data } = await requester({
    headers: {
      Authorization: token,
    },
  }).post<THintAPI>(`${ENDPOINTS.hint}`, body);

  return data;
};
