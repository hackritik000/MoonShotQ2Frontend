import { getUrlCookie } from './queries/queries.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardPage from './index.js';
import { useDispatch } from 'react-redux';
import { getCookieReducers } from '@/store/dataSlice.js';

export default function SharedPage() {
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getUrlCookie(id);
        if(result){
          dispatch(getCookieReducers())
        }
      }
    };

    fetchData();
  });


  return (
    <>
      <DashboardPage />
    </>
  );
}
