import { methods, api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUsername = (sponsorId: string) => {
  return useQuery({
    queryKey: ['get-username', sponsorId],
    queryFn: async () => api(methods.get, `/api/v1/users/get-username?userId=${sponsorId}`)
  });
};
