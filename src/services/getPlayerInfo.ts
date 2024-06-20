import ENDPOINTS from '@/api/endpoints';
import { requester } from '@/api/requester';
import { TPlayerInfoAPI } from './types/types-get-player-info';

export const getPlayerInfo = async (token: string): Promise<TPlayerInfoAPI> => {
  const { data } = await requester({
    headers: {
      Authorization: token,
    },
  }).get<TPlayerInfoAPI>(`${ENDPOINTS.player}`);

  return data;
};
