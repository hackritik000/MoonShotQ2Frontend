import { useNavigate } from 'react-router-dom';
import { useLogout } from './queries/queries';
import { useEffect } from 'react';
export default function SignOutPage() {
  const navigate = useNavigate();
  const { isLoading } = useLogout();
  useEffect(() => {
    if (!isLoading) {
      navigate('/');
    }
  }, [isLoading, navigate]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
}
