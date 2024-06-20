import ENDPOINTS from '@/api/endpoints';
import { requester } from '@/api/requester';
import { TBoardAPI } from './types/types-get-board';

export const getBoard = async (token: string): Promise<TBoardAPI> => {
  const { data } = await requester({
    headers: {
      Authorization: token,
    },
  }).get<TBoardAPI>(`${ENDPOINTS.board}`);

  return data;
};
