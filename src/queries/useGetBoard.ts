import { getBoard } from '@/services/getBoard';
import { getPlayerInfo } from '@/services/getPlayerInfo';
import { useToken } from '@/store/user';
import { useQuery } from '@tanstack/react-query';

export const useGetBoard = () => {
  const token = useToken();

  return useQuery({
    queryKey: [`board`],
    queryFn: () => getBoard(token),
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
