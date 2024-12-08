import { methods, api } from '@/lib/api';

interface formData {
  email: string;
  newpassword: string;
  confirmpassword: string;
}
export const connfirmOTP = async (data: formData) => {
  await api(methods.post, '/api/v1/users/forgot-password', data);
};
