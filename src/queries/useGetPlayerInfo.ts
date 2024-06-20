import { getPlayerInfo } from '@/services/getPlayerInfo';
import { useToken } from '@/store/user';
import { useQuery } from '@tanstack/react-query';

export const useGetPlayerInfo = () => {
  const token = useToken();

  return useQuery({
    queryKey: [`player-info`],
    queryFn: () => getPlayerInfo(token),
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
