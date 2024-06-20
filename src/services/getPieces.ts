import ENDPOINTS from '@/api/endpoints';
import { requester } from '@/api/requester';

import { useToken } from '@/store/user';
import { TPiecesAPI } from './types/types-get-pieces';

export const getPieces = async (token: string): Promise<TPiecesAPI> => {
  const { data } = await requester({
    headers: {
      Authorization: token,
    },
  }).get<TPiecesAPI>(`${ENDPOINTS.pieces}`);

  return data;
};
