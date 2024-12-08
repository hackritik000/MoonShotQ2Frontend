import { getCurrentUser, getRefreshToken } from '@/lib/api';
import Cookies from 'js-cookie';

export const CheckAuthStatus = async (): Promise<boolean> => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  if (accessToken) {
    const data = await getCurrentUser();
    if (data.statusCode === 200) {
      return true;
    }
  }
  if (refreshToken) {
    const data = await getRefreshToken();
    if (data.statusCode === 200) {
      return true;
    }
  }
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  return false;
};
