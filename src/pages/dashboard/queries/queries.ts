import { methods, api } from '@/lib/api';
import { AgeTypes, Gender } from '@/store/dataSlice';
import { useQuery } from '@tanstack/react-query';

export interface DataInterface {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

export interface ExtentedDataInterface extends DataInterface {
  Age: AgeTypes;
  Gender: Gender;
  Day: string;
}

export interface dashboardDataInterface {
  data: {
    fullname: string;
    userId: string;
    data: ExtentedDataInterface[];
  };
}

const dashboardRequestData: () => Promise<dashboardDataInterface> =
  async () => {
    const response = await api(methods.post, '/api/v1/users/dashboard');
    return response;
  };

export const anotherUserName = (userId: string) =>
  api(methods.get, `/api/v1/users/get-username?userId=${userId}`);

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => await dashboardRequestData()
  });
};

export const generateUrl = async () =>
  await api(methods.post, '/api/v1/users/generateUrl');
export const getUrlCookie = async (id:string) =>
  await api(methods.post, '/api/v1/users/getUrlCookie',{ id });
