import React from 'react';
import { useAuthContext } from '../../store/contexts';
import { useGetAuthQuery } from '../../store/queries/auth';
import { SplashScreen } from '../../utils/components';
import type { LoginResponseType } from '../../types';

export default function CheckAuth({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: LoginResponseType;
}) {
  const [loading, setLoading] = React.useState(true);

  const { login, logout, csrfToken } = useAuthContext();

  const {
    data: response,
    status,
    isLoading,
  } = useGetAuthQuery({
    initialData,
  });

  React.useEffect(() => {
    if (!isLoading) {
      if (status === 'success' && response?.data) {

        const payload = {
          user: response.data.user,
          csrfToken: csrfToken || '', 
          token: response.data.accessToken, 
          tokenType: response.data.token_type, 
        };
        login(payload);
      } else {
        logout();
      }
      setLoading(false);
    }
  }, [login, logout, response, status, isLoading, csrfToken]);

  return loading ? <SplashScreen /> : children;
}
