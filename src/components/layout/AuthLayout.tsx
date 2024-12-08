import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckAuthStatus } from './CheckAuthStatus';

export function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Using a more descriptive name

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await CheckAuthStatus();

      if (authentication && !authStatus) {
        navigate('/login');
      } else if (!authentication && authStatus) {
        navigate('/');
      }
      setIsLoading(false); // Set loading state to false after checks
    };

    checkAuth();
  }, [authentication, navigate]); // Empty dependency array for initial check

  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
