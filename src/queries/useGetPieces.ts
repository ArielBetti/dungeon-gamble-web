import { getPieces } from '@/services/getPieces';
import { useToken } from '@/store/user';
import { useQuery } from '@tanstack/react-query';

export const useGetPieces = () => {
  const token = useToken();

  return useQuery({
    queryKey: [`pieces`],
    queryFn: () => getPieces(token),
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
