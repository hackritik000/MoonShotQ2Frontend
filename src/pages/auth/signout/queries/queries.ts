import { methods, api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useLogout = () => {
  return useQuery({
    queryKey: ['logout'],
    queryFn: async () => await api(methods.post, '/api/v1/users/logout')
  });
};
